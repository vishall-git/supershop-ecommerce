const express = require("express");
const app = express();
const cors=require('cors')
const cookieParser=require('cookie-parser')

const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const cartRoutes = require("./routes/cart.routes");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:
}))

app.use(express.json());
app.use(cookieParser());

app.use("/", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;