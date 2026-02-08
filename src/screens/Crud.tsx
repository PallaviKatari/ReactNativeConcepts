import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function Crud() {
  const [text, setText] = useState("");
  const [items, setItems] = useState<{ id: string; title: string }[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const addItem = () => {
    if (!text.trim()) return;

    if (editId) {
      setItems(
        items.map((item) =>
          item.id === editId ? { ...item, title: text } : item
        )
      );
      setEditId(null);
    } else {
      setItems([
        ...items,
        { id: Date.now().toString(), title: text },
      ]);
    }

    setText("");
  };

  const editItem = (item: { title: React.SetStateAction<string>; id: React.SetStateAction<string | null>; }) => {
    setText(item.title);
    setEditId(item.id);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.title}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => editItem(item)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteItem(item.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Simple CRUD App</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter item..."
          value={text}
          onChangeText={setText}
        />

        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>
            {editId ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f7fb",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  edit: {
    color: "#2563eb",
    marginRight: 15,
    fontWeight: "bold",
  },
  delete: {
    color: "#dc2626",
    fontWeight: "bold",
  },
});

