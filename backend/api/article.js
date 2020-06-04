const queries = require('./queries')

module.exports = app => {
    const { existsOrError,
            isNumberOrError, 
            lengthCorrectOrError } = app.api.validation

    const save = (req, res) => {
        const article = { ...req.body }
        if(req.params.id) article.id = req.params.id

        try {
            existsOrError(article.name,'Nome não informado.')
            lengthCorrectOrError(article.name,'Nome muito grande')
            existsOrError(article.description,'Descrição não informada.')
            existsOrError(article.categoryId,'Categoria não informada.')
            existsOrError(article.userId,'Autor não informado.')
            existsOrError(article.content,'Conteúdo não informado.')
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(article.id){
            app.db('articles')
               .update(article)
               .where({ id: article.id })
               .then(_=> res.status(204).send())
               .catch(err=>res.status(500).send(err))
        }else{
            app.db('articles')
               .insert(article)
               .then(_ => res.status(204).send())
               .catch(err => { res.status(500).send(err); console.error(err)} )
        }
    }

    const limit = 2 // Usado para paginação. Mas tem que mudar isso depois
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)
        app.db('articles')
           .select('id', 'name', 'description')
           .limit(limit).offset(page * limit - limit)
           .then(articles => res.json({data: articles, count, limit}))
           .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        try {
            isNumberOrError(req.params.id, 'Código inválido')
        } catch (msg) {
            res.status(400).send(msg)
        }
        app.db('articles')
           .where({ id:req.params.id })
           .first()
           .then(article => {
               article.content = article.content.toString()
               res.status(200).json(article)
            })
           .catch((err, article) => {
               console.log(article)
               if(!article) 
                    res.status(400).send(err);
                else
                    res.status(500).send(err);
            })
    }

    const remove = async (req, res) => {
        try {

            try {
                existsOrError(req.params.id,'Código não informado')
                isNumberOrError(req.params.id,'Código de artigo inválido')
                const rowsDeleted = await app.db('articles').where({ id: req.params.id }).del()
                console.log('delelteda:',rowsDeleted)
                existsOrError(rowsDeleted,'Artigo não encontrado')
            } catch (msg) {
                return res.status(400).send(msg)                
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const getByCategoryId = (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = app.db.raw(queries.categoryWithChildren, categoryId)
        const ids = categories.rows.map(c => c.id)

        app.db({ a: 'articles', u: 'users' })
           .select('a.id', 'a.description', 'a.imageUrl',{ author:'u.name' })
           .limit(limit).offset(page * limit - limit)
           .whereRaw('?? = ??', ['u.id', 'a.userId'])
           .whereIn('categoryId',ids)
           .orderBy('a.id','desc')
           .then(articles => res.status(200).json(articles))
           .catch(err => res.status(500).send(err))
    }

    return { save, get, getById, remove, getByCategoryId }

}