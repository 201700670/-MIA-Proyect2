
const{Router} = require('express')
const approut= Router();
const BD= require('../confdb/configbd');
const clase= require('../correo/mail');
const multipart= require('connect-multiparty');
var multer  =   require('multer');
var path = require('path');
var fs = require('fs');
let codUser=1;
approut.get('/',  async(req, res)=>{
    sql="select * from usuario"
    let result= await BD.Open(sql,[],false);
    console.log(result.rows);
    Users=[]
    result.rows.map( user=>{
        let userSchema={
            "idUsuario":user[0],
            "nombre":user[1],
            "apellido":user[2],
            "correo_electronico":user[3],
            "contrasena":user[0],
            "fecha_nacimiento":user[4],
            "pais":user[5],
            "foto":user[6],
            "creditos":user[7],
        }
       
        Users.push(userSchema);
    });
    res.status(200).json(Users);
    
});

approut.get('/u',  async(req, res)=>{
    sql="insert into usuario(idUsuario, nombre, apellido,\
        correo_electronico, contrasena, fecha_nacimiento, pais, foto, creditos)\
        values(1,'Andrea', 'Palomo', 'vgdep@gmail.com', DBMS_OBFUSCATION_TOOLKIT.MD5(INPUT =>\
        UTL_RAW.CAST_TO_RAW ('27972797')), TO_DATE('1997/09/27 21:02:44', 'yyyy/mm/dd hh24:mi:ss'),\
        'Guatemala', '/home/andrea/Escritorio/[MIA]Proyecto2_201700670/proyect2/src/asset/Admin.jpeg',0.00)"

    let result= await BD.Open(sql,[],true);
    console.log(result.rows);
    
    res.end();
    
});

approut.post('/addUser',  async(req, res)=>{
    console.log(req.body)
    const { nombre,apellido,correo_electronico,contrasena,fecha_nacimiento,pais,foto } = req.body;
   
   sql = "insert into usuario( nombre, apellido,\
        correo_electronico, contrasena, fecha_nacimiento, pais, foto, creditos)\
        values (:nombre,:apellido,:correo_electronico,\
            DBMS_OBFUSCATION_TOOLKIT.MD5(INPUT =>UTL_RAW.CAST_TO_RAW (:contrasena)),\
            TO_DATE(:fecha_nacimiento, 'yyyy/mm/dd'),:pais,:foto,10000.00)";

    let result=await BD.Open(sql, [nombre, apellido, correo_electronico,contrasena,fecha_nacimiento,pais,foto], true);
    console.log(result.rows)
    res.status(200).json({
        "nombre":nombre,
        "apellido":apellido,
        "correo_electronico":correo_electronico,
        "contrasena":contrasena,
        "fecha_nacimiento":fecha_nacimiento,
        "pais":pais,
        "foto":foto,
        "creditos":10000.00
    });
    codUser++;
});
/*approut.post('/correo/recuperacion',(req,res)=>{
    const {id,correo}=req.body;
    //console.log("sadasdasdasdasdsadasdasdasdasdasdasdasds")
    //console.log(req.body)
       const mailOptions = {
           to: correo,
           from: 'miaarchivos2020@gmail.com',
           subject: '[GTSALES-MARKETPLACE] Recuperacion de contraseña',
           
           
           
           html:  
           "<br><h1>GTSales Marketplace a tu servicio.</h1>"+"<br>"+"<h3>Presiona el siguiente link para gestionar tu cambio de constraseña</h3>"+"<br>"+ 
           "<a href=\"http://192.168.1.7:4200/recuperarContra/"+id+"\"><buttonhref=\"http://192.168.1.7:4200/recuperarContra/"+id+"\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Recuperar mi contraseña</button></a>"+
           "<br>"+
           "<br><a  target=\"_blank\"><img src=\"http://thumbs.subefotos.com/e8446d8ee930c580ce37849c25244f68o.jpg\"/></a>",
           
      
       };
        
       //console.log(mailOptions)
   
       clase.sendMail(mailOptions);
       res.status(200).json("todo ok")
       
});

approut.post('/correo/confirmacion',(req,res)=>{
    const {id,correo}=req.body;
    //console.log("sadasdasdasdasdsadasdasdasdasdasdasdasds")
    //console.log(req.body)
       const mailOptions = {
           to: correo,
           from: 'miaarchivos2020@gmail.com',
           subject: '[GTSALES-MARKETPLACE] confirmacion de correo',
           
           
           
           html:  
           "<br><h1>GTSales Marketplace a tu servicio.</h1>"+"<br>"+"<h3>Presiona el siguiente link para confirmar correo</h3>"+"<br>"+ 
           "<a href=\"http://192.168.1.7:4200/user/confirmacion/"+id+"\"><buttonhref=\"http://192.168.1.7:4200/user/confirmacion/"+id+"\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>"+
           "<br>"+
           "<br><a  target=\"_blank\"><img src=\"http://thumbs.subefotos.com/e8446d8ee930c580ce37849c25244f68o.jpg\"/></a>",
           
      
       };
        
       //console.log(mailOptions)
   
       clase.sendMail(mailOptions);
       res.status(200).json("todo ok")
       
});
   
approut.post('/correo/confirmacion2',(req,res)=>{
        const {id,correo,contra}=req.body;
        //console.log("sadasdasdasdasdsadasdasdasdasdasdasdasds")
        //console.log(req.body)
           const mailOptions = {
               to: correo,
               from: 'miaarchivos2020@gmail.com',
               subject: '[GTSALES-MARKETPLACE] confirmacion de correo',
               
               
               
               html:  
               "<br><h1>GTSales Marketplace a tu servicio.</h1>"+"<br>"+"<h3>Presiona el siguiente link para confirmar correo</h3>"+"<br>"+
               "<br><h1>su contrasena es: "+contra+ "</h1>"+
               "<a href=\"http://192.168.1.7:4200/user/confirmacion/"+id+"\"><buttonhref=\"http://192.168.1.7:4200/user/confirmacion/"+id+"\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>"+
               "<br>"+
               "<br><a  target=\"_blank\"><img src=\"http://thumbs.subefotos.com/e8446d8ee930c580ce37849c25244f68o.jpg\"/></a>",
               
          
           };
            
           //console.log(mailOptions)
       
           clase.sendMail(mailOptions);
           res.status(200).json("todo ok")
           
});*/
     
const multipartMiddleware= multipart({
    uploadDir:'./archivos'
})
/*approut.post('/foto', multiPartMiddleware, (req,res)=>{
    var file = req.files.uploads;
    console.log(req.files)
   
    res.send(
        file[0].path
    )
    
});*/
approut.post('/foto', multipartMiddleware,(req, res, next) => { 
    
    res.json({
        'message': req.files.uploads[0].path
    });
});







/*approut.post('/upload',(req,res) => {
    console.log("andreita")
    let EDFile = req.files.file
    EDFile.mv(`/home/andrea/Escritorio/[MIA]Proyecto2_201700670/proyect2/src/assets/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })
        return res.status(200).send({ message : 'File upload' })
    })
})*/




approut.post('/upload', (req, res) =>{
    const file = req.body.file;
    const name = req.body.name;

    const binaryData = new Buffer(file.replace(/^data:image\/png;base64,/,""), 'base64').toString('binary');
    
    fs.writeFile(name, binaryData, "binary", (err) => {
        console.log(err);
    })

});

module.exports=approut;