import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();
export const baseUrl = "http://172.28.128.1:5002/api/";
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const load = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUser = await AsyncStorage.getItem("user");
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    };
    load();
  }, []);

  const login = async (jwt, user) => {
    await AsyncStorage.setItem("token", jwt);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setToken(jwt);
    setUser(user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };
  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    return user;
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const loginUser = async (email, senha) => {
  try {
    const response = await fetch(`${baseUrl}Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Email: email, Password: senha }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Ocorreu um erro ao tentar logar.");
  }
};
export const CadastroUser = async (nome, email, senha, confirmarSenha) => {
  try {
    const response = await fetch(`${baseUrl}Auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Nome: `${nome}`,
        Email: email,
        Password: senha,
        ConfirmPassword: confirmarSenha,
      }),
    });

    if (response.ok) {
      const data = await response.text();
      return data;
    } else {
      const msg = await response.text();
      Alert.alert("Erro no cadastro", msg);
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Ocorreu um erro ao tentar cadastrar.");
  }
};
