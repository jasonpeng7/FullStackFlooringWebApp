const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"],
};

const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));
app.use(express.json())

//get route for flooring options
app.get("/flooring", (req, res) => {
    res.json({
        "flooring": [
            {id: 1, type: "Vinyl Wood", color: "Oak", price: 10, imageURL: '/vinyl-flooring.jpg', displayExampleURL: '/vinyl-example.webp'},
            {id: 2, type: "Laminate Wood", color: "Ash", price: 8, imageURL: '/laminate-wood.avif', displayExampleURL:'laminate-example.webp'},
            {id: 3, type: "Engineered Wood", color: "Oasis", price: 15, imageURL: '/engineered-wood.avif', displayExampleURL: '/engineered-example.jpeg'},
            {id: 4, type: "Luxury Woodlook Tile", color: "Light Oak", price: 20, imageURL: '/wood-look-tile.avif', displayExampleURL: '/woodlook-example.avif' },
            {id: 5, type: "Luxury Vinyl", color: "Brown Maple", price: 12, imageURL: '/luxury-vinyl.avif', displayExampleURL: '/luxuryvinyl-example.jpeg'},
            {id: 6, type: "Engineered Hardwood", color: "Rust", price: 12, imageURL: '/engineered-hardwood.webp', displayExampleURL: '/engineeredhardwood-example.webp'},
            {id: 7, type: "Solid Hardwood", color: "Autumn", price: 10, imageURL: '/solid-hardwood.avif', displayExampleURL: '/solidhardwood-example.webp'},
            {id: 8, type: "Parquet", color: "Bamboo", price: 28, imageURL: '/parquet-flooring.avif', displayExampleURL: '/parquet-example.jpg' },
    ]
    })
});

let cart = [];

//post route to send data when users add item to cart
app.post("/cart", (req,res) => { 
    const { item } = req.body;

    if (!item) {
        return res.status(400).json({message: "Item is required"});
    }

    const existingItem = cart.findIndex(cartItem => cartItem.id === item.id);
    if (existingItem > -1) {
        cart[existingItem].quantity += 1
    } 
    else {
        cart.push ({...item, quantity: 1})
    }
    res.json({message: `${item.type} added to cart`});
})

app.post("/cart/clear", (req, res) => {
    cart = []
    res.json({message: "Cart successfully cleared"});
});

//get route to recieve user cart items
app.get("/cart", (req, res) => {
    res.json(cart);
});

app.delete("/cart/:id", (req, res) => {
    const {id} = req.params;
    const index = cart.findIndex(item => item.id === parseInt(id));

    if (index > -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        }
        else {
            cart.splice(index, 1); // Remove the item at the found index
        }
    }

    return res.json({message:`Item ${id} has successfully been removed from cart`})

})

app.listen(8080, () => {
    console.log("Server started on port 8080");
});