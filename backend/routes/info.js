const express = require('express')
const router = express.Router();


const {
    getInfos,
    newInfo,
    updateInfo,
    deleteInfo,

} = require('../controllers/infoController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/Infos').get(isAuthenticatedUser, getInfos);

router.route('/admin/Info/new').post(isAuthenticatedUser, authorizeRoles('admin'), newInfo);

router.route('/admin/Info/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateInfo)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteInfo);


module.exports = router;