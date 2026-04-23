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

export default function RegisterScreen({ navigation, users, setUsers }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const registrar = () => {
    if (!nombre || !email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (password.length < 5) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      Alert.alert("Error", "La contraseña debe tener al menos una mayúscula");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const existe = users.find((u) => u.email === email);
      if (existe) {
        Alert.alert("Error", "Ese email ya está registrado");
        setLoading(false);
        return;
      }

      const nuevoUsuario = { nombre, email, password };
      setUsers((prev) => [...prev, nuevoUsuario]);
      Alert.alert("Éxito", "Cuenta creada. ¡Ahora inicia sesión!");
      setNombre("");
      setEmail("");
      setPassword("");
      navigation.goBack();
      setLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <Text style={styles.subtitle}>¡Únete a Beauty by Melodii!</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />
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

      <Text style={styles.hint}>
        La contraseña debe tener al menos 5 caracteres y una mayúscula
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFB6C1" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.registerButton} onPress={registrar}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backLink}>¿Ya tienes cuenta? Inicia sesión</Text>
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
  hint: {
    fontSize: 12,
    color: "#FFB6C1",
    textAlign: "center",
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: "#E75480",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    marginTop: 20,
  },
  backLink: {
    textAlign: "center",
    marginTop: 20,
    color: "#FFB6C1",
    fontSize: 15,
  },
});