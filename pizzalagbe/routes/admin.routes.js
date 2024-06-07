const express = require('express');
const router = express.Router();
const {checkAdminAuthenticated, checkAdminNotAuthenticated} = require('../middlewares/auth');
const{
    getadminLogin,
    getadminSignup,
    getadminDashboard,
    getaddOrderType,
    getaddPizza,
    getaddTopping,
    getaddBranch,
    getReviews,
    getshowOrders,
    markDelivered,
    markReady,
    deleteOrder,
    addBranch,
    addOrderType,
    addDeliveryMan,
    addPizza,
    addTopping,
    adminSignup,
    adminRegister,
    adminLogin,
    deleteBranch,
    putbranch,
    updatebranch,
    updatePizzaPrice,
    updatePizzaDetails,
    updatePizzaName,
    updatetoppingName,
    updateToppingDetails,
    updateToppingPrice,
    deletePizza,
    deleteTopping,
    deleteOrderType,
    deleteOrderByid
} = require('../controllers/admin.controllers');



router.get('/admin/adminlogin',checkAdminNotAuthenticated, getadminLogin);
router.get('/admin/adminsignup', getadminSignup);
router.get('/admin/admindashboard',checkAdminAuthenticated, getadminDashboard);
router.get('/admin/addordertype',checkAdminAuthenticated, getaddOrderType);
router.get('/admin/addpizza',checkAdminAuthenticated, getaddPizza);
router.get('/admin/addtopping',checkAdminAuthenticated, getaddTopping);
router.get('/admin/addbranch',checkAdminAuthenticated, getaddBranch);
router.get('/admin/getreviews',checkAdminAuthenticated, getReviews);
router.get('/admin/showorders',checkAdminAuthenticated, getshowOrders);


router.post('/admin/delivered',checkAdminAuthenticated, markDelivered);
router.post('/admin/ready',checkAdminAuthenticated, markReady);
router.post('/admin/delete',checkAdminAuthenticated, deleteOrder);
router.post('/admin/addbranch',checkAdminAuthenticated, addBranch);
router.post('/admin/addordertype',checkAdminAuthenticated, addOrderType);
router.post('/admin/adddeliveryman',checkAdminAuthenticated, addDeliveryMan);
router.post('/admin/addpizza',checkAdminAuthenticated, addPizza);
router.post('/admin/addtopping',checkAdminAuthenticated, addTopping);
router.post('/admin/adminsignup', adminSignup);
router.post('/admin/adminregister', adminRegister);
router.post('/admin/adminlogin', adminLogin);

router.put('/admin/putbranch/:branchname',checkAdminAuthenticated, putbranch);
router.put('/admin/updatebranch/:branchid/:branchname',checkAdminAuthenticated, updatebranch);
router.put('/admin/updatepizzaprice/:pizzaid/:price',checkAdminAuthenticated, updatePizzaPrice);
router.put('/admin/updatepizzadetails/:pizzaid/:details',checkAdminAuthenticated, updatePizzaDetails);
router.put('/admin/updatepizzaname/:pizzaid/:pizzaname',checkAdminAuthenticated, updatePizzaName);
router.put('/admin/updatetoppingname/:toppingid/:toppingname',checkAdminAuthenticated, updatetoppingName);
router.put('/admin/updatetoppingdetails/:toppingid/:details',checkAdminAuthenticated, updateToppingDetails);
router.put('/admin/updatetoppingprice/:toppingid/:price',checkAdminAuthenticated, updateToppingPrice);


router.delete('/admin/deletebranch/:branchid',checkAdminAuthenticated, deleteBranch);
router.delete('/admin/deletepizza/:pizzaid',checkAdminAuthenticated, deletePizza);
router.delete('/admin/deletetopping/:toppingid',checkAdminAuthenticated, deleteTopping);
router.delete('/admin/deleteordertype/:typeid',checkAdminAuthenticated, deleteOrderType);
router.delete('/admin/deleteorderbyid/:orderid',checkAdminAuthenticated, deleteOrderByid);


module.exports = router;