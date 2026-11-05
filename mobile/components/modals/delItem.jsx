import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

export default function DeleteItemComponent({ delItem, item, onClose }) {
  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.CardItem}>
          <Text style={styles.title}>
            Você quer mesmo remover{" "}
            <Text style={styles.strong}>{item.name}</Text>?
          </Text>

          <View style={styles.buttonsDelete}>
            <Pressable
              style={({ pressed }) => [
                styles.buttonBase,
                styles.buttonCancel,
                pressed && styles.pressed,
              ]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.buttonBase,
                styles.buttonDelete,
                pressed && styles.pressed,
              ]}
              onPress={() => delItem(item)}
            >
              <Text style={styles.buttonText}>Deletar</Text>
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
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  title: {
    fontSize: 19,
    lineHeight: 27,
    color: "#e5e5e5",
    textAlign: "center",
    marginBottom: 10,
  },
  strong: {
    color: "#ee8a2d",
    fontWeight: "bold",
  },
  buttonsDelete: {
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
  buttonCancel: {
    backgroundColor: "#444",
  },
  buttonDelete: {
    backgroundColor: "#ee2d2d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },
});