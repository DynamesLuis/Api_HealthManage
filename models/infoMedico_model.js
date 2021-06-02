const mysql = require('./db');

const info = function(infomedico){
    this.nombre = infomedico.nombre;
    this.apellidoPaterno = infomedico.apellidoPaterno;
    this.apellidoMaterno = infomedico.apellidoMaterno;
    this.nivelEstudio = infomedico.nivelEstudio;
    this.Especialidad = infomedico.Especialidad;
    this.cedulaProfesional = infomedico.cedulaProfesional;
    this.universidad = infomedico.universidad;
    this.ocupacion = infomedico.ocupacion;
    this.numTelefono = infomedico.numTelefono;
    this.correoElec = infomedico.correoElec;
    this.paginaweb = infomedico.paginaweb;
    this.usuarioMedico_idusuarioMedico=infomedico.usuarioMedico_idusuarioMedico;
}

info.create=(nuevainfo, result)=>{
    mysql.query("INSERT INTO infomedico SET ?", nuevainfo, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("Crear nuevo info: ", {idinfoMedico: res.idinfoMedico, ...nuevainfo});
        result(null, {idinfoMedico: res.idinfoMedico, ...nuevainfo});
    });
};

info.getAll = result=>{
    mysql.query("SELECT * FROM infomedico", (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(null, err);
            return;
        }
        console.log("Info: ", res);
        result(null, res);
    });
};

info.remove = (idinfoMedico, result) =>{
    mysql.query("DELETE FROM infomedico where idinfoMedico = ?", idinfoMedico, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result (null, err);
            return;
        }

        if(res.affectedRows==0){
            result({kind: "not_found"}, null);
            return;
        }
        console.log("Se ha eliminado correctamente: ", idinfoMedico);
        result(null, res);
    });
};

info.findById=(idinfoMedico, result)=>{
    mysql.query(`SELECT * FROM infomedico WHERE idinfoMedico = ${idinfoMedico} `, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if(res.length){
            console.log("No hay info médico: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "No se ha encontrado"}, null);
    });
};

info.updateById=(idinfoMedico,infomedico,result)=>{
    mysql.query(
        "UPDATE infomedico SET nombre= ?, apellidoPaterno=?, apellidoMaterno=?, nivelEstudio=?, Especialidad=? , cedulaProfesional=?, universidad=?, ocupacion=?, numTelefono=?, correoElec=?, paginaweb=?, usuarioMedico_idusuarioMedico=? WHERE idinfoMedico=?",
        [infomedico.nombre, infomedico.apellidoPaterno, infomedico.apellidoMaterno, infomedico.nivelEstudio, infomedico.Especialidad ,infomedico.cedulaProfesional, infomedico.universidad, infomedico.ocupacion, infomedico.numTelefono, infomedico.correoElec, infomedico.paginaweb , infomedico.usuarioMedico_idusuarioMedico ,idinfoMedico],
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

            console.log("update info médico: ", {idinfoMedico: idinfoMedico, ...infomedico});
            result(null, {idinfoMedico: idinfoMedico, ...infomedico});
        }
    );
};


module.exports = info;