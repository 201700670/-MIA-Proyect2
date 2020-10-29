const { Router } = require('express')
const approut = Router();
const BD = require('../confdb/configbd');

approut.post('/crear/carro', async (req, res) => {
    const { usuario } = req.body;
    console.log("EL VALOR ES ", usuario, "\n\n\n")
    sql = "INSERT INTO carrito(totalcompra,usuario) VALUES(0.00,:usuario)";
    await BD.Open(sql, [usuario], true);
    
    res.json("todo ok");
});

module.exports = approut;