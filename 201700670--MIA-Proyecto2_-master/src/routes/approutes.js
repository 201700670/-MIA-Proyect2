
const { Router } = require('express')
const approut = Router();
const BD = require('../confdb/configbd');
const clase = require('../correo/mail');
const multipart = require('connect-multiparty');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
let codUser = 1;
approut.get('/', async (req, res) => {
    sql = "select * from usuario"
    let result = await BD.Open(sql, [], false);
    console.log(result.rows);
    Users = []
    result.rows.map(user => {
        let userSchema = {
            "idUsuario": user[0],
            "nombre": user[1],
            "apellido": user[2],
            "correo_electronico": user[3],
            "contrasena": user[0],
            "fecha_nacimiento": user[4],
            "pais": user[5],
            "foto": user[6],
            "creditos": user[7],
        }

        Users.push(userSchema);
    });
    res.status(200).json(Users);

});

approut.get('/u', async (req, res) => {
    sql = "insert into usuario(idUsuario, nombre, apellido,\
        correo_electronico, contrasena, fecha_nacimiento, pais, foto, creditos)\
        values(1,'Andrea', 'Palomo', 'vgdep@gmail.com', DBMS_OBFUSCATION_TOOLKIT.MD5(INPUT =>\
        UTL_RAW.CAST_TO_RAW ('27972797')), TO_DATE('1997/09/27 21:02:44', 'yyyy/mm/dd hh24:mi:ss'),\
        'Guatemala', '/home/andrea/Escritorio/[MIA]Proyecto2_201700670/proyect2/src/asset/Admin.jpeg',0.00)"

    let result = await BD.Open(sql, [], true);
    console.log(result.rows);

    res.end();

});

approut.post('/addUser', async (req, res) => {
    console.log(req.body)
    const { nombre, apellido, correo_electronico, contrasena, fecha_nacimiento, pais, foto, tipousuario } = req.body;

    sql = "insert into usuario( nombre, apellido,\
        correo_electronico, contrasena, fecha_nacimiento, pais, foto, creditos, tipousuario, estado)\
        values (:nombre,:apellido,:correo_electronico,\
            DBMS_OBFUSCATION_TOOLKIT.MD5(INPUT =>UTL_RAW.CAST_TO_RAW (:contrasena)),\
            TO_DATE(:fecha_nacimiento, 'yyyy/mm/dd'),:pais,:foto,10000.00, :tipousuario, 0)";

    let result = await BD.Open(sql, [nombre, apellido, correo_electronico, contrasena, fecha_nacimiento, pais, foto, tipousuario], true);
    console.log(result.rows)
    res.status(200).json({
        "nombre": nombre,
        "apellido": apellido,
        "correo_electronico": correo_electronico,
        "contrasena": contrasena,
        "fecha_nacimiento": fecha_nacimiento,
        "pais": pais,
        "foto": foto,
        "creditos": 10000.00,
        "tipousuario": tipousuario
    });
    codUser++;
});

approut.post('/correo/Id', async (req, res) => {
    const { correo_electronico } = req.body;
    sql = "select idusuario from usuario where correo_electronico=:correo_electronico";

    const result = await BD.Open(sql, [correo_electronico], false);
    try {
        res.status(200).json
            ({
                id: result.rows[0][0]
            })
    } catch (error) {
        res.status(200).json
            ({
                id: 0
            })
    }
});

approut.post('/getId', async (req, res) => {
    const { correo_electronico } = req.body;
    sql = "select idusuario from usuario where correo_electronico=:correo_electronico";

    const result = await BD.Open(sql, [correo_electronico], false);

    res.status(200).json
        ({
            id: result.rows[0][0]
        })

});

const multipartMiddleware = multipart({
    uploadDir: './archivos'
})
approut.post('/foto', multipartMiddleware, (req, res, next) => {

    res.json({
        'message': req.files.uploads[0].path
    });
});
approut.post('/upload', (req, res) => {
    const file = req.body.file;
    const name = req.body.name;

    const binaryData = new Buffer(file.replace(/^data:image\/png;base64,/, ""), 'base64').toString('binary');

    fs.writeFile(name, binaryData, "binary", (err) => {
        console.log(err);
    })

});

approut.post('/confirmar/Correo', async (req, res) => {
    const { id } = req.body;
    sql = 'update usuario set estado=1 where idUsuario=:id';
    await BD.Open(sql, [id], true);
    res.status(200).json("todo ok");
});

approut.put('/cambiar/contra', async (req, res) => {
    const { idusuario, contrasena } = req.body;
    sql = "update usuario set contrasena= DBMS_OBFUSCATION_TOOLKIT.MD5(INPUT =>UTL_RAW.CAST_TO_RAW (:contrasena))  where idusuario=:idusuario";
    await BD.Open(sql, [contrasena, idusuario], true);

    res.json("todo ok").status(200);

});

approut.post('/login', async (req, res) => {
    const { correo_electronico, contrasena } = req.body;
    sql = 'select idUsuario,nombre, apellido, correo_electronico, contrasena, \
    fecha_nacimiento, pais, foto, creditos,tipousuario\
    from usuario where correo_electronico=:correo_electronico\
     and contrasena=:contrasena';
    let result = await BD.Open(sql, [correo_electronico, contrasena], false);
    //console.log(result.rows);
    if (result.rows.length > 0) {
        res.status(200).json(
            {
                msg: "true",
                DataUser: {
                    id: result.rows[0][0],
                    nombre: result.rows[0][1],
                    apellido: result.rows[0][2],
                    correo_electronico: result.rows[0][3],
                    contrasena: result.rows[0][4],
                    fecha_nacimiento: result.rows[0][5],
                    pais: result.rows[0][6],
                    foto: result.rows[0][7],
                    creditos: result.rows[0][8],
                    tipousuario: result.rows[0][9],
                    estado: result.rows[0][10]
                }
            });
    }
    else {
        res.status(201).json({});
    }
});
module.exports = approut;