import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { AuthContext, loginUser } from "./AuthService";
import { useNavigation } from "@react-navigation/native";
import { showToast } from "./Toast";

export default function LoginScreen({ isLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogin = async () => {
    try {
      const { token, user } = await loginUser(email, senha);
      if (token && user) {
        login(token, user);
        showToast("Usuário logado com sucesso!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    } catch (error) {
      alert("Erro no login:", error);
    }
  };
  // useEffect(() => {
  //   showToast("Toast funcinando");
  // }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png",
        }}
        style={styles.logo}
      />

      <Text style={styles.subtitle}>
        Bem-vindo ao Easy Class 👋{"\n"}
        Faça login para continuar
      </Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="E-mail"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
      />

      {/* <Text style={styles.forgotPassword}>Esqueceu a senha?</Text> */}

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#5b6fa1" : "#4682B4" },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#4682B4",
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 4,
    marginBottom: 12,
    color: "#4682B4",
    fontSize: 14,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
