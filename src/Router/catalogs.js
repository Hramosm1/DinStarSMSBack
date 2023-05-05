'user strict'
const express = require('express');
const controllerCatalogs = require('../Controllers/Catalogs/catalogsFile')
const controllerSaveCatalogs = require('../Controllers/Catalogs/SaveCatalogs')
const controllerGetCatalogs = require('../Controllers/Catalogs/GetCatalogs')
const controllerUpdateCatalogs = require('../Controllers/Catalogs/UpdateCatalogs')
const controllerDeleteCatalogs = require('../Controllers/Catalogs/DeleteCatalogs')

// import MakeARequest from '../SendMessage/postMessaje';
const catalogs = express();

catalogs.get('/get_file_category',controllerCatalogs.get_file_category);
catalogs.get('/get_file_TipoEstado',controllerCatalogs.get_file_TipoEstado);
catalogs.get('/get_file_unidadNegocio',controllerCatalogs.get_file_unidadNegocio);
//Save catalogs
catalogs.post('/save_combo_category',controllerSaveCatalogs.save_combo_category);
catalogs.post('/save_combo_business_unit',controllerSaveCatalogs.save_combo_business_unit);
catalogs.post('/save_combo_state_type',controllerSaveCatalogs.save_combo_state_type);
//Get catalogs
catalogs.get('/get_combo_category',controllerGetCatalogs.get_combo_category);
catalogs.get('/get_combo_business_unit',controllerGetCatalogs.get_combo_business_unit);
catalogs.get('/get_combo_state_type',controllerGetCatalogs.get_combo_state_type);
//Update catalogs
catalogs.post('/update_combo_business_unit/:id',controllerUpdateCatalogs.update_combo_business_unit);
catalogs.get('/update_combo_business_unit_active_desactive',controllerUpdateCatalogs.update_combo_business_unit_active_desactive);
catalogs.post('/update_combo_category/:id',controllerUpdateCatalogs.update_combo_category);
catalogs.get('/update_combo_category_active_desactive',controllerUpdateCatalogs.update_combo_category_active_desactive);
catalogs.post('/update_combo_state_type/:id',controllerUpdateCatalogs.update_combo_state_type);
catalogs.get('/update_combo_state_type_active_desactive',controllerUpdateCatalogs.update_combo_state_type_active_desactive);
//Delete catalogs
catalogs.get('/delete_combo_business_unit/:id',controllerDeleteCatalogs.delete_combo_business_unit);
catalogs.get('/delete_combo_category/:id',controllerDeleteCatalogs.delete_combo_category);
catalogs.get('/delete_combo_state_type/:id',controllerDeleteCatalogs.delete_combo_state_type);
module.exports = catalogs;