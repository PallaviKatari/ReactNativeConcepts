import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
}

export default function Table() {
  const [data, setData] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Active");
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const handleAddOrUpdate = () => {
    if (!name || !email) return;

    if (editId) {
      setData(
        data.map((item) =>
          item.id === editId
            ? { ...item, name, email, status }
            : item
        )
      );
      setEditId(null);
    } else {
      setData([
        ...data,
        {
          id: Date.now().toString(),
          name,
          email,
          status,
        },
      ]);
    }

    setName("");
    setEmail("");
    setStatus("Active");
  };

  const handleEdit = (item: { id: React.SetStateAction<string | null>; name: React.SetStateAction<string>; email: React.SetStateAction<string>; status: React.SetStateAction<string>; }) => {
    setEditId(item.id);
    setName(item.name);
    setEmail(item.email);
    setStatus(item.status);
  };

  const handleDelete = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || item.status === filter;

    return matchesSearch && matchesFilter;
  });

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>{item.status}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.statusRow}>
          {["Active", "Inactive"].map((s) => (
            <TouchableOpacity
              key={s}
              style={[
                styles.statusBtn,
                status === s && styles.statusActive,
              ]}
              onPress={() => setStatus(s)}
            >
              <Text style={styles.statusText}>{s}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={handleAddOrUpdate}
        >
          <Text style={styles.addText}>
            {editId ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search & Filter */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search by name"
          style={styles.search}
          value={search}
          onChangeText={setSearch}
        />

        {["All", "Active", "Inactive"].map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterBtn,
              filter === f && styles.filterActive,
            ]}
            onPress={() => setFilter(f)}
          >
            <Text>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Table Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Name</Text>
        <Text style={styles.headerCell}>Email</Text>
        <Text style={styles.headerCell}>Status</Text>
        <Text style={styles.headerCell}>Actions</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f4f6fb",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  statusBtn: {
    flex: 1,
    padding: 8,
    marginRight: 5,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
  },
  statusActive: {
    backgroundColor: "#4f46e5",
  },
  statusText: {
    color: "#000",
  },
  addBtn: {
    backgroundColor: "#22c55e",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  addText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  search: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 6,
    marginRight: 5,
  },
  filterBtn: {
    padding: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 6,
    marginLeft: 4,
  },
  filterActive: {
    backgroundColor: "#93c5fd",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  cell: {
    flex: 1,
  },
  actions: {
    flexDirection: "row",
    flex: 1,
  },
  edit: {
    color: "#2563eb",
    marginRight: 10,
  },
  delete: {
    color: "#dc2626",
  },
});
