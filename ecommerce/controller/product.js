const Product = require("../model/Product")
const Joi = require("joi")
const path = require("path")

const get = async (req, res, next) => {

    try {
        let products = await Product.find({},{reviews:0})
        res.send(products)
    } catch (err) {
        next(err)
    }
}

const productCreateSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.required(),
})

const create = async (req, res, next) => {

    // console.log(__dirname)
    // console.log(path.join(path.resolve(), "uploads"))


    try {

        let { error } = productCreateSchema.validate(req.body,
            {
                abortEarly: false,
                allowUnknown: true,
            })

        console.log("errors", error?.details)

        if (error?.details) {
            res.status(400).send({
                errors: error?.details
            })
            return;
        }


        let images = [];
        console.log(req.body)
        console.log(req.files)


        /* req.files.images[]   req.files.images   */
        // return;

        // req.files["images[]"].forEach(img => {
        req.files.images?.forEach(img => {
            let img_name = Date.now() + '-' + Math.round(Math.random() * 1E9) + img.name;
            let img_res = img.mv(path.join(__dirname, '../uploads/' + img_name))
            // console.log(img_res)
            images.push(img_name)

        })

        let product = await Product.create({ ...req.body, created_by: req.user._id, images })
        res.send(product)
    } catch (err) {
        next(err)
    }
}

const fetchSingleProduct = async (req, res, next) => {

    try {
        let product = await Product.findById(req.params.id)
        console.log(product)
        if (product) {
            res.send(product)
        } else {
            res.status(404).send({
                msg: "Resource not found"
            })
        }
    }
    catch (err) {
        next(err)
    }

}


const updateProduct = async (req, res, next) => {

    try {
        let product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            price: req.body.price
        }, { new: true, runValidators: true })
        res.send(product)
    } catch (err) {
        next(err)
    }


}
const updateReview = async (req, res, next) => {

    /* 1. find if user has already rated.  */
    /* 2. if yes.. update old */
    /* 2. else create new  */




    try {

        let exists = await Product.findOne({ _id: req.params.id, "reviews.created_by": req.user._id })

        if (exists) {
            /* update old */
            let product = await Product.findOneAndUpdate({ _id: req.params.id, "reviews.created_by": req.user._id }, {
                "reviews.$.rating": req.body.rating,
                "reviews.$.comment": req.body.comment,
            }, { new: true, runValidators: true })


            /*  
            let product = product.find(prouct_id)
            let old_revies = product.reviews

            old_reviews.map(review =>{
                if(review.createdby == req.user._id){
                    return {
                        comment:req.body.comemnt,
                        rating:req.body.rating
                    }
                }
                return review
            })

            */


            res.send(product)

        } else {
            let product = await Product.findByIdAndUpdate(req.params.id, {
                $push: {
                    "reviews": {
                        rating: req.body.rating,
                        comment: req.body.comment,
                        created_by: req.user._id
                    }
                }
            }, { new: true, runValidators: true })
            res.send(product)

        }



    } catch (err) {
        next(err)
    }
}



module.exports = {
    get,
    fetchSingleProduct,
    create,
    updateReview,
    updateProduct
}