'user strict'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

//ACTUALIZAR LA UNIDAD DE NEGOCIO
async function update_combo_business_unit(req, res) {
    let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_update_combo_business_unit '${req.params.id}','${params.Nombre}','${params.NombreCorto}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha actualizado exitosamente la unidad de negocio' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//ACTUALIZAR LA ACTIVACION O DESACTIVACION LA UNIDAD DE NEGOCIO
async function update_combo_business_unit_active_desactive(req, res) {
    let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_update_combo_business_unit_active_desactive '${params.Id_Unidad_Negocio}','${params.Opcion}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha actualizado exitosamente la categoria' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//ACTUALIZAR LA CATEGORIA
async function update_combo_category(req, res) {
  let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_update_combo_category '${req.params.id}','${params.Descripcion}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha actualizado exitosamente la categoria' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//ACTUALIZAR LA ACTIVACION O DESACTIVACION DE LA CATEGORIA
async function update_combo_category_active_desactive(req, res) {
    let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_update_combo_category_active_desactive '${params.IdCategoria}','${params.Opcion}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha actualizado exitosamente la categoria' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//ACTUALIZAR EL COMBO TIPO DE ESTADO
async function update_combo_state_type(req, res) {
    let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_update_combo_state_type'${req.params.id}','${params.Descripcion}'`);
    
    if (requests != []) {
        return res.status(200).send({ message:'Se ha actualizado exitosamente el tipo de estado' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
//ACTUALIZAR LA ACTIVACION O DESACTIVACION DEL TIPO DE ESTADO
async function update_combo_state_type_active_desactive(req, res) {
    let params = req.body
  try {
    const requests = await prisma.$queryRawUnsafe(`execute usp_update_combo_state_type_active_desactive '${params.Id_Tipo_Estado}','${params.Opcion}'`);
    
    if (requests != []) {
      return res.status(200).send({ message:'Se ha actualizado exitosamente la categoria' });
    } else {
      return res.status(404).send({message:"No se ha podido obtener alguna respuesta de la base de datos"});
    }
  } catch (error) {
    return res.status(500).send({message:"Error de comunicación con el servidor",error});
  }
}
module.exports = ({
    update_combo_business_unit,
    update_combo_business_unit_active_desactive,
    update_combo_category,
    update_combo_category_active_desactive,
    update_combo_state_type,
    update_combo_state_type_active_desactive,
})