import DEFAULT_PRODUCTS from "../data/Products";

export const getProducts = () => {
  const saved = localStorage.getItem("products");
  if (!saved) {
    localStorage.setItem("products", JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }

  const products = JSON.parse(saved);

  // Sync products from DEFAULT_PRODUCTS
  let updated = false;
  DEFAULT_PRODUCTS.forEach(defaultProd => {
    const existingIndex = products.findIndex(p => p.id === defaultProd.id);
    if (existingIndex === -1) {
      products.push(defaultProd);
      updated = true;
    } else {
      // Update image and description if they changed in the code
      if (products[existingIndex].image !== defaultProd.image) {
        products[existingIndex].image = defaultProd.image;
        updated = true;
      }
      if (products[existingIndex].description !== defaultProd.description) {
        products[existingIndex].description = defaultProd.description;
        updated = true;
      }
    }
  });

  if (updated) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  return products;
};

export const saveProducts = (products) => {
  localStorage.setItem("products", JSON.stringify(products));
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Math.max(...products.map(p => p.id), 0) + 1,
    reviews: []
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
};

export const updateProduct = (id, updatedProduct) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    saveProducts(products);
  }
};

export const deleteProduct = (id) => {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== id);
  saveProducts(filtered);
};

export default getProducts();
