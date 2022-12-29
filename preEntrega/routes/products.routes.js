import { Router } from "express";
const router = Router();
import ProductManager from "../Manager/ProductManager.js";
const products = new ProductManager();

router.get("/", async (req, res) => {
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
    res.status(500).send(error);
  }
});
router.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);

  try {
    let prodId = await products.getProductById(id);

    if (prodId) {
      res.send(prodId);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
router.post("/", (req, res) => {
  try {
    const product = req.body;
    const saveProduct = products.addProduct(product);
    res.send(saveProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});
router.put("/:pid", (req, res) => {
  try {
    const update = products.updateProduct(req.params.pid, req.body);
    res.send(update);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:pid", (req, res) => {
  try {
    const remove = products.deleteProduct(req.params.pid);
    res.send(remove);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
