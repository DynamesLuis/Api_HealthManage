module.exports = app =>{
    const Usuario = require ('../controllers/usuarioMedico_controller');

    app.post("/create", Usuario.create);
    app.get("/buscar", Usuario.findAll);
    app.delete("/eliminar/:idusuarioMedico", Usuario.delete);
    app.get("/BuscarOne/:idusuarioMedico", Usuario.findOne);
    app.put("/Actualizar/:idusuarioMedico", Usuario.Actualizar);

}