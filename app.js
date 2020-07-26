const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');


//rotas
const items = require('./router/items');
const users = require('./router/usuario')
const delivery = require('./router/delivery')

//Monitoramento e Configuração de CORS
app.use(morgan('dev'));
app.use(cors());

//ACEITAR TIPO JSON APENAS
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Configuração da autorização do recebimento do HEADER
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        res.status(200).send({});
    }
    next();
});


//ROTAS
app.use('/items',items);
app.use('/user',users);
app.use('/delivery',delivery)

//Caso não econtre a rota ele irá entrar aqui
app.use((req,res,next)=>{
    const erro = new Error('Não encontrado');
    error.status = 404;
    next(erro);
});

//Caso de algum erro na erro ele entra aqui
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.send({
        error :{
            message: error.message
        }
    })
});

module.exports = app;
