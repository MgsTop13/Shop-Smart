import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import {convertNumToBrl} from "../convertBrl/convert.js";

export default function AddItemComponent({ saveItem, onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qtd, setQtd] = useState("");
  const [total, setTotal] = useState(0);

  function Save() {
    saveItem({
      name,
      price: Number(price),
      qtd: Number(qtd),
    });
  }

  useEffect(() => {
    setTotal(convertNumToBrl(Number(qtd) * Number(price)));
  }, [price, qtd]);

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.CardItem}>
          <View style={styles.itemField}>
            <Text style={styles.label}>Nome do produto:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.itemField}>
            <Text style={styles.label}>Preço do produto:</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.itemField}>
            <Text style={styles.label}>Quantidade do produto:</Text>
            <TextInput
              style={styles.input}
              value={qtd}
              onChangeText={setQtd}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
          </View>

          <Text style={styles.totalPreview}>{total}</Text>

          <Pressable
            style={({ pressed }) => [
              styles.buttonAdd,
              pressed && styles.pressed,
            ]}
            onPress={Save}
          >
            <Text style={styles.buttonText}>Salvar item</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  CardItem: {
    backgroundColor: "#4d4c4cd3",
    width: "90%",
    maxWidth: 450,
    minHeight: 350,
    borderRadius: 12,
    borderWidth: 1.6,
    borderColor: "#141414",
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
    gap: 15,
  },
  itemField: {
    width: "100%",
    alignItems: "center",
    marginVertical: 5,
  },
  label: {
    fontSize: 17,
    marginBottom: 5,
    color: "#e5e5e5",
  },
  input: {
    width: "80%",
    maxWidth: 300,
    height: 40,
    backgroundColor: "#7a7a7ad3",
    borderWidth: 1,
    borderColor: "#1e1e1e",
    borderRadius: 8,
    color: "#ffffff",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  totalPreview: {
    fontSize: 18,
    color: "#46e408",
    fontWeight: "bold",
  },
  buttonAdd: {
    backgroundColor: "#ee8a2d",
    width: "60%",
    maxWidth: 200,
    height: 45,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2e2e2e",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});