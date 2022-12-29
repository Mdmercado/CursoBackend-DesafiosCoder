import fs from "fs";
import ProductManager from "./ProductManager.js";

class CartManager {
  constructor() {
    this.path = "./Manager/carts.json";
    if (fs.existsSync(this.path)) {
      this.carts = JSON.parse(fs.readFileSync(this.path, "utf8"));
    } else {
      this.carts = [];
    }
  }

  addCart() {
    try {
      fs.existsSync(this.path)
        ? (this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8")))
        : (this.carts = []);

      const cart = {};

      cart["id"] =
        this.carts.length !== 0
          ? this.carts[this.carts.length - 1]["id"] + 1
          : 1;

      cart.products = [];

      this.carts.push(cart);
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"));

      return cart;
    } catch (error) {
      return error;
    }
  }

  getCarts() {
    return this.carts;
  }

  getCartById(id) {
    try {
      const cart = JSON.parse(fs.readFileSync(this.path, "utf-8")).find(
        (e) => e.id === id
      );
      if (cart) return cart.products;
      else return "Error: Not found";
    } catch (error) {
      console.log(error);
    }
  }

  addProduct(cid, pid) {
    try {
      const cartIndex = this.carts.map((x) => x.id).indexOf(cid);
      const productManager = new ProductManager();

      if (cartIndex === -1 || !productManager.getProductById(pid))
        return undefined;

      const productIndex = this.carts[cartIndex].products
        .map((product) => product.id)
        .indexOf(pid);

      productIndex === -1
        ? this.carts[cartIndex].products.push({ id: pid, quantity: 1 })
        : (this.carts[cartIndex].products[productIndex].quantity += 1);

      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, "\t"));
      return this.carts[cartIndex];
    } catch (e) {
      console.log(e);
    }
  }
}

export default CartManager;
