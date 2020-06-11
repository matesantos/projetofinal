const { authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Informe o usuário e a senha!')
        }

        const user =  await app.db('users')
                               .where({ email: req.body.email})
                               .first()
        
        if (!user) return res.status(400).send('Usuário não ecnontrado!')

        const isMatch = bcrypt.compareSync(req.body.password, user.password)
        if(!isMatch) return res.status(401).send('Email/Senha inválidos!')

        //Pegar a data atual do sistema de segundos
        const dataNow = Math.floor(Date.now() / 1000)

        const payLoad = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            //iat = issued at = emitido em
            iat: dataNow,
            //O token tem um prazo de validade de 3 dias
            exp: dataNow + (60 * 60 * 24 * 3)
            //só para testes. 10s a validade do token
            //exp: dataNow + 5
        }

        res.status(200).send({
            ...payLoad,
            token: jwt.encode(payLoad, authSecret)
        })
    }

    const validateToken = async (req,res) => {
        const userData = req.body || null
        try {
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()){
                    return res.status(200).send(true)
                }
            }
        } catch (error) {
            //ignorar o error
            //problema com o token
        }
        res.send(false)
    }
    
    //melhorar depois 
    const validateAdmin = async (req,res) => {
        const userData = req.body || null
        try {
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(token.admin){
                    return res.status(200).send(true)
                }
            }
        } catch (error) {
            //ignorar o error
            //problema com o token
        }
        return res.status(401).send(false)
    }

    return { signin, validateToken }
}
