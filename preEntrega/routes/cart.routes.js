import { Router } from "express";
const router = Router();
import CartManager from "../Manager/CartManager.js";
const cart_manager = new CartManager();

router.get("/", (req, res) => {
  try {
    const { limit } = req.query;
    if (limit) {
      res.status(200).json(cart_manager.getCarts().slice(0, limit));
    } else {
      res.status(200).json(cart_manager.getCarts());
    }
  } catch (error) {
    res.status(500).json("error");
  }
});

router.get("/:cid", (req, res) => {
  try {
    const cartId = cart_manager.getCartById(parseInt(req.params.cid));
    res.json(cartId);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", (req, res) => {
  try {
    const cart = cart_manager.addCart();
    cart
      ? res.status(200).send(cart)
      : res.status(400).send(JSON.stringify("Bad request"));
  } catch (error) {
    res.status(500).json("error");
  }
});

router.post("/:cid/product/:pid", (req, res) => {
  try {
    const addProduct = cart_manager.addProduct(
      parseInt(req.params.cid),
      parseInt(req.params.pid)
    );
    addProduct
      ? res.status(200).send(addProduct)
      : res.status(400).send("Bad request");
  } catch (error) {
    res.status(500).json("Error");
  }
});
export default router;
