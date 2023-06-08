const express = require("express")
const router = express.Router()

router.get("", (req, res) => {
    /* logic */
    res.send("data")
})
router.post("", (req, res) => {  
    /* logic */
    res.send("data")
})

module.exports = router;