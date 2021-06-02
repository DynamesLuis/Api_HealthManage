const info = require("../models/infoMedico_model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se ha realizado la conexión",
        });
    }

    const Info = new info({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno, 
        apellidoMaterno: req.body.apellidoMaterno, 
        nivelEstudio: req.body.nivelEstudio, 
        Especialidad: req.body.Especialidad,
        cedulaProfesional: req.body.cedulaProfesional, 
        universidad: req.body.universidad,
        ocupacion: req.body.ocupacion, 
        numTelefono: req.body.numTelefono, 
        correoElec: req.body.correoElec, 
        paginaweb: req.body.paginaweb,
        usuarioMedico_idusuarioMedico:req.body.usuarioMedico_idusuarioMedico,
    });

    info.create(Info, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ha ocurrido un error al guardar los datos",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    info.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "No se ha establecido la conexion",
            });
        else res.send(data);
    });
};

exports.delete=(req, res)=>{
    info.remove(req.params.idinfoMedico, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se ha encontrado ningún id ${req.params.idinfoMedico}`
                });
            }else {
                res.status(500).send({
                    message: "Se ha eliminado con exito con el id solicitado" + req.params.idinfoMedico
                });
            }
        }else 
        res.send({message: 'El info médico se ha elminado con exito'})
    });
};

exports.findOne=(req,res)=>{
    info.findById(req.params.idinfoMedico, (err, data)=>{
        if(err){
            if(err.kind === "Info médico no encontrado"){
                res.status(404).send({
                    message: `No se ha encontrado ningún id ${req.params.idinfoMedico}`
                });
            } else{
                res.status(500).send({
                    message: "Error al buscar el info médico"
                });
            }
        }else res.send(data);
    });
};

exports.Actualizar=(req,res)=>{
    if(!req.body){
      res.statu(400).send({
        message: "Los campos deben ser llenados"
      });
    }
  
    info.updateById(
      req.params.idinfoMedico,
      new info(req.body),
      (err,data)=> {
        if(err){
          if(err.kind=== "not_found"){
            res.status(404).send({
              message: `No se encontro el info médico con el id ${req.params.idinfoMedico}.`
            });
          }else {
            res.status(500).send({
              message: "Error al actualizar el info médico con el id" + req.params.idinfoMedico
            });
          }
        }else res.send(data);
      }
    );
  };

