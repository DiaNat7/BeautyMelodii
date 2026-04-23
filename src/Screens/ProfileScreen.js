import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen({ currentUser, orders, navigation }) {
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mi Perfil </Text>

      <View style={styles.userCard}>
        <Text style={styles.userName}> {currentUser?.nombre}</Text>
        <Text style={styles.userEmail}> {currentUser?.email}</Text>
      </View>

      <Text style={styles.ordersTitle}>Mis Pedidos </Text>

      {orders.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No tienes pedidos aún 🛒</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderFecha}> {item.fecha}</Text>
              <Text style={styles.orderTotal}> Total: ${item.total}</Text>
              <Text style={styles.orderProductosTitle}>Productos:</Text>
              {item.productos.map((p) => (
                <Text key={p.id} style={styles.orderProducto}>
                  • {p.name} x{p.cantidad} — ${p.price}
                </Text>
              ))}
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    color: "#555",
  },
  ordersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E75480",
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});