
const handleResourceNotFoun = (req, res) => {
    res.status(404).send({
        msg: "Resource Not found"
    })
}

const handleServerError = (err, req, res, next) => {

    let statuscode = 500
    let message = "Server Error"
    let errors = []

    console.log(err.name)

    if (err.name == "ValidationError") {
        statuscode = 400;
        message = "Bad Request";
        errors = Object.entries(err.errors).map(error => {
            return {
                params: error[0],
                msg: error[1].message
            }
        })

    }else if(err.name == "CastError"){
        statuscode = 404;
        message  = "Resrouce Not found"
    }

    res.status(statuscode).send({
        msg: message + " " +  err.message,
        errors
    })

}


module.exports = {
    handleResourceNotFoun,
    handleServerError
}