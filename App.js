import React from "react";
import { AuthProvider } from "./AuthService";
import AppNavigator from "./AppNavigator";
import Toast from "./Toast";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
      <Toast />
    </AuthProvider>
  );
}
