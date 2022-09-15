const express = require('express')
const router = express.Router();


const {
    getOffers,
    newOffer,
    updateOffer,
    deleteOffer,

} = require('../controllers/offerController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/Offers').get(isAuthenticatedUser, getOffers);

router.route('/admin/Offer/new').post(isAuthenticatedUser, authorizeRoles('admin'), newOffer);

router.route('/admin/Offer/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOffer)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOffer);


module.exports = router;