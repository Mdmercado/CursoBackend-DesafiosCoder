import express from "express";
import ProductManager from "./ProductManager.js";
const products = new ProductManager();
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log("Listen on port " + port + " con express");
});

app.get("/", (req, res) => {
  res.json({ msg: "welcome" });
});

app.get("/products", async (req, res) => {
  try {
    const prods = await products.getProducts();

    let limit = req.query.limit;
    if (limit && limit > 0) {
      const parse = parseInt(req.query.limit);
      let prodsBylimit = prods.slice(0, parse);
      res.json({ result: prodsBylimit });
    } else {
      res.json({ result: prods });
    }
  } catch (error) {
    res.send(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);

  try {
    let prodId = await products.getProductById(id);

    if (prodId) {
      res.send(prodId);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
