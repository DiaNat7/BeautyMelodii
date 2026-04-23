import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

const yuyaProducts = [
  {
    id: "1y",
    brand: "Yuya",
    name: "Paleta de Sombras Metamorfosis",
    price: "649.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/products/7506110653929_1.jpg?v=1741277943",
    description: "Paleta con 18 tonos cálidos y fríos, ideal para cualquier ocasión.",
    category: "Ojos"
  },
  {
    id: "2y",
    brand: "Yuya",
    name: "Labial Líquido Mate - Mi Amor",
    price: "139.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/products/LabialMateMiAmor.jpg?v=1741277988",
    description: "Labial líquido de acabado mate aterciopelado de larga duración.",
    category: "Labios"
  },
  {
    id: "3y",
    brand: "Yuya",
    name: "Máscara de Pestañas 10 Aceites",
    price: "219.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/products/7506110653905.jpg?v=1741277962",
    description: "Alarga y da volumen a tus pestañas nutriéndolas con 10 aceites naturales.",
    category: "Ojos"
  },
  {
    id: "4y",
    brand: "Yuya",
    name: "Rubor en Barra Yuya -Hortensia",
    price: "159.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/files/7506110691716_ebafb3ef-015c-4a06-a8bf-437c56f9c970.jpg?v=1765409053",
    description: "Rubor en barra que aporta un tono natural y saludable a tus mejillas.",
    category: "Rostro"
  },
  {
    id: "5y",
    brand: "Yuya",
    name: "Delineador Cat Eye",
    price: "239.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/products/7506110650652_3.jpg?v=1741277964",
    description: "Delineador negro intenso con punta de plumón para un trazo preciso.",
    category: "Ojos"
  },
  {
    id: "6y",
    brand: "Yuya",
    name: "Set Edición Especial Limitado a 100 piezas Jabón Facial Dúo",
    price: "749.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/files/Caja-Influencers-Abierto.jpg?v=1755906151",
    description: "Caja Exclusiva de Jabones Faciales Bailando Juntos.",
    category: "Skincare"
  },
  {
    id: "7y",
    brand: "Yuya",
    name: "Iluminador Líquido - Bajo el Sol",
    price: "189.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/products/756110654070.jpg?v=1741277945",
    description: "Gotas iluminadoras que dejan un brillo radiante en la piel.",
    category: "Rostro"
  },
  {
    id: "8y",
    brand: "Yuya",
    name: "Desmaquillante Bifásico",
    price: "179.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/products/7506110668480_1942995c-df96-4ddb-8798-f835113bcd5c.jpg?v=1759190634",
    description: "Elimina el maquillaje a prueba de agua sin irritar la piel ni los ojos.",
    category: "Skincare"
  },
  {
    id: "9y",
    brand: "Yuya",
    name: "Polvo Traslúcido",
    price: "259.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/products/7506110673033_7.jpg?v=1741277898",
    description: "Sella tu maquillaje y elimina el brillo facial por horas.",
    category: "Rostro"
  },
  {
    id: "10y",
    brand: "Yuya",
    name: "Yuya Labial Líquido Mate -La Sirena",
    price: "139.00",
    image_link: "https://yuyatiendaoficial.com/cdn/shop/products/7506110647799_1.jpg?v=1741277988",
    description: "Labial mate y no pegajoso con destellos sutiles.",
    category: "Labios"
  }
];

const CATEGORIES = ["Todos", "Rostro", "Ojos", "Labios", "Skincare", "Otros"];

const mapApiCategory = (productType) => {
  if (!productType) return "Otros";
  const type = productType.toLowerCase();
  
  if (["lipstick", "lip_liner"].includes(type)) return "Labios";
  if (["foundation", "blush", "bronzer"].includes(type)) return "Rostro";
  if (["eyeliner", "eyeshadow", "mascara", "eyebrow"].includes(type)) return "Ojos";
  
  return "Otros"; 
};

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    const URL = "https://makeup-api.herokuapp.com/api/v1/products.json";

    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Algo salió mal con la API");
        }
        return res.json();
      })
      .then((data) => {
        const primeros = data.slice(0, 100);

        const filtrados = primeros.filter(
          (item) =>
            item.image_link &&
            item.image_link.startsWith("http") &&
            item.price &&
            item.price !== "0.0"
        );

        const apiConCategoria = filtrados.slice(0, 10).map(item => ({
          ...item,
          category: mapApiCategory(item.product_type)
        }));

        const catalogoFinal = [...yuyaProducts, ...apiConCategoria];
        
        setProducts(catalogoFinal);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const filteredProducts = activeCategory === "Todos" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#E75480" size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Beauty by Melodii</Text>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.filterButton, 
                activeCategory === cat && styles.filterButtonActive
              ]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[
                styles.filterText,
                activeCategory === cat && styles.filterTextActive
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>


      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => navigation.navigate("Detail", { product: item })}
          >
            <Image
              source={{
                uri:
                  item.image_link ||
                  "https://via.placeholder.com/150",
              }}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    paddingTop: 20,
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
    marginBottom: 10,
  },

  filterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  filterButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#FFB6C1",
  },
  filterButtonActive: {
    backgroundColor: "#E75480",
    borderColor: "#E75480",
  },
  filterText: {
    color: "#E75480",
    fontWeight: "bold",
  },
  filterTextActive: {
    color: "#fff",
  },
  
  cardContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#FFB6C1",
  },
  image: {
    height: 200,
    width: 200,
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
    color: "#333",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color: "#E75480",
  },
  errorText: {
    color: "#E75480",
    fontSize: 16,
  },
});