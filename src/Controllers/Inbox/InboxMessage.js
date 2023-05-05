'use strict'
let request = require('request').defaults({ rejectUnauthorized: false });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const schedule = require('node-schedule')

//OBTENER LOS PUERTOS DE LAS DINSTAR
async function get_query_incoming_sms(res, req) {
  try {
    const apiUrl = '/api/query_incoming_sms?flag=unread&port='
    const puertosDinstar = await prisma.$queryRawUnsafe(`execute usp_get_puertos_dinstar`);
    //console.log(puertosDinstar);
    for(let i = 0; i < puertosDinstar.length; i++){
      const url = `${puertosDinstar[i].url.toString()}/api/query_incoming_sms?flag=unreat&port=[${puertosDinstar[i].Puerto.toString()}]`;
      get_incoming_sms(url);
    }     
  } catch (error) {
        console.log(error)
  }
}

// OBTENER LOS SMS ENTRANTES
function get_incoming_sms(url) {
  request.get({
     headers: { "Content-Type": "application/json" },
     auth: {
         user: process.env.dinstar_config_usuario,
         pass: process.env.dinstar_config_password,
         sendImmediately: false,
     },
     url: url,
 },
     (err, response, bodys) => {
         const respuesta = JSON.parse(bodys);
         if(respuesta.sms[0]){
          save_sms_inbox(respuesta.sms[0].incoming_sms_id,respuesta.sms[0].port,respuesta.sms[0].number,respuesta.sms[0].smsc,respuesta.sms[0].timestamp, respuesta.sms[0].text, respuesta.sms[0].imsi);
         }
         
     });
}

// ALMACENAR LOS SMS EN LA BD
async function save_sms_inbox(sms_id, port, number, smsc, timestamp, text, imsi) {
  try {
    const requests = await prisma.$queryRawUnsafe(`EXEC usp_save_sms_dinstar_inbox ${sms_id}, ${port}, '${number}', '${smsc}', '${timestamp}', '${text}', '${imsi}'`);
    if (requests != []) {
      console.log('Los registros se insertaron exitosamente');
    } else {
      return console.log('No se ha podido obtener alguna respuesta de la base de datos');
    }
  } catch (error) {
    return error
  }
}

schedule.scheduleJob('*/2 07-19 * * *',function (){get_query_incoming_sms()})

module.exports = ({
    get_query_incoming_sms
})

