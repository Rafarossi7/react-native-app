import React from "react";
import { AuthProvider } from "./AuthService";
import AppNavigator from "./AppNavigator";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
