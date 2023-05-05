'user strict'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//CREAR DE CATEGORIAS
async function delete_combo_category(req, res) {
    let params = req.params.id
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_delete_combo_category '${params}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha eliminado exitosamente la categoria' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//CREAR UNIDAD DE NEGOCIO
async function delete_combo_business_unit(req, res) {
  let params = req.params.id
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_delete_combo_business_unit '${params}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha eliminado exitosamente la unidad de negocio' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//CREAR TIPO DE ESTADO
async function delete_combo_state_type(req, res) {
  let params = req.params.id
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_delete_combo_state_type '${params}'`);
    
    if (requests != []) {
        return res.status(200).send({ message:'Se ha eliminado exitosamente el tipo de estado' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}

module.exports = ({
    delete_combo_category,
    delete_combo_business_unit,
    delete_combo_state_type
})