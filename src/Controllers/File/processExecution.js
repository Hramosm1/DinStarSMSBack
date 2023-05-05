const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//OBTENER EL LISTADO DE PROCESOS
async function get_process_list_db(req,res){
  try {
      const request =
        await prisma.$queryRawUnsafe(`execute usp_get_file_listProcess`);
      if (request != []) {
        return res.status(200).send({request})
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
//EJECUCIÓN DE PROCESOS
async function update_process_list_db(req,res){
  let Id_Proceso_Datos = req.params.Id_Proceso_Datos
  let Opcion  = req.params.Opcion
  try {
      const request =
        await prisma.$queryRawUnsafe(`execute usp_update_file_Process_Data '${Id_Proceso_Datos}','${Opcion}'`);
      if (request != []) {
        return res.status(200).send({request})
      } else {
        return res.status(404).send({message: "No se ha podido obtener alguna respuesta de la base de datos"})
      }
    } catch (error) {
      return res.status(500).send({message: "Se tiene un error con el servidor",error})
    }
}
//OBTENER LOS MENSAJES ENVIADOS POR PROCESOS
async function get_message_sending_by_process(req,res){
  let params = req.params.Id_Proceso_Datos
  try {
    const request = 
      await prisma.$queryRawUnsafe(`execute usp_get_file_listSMS '${params}'`);

    if (request != []) {
      return res.status(200).send({ request });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}

module.exports = {
  get_process_list_db,
  update_process_list_db,
  get_message_sending_by_process
}