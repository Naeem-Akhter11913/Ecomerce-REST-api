const expres = require('express');
const router = expres.Router();
const { registerUser, loginUser, logOUtUser, getUser, getLoginStatus, updateUser, updatePhoto } = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');



router.post('/register', registerUser);
router.post('/login' , loginUser)
router.get('/logout' , logOUtUser)
router.get('/getUser', protect , getUser)
router.get('/getLoginStatus', getLoginStatus)
router.put('/updateUser' , protect , updateUser)
router.put('/updatePhoto' , protect , updatePhoto)

module.exports = router