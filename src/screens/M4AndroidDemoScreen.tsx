import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  StatusBar,
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Alert,
} from "react-native";

/* -----------------------------
   Typed Style Props (FIXED)
----------------------------- */
type CardProps = React.PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

/* -----------------------------
   Reusable Card Component
----------------------------- */
const Card = ({ children, style }: CardProps) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default function AndroidDemoScreen() {
  return (
    <View style={styles.safeArea}>
      {/* Android StatusBar */}
      <StatusBar
        backgroundColor="#1e40af"
        barStyle="light-content"
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={styles.title}>Android Product Screen</Text>

        {/* Image */}
        <Image
          source={{ uri: "https://via.placeholder.com/400" }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Product Card */}
        <Card>
          <Text style={styles.label}>Product Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter product name"
            placeholderTextColor="#6b7280"
          />

          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter price"
            keyboardType="numeric"
            placeholderTextColor="#6b7280"
          />

          {/* Pressable Button */}
          <Pressable
            android_ripple={{ color: "#93c5fd" }}
            style={styles.button}
            onPress={() => Alert.alert("Product saved!")}
          >
            <Text style={styles.buttonText}>SAVE PRODUCT</Text>
          </Pressable>
        </Card>

        {/* Platform API (Android specific) */}
        {Platform.OS === "android" && (
          <Text style={styles.platformText}>
            Running on Android 🤖
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

/* -----------------------------
   Styles
----------------------------- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  container: {
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },

  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    elevation: 6, // Android shadow
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#cbd5f5",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    backgroundColor: "#ffffff",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#1e40af",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
  },

  platformText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 16,
    color: "#334155",
  },
});
