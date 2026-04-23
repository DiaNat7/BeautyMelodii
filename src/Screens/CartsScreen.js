import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ cart, setCart, orders, setOrders }) {
  
  useEffect(() => {
    const guardarPersistencia = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (error) {
        console.log("Error al persistir los datos", error);
      }
    };
    guardarPersistencia();
  }, [cart, orders]);

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.cantidad,
    0
  );

  const eliminarProducto = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const aumentarCantidad = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const generarPedido = () => {
    if (cart.length === 0) {
      Alert.alert("Error", "Tu carrito está vacío");
      return;
    }

    const nuevoPedido = {
      id: Date.now().toString(),
      productos: cart,
      total: total.toFixed(2),
      fecha: new Date().toLocaleDateString(),
    };

    setOrders((prev) => [...prev, nuevoPedido]);
    setCart([]);
    Alert.alert("Éxito", "¡Pedido generado correctamente!");
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.emptyText}>Tu carrito está vacío 🛒</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Mi Carrito 🛒</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image
              source={{ uri: item.image_link || "https://via.placeholder.com/150"}}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.infoContainer}>
              <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>

              <View style={styles.cantidadContainer}>
                <TouchableOpacity
                  style={styles.btnCantidad}
                  onPress={() => disminuirCantidad(item.id)}
                >
                  <Text style={styles.btnCantidadText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.cantidad}>{item.cantidad}</Text>

                <TouchableOpacity
                  style={styles.btnCantidad}
                  onPress={() => aumentarCantidad(item.id)}
                >
                  <Text style={styles.btnCantidadText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.btnEliminar}
                onPress={() => eliminarProducto(item.id)}
              >
                <Text style={styles.btnEliminarText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.btnPedido} onPress={generarPedido}>
          <Text style={styles.btnPedidoText}>Generar Pedido</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF5F5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E75480",
    textAlign: "center",
    marginVertical: 10,
  },
  emptyText: {
    fontSize: 18,
    color: "#FFB6C1",
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#FFB6C1",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#E75480",
    marginTop: 4,
  },
  cantidadContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  btnCantidad: {
    backgroundColor: "#FFB6C1",
    borderRadius: 6,
    padding: 5,
    paddingHorizontal: 10,
  },
  btnCantidadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cantidad: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  btnEliminar: {
    marginTop: 8,
    backgroundColor: "#FFB6C1",
    borderRadius: 6,
    padding: 5,
    alignItems: "center",
  },
  btnEliminarText: {
    color: "#fff",
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#FFB6C1",
    backgroundColor: "#FFF",
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E75480",
    textAlign: "center",
    marginBottom: 10,
  },
  btnPedido: {
    backgroundColor: "#E75480",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  btnPedidoText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});