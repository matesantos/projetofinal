module.exports = middleware => {
    return (req, res, next) =>{
        if(req.body.admin){
            middleware(req, res, next)
        }else{
            res.status(401).send(`Você precisa ser um administrador para realizar essa 
                                  operação, entre contato com o suporte.`)
        }
    }
}