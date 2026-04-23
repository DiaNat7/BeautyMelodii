import React, { useState, useCallback } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

export default function LoginScreen({ navigation, users, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setEmail("");
      setPassword("");
    }, [])
  );

  const login = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa email y contraseña");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const encontrado = users.find(
        (u) => u.email === email && u.password === password
      );

      if (encontrado) {
        setCurrentUser(encontrado);
        navigation.navigate("MainTabs");
      } else {
        Alert.alert("Error", "Email o contraseña incorrectos");
        setEmail("");
        setPassword("");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Beauty by Melodii</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!mostrarPassword}
        />
        <TouchableOpacity
          onPress={() => setMostrarPassword(!mostrarPassword)}
        >
          <Text style={styles.verTexto}>
            {mostrarPassword ? "Ocultar" : "Ver"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFB6C1" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>Iniciar Sesion</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>
          ¿No tienes cuenta?{" "}
          <Text style={styles.registerLinkBold}>Registrate</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#FFF5F5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#E75480",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#FFB6C1",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB6C1",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFB6C1",
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#FFF",
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  verTexto: {
    fontSize: 14,
    color: "#E75480",
    fontWeight: "bold",
    padding: 5,
  },
  loginButton: {
    backgroundColor: "#FFB6C1",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  registerLink: {
    textAlign: "center",
    marginTop: 20,
    color: "#FFB6C1",
    fontSize: 15,
  },
  registerLinkBold: {
    fontWeight: "bold",
    color: "#E75480",
  },
});