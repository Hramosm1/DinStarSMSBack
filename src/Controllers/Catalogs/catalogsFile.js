'user strict'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//LISTADO DE CATEGORIAS
async function get_file_category(req, res) {
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_get_file_categorias`);
    
    if (requests != []) {
      return res.status(200).send({ requests });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//LISTADO DE ESTADOS PARA PROCESOS
async function get_file_TipoEstado(req, res) {
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_get_file_TipoEstado`);
    
    if (requests != []) {
      return res.status(200).send({ requests });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//LISTADO DE LAS UNIDADES DE NEGOCIOS
async function get_file_unidadNegocio(req, res) {
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_get_file_unidadNegocio`);
    
    if (requests != []) {
      return res.status(200).send({ requests });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}

module.exports = ({
  get_file_category,
  get_file_TipoEstado,
  get_file_unidadNegocio
})