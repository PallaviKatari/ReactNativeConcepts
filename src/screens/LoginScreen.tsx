import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { loginUser } from "../services/authService";

export default function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await loginUser(username, password);
    if (res.success) onLogin();
    else Alert.alert(res.message!);
  };

  return (
    <View>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
