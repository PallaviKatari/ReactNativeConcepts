import React, { useState, useMemo, useCallback } from "react";
import { View, Text, Button, FlatList, TextInput } from "react-native";

type CounterButtonProps = {
  onPress: () => void;
};

const CounterButton = React.memo(
  ({ onPress }: CounterButtonProps) => {
    return <Button title="Increment Counter" onPress={onPress} />;
  }
);

export default function HomeScreen() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const items = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }, [search,items]);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, marginTop: 40 }}>
      <Text>Count: {count}</Text>

      <CounterButton onPress={increment} />

      <TextInput
        placeholder="Search items..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}
