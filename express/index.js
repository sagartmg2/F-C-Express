const express = require('express')
const app = express()
app.use(express.json())  // global middlware -> runs for every route

/*
 MIDDLEWARE  
    - a funciton which has access to request and response AND also next function

        next function points out to the upcomming valid middleware 

    - global middelware
    - route level middleware
*/



function checkAuthentication(req, res, next) {
    let logged_in = false

    if (logged_in) {
        next()
    } else {
        res.status(401).send({ msg: "not logged in" })
    }
}

// app.use(checkAuthentication)


/* STATUS CODES
    2
    3
    4
        400 -
        401 - NOT logge din 
        403
        404
    5
    
    */
/* CRUD : create read update detelte */
/* REQUEST methods:  GET POST PUT/PATCH DELETE  */


app.get("/api/dashboard", checkAuthentication, (req, res) => {
    console.log("inside dahsbord..");
    res.send({
        user: 100,
        sales: 123123
    })
})

app.get("/", (req, res) => {
    res.send("Home page data")
})

app.get("/api/todos", (req, res) => {
    res.send([
        { title: "html", status: false },
        { title: "css", status: false },
        { title: "js", status: true }
    ])
})

app.post("/api/todos", (req, res) => {
    // console.log("save new todos");
    /* link to DB */
    console.log(req.body);
    res.send({ _id: "#$@#$", title: "ttile" })
})

app.listen(8000, () => {
    console.log("server started");
})
