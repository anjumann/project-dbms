const router = require('express').Router();

const { getAll, getByUsn, updateUser } = require('../Controller/userController')

router.get('/all',getAll );
router.get('/usn/:usn',getByUsn );
router.put('/update/:usn', updateUser);


module.exports = router;