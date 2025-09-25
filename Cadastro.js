import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { baseUrl } from './constant';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleCadastro = async () => {
    try {
      const response = await fetch(`${baseUrl}Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nome: `${nome}`,
          Email:email,
          Password:senha,
          ConfirmPassword : senha,
        }),
      });

      if (response.ok) {
        const data = await response.text()
        Alert.alert(data);
      } else {
        const msg = await response.text();
        Alert.alert('Erro no cadastro', msg);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar cadastrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135755.png" }} 
        style={styles.logo}
      />
      <Text style={styles.titulo}>Cadastro</Text>

      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
      />

      {/* <Text style={styles.label}>Sobrenome:</Text>
      <TextInput
        style={styles.input}
        value={sobrenome}
        onChangeText={setSobrenome}
        placeholder="Sobrenome"
      /> */}

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
      />
      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#5b6fa1' : '#4682B4' },
        ]}
        onPress={handleCadastro}
      >
        <Text style={styles.buttonText}>Cadastrar-se</Text>
      </Pressable>
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
    width: 80,
    height: 80,
    marginBottom: 0,
  },
  titulo: {
    fontSize: 20,
    color: '#4682B4',
    marginBottom: 0,
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 2,
    fontSize: 14,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4682B4',
    padding: 6,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
