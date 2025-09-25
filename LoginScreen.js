import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { baseUrl } from './constant';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email:email, Password:senha }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        Alert.alert("Login realizado!", `Token: ${token}`);
        
      } else {
        Alert.alert('Erro no login', 'Email ou senha inválidos.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar logar.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png" }} 
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

      <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#5b6fa1' : '#4682B4' },
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Text style={{ marginTop: 10 }}>OU</Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderWidth: 5,
    borderColor: '#4682B4',
    borderRadius: 15,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4682B4',
    padding: 8,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 4,
    marginBottom: 12,
    color: '#4682B4',
    fontSize: 14,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
