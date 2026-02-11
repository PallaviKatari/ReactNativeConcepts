import React, { createContext, useContext, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

// Create Context

type CounterContextType = {
  count: number;
  increment: () => void;
};

const CounterContext = createContext<CounterContextType | undefined>(
  undefined
);

// Child Component (Consumes Context)

const CounterDisplay = () => {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("CounterDisplay must be used inside Provider");
  }

  return (
    <View style={styles.box}>
      <Text style={styles.text}>Count: {context.count}</Text>
      <Button title="Increment" onPress={context.increment} />
    </View>
  );
};

// Main Screen (Provider)

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <CounterContext.Provider value={{ count, increment }}>
      <View style={styles.container}>
        <Text style={styles.title}>Context API Demo</Text>
        <CounterDisplay />
      </View>
    </CounterContext.Provider>
  );
}

// Styles

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, marginBottom: 20 },
  box: { alignItems: "center" },
  text: { fontSize: 18, marginBottom: 10 },
});
