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

export default function EditItemComponent({ editItem, item, onClose }) {
  const [id] = useState(item.id);
  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(String(item.price));
  const [qtd, setQtd] = useState(String(item.qtd));
  const [total, setTotal] = useState(0);

  function save() {
    editItem({
      id,
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

          <View style={styles.buttonsAction}>
            <Pressable
              style={({ pressed }) => [
                styles.buttonBase,
                styles.buttonCancel,
                pressed && styles.pressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.buttonCancelText}>Sair</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.buttonBase,
                styles.buttonConfirm,
                pressed && styles.pressed,
              ]}
              onPress={save}
            >
              <Text style={styles.buttonConfirmText}>Salvar</Text>
            </Pressable>
          </View>
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
    backgroundColor: "#3a3a3ad3",
    width: "90%",
    maxWidth: 400,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ee8a2d",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 20,
    // sombra
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  itemField: {
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: "#b3b3b3",
  },
  input: {
    width: "90%",
    maxWidth: 320,
    height: 42,
    backgroundColor: "#2a2a2ad3",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    color: "#fff",
    paddingHorizontal: 15,
    fontSize: 16,
  },
  totalPreview: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#46e408",
    backgroundColor: "#222",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonsAction: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonBase: {
    flex: 1,
    maxWidth: 140,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfirm: {
    backgroundColor: "#46e408",
  },
  buttonConfirmText: {
    color: "#111",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonCancel: {
    backgroundColor: "#444",
  },
  buttonCancelText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});