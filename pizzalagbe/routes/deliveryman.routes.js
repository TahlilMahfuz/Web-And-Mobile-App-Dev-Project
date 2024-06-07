const express = require('express');
const router = express.Router();
const { checkDeliverymanAuthenticated, checkDeliverymanNotAuthenticated } = require('../middlewares/auth');

const {
    getChangePassword,
    getDeliverymanLogin,
    getEndDelivery,
    postChangePassword,
    postDelivered,
    postDeliverymanLogin,
    getdeliverymandashboard
} = require('../controllers/deliveryman.controllers');


router.get('/deliveryman/changepassword', getChangePassword);
router.get('/deliveryman/deliverymanlogin',checkDeliverymanNotAuthenticated,getDeliverymanLogin);
router.get('/deliveryman/enddelivery',checkDeliverymanAuthenticated,getdeliverymandashboard);

router.post('/deliveryman/changepassword', postChangePassword);
router.post('/deliveryman/delivered', postDelivered);
router.post('/deliveryman/deliverymanlogin', postDeliverymanLogin);

module.exports = router;
