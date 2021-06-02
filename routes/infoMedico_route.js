module.exports = app =>{
    const Info = require ('../controllers/infoMedico_controller');

    app.post("/createInf", Info.create);
    app.get("/buscarInf", Info.findAll);
    app.delete("/eliminarInf/:idinfoMedico", Info.delete);
    app.get("/BuscarOneInf/:idinfoMedico", Info.findOne);
    app.put("/ActualizarInf/:idinfoMedico", Info.Actualizar);

}