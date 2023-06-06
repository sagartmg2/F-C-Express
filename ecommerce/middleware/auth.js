const { SELLER } = require("../constants/role")

function checkAuthentication(req, res, next) {

    /* 
        TODO: check logged status from req.
     */
    let loggedIn = false
    if (loggedIn) {

        req.role = "seller"

        if (req.role === SELLER) {
            req.user_id = "6479c91458b921521f148f5d"
            next()
        } else {
            res.status(403).send({
                msg: "forbidden"
            })
        }

    } else {
        res.status(401).send({
            msg: "unauthenticated"
        })
    }
}

module.exports = {
    checkAuthentication
}


