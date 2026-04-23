import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen({ currentUser, setCurrentUser, orders, navigation, users, setUsers }) {
  const [editando, setEditando] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState(currentUser?.nombre);
  const [nuevoEmail, setNuevoEmail] = useState(currentUser?.email);
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const cerrarSesion = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás segura que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, salir",
          onPress: () => navigation.replace("Login"),
        },
      ]
    );
  };

  const actualizarDatos = () => {
    if (!nuevoNombre || !nuevoEmail) {
      Alert.alert("Error", "Nombre y email no pueden estar vacíos");
      return;
    }

    if (nuevaPassword && nuevaPassword.length < 5) {
      Alert.alert("Error", "La contraseña debe tener al menos 5 caracteres");
      return;
    }

    if (nuevaPassword && !/[A-Z]/.test(nuevaPassword)) {
      Alert.alert("Error", "La contraseña debe tener al menos una mayúscula");
      return;
    }

    const usuarioActualizado = {
      ...currentUser,
      nombre: nuevoNombre,
      email: nuevoEmail,
      password: nuevaPassword ? nuevaPassword : currentUser.password,
    };

    setUsers((prev) =>
      prev.map((u) => (u.email === currentUser.email ? usuarioActualizado : u))
    );
    setCurrentUser(usuarioActualizado);
    setEditando(false);
    setNuevaPassword("");
    Alert.alert("Exito", "Datos actualizados correctamente");
  };

  const eliminarCuenta = () => {
    Alert.alert(
      "Eliminar cuenta",
      "¿Estás segura que quieres eliminar tu cuenta? Esta acción no se puede deshacer",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, eliminar",
          style: "destructive",
          onPress: () => {
            setUsers((prev) => prev.filter((u) => u.email !== currentUser.email));
            setCurrentUser(null);
            navigation.replace("Login");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Mi Perfil</Text>

        {editando ? (
          <View style={styles.userCard}>
            <Text style={styles.editTitle}>Editar datos</Text>
            <TextInput
              style={styles.input}
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              placeholder="Nombre completo"
            />
            <TextInput
              style={styles.input}
              value={nuevoEmail}
              onChangeText={setNuevoEmail}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={nuevaPassword}
                onChangeText={setNuevaPassword}
                placeholder="Nueva contraseña (opcional)"
                secureTextEntry={!mostrarPassword}
              />
              <TouchableOpacity onPress={() => setMostrarPassword(!mostrarPassword)}>
                <Text style={styles.ojito}>{mostrarPassword ? "Ocultar" : "Ver"}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={actualizarDatos}>
              <Text style={styles.saveButtonText}>Guardar cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditando(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{currentUser?.nombre}</Text>
            <Text style={styles.userEmail}>{currentUser?.email}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => setEditando(true)}>
              <Text style={styles.editButtonText}>Editar datos</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.ordersTitle}>Mis Pedidos</Text>

        {orders.length === 0 ? (
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No tienes pedidos aun</Text>
          </View>
        ) : (
          <FlatList
            scrollEnabled={false}
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.orderCard}>
                <Text style={styles.orderFecha}>Fecha: {item.fecha}</Text>
                <Text style={styles.orderTotal}>Total: ${item.total}</Text>
                <Text style={styles.orderProductosTitle}>Productos:</Text>
                {item.productos.map((p) => (
                  <Text key={p.id} style={styles.orderProducto}>
                    - {p.name} x{p.cantidad} — ${p.price}
                  </Text>
                ))}
              </View>
            )}
          />
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
          <Text style={styles.logoutButtonText}>Cerrar Sesion</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={eliminarCuenta}>
          <Text style={styles.deleteButtonText}>Eliminar cuenta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E75480",
    textAlign: "center",
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#FFB6C1",
    marginBottom: 20,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E75480",
    marginBottom: 15,
    textAlign: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB6C1",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: "#FFF5F5",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFB6C1",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#FFF5F5",
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 15,
  },
  ojito: {
    fontSize: 14,
    color: "#E75480",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#FFB6C1",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#E75480",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  cancelButton: {
    backgroundColor: "#FFB6C1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  ordersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E75480",
    marginBottom: 10,
  },
  centered: {
    alignItems: "center",
    marginVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#FFB6C1",
  },
  orderCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#FFB6C1",
    marginBottom: 15,
  },
  orderFecha: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E75480",
    marginBottom: 8,
  },
  orderProductosTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  orderProducto: {
    fontSize: 13,
    color: "#555",
    marginLeft: 10,
    marginBottom: 2,
  },
  logoutButton: {
    backgroundColor: "#FFB6C1",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E75480",
    marginBottom: 20,
  },
  deleteButtonText: {
    color: "#E75480",
    fontSize: 16,
    fontWeight: "bold",
  },
});