const express = require('express');
const router = express.Router();
const { checkIndexAuthenticated, checkNotAuthenticated, checkAuthenticated } = require('../middlewares/auth');
const { uploadProfileImage, uploadAudioFile } = require('../middlewares/media.middleware');
const {
    googlelogin,
    googlecallback,
    googleredirect,
    getDashboard,
    getUserDashboard,
    getUserLogin,
    getUserSignup,
    logout,
    getOrderPizza,
    getCart,
    makeReview,
    showReviewForm,
    placeOrder,
    validateUserSignup,
    registerUser,
    loginUser,
    googlefailure,
    updatePhoneNumber,
    updateFirstName,
    updateLastName,
    deleteComment,
    forgotPassword,
    validateForgotPassword,
    setnewpassword,
    uploadImage,
    uploadVoiceReview,
    deletephoto,
    deleteaudio,
    uploadMultipleImages,
    uploadMultipleAudios
} = require('../controllers/customer.controllers');

router.get("/", checkIndexAuthenticated, getDashboard);
router.get("/auth/google",googlelogin);
router.get("/auth/google/callback",googlecallback);
router.get("/user/googleredirect",checkAuthenticated,googleredirect);
router.get("/user/googlefailure",googlefailure);
router.get("/user/dashboard",checkAuthenticated, getUserDashboard); 
router.get("/user/userlogin", checkNotAuthenticated, getUserLogin);
router.get("/user/usersignup", getUserSignup);
router.get("/userlogout", logout);
router.get("/user/orderpizza",checkAuthenticated,  getOrderPizza);
router.get("/user/cart",checkAuthenticated,  getCart);
router.get("/user/forgotpassword", forgotPassword);


router.post("/user/makereview",checkAuthenticated, makeReview);
router.post("/user/review",checkAuthenticated, showReviewForm);
router.post("/user/orderpizza",checkAuthenticated, placeOrder);
router.post("/user/usersignup", validateUserSignup);
router.post("/user/register", registerUser);
router.post("/user/userlogin", loginUser);
router.post("/user/validateforgotpassword",validateForgotPassword);
router.post("/user/setnewpassword",setnewpassword);
router.post('/user/uploadProfileImage',checkAuthenticated, uploadProfileImage.single('image'), uploadImage);
router.post('/user/uploadMultipleProfileImages',checkAuthenticated, uploadProfileImage.array('images', 5), uploadMultipleImages);
router.post('/user/uploadVoiceReview/:orderid',checkAuthenticated, uploadAudioFile.single('audio'), uploadVoiceReview);
router.post('/user/uploadMultipleVoiceReview/:orderid',checkAuthenticated, uploadAudioFile.array('audios', 5), uploadMultipleAudios);

router.put("/user/updatephonenumber/:userphone",checkAuthenticated, updatePhoneNumber);
router.put("/user/updatefirstname/:firstname",checkAuthenticated, updateFirstName);
router.put("/user/updatelastname/:lastname",checkAuthenticated, updateLastName);


router.delete("/user/deletecomment/:orderid",checkAuthenticated, deleteComment);
router.delete("/user/deletephoto/:photoid",checkAuthenticated, deletephoto);
router.delete("/user/deleteaudio/:audioid",checkAuthenticated, deleteaudio);

module.exports = router;
