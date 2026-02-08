import { Product } from "../types/Product";
import { STORAGE_KEYS } from "../data/storageKeys";
import { getJSON, saveJSON } from "../utils/storage";

// READ
export const getProducts = async (): Promise<Product[]> => {
  return (await getJSON<Product[]>(STORAGE_KEYS.PRODUCTS)) || [];
};

// CREATE
export const addProduct = async (name: string, price: number) => {
  const products = await getProducts();
  products.push({ id: Date.now(), name, price });
  await saveJSON(STORAGE_KEYS.PRODUCTS, products);
};

// UPDATE
export const updateProduct = async (id: number, name: string, price: number) => {
  const products = await getProducts();
  const product = products.find(p => p.id === id);
  if (!product) return;

  product.name = name;
  product.price = price;
  await saveJSON(STORAGE_KEYS.PRODUCTS, products);
};

// DELETE
export const deleteProduct = async (id: number) => {
  const products = await getProducts();
  const updated = products.filter(p => p.id !== id);
  await saveJSON(STORAGE_KEYS.PRODUCTS, updated);
};
