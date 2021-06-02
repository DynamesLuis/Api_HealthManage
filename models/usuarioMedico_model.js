const mysql = require('./db');

const usuario = function(usuariomedico){
    this.nombreUsuario = usuariomedico.nombreUsuario;
    this.contraseña = usuariomedico.contraseña;
}

usuario.create=(nuevousuario, result)=>{
    mysql.query("INSERT INTO usuariomedico SET ?", nuevousuario, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Crear nuevo usuario: ", {idusuarioMedico: res.idusuarioMedico, ...nuevousuario});
        result(null, {idusuarioMedico: res.idusuarioMedico, ...nuevousuario});
    });
};

usuario.getAll = result=>{
    mysql.query("SELECT * FROM usuariomedico", (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("usuario: ", res);
        result(null, res);
    });
};

usuario.remove = (idusuarioMedico, result) =>{
    mysql.query("DELETE FROM usuariomedico where idusuarioMedico = ?", idusuarioMedico, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result (null, err);
            return;
        }

        if(res.affectedRows==0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Se ha eliminado correctamente: ", idusuarioMedico);
        result(null, res);
    });
};

usuario.findById=(idusuarioMedico, result)=>{
    mysql.query(`SELECT * FROM usuariomedico WHERE idusuarioMedico = ${idusuarioMedico} `, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("No hay usuario médico: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "No se ha encontrado"}, null);
    });
};

usuario.updateById=(idusuarioMedico,usuariomedico,result)=>{
    mysql.query(
        "UPDATE usuariomedico SET nombreUsuario= ?, contraseña=? WHERE idusuarioMedico=?",
        [usuariomedico.nombreUsuario, usuariomedico.contraseña, idusuarioMedico],
        (err, res)=>{
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if(res.affectedRows == 0){
                result({kind: "not_found"},null);
                return;
            }

            console.log("update usuario médico: ", {idusuarioMedico: idusuarioMedico, ...usuariomedico});
            result(null, {idusuarioMedico: idusuarioMedico, ...usuariomedico});
        }
    );
};


module.exports = usuario;