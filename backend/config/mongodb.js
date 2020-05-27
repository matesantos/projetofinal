const mongoose = require('mongoose')
const { mongodb } = require('../.env')
mongoose.connect( mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Conectado com o MongoDB'))
        .catch(e => {
            const msg = 'ERROR! Não foi possível conectar com o MongoDB'
            console.log('\x1b[41m%s\x1b[37m',msg,'\x1b[0m')
            console.log(`DB Connection Error: ${e.message}`)
        })