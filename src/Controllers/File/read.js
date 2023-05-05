// const xlsx = require('xlsx');
// const fs = require('fs')
const sleep = require('util').promisify(setTimeout);
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
let request = require( 'request' ).defaults({rejectUnauthorized:false});
const schedule = require('node-schedule')

var element = {
  'param' :[

  ]
};
//OBTENER EL TOTAL DE LA COLA POR DINSTAR
async function get_message_dinstar_queue() {
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_get_sms_dinstar_queue`);
    if (requests != []) {
      let url_send_message = requests[0].URL.toString();
      // console.log(url_send_message);
      request.get(
        {
          headers: { "content-type": "application/json" },
          auth: {
            user: process.env.dinstar_config_usuario,
            pass: process.env.dinstar_config_password,
            sendImmediately: false,
          },
          url: requests[1].URL.toString(),
        },  
        (err, response, bodys) => {
          const respuesta = JSON.parse(bodys);
          send_sms_dinstar(respuesta.in_queue, url_send_message);
        }
      );
    } else {
      console.log(
        "No se ha podido obtener alguna respuesta de la base de datos"
      );
    }
  } catch (error) {
    console.log(
      "No se ha podido capturar la informacion requerida por el servidor " +
        error
    );
  }
}
//SOLOCITAR LA CANTIDAD DE MENSAJES PERMITIDOS POR DINSTAR
async function send_sms_dinstar() { 
  try {
    const listDinstar = await prisma.$queryRawUnsafe(`execute usp_get_dinstar`);
    if(listDinstar != []){
      
       for(let i = 1; i <= listDinstar.length; i++){
         await sleep(300);
          const dinstar = await prisma.$queryRawUnsafe(`execute usp_get_dinstar_cola ${i}`);
          let total = 256;

         //console.log(i,dinstar[0].URL.toString(),dinstar[1].URL.toString());
      
        request.get(
          {
            headers: { "content-type": "application/json" },
            auth: {
              user: process.env.dinstar_config_usuario,
              pass: process.env.dinstar_config_password,
              sendImmediately: false,
            },
            url: dinstar[0].URL.toString(),
          },  
          async (err, response, bodys) => {
            const respuesta = JSON.parse(bodys);
            total = total - respuesta.in_queue
            //console.log(dinstar[0].URL.toString(),total);
            const requests = await prisma.$queryRawUnsafe(`execute usp_send_sms_dinstar '${total}','${i}'`);
            
            if(requests.length === 0)
            {
              //console.log('No hay mensajes pendientes de envio');
            } else 
            {
              for (let index = 0; index < requests.length; index++) 
              {
                await sleep(300);
                //console.log(dinstar[0].URL.toString(),requests[index].Texto,requests[index].Telefono,requests[index].Puerto,index);
                post_send_message_dinstar(dinstar[1].URL.toString(),requests[index].Texto,requests[index].Telefono,requests[index].Puerto )
                update_sms_state(requests[index].Id_Dinstar_Mensajes_sms)
              }
            }

          }
        );

       }
    }
  } catch (error) {
    console.log(
      "No se ha podido capturar la informacion requerida por el servidor " +
        error
    );
  }
}
//ENVIO DE MENSAJES POR MEDIO DE LAS DINSTAR
function post_send_message_dinstar(url,Texto,Telefono, port) {
  request.post(
    {
      headers: { "content-type": "application/json" },
      auth: {
        user: process.env.dinstar_config_usuario,
        pass: process.env.dinstar_config_password,
        sendImmediately: false,
      },
      url: url,
      body: JSON.stringify({
        text: Texto,
        port: [port], 
        param: [
          {
            number:Telefono,
            text_param:["bj"],
            user_id:2
          }
        ]
      }),
    },
    (err, response, bodys) => {
      const respuesta = JSON.parse(bodys);
      console.log(respuesta);
    }
  );
}
//ACTUALIZAR ESTADO DE CADA MENSAJE ENVIADO
async function update_sms_state(IdSms) {
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_update_sms_state '${IdSms}'`);
    
    if (requests != []) {
      console.log('Se actualizo correctamente');
    } else {
      return console.log('No se ha podido obtener alguna respuesta de la base de datos');
      //res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return error 
    console.log('Error de comunicación con el servidor');
    //res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//#endregion

schedule.scheduleJob('*/2 07-19 * * *',function (){send_sms_dinstar()})
//schedule.scheduleJob('*/2 07-19 * * *',function (){get_message_dinstar_queue()})

module.exports = ({
    post_send_message_dinstar,
    get_message_dinstar_queue,
    send_sms_dinstar
})