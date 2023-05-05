'user strict'
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const controller = require('../Controllers/File/processExecution');
const saveFile = require('../Controllers/File/read')
const multer = require("multer");
const upload = express();
const sleep = require('util').promisify(setTimeout);
const xlsx = require('xlsx');

//#region Formato de fecha
let date = new Date();
const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const formatDate = (date)=>{
    let formatted_date = date.getDate() + "_" + months[date.getMonth()] + "_" + date.getFullYear()
    return formatted_date;
}
//#endregion

//LECTURA DEL ARCHIVO EN FORMATO .XLSX
async function ReadFile(
    params_nombre_archivo,
    params_path,
    params_id_unidad_negocio,
    params_id_categoria,
    params_id_tipo_estado,
    params_fecha_inicio,
    params_fecha_finalizacion
    ) {
    // let params = req.body
    const wb = xlsx.readFile(params_path);
    const ws = wb.Sheets["Hoja1"];
    const data = xlsx.utils.sheet_to_json(ws);
    let cantElements = data.length;
    let final;
    try {
      const request =
        await prisma.$queryRawUnsafe(`execute usp_save_file_information '${params_nombre_archivo}','${params_path}'
          ,'${cantElements}','${parseInt(params_id_unidad_negocio)}','${parseInt(params_id_categoria)}','${parseInt(params_id_tipo_estado)}'
          ,'${params_fecha_inicio}','${params_fecha_finalizacion}'`);
      if (request != []) {
        let cant = 0
        for (let index = 0; index < data.length; index++) {
          await sleep(100);
          cant+=1
          if ((cantElements) == cant) {
            final='final de envio'
          }
          if (data[index].TELEFONO.toString().search('502') == 0) {
              send_Message_db(data[index].TELEFONO.toString().slice(3),data[index].MENSAJE,request[0].Id_Proceso_Datos,final)
          }else{
              send_Message_db(data[index].TELEFONO.toString(),data[index].MENSAJE,request[0].Id_Proceso_Datos,final)
          }
      
        }
        // return res.status(200).send({ request });
      } else {
        console.log(
          "No se ha podido obtener alguna respuesta de la base de datos"
        );
        // return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos",});
      }
    } catch (error) {
      console.log(
        "No se ha podido capturar la informacion requerida por el servidor " +
          error
      );
    }
}
//METODO PARA GUARDAR LA INFORMACION EN LA BASE DE DATOS
async function send_Message_db(
    params_telefono
    ,params_texto
    ,params_id_proceso_datos
    ,final
){
    try {
        const request = await prisma.$queryRawUnsafe(`execute usp_save_sms_dinstar '${params_telefono}','${params_texto}'
            ,'${params_id_proceso_datos}'`);
        if (request != []) {
          if (final == 'final de envio') {
            console.log(request[0].Mensaje);
            // return res.status(200).send({message:request[0].Mensaje});
          }

        } else {
          console.log(
            "No se ha podido obtener alguna respuesta de la base de datos"
          );
          // return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos",});
        }
      } catch (error) {
        console.log(
          "No se ha podido capturar la informacion requerida por el servidor " +
            error
        );
      }
}
//GUARGAR ARCHIVO EN SU FICHERO
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/FileUpload/')
  },
  filename: function (req, file, cb) {
    let name = file.originalname.replace(/ /g, "_"); 
    cb(null, `${formatDate(date)}_${name}`)
    
  },
 
});
// Creamos el middleware para cargar los archivos con multer
const uploadFile = multer({storage: storage});

// Ruta para subir archivos
upload.post('/upload',uploadFile.single('myFile'),(req,res) =>{
  if(req.file){
    let bodys = req.body
    let path = './src/FileUpload/'+req.file.filename
    const file = req.file.filename;
    ReadFile( 
        bodys.params_nombre_archivo,
        path,
        bodys.params_id_unidad_negocio,
        bodys.params_id_categoria,
        bodys.params_id_tipo_estado,
        bodys.params_fecha_inicio,
        bodys.params_fecha_finalizacion
        )
    res.status(200).send({ data: "OK", url: `http://192.168.8.66:9231/${file}` });
  } else {
    res.status(400).send({ data: "Fail"});
  }
})
// Manejador de errores de multer
upload.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error, por ejemplo archivo demasiado grande
    res.status(400).send('Error: ' + err.message);
  } else {
    // Error desconocido
    res.status(500).send('Error desconocido: ' + err.message);
  }
});

//RUTEO
upload.get('/process_list',controller.get_process_list_db)
upload.get('/update_process_list/:Id_Proceso_Datos/:Opcion',controller.update_process_list_db)
upload.get('/get_message_sending_by_process/:Id_Proceso_Datos',controller.get_message_sending_by_process)
upload.get('/get_message_dinstar_queue',saveFile.get_message_dinstar_queue)

module.exports = upload;    