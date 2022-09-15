const express = require('express')
const router = express.Router();


const {
getProductsImages,
getBokImages
} = require('../controllers/imageController')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/productImages/:file').get(getProductsImages);

router.route('/bokImages/:file').get(getBokImages);

module.exports = router;