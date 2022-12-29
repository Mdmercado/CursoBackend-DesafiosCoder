import express from "express";
import productsRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});

app.listen(port, () => {
  console.log("Listen on port " + port);
});
