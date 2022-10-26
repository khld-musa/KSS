const express = require('express');
const router = express.Router();


const {
    newDelivery,
    getAdminDeliveries,
    updateDelivery,
    deleteDelivery,
    getSingleDelivery,
    myDeliveries

} = require('../controllers/deliveryController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/admin/deliveries').get(isAuthenticatedUser,  getAdminDeliveries);
router.route('/delivery/:id').get(isAuthenticatedUser, getSingleDelivery);

router.route('/deliveries/me').get(isAuthenticatedUser, myDeliveries);

router.route('/admin/delivery/new').post(isAuthenticatedUser, authorizeRoles('admin'), newDelivery);

router.route('/admin/delivery/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateDelivery)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteDelivery);



module.exports = router;