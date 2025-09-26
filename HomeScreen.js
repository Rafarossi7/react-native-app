import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  FlatList,
} from "react-native";
import { AuthProvider } from "./AuthService";

export default function HomeScreen({ navigation }) {
  const [menuSelecionado, setMenuSelecionado] = useState("atividades");
  const { logout } = useContext(AuthProvider);

  const atividades = [
    { id: "1", titulo: "Atividade " },
    { id: "2", titulo: "Trabalho " },
    { id: "3", titulo: "Trabalho " },
    { id: "4", titulo: "Trabalho " },
  ];

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Menu Box */}
      <View style={styles.menuBox}>
        {["atividades", "notas", "mensagens"].map((item) => (
          <Pressable
            key={item}
            style={[
              styles.menuButton,
              menuSelecionado === item && styles.menuButtonSelected,
            ]}
            onPress={() => setMenuSelecionado(item)}
          >
            <Text
              style={[
                styles.menuButtonText,
                menuSelecionado === item && styles.menuButtonTextSelected,
              ]}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.title}>Bem-vindo ao Aprender Unilago 🎓</Text>
      <Text style={styles.subtitle}>Seu Painel de Atividades:</Text>

      {menuSelecionado === "atividades" && (
        <FlatList
          data={atividades}
          keyExtractor={(item) => item.id}
          style={styles.list}
          renderItem={({ item }) => (
            <View style={styles.atividadeItem}>
              <Text style={styles.atividadeTexto}>{item.titulo}</Text>
            </View>
          )}
        />
      )}

      {/* Botões abaixo */}
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Ver Perfil</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderWidth: 5,
    borderColor: "#4682B4",
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  menuBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#4682B4",
    borderRadius: 15,
    backgroundColor: "#e6f0fa",
    shadowColor: "#4682B4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // para android
  },
  menuButton: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#d0d7ee",
  },
  menuButtonSelected: {
    backgroundColor: "#4682B4",
  },
  menuButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  menuButtonTextSelected: {
    color: "#fff",
  },

  title: {
    fontSize: 16,
    color: "#4682B4",
    textAlign: "center",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  list: {
    flexGrow: 0,
    marginBottom: 20,
  },
  atividadeItem: {
    backgroundColor: "#e6f0fa",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4682B4",
  },
  atividadeTexto: {
    color: "#333",
  },
  button: {
    backgroundColor: "#4682B4",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
