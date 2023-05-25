const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        a: 'this',

    }
    res.json(obj)
})

module.exports = router