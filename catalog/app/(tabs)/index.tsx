import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const PRODUCTS: Product[] = [
  { id: "p1", name: "Audífonos Bluetooth", price: 89900, image: "https://picsum.photos/seed/p1/300/300" },
  { id: "p2", name: "Mouse Inalámbrico", price: 45000, image: "https://picsum.photos/seed/p2/300/300" },
  { id: "p3", name: "Teclado Mecánico", price: 150000, image: "https://picsum.photos/seed/p3/300/300" },
  { id: "p4", name: "Monitor 24''", price: 620000, image: "https://picsum.photos/seed/p4/300/300" },
  { id: "p5", name: "Cámara Web HD", price: 98000, image: "https://picsum.photos/seed/p5/300/300" },
  { id: "p6", name: "Parlante Portátil", price: 76000, image: "https://picsum.photos/seed/p6/300/300" },
  { id: "p7", name: "Cargador Rápido", price: 39000, image: "https://picsum.photos/seed/p7/300/300" },
  { id: "p8", name: "Mochila para Laptop", price: 120000, image: "https://picsum.photos/seed/p8/300/300" },
  { id: "p9", name: "Silla Ergonómica", price: 450000, image: "https://picsum.photos/seed/p9/300/300" },
];

type ProductCardProps = {
  product: Product;
  likes: number;
  onLike: (id: string) => void;
};

const ProductCard = React.memo(function ProductCard({
  product,
  likes,
  onLike,
}: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>
          ${product.price.toLocaleString("es-CO")}
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.likeButton,
            pressed && styles.likeButtonPressed,
          ]}
          onPress={() => onLike(product.id)}
        >
          <Text style={styles.likeText}>❤️ {likes}</Text>
        </Pressable>
      </View>
    </View>
  );
});

export default function ProductList() {
  const [likes, setLikes] = useState<Record<string, number>>({});

  // useCallback: evita que handleLike sea una función nueva en cada render
  const handleLike = useCallback((id: string) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1,
    }));
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        likes={likes[item.id] ?? 0}
        onLike={handleLike}
      />
    ),
    [likes, handleLike]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Catálogo de Productos</Text>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#222",
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 14,
    padding: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  price: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    marginBottom: 8,
  },
  likeButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffe4e6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  likeButtonPressed: {
    opacity: 0.6,
  },
  likeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#e11d48",
  },
});
