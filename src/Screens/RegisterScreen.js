import React, { useState } from "react";
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

export default function RegisterScreen({ navigation, users, setUsers }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const registrar = () => {
    if (!nombre || !email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (password.length < 8) {
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
      Alert.alert("Exito", "Cuenta creada. Ahora inicia sesion!");
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
      <Text style={styles.subtitle}>Unete a Beauty by Melodii!</Text>

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

      <Text style={styles.hint}>
        La contraseña debe tener al menos 8 caracteres y una mayuscula
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFB6C1" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.registerButton} onPress={registrar}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backLink}>Ya tienes cuenta? Inicia sesion</Text>
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