const usuario = require("../models/usuarioMedico_model");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "No se ha realizado la conexión",
        });
    }

    const Usuario = new usuario({
        nombreUsuario: req.body.nombreUsuario,
        contraseña: req.body.contraseña,
    });

    usuario.create(Usuario, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ha ocurrido un error al guardar los datos",
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    usuario.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "No se ha establecido la conexion",
            });
        else res.send(data);
    });
};

exports.delete=(req, res)=>{
    usuario.remove(req.params.idusuarioMedico, (err, data)=>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `No se ha encontrado ningún id ${req.params.idusuarioMedico}`
                });
            }else {
                res.status(500).send({
                    message: "Se ha eliminado con exito con el id solicitado" + req.params.idusuarioMedico
                });
            }
        }else 
        res.send({message: 'El usuario médico se ha elminado con exito'})
    });
};

exports.findOne=(req,res)=>{
    usuario.findById(req.params.idusuarioMedico, (err, data)=>{
        if(err){
            if(err.kind === "Usuario médico no encontrado"){
                res.status(404).send({
                    message: `No se ha encontrado ningún id ${req.params.idusuarioMedico}`
                });
            } else{
                res.status(500).send({
                    message: "Error al buscar el usuario médico"
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
  
    usuario.updateById(
      req.params.idusuarioMedico,
      new usuario(req.body),
      (err,data)=> {
        if(err){
          if(err.kind=== "not_found"){
            res.status(404).send({
              message: `No se encontro el usuario médico con el id ${req.params.idusuarioMedico}.`
            });
          }else {
            res.status(500).send({
              message: "Error al actualizar el usuario médico con el id" + req.params.idusuarioMedico
            });
          }
        }else res.send(data);
      }
    );
  };

