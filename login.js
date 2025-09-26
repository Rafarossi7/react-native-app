import LoginScreen from "./LoginScreen";
import Cadastro from "./CadastroScreen";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useEffect, useState } from "react";
export default function Login() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  return (
    <View style={styles.container}>
      {isLoginScreen ? <LoginScreen /> : <Cadastro />}

      <Pressable onPress={() => setIsLoginScreen(!isLoginScreen)}>
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
    alignItems: "stretch", // ou "flex-start"
    padding: 20,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    marginTop: 30,
    color: "#686868ff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
