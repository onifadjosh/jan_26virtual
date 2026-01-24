const express= require('express');
const app = express();
const ejs = require('ejs')
app.set("view engine", 'ejs')//to use ejs view engine
app.use(express.urlencoded({extended:true})) //body parser
const dotenv = require('dotenv');
dotenv.config();

let products = [
    {
        productName: "Wireless Bluetooth Headphones",
        productPrice: "89.99",
        productQuantity: "150",
        productDescription: "Noise-cancelling wireless headphones with 30-hour battery life"
    },
    {
        productName: "Stainless Steel Water Bottle",
        productPrice: "24.99",
        productQuantity: "300",
        productDescription: "Insulated 32oz bottle that keeps drinks cold for 24 hours"
    },
    {
        productName: "Mechanical Gaming Keyboard",
        productPrice: "129.99",
        productQuantity: "75",
        productDescription: "RGB backlit mechanical keyboard with customizable switches"
    },
    {
        productName: "Organic Cotton T-Shirt",
        productPrice: "29.99",
        productQuantity: "500",
        productDescription: "100% organic cotton unisex t-shirt in various colors"
    },
    {
        productName: "Smart Fitness Watch",
        productPrice: "199.99",
        productQuantity: "120",
        productDescription: "Waterproof smartwatch with heart rate and GPS tracking"
    },
    {
        productName: "Ceramic Coffee Mug Set",
        productPrice: "34.99",
        productQuantity: "200",
        productDescription: "Set of 4 handcrafted ceramic mugs with elegant designs"
    },
    {
        productName: "Portable Power Bank",
        productPrice: "49.99",
        productQuantity: "250",
        productDescription: "20000mAh fast-charging power bank with dual USB ports"
    },
    {
        productName: "Yoga Mat Premium",
        productPrice: "39.99",
        productQuantity: "180",
        productDescription: "Non-slip eco-friendly yoga mat with carrying strap"
    },
    {
        productName: "Wireless Phone Charger",
        productPrice: "29.99",
        productQuantity: "350",
        productDescription: "Qi-certified fast wireless charging pad for smartphones"
    },
    {
        productName: "Leather Laptop Bag",
        productPrice: "119.99",
        productQuantity: "90",
        productDescription: "Genuine leather messenger bag with padded laptop compartment"
    },
    {
        productName: "Air Purifier for Home",
        productPrice: "159.99",
        productQuantity: "60",
        productDescription: "HEPA filter air purifier covering rooms up to 500 sq ft"
    },
    {
        productName: "Electric Toothbrush",
        productPrice: "79.99",
        productQuantity: "220",
        productDescription: "Sonic electric toothbrush with multiple brushing modes"
    },
    {
        productName: "4K Action Camera",
        productPrice: "299.99",
        productQuantity: "45",
        productDescription: "Waterproof 4K camera with image stabilization for adventures"
    },
    {
        productName: "Essential Oil Diffuser",
        productPrice: "32.99",
        productQuantity: "175",
        productDescription: "Ultrasonic aromatherapy diffuser with color-changing LED lights"
    },
    {
        productName: "Gaming Mouse",
        productPrice: "59.99",
        productQuantity: "280",
        productDescription: "High-precision gaming mouse with programmable buttons"
    },
    {
        productName: "Bamboo Cutting Board",
        productPrice: "24.99",
        productQuantity: "400",
        productDescription: "Eco-friendly bamboo cutting board with juice groove"
    },
    {
        productName: "Noise Cancelling Earbuds",
        productPrice: "149.99",
        productQuantity: "110",
        productDescription: "True wireless earbuds with active noise cancellation"
    },
    {
        productName: "Cast Iron Skillet",
        productPrice: "44.99",
        productQuantity: "160",
        productDescription: "Pre-seasoned 10-inch cast iron skillet for versatile cooking"
    },
    {
        productName: "Fitness Resistance Bands",
        productPrice: "19.99",
        productQuantity: "320",
        productDescription: "Set of 5 resistance bands with different tension levels"
    },
    {
        productName: "Smart LED Light Bulbs",
        productPrice: "39.99",
        productQuantity: "240",
        productDescription: "Set of 4 smart bulbs controllable via smartphone app"
    }
];

// app.get(path, callback)
app.get('/', (req, res)=>{
    // res.send(products);
    // res.json(products);

    // res.status(200).send(products)

    let dir = __dirname
    console.log(dir);

    // res.sendFile(dir+'/public/construction1.webp')
    // res.sendFile(dir+'/index.html')

    res.render('index', {gender:"female"})
    
    

    
});

app.get('/product',(req, res)=>{
    res.render("product", {products})
})

app.get("/addProduct", (req, res)=>{
    res.render('addProduct')
})

app.post("/addProduct", (req, res)=>{
    console.log(req.body)
    const{productName, productPrice, productQuantity, productDescription}= req.body

    products.push(req.body)
    res.render("product", {products})

})

app.post('/delete/:id', (req, res)=>{
    console.log(req.params);
    
})









// app.listen(port, callback)
let PORT= process.env.PORT
app.listen(PORT, (err)=>{
    if(err){
        console.log(err);
        
    }else{
        console.log(`server started successfully  at port ${PORT}`);
        
    }
})
