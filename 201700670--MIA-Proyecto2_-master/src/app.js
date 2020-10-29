const express= require('express');
const morgan= require('morgan');
const cors= require('cors');
//const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const app= express();

const Routes=require('./routes/approutes');
const Routes_carro=require('./routes/carro');
const Routes_correo=require('./routes/correo-rotes');
//app.use(fileUpload())
app.use(bodyParser.json({limit: '50mb'}))
//app.use(bodyParser.urlencoded({ extended: true}))

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(Routes);
app.use(Routes_carro);
app.use(Routes_correo);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT} `));