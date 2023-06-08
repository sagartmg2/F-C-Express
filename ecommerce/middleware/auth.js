const { SELLER, BUYER } = require("../constants/role")
const jwt = require("jsonwebtoken")

function checkAuthentication(req, res, next) {

    /* 
        TODO: check logged status from req.
     */


    let token = req.headers?.authorization?.split(" ")[1]

    let user = null;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (err) {

    }

    if (user) {
        req.user = user;
        next()

    } else {
        res.status(401).send({
            msg: "unauthenticated"
        })
    }
}

const isBuyer = (req, res, next) => {
    if (req.user.role === BUYER) {
        next()
      } else {
          res.status(403).send({
              msg: "forbidden"
          })
      } 
}

const isSeller = (req, res, next) => {
    if (req.user.role === SELLER) {
      next()
    } else {
        res.status(403).send({
            msg: "forbidden"
        })
    }        
}

module.exports = {
    checkAuthentication,
    isBuyer,
    isSeller
}


