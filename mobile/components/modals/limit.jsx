import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";
import {convertNumToBrl, convertBrlToNum} from "../convertBrl/convert.js";

export default function Limit({ saveValue, limit2, onClose }) {
  const [limit, setLimit] = useState("");

  function Save() {
    saveValue(convertNumToBrl(limit));
  }

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.limit}>
          <Text style={styles.title}>Digite o limite:</Text>

          <TextInput
            style={styles.input}
            value={limit}
            onChangeText={setLimit}
            keyboardType="numeric"
            placeholderTextColor="#cccccc"
            placeholder="0"
          />

          <Text style={styles.currentLimit}>
            Limite atual: {limit2 ? limit2 : "Nenhum inserido"}
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.limitButton,
              pressed && styles.pressed,
            ]}
            onPress={Save}
          >
            <Text style={styles.buttonText}>Salvar Limite</Text>
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
  limit: {
    backgroundColor: "#4d4c4cd3",
    color: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    borderRadius: 12,
    borderWidth: 1.6,
    borderColor: "#141414",
    width: "90%",
    maxWidth: 400,
    minHeight: 250,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: "#e5e5e5",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "80%",
    maxWidth: 250,
    height: 40,
    backgroundColor: "#7a7a7ad3",
    borderWidth: 1,
    borderColor: "#1e1e1e",
    borderRadius: 8,
    color: "#ffffff",
    paddingLeft: 15,
    fontSize: 16,
  },
  currentLimit: {
    fontSize: 15,
    color: "#e5e5e5",
    textAlign: "center",
  },
  limitButton: {
    backgroundColor: "#ee8a2d",
    width: "50%",
    maxWidth: 150,
    height: 40,
    borderRadius: 12,
    borderWidth: 1.9,
    borderColor: "#2e2e2e",
    marginTop: 10,
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