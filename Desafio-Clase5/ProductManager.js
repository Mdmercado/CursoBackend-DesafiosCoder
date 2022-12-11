const fs = require("fs");

class ProductManager {
  constructor(ruta) {
    this.path = ruta;
    if (fs.existsSync(this.path)) {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf8"));
    } else {
      this.products = [];
    }
  }

  getProducts = () => {
    return this.products;
  };
  addProduct = (title, description, price, thumbnail, code, stock) => {
    let product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    const anyEmpty = Object.values(product).some(
      (prod) => prod === "" || prod === undefined
    );
    if (!anyEmpty) {
      let existCode = this.products.filter((product) => product.code == code);
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
          console.log("producto archivado");
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(`ERROR: Codigo ${code} ya existe`);
      }
    } else {
      console.log("ERROR: Todos los campos son obligatorios");
    }
  };
  getProductById = (id) => {
    let product = this.products.filter((prod) => prod.id == id);
    if (product.length > 0) {
      return product[0];
    } else {
      return `ERROR id: ${id} no se encuentra en productos`;
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
        console.log("Producto actualizado");
      } else {
        console.log("ERROR: no puede modificar el id de un producto");
      }
    } else {
      console.log(`ERROR no se encuentra producto con el ID: ${id}`);
    }
  };
  deleteProduct = (id) => {
    let productToRemove = this.products.find((prod) => prod.id == id);
    if (productToRemove) {
      let products = this.products.filter((prod) => prod.id !== id);
      this.products = products;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
      console.log(`Producto con ID: ${id} ¡ha sido eliminado exitosamente!`);
    } else {
      console.log("ERROR: El producto a eliminar no existe");
    }
  };
}

const instancia = new ProductManager("./productos.json");
// TESTING
// // invoco getProducts
// console.log(instancia.getProducts());
// // agrego productos
// instancia.addProduct(
//   "producto prueba",
//   "Este es un producto de prueba",
//   200,
//   "Sin imagen",
//   "abc123",
//   25
// );
// instancia.addProduct(
//   "producto prueba2",
//   "Este es un producto de prueba",
//   200,
//   "Sin imagen",
//   "adc123",
//   25
// );
// instancia.addProduct(
//   "producto prueba3",
//   "Este es un producto de prueba",
//   250,
//   "Sin imagen",
//   "162204",
//   32
// );
// instancia.addProduct(
//   "producto prueba4",
//   "Este es un producto para eliminar",
//   250,
//   "Sin imagen",
//   "123456",
//   12
// );
// // hago la llamada a getProducts nuevamente
// console.log(instancia.getProducts());
// // invoco getProductById con un id válido y otro erróneo
// console.log({ byId: instancia.getProductById(3) });
// console.log({ byId: instancia.getProductById(10) });
// // Actualizo producto existente y fuerzo errores
// instancia.updateProduct(3, { stock: 100 });
// instancia.updateProduct(10, { stock: 45 });
// instancia.updateProduct(3, { id: 45 });
// // elimino producto existente y fuerzo errores
// instancia.deleteProduct(12);
// instancia.deleteProduct(4);
