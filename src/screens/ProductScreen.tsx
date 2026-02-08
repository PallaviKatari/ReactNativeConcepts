import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { addProduct, deleteProduct, getProducts } from "../services/productService";
import { Product } from "../types/Product";

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);

  const load = async () => setProducts(await getProducts());

  useEffect(() => {
    load();
  }, []);

  return (
    <View>
      <Button title="Add Product" onPress={async () => {
        await addProduct("Sample Product", 100);
        load();
      }} />

      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Delete" onPress={async () => {
              await deleteProduct(item.id);
              load();
            }} />
          </View>
        )}
      />
    </View>
  );
}
