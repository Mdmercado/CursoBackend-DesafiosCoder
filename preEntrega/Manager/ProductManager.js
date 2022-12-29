import fs from "fs";

class ProductManager {
  constructor() {
    this.path = "./Manager/productos.json";
    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf8"));
    } else {
      this.products = [];
    }
  }

  getProducts = () => {
    return this.products;
  };
  addProduct = (product) => {
    const anyEmpty = Object.values(product).some(
      (prod) => prod === "" || prod === undefined
    );
    try {
      if (!anyEmpty) {
        let existCode = this.products.filter((p) => p.code == product.code);
        if (!existCode.length > 0) {
          if (!this.products.length) {
            product["id"] = 1;
          } else {
            product["id"] = this.products[this.products.length - 1].id + 1;
          }

          this.products.push(product);
          try {
            fs.writeFileSync(
              this.path,
              JSON.stringify(this.products, null, "\t")
            );
            return "Producto archivado";
          } catch (error) {
            console.log(error);
          }
        } else {
          throw new Error(`ERROR: Codigo ${product.code} ya existe`);
        }
      } else {
        throw new Error("ERROR: Todos los campos son obligatorios");
      }
    } catch (error) {
      return error.message;
    }
  };
  getProductById = (id) => {
    let product = this.products.filter((prod) => prod.id == id);
    if (product.length > 0) {
      return product[0];
    } else {
      return { error: `id: ${id} no se encuentra en productos` };
    }
  };
  updateProduct = (id, obj) => {
    let sigleProduct = this.products.find((prod) => prod.id == id);
    let index = this.products.findIndex((p) => p.id == id);
    let anyId = Object.keys(obj).some((k) => k == "id");

    if (sigleProduct) {
      if (!anyId) {
        this.products[index] = { ...sigleProduct, ...obj };
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
        return "Producto actualizado";
      } else {
        return "ERROR: no puede modificar el id de un producto";
      }
    } else {
      return `ERROR no se encuentra producto con el ID: ${id}`;
    }
  };
  deleteProduct = (id) => {
    let productToRemove = this.products.find((prod) => prod.id == id);
    if (productToRemove) {
      let filterProducts = this.products.filter((prod) => prod.id != id);
      this.products = filterProducts;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      return `Producto con ID: ${id} ¡ha sido eliminado exitosamente!`;
    } else {
      return "ERROR: El producto a eliminar no existe";
    }
  };
}

export default ProductManager;
