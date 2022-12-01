class ProductManager {
  constructor() {
    this.products = [];
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
      } else {
        console.log(`ERROR: Codigo ${code} ya existe`);
      }
    } else {
      console.log("ERROR: Todos los campos son obligatorios");
    }
  };

  getProductById = (id) => {
    let product = this.products.find((prod) => prod.id === id);
    if (product) {
      return product;
    } else {
      return "NOT FOUND";
    }
  };
}
// TESTING CODE
// Se creará una instancia de la clase “ProductManager”
// Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
const instancia = new ProductManager();
console.log(instancia.getProducts());
//El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
instancia.addProduct(
  "producto vacío",
  "Este es un producto de prueba",
  200,
  25
);
instancia.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
instancia.addProduct(
  "producto prueba2",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "adc123",
  25
);
instancia.addProduct(
  "producto prueba3",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "cba123",
  25
);
//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
console.log(instancia.getProducts());
//Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido
instancia.addProduct(
  "producto prueba",
  "Este es un producto de prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

// método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id

console.log(instancia.getProductById(1));
console.log(instancia.getProductById(2));
console.log(instancia.getProductById(3));
console.log(instancia.getProductById(10));
