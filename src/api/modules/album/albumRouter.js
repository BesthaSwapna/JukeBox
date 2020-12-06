const { Router } = require('express');


const controller = require('./albumController');
const Validation = require('./albumValidation')

const router = Router();

router.post('/', Validation.create, controller.create);
router.get('/', controller.lowePriceAlbums);
router.get('/all_albums', controller.allAlbums);
router.get('/musicians_list/:album_id', controller.musiciansListForAlbum)


module.exports = router;
