const express =require("express")
const app=express()
const exphbs =require("express-handlebars")
const bodyParser=require("body-parser")
const mySql=require("mysql")
require("dotenv").config()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//static files
app.use(express.static("static/"))

//template engine
const handlebars =exphbs.create({extname:"hbs"})
app.engine("hbs",handlebars.engine)
app.set("view engine","hbs")


const routes=require("./servers/routes/studentURL")
app.use("",routes)
//app.use("/addUser",routes)


//listening port
app.listen(8081,()=>{
    console.log("listening port")
})
