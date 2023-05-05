'user strict'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//OBTENER LAS CATEGORIAS
async function get_combo_category(req, res) {
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_get_combo_category`);
    
    if (requests != []) {
      return res.status(200).send({requests});
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//OBTENER LAS UNIDADES DE NEGOCIO
async function get_combo_business_unit(req, res) {
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_get_combo_business_unit`);
    
    if (requests != []) {
      return res.status(200).send({ requests});
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//OBTENER LOS TIPOS DE ESTADOS
async function get_combo_state_type(req, res) {
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_get_combo_state_type`);
    
    if (requests != []) {
        return res.status(200).send({requests});
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}

module.exports = ({
    get_combo_category,
    get_combo_business_unit,
    get_combo_state_type
})