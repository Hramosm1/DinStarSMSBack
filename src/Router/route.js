'user strict'
const express = require('express');
// const postMessaje = require('../Controllers/Dinstar/PostMassage/postMessaje')
const read = require('../Controllers/File/read');

// import MakeARequest from '../SendMessage/postMessaje';
const router = express();

// router.get('/postMessajeSMS',postMessaje.post_Messaje_sms_dinstar1);
// router.get('/saveJsonDB',postMessaje.save_db_dinstar_mensaje_sms);
// router.get('/get_dinstar_mensaje_sm',postMessaje.get_url_number_of_sms_sent_dinstar1);
router.get('/get_message_dinstar_queue',read.send_sms_dinstar);

module.exports = router;