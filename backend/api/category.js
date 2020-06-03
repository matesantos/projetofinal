module.exports = app => {
    const { existsOrError,
            notExistsOrError ,
            isNumberOrError, 
            lengthCorrectOrError } = app.api.validation

    const save = (req, res) => {
        const category = { 
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
         }
        
        if(req.params.id) category.id = req.params.id

        try {
            existsOrError(category.name,'Nome não informado.')
            lengthCorrectOrError(category.name,`Nome inválido, certifique-se se o tamanho do 
                                                Nome seja menor que 255 caractere.`, 255)
        } catch (msg) {
            return res.status(400).send(msg)
        }

        if(category.id){
            app.db('categories')
                  .update(category)
                  .where({ id: category.id })
                  .then(_=>res.status(200).send('Categoria atualizada com sucesso'))
                  .catch(err=>res.status(500).send(err))
        }else{
            app.db('categories')
                  .insert(category)
                  .then(_=>res.status(200).send('Categoria salva com sucesso'))
                  .catch(err=>res.status(500).send(err))
        }
    }

    
    const remove = async (req, res) => {
        try {
            existsOrError(req.params.id,"Código da Categoria não informador")
            isNumberOrError(req.params.id, 'Código da Categoria inválido')
            
            const subCategory = await app.db('categories')
                                         .where({ parentId: req.params.id })
            notExistsOrError(subCategory,'Categoria possui subcategoria')

            const articles = await app.db('articles')
                                      .where({ categoryId: req.params.id })
            notExistsOrError(articles,'Categoria possui Artigos')
            
            const rowsDeleted = 
                    await app.db('categories')
                            .where({ id: req.params.id })
                            .del()
                existsOrError(rowsDeleted,'Categoria não foi encontrada')
                
                res.status(200).send('Categoria Excluída com sucesso')
            } catch (msg) {
                return res.status(400).send(msg)
            }
    }
                                    
    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            
            return parent.length ? parent[0] : null
        }
        
        const categoriaWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)
            
            while(parent){
                 path = `${parent.name} > ${path}`
                 parent = getParent(categories, parent.parentId)
            }
                    
            return { ...category, path }
        })

        categoriaWithPath.sort((a, b) =>{
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })
        
        return categoriaWithPath
    }

    const get = (req, res) => {
                app.db('categories')
                .then(categories => res.status(200).json(withPath(categories)))
                .catch(err => {console.log(err); res.status(500).send(err)})
    }
            
    const getById = (req, res) => {
        try {
            isNumberOrError(req.params.id,'Id Inálido')
        } catch (msg) {
            return res.status(400).json(err)
        }
        app.db('categories')
            .where({id:req.params.id})
            .first()
            .then(category => res.status(200).json(category))
            .catch(err => res.status(500).send(err))
    }

    const toTree = (categories, tree) => {
        if(!tree) tree = categories.filter(c => !c.parentId)

        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })
        return tree
    }

    const getTree = (req, res) => {
        app.db('categories')
           .then(categories => res.json(toTree(withPath(categories))))
           .catch(err=>res.status(500).send(err))
    }
    
    return { save, getById, get, remove, getTree }
}