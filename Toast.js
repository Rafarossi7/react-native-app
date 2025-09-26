// Toast.js
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

let toastRef; // referência global

const Toast = () => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // anima entra
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // fecha sozinho depois de 2s
      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  // Função global que pode ser chamada de qualquer lugar
  toastRef = (msg) => {
    setMessage(msg);
    setVisible(true);
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toastContainer, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

// Função exportada
export const showToast = (msg) => {
  if (toastRef) {
    toastRef(msg);
  }
};

export default Toast;

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 999,
  },
  toastText: {
    color: "white",
    fontSize: 14,
  },
});
