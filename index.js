const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.json({messagge: "Bienvenido al servidor de aplicación"});
});

require('./routes/usuarioMedico_route')(app.use(cors()));
require('./routes/infoMedico_route')(app);

app.listen(4000, ()=>{
    console.log("Servidor conectado en el puerto 4000");
});