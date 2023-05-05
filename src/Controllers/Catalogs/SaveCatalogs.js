'user strict'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//CREAR DE CATEGORIAS
async function save_combo_category(req, res) {
    let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_save_combo_category '${params.Descripcion}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha guardado exitosamente la categoria' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//CREAR UNIDAD DE NEGOCIO
async function save_combo_business_unit(req, res) {
  let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_save_combo_business_unit '${params.Nombre}','${params.NombreCorto}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha guardado exitosamente la unidad de negocio' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//CREAR TIPO DE ESTADO
async function save_combo_state_type(req, res) {
    let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_save_combo_state_type '${params.Descripcion}'`);
    
    if (requests != []) {
        return res.status(200).send({ message:'Se ha guardado exitosamente el tipo de estado' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}

module.exports = ({
    save_combo_category,
    save_combo_business_unit,
    save_combo_state_type
})