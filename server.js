const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false  }));

//mongoDb connection for testing
mongoose.connect("mongodb://localhost/partties_DB",{

    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("mongoose is connected");
});


//items Schema
const itemSchema = new mongoose.Schema({

    id:Number,
    name:String,
    img:String,
    price:Number,
    rating:Number
});


//mongoose model

const Cataloge = mongoose.model("Cataloge",itemSchema);
const Home = mongoose.model("home",itemSchema);
const Cart = mongoose.model("cart", itemSchema);

const Chocolate_cake = new Cataloge({

    id:1,
    name:"chocolate cake",
    price:500,
    rating:5
});
const Vanila_cake = new Cataloge({

    id:2,
    name:"vanila cake",
    price:800,
    rating:2
});



//To save the item

// Cataloge.insertMany([Chocolate_cake, Vanila_cake], function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("data saved sucessfully");
//     }

// });



const data = new Home({
    
       
        "id" : 10,
        "name" : "vanila cake",
        "img" : "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSw19DwApSXkCamV68i8gVgh0j0LtKxya5J6Lv4VRinI8lneWl1OYG-geIWSg&usqp=CAc",
        "price" : 800,
        "rating" : 2
       
    
})

// data.save((err) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("data saved");
//     }
// })












app.get("/api/cataloge", (req, res) => {

    Cataloge.find({ })
    .then((data) =>{
        console.log("Data showing from catloge database");
        res.json(data);
    })
    .catch((err) =>{
        console.log(err);
    })
})

app.get("/api/home", (req, res) => {

    Home.find({ })
    .then((data) =>{
        console.log("Data received");
        res.json(data);
    })
    .catch((err) =>{
        console.log(err);
    })
})

app.get("/api/cart", (req,res) => {

    Cart.find({ })
    .then((data) => {
        res.json(data);
        console.log("data displaying from cart");
    })
    .catch((err) => {
        console.log(err);
    })

//    res.json({
//        msg: "data received from Cart database"
//    })
})

app.get("/api/checkout", (req,res) =>{

    let totalPrice = 0;

    Cataloge.find({ })
    .then((data) => {

        data.forEach((data)=> {
           
            // console.log(data.price + 100);
            totalPrice = totalPrice + data.price;
           
          
        })
        res.json(totalPrice);
    })
    .catch((err)=> {
        console.log(err);
    })

    


})

app.post("/api/remove", (req, res) => {

    console.log(req.body);
    const data = req.body;
    const _id= data.id;

    Cataloge.deleteOne({id: _id})
    .then(() => {
        console.log("data is been removed");
    })
    .catch((err) => {
        console.log(err);
    })

    res.json({
        msg: "we received your request"
    })

});

app.post("/api/save", (req, res) => {

   console.log(req.body);
    const item = new Cataloge(req.body);

    item.save((err) => {
        if(err){
            console.log(err);
        }else{
            console.log("data sent to the catalouge");
        }
    })

})
app.post("/api/bulksavecart", (req, res) => {

    const data = req.body;

    console.log(data);

    
data.forEach(data => {

    const item = new Cart(data);

    
    item.save((err) => {
        if(err){
            console.log(err);
        }else{
            console.log("data sent to the cart database");
        }
    })
    
});


})







app.listen(PORT, function(){
    console.log(`server is running on port ${PORT}`);
});