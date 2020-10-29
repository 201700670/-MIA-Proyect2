const { Router } = require('express');
const approut = Router();
const BD = require('../confdb/configbd');
const clase = require('../correo/mail');

approut.post('/correo/recuperacion', (req, res) => {
    const { id, correo } = req.body;
    const mailOptions = {
        to: correo,
        from: 'andreaylilipalomo@gmail.com',
        subject: '[GTSALES-MARKETPLACE] Recuperacion de contraseña',
        html:
            "<br><h1>GTSales Marketplace a tu servicio.</h1>" + "<br>" + "<h3>Presiona el siguiente link para gestionar tu cambio de constraseña</h3>" + "<br>" +
            "<br><a  target=\"_blank\"><img width=\"100px\" height=\"45px\" src=\"https://pngimage.net/wp-content/uploads/2018/05/click-here-arrow-png.png\"/></a>"+
            "<a href=\"http://192.168.1.15:4200/recuperarContra/" + id + "\"><buttonhref=\"http://192.168.1.15:4200/recuperarContra/" + id + "\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">  Recuperar mi contraseña</button></a>" +
            "<br>",
    };
    clase.sendMail(mailOptions);
    res.status(200).json("todo ok")

});

approut.post('/correo/confirmacion', (req, res) => {
    const { id, correo } = req.body;

    console.log("\nESTE ES EL CORREO   ", id, correo,"\n\n")
    const mailOptions = {
        to: correo,
        from: 'andreaylilipalomo@gmail.com',
        subject: '[GTSALES-MARKETPLACE] confirmacion de correo',
        html:
            "<br><h1>GTSales Marketplace a tu servicio.</h1>" + "<br>" + "<h3>Presiona el siguiente link para confirmar correo</h3>" + "<br>" +
            "<br><a  target=\"_blank\"><img width=\"100px\" height=\"45px\" src=\"https://pngimage.net/wp-content/uploads/2018/05/click-here-arrow-png.png\"/></a>"+
            "<a href=\"http://192.168.1.15:4200/user/confirmacion/" + id + "\"><buttonhref=\"http://192.168.1.15:4200/user/confirmacion/" + id + "\"  style=\"background-color:red; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>" +
            "<br>",
    };
    clase.sendMail(mailOptions);
    res.status(200).json("todo ok")

});

approut.post('/correo/confirmacion2', (req, res) => {
    const { id, correo, contra } = req.body;
    const mailOptions = {
        to: correo,
        from: 'andreaylilipalomo@gmail.com',
        subject: '[GTSALES-MARKETPLACE] confirmacion de correo',
        html:
            "<br><h1>GTSales Marketplace a tu servicio.</h1>" + "<br>" + "<h3>Presiona el siguiente link para confirmar correo</h3>" + "<br>" +
            "<br><h1>su contrasena es: " + contra + "</h1>" +
            "<a href=\"http://192.168.1.15:4200/user/confirmacion/" + id + "\"><buttonhref=\"http://192.168.1.15:4200/user/confirmacion/" + id + "\"  style=\"background-color:blue; border-color:black; color:white\" width=\"100\"; height=\"50\">Confirmar Correo</button></a>" +
            "<br>" +
            "<br><a  target=\"_blank\"><img src=\"https://www.clipartmax.com/png/middle/135-1353963_click-here-button-free-click-here-button-png.png\"/></a>",

    };
    clase.sendMail(mailOptions);
    res.status(200).json("todo ok")

});


module.exports = approut;