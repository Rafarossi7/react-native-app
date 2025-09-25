import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import LoginScreen from "./LoginScreen";
import Cadastro from "./Cadastro";

export default function App() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  return (
    <View style={styles.container}>
      {isLoginScreen ? <LoginScreen /> : <Cadastro />}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#5b6fa1" : "#4682B4" },
        ]}
        onPress={() => setIsLoginScreen(!isLoginScreen)}
      >
        <Text style={styles.buttonText}>
          {isLoginScreen ? "Cadastrar-se" : "Logar"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
