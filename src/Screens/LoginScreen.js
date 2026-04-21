import React, { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen({ navigation, users, setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Beauty by Melodii</Text>
      <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#FFB6C1" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerLink}>
          ¿No tienes cuenta?{" "}
          <Text style={styles.registerLinkBold}>Regístrate</Text>
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