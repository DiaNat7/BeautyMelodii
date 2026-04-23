import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailScreen({ navigation, route, cart, setCart }) {
  const { product } = route.params;

  const agregarAlCarrito = () => {
    const yaExiste = cart.find((item) => item.id === product.id);

    if (yaExiste) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, cantidad: 1 }]);
    }

    Alert.alert("Éxito", "Producto agregado al carrito 🛒");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: product.image_link }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}> Marca: {product.brand || "Beauty Melodii"}</Text>
          <Text style={styles.price}> Precio: ${product.price}</Text>
          
          <Text style={styles.detail}> Descripción: {product.description || "Este producto no tiene descripción."}</Text>
          
          <Text style={styles.detail}> Tipo: {product.product_type || "Cosmético"}</Text>
          <Text style={styles.detail}> Categoría: {product.category ? product.category : "N/A"}</Text>
          
          
          <Text style={styles.detail}>
              Tags: {product.tag_list && product.tag_list.length > 0 ? product.tag_list.join(", ") : "N/A"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={agregarAlCarrito}
        >
          <Text style={styles.cartButtonText}>🛒 Agregar al carrito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 10,
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E75480",
    marginBottom: 10,
    textAlign: "center",
  },
  brand: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E75480",
    marginBottom: 8,
  },
  detail: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
  },
  cartButton: {
    backgroundColor: "#E75480",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#FFB6C1",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});