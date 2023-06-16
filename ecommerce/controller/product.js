const Product = require("../model/Product")
const Joi = require("joi")
const path = require("path")

const get = async (req, res, next) => {

    try {
        let search_term = req.query.search_term || ""
        let price_from = parseFloat(req.query.price_from) || 0
        let price_to = parseFloat(req.query.price_to) || 999999999
        let page = parseInt(req.query.page) || 1
        let per_page = parseInt(req.query.per_page) || 2



        // let products = await Product.find({
        //     $or: [
        //         { name: RegExp(search_term, "i") },
        //         { categories: RegExp(search_term, "i") },
        //     ],
        //     $and: [
        //         { price: { $gte: price_from } },
        //         { price: { $lte: price_to } }
        //     ]
        // }, {reviews:0})

        /*  
        aggregation
        aggregation stages
        aggrgation pipeline
        aggrgation framework

        aggregation => advance find method
        */

        // let products = await Product.aggregate(
        //     [
        //         {
        //             $match: {
        //                 $or: [
        //                     { name: RegExp(search_term, "i") },
        //                     { categories: RegExp(search_term, "i") }
        //                 ]
        //             }
        //         },
        //         {
        //             $match: {
        //                 $and: [
        //                     { price: { $gte: price_from } },
        //                     { price: { $lte: price_to } }
        //                 ]
        //             }
        //         },
        //         {
        //             $addFields: { avg_rating: { $avg: "$reviews.rating" } }
        //         },
        //         {
        //             $lookup: {
        //                 from: "users",
        //                 localField: "created_by",
        //                 foreignField: "_id",
        //                 as: "created_by"
        //             }
        //         },
        //         {
        //             $unwind: "$created_by"
        //         },
        //         {
        //             $project: {
        //                 reviews: 0,
        //                 "created_by.password": 0,
        //                 "created_by.updatedAt": 0,
        //                 "created_by.role": 0,
        //             }
        //         },
        //         {
        //             $facet: {
        //                 meta_data: [
        //                     { $count: "total" },
        //                     {
        //                         $addFields: { page, per_page }
        //                     }

        //                 ],
        //                 data: [
        //                     {
        //                         $skip: ((page - 1) * per_page)
        //                     },
        //                     {
        //                         $limit: per_page
        //                     },
        //                 ]
        //             }
        //         },
        //         {
        //             $unwind: "$meta_data"
        //         }

        //     ]
        // )
        let total = await Product.aggregate(
            [
                {
                    $match: {
                        $or: [
                            { name: RegExp(search_term, "i") },
                            { categories: RegExp(search_term, "i") }
                        ]
                    }
                },
                {
                    $match: {
                        $and: [
                            { price: { $gte: price_from } },
                            { price: { $lte: price_to } }
                        ]
                    }
                },
                {
                    $addFields: { avg_rating: { $avg: "$reviews.rating" } }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "created_by",
                        foreignField: "_id",
                        as: "created_by"
                    }
                },
                {
                    $unwind: "$created_by"
                },
                {
                    $project: {
                        reviews: 0,
                        "created_by.password": 0,
                        "created_by.updatedAt": 0,
                        "created_by.role": 0,
                    }
                },
                {
                    $count: "total"
                }



            ]
        )
        let products = await Product.aggregate(
            [
                {
                    $match: {
                        $or: [
                            { name: RegExp(search_term, "i") },
                            { categories: RegExp(search_term, "i") }
                        ]
                    }
                },
                {
                    $match: {
                        $and: [
                            { price: { $gte: price_from } },
                            { price: { $lte: price_to } }
                        ]
                    }
                },
                {
                    $addFields: { avg_rating: { $avg: "$reviews.rating" } }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "created_by",
                        foreignField: "_id",
                        as: "created_by"
                    }
                },
                {
                    $unwind: "$created_by"
                },
                {
                    $project: {
                        reviews: 0,
                        "created_by.password": 0,
                        "created_by.updatedAt": 0,
                        "created_by.role": 0,
                    }
                },
                {
                    $skip: ((page - 1) * per_page)
                },
                {
                    $limit: per_page
                },
            ]
        )

        res.send({
            meta_data: {
                total: total[0].total,
                page,
                per_page
            },
            products: products
        })
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
        let product = await Product.findById(req.params.id).populate("created_by", "name email")
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