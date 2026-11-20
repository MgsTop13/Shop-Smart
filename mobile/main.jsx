import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  useWindowDimensions,
} from "react-native";

import AddItemComponent from "./components/modals/addItem.jsx";
import EditItemComponent from "./components/modals/edit.jsx";
import DeleteItemComponent from "./components/modals/delItem.jsx";
import Limit from "./components/modals/limit.jsx";
import { convertNumToBrl, convertBrlToNum } from "./components/convertBrl/convert.js";
/*Itens para teste:
    {
      name: "banana",
      qtd: 7,
      price: 5.79
    },

    {
      name: "Maça",
      qtd: 3,
      price: 1.29
    },

    {
      name: "Uva",
      qtd: 2,
      price: 4.99
    }
*/
export default function Home() {
  const [itens, setItens] = useState([]);
  const [open, setOpen] = useState(false);
  const [openL, setOpenL] = useState(false);
  const [openD, setOpenD] = useState(false);
  const [index, setIndex] = useState(null);
  const [itemDel, setItemDel] = useState(null);
  const [value, setValue] = useState(0);
  const [limit, setLimit] = useState(0);
  const [nextId, setNextId] = useState(1);

  const { width } = useWindowDimensions();
  const cardWidth = width <= 380 ? width - 40 : (width - 40 - 15) / 2;

  function addItem() {
    setOpen(!open);
  }

  function addLimit() {
    setOpenL(!openL);
  }

  function delItemModal() {
    setOpenD(!openD);
  }

  function LoadItem(item) {
    const novoTotal = value + Number(item.price) * Number(item.qtd);

    if (limit > 0 && novoTotal > limit) {
      Alert.alert(
        "Limite atingido",
        `Você atingiria o limite de R$ ${limit}. Item não adicionado!`
      );
      return false
      setOpen(false);
    }


    setItens([...itens, { ...item, id: nextId }]);
    setNextId(nextId + 1);
    setOpen(false);
    return true;
  }

  function LoadLimit(limitR) {
    setLimit(limitR);
    setOpenL(false);
  }

  function calculation() {
    let total = 0;

    for (let i = 0; i < itens.length; i++) {
      total += itens[i].price * itens[i].qtd;
    }

    setValue(convertNumToBrl(total));

    if (Number(limit) > 0 && total > Number(limit)) {
      Alert.alert(
        "Atenção",
        `Você ultrapassou o limite de R$ ${limit}!`
      );
    }
  }

  function edit(newItem) {
    let totalSemOItemAtual = 0;
    itens.forEach((it, i) => {
      if (i !== index) {
        totalSemOItemAtual += it.price * it.qtd;
      }
    });

    const precoNovo = Number(newItem.price) * Number(newItem.qtd);
    const totalFinal = totalSemOItemAtual + precoNovo;

    if (limit > 0 && totalFinal > limit) {
      Alert.alert("Limite", `A edição ultrapassaria o limite de R$ ${limit}!`);
      return;
    }

    setItens(itens.map((it, i) => (i === index ? newItem : it)));
    setIndex(null);
  }

  function deleteItem(itemR) {
    setItens(itens.filter((item) => item.id !== itemR.id));
    setOpenD(false);
  }

  useEffect(() => {
    calculation();
  }, [itens]);

  return (
    <View style={styles.shop}>
      {open && (
        <AddItemComponent
          saveItem={LoadItem}
          onClose={() => setOpen(false)}
        />
      )}

      {index !== null && (
        <EditItemComponent
          editItem={edit}
          item={itens[index]}
          onClose={() => setIndex(null)}
        />
      )}

      {openL && (
        <Limit
          saveValue={LoadLimit}
          limit2={limit}
          onClose={() => setOpenL(false)}
        />
      )}

      {openD && itemDel && (
        <DeleteItemComponent
          delItem={deleteItem}
          item={itemDel}
          onClose={() => setOpenD(false)}
        />
      )}

      <View style={styles.value}>
        <View style={styles.valueRow}>
          <Text style={styles.valueText}>O valor total é</Text>
          <Text style={styles.valueMoney}>{value}</Text>
        </View>
        <View style={styles.valueRow}>
          <Text style={styles.valueText}>Limite atual:</Text>
          <Text style={styles.valueMoney}>{convertNumToBrl(limit)}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.card}
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {itens.map((item, i) => (
          <View
            key={item.id}
            style={[styles.product, { width: cardWidth }]}
          >
            <Pressable
              style={styles.deleteBtn}
              onPress={() => {
                setItemDel(item);
                delItemModal();
              }}
            >
              <Text style={styles.deleteBtnText}>✖</Text>
            </Pressable>

            <View style={styles.itemInfo}>
              <View style={styles.topInfo}>
                <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
                </Text>
                <Text style={styles.productPrice}>
                  {convertNumToBrl(item.price)}
                </Text>
              </View>

              <Text style={styles.productQtd}>Qtd: {item.qtd}</Text>

              <View style={styles.divider} />

              <Text style={styles.subTotal}>
                {convertNumToBrl(item.price * item.qtd)}
              </Text>
            </View>

            <Pressable
              style={styles.editBtn}
              onPress={() => setIndex(i)}
            >
              <Text style={styles.editBtnText}>Editar</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttons}>
        <Pressable
          onPress={addItem}
          style={({ pressed }) => [
            styles.buttonBase,
            styles.add,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            {open ? "Fechar" : "Adicionar item"}
          </Text>
        </Pressable>

        <Pressable
          onPress={addLimit}
          style={({ pressed }) => [
            styles.buttonBase,
            styles.limitButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>
            {openL ? "Fechar" : "Adicionar limite"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shop: {
    flex: 1,
    backgroundColor: "#2e2e2e",
  },
  scroll: {
    flex: 1,
    // Compensação para o botão fixo do topo e os fixos de baixo
    marginTop: 100,
    marginBottom: 120,
  },

  // ---- Botão valor total ----
  value: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: "rgba(27,27,27,0.85)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "column", // Muda para coluna para empilhar as linhas
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    zIndex: 10,
    // ... sombras
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  valueText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e2e2e2",
  },
  valueMoney: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#46e408",
  },

  // ---- Lista de cards ----
  card: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    //gap: 15,
  },
  product: {
    backgroundColor: "#da8f3b",
    borderWidth: 2,
    borderColor: "#1e1e1e",
    borderRadius: 12,
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 15,
    minHeight: 180,
    marginBottom: 15,
  },
  deleteBtn: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#1e1e1e",
    backgroundColor: "#ff4d4d",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  deleteBtnText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  itemInfo: {
    width: "100%",
    marginTop: 25,
  },
  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
    width: "100%", // Garante que ocupe a largura toda do card
  },
  productName: {
    fontSize: 17,
    color: "#fff",
    flex: 1, // Isso faz o nome ocupar todo o espaço disponível
    marginRight: 8, // Dá um espacinho entre o nome e o preço
    // REMOVA o maxWidth: 90 daqui
  },
  productPrice: {
    fontSize: 14,
    color: "#46e408",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    flexShrink: 0, // Impede que o preço seja esmagado
  },
  productQtd: {
    fontSize: 13,
    color: "#333",
    textAlign: "right",
    marginBottom: 8,
    marginRight: 5,
  },
  divider: {
    width: "85%",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 8,
  },
  subTotal: {
    fontSize: 17,
    color: "#338812",
    fontWeight: "bold",
    textAlign: "center",
  },
  editBtn: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1e1e1e",
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    alignItems: "center",
  },
  editBtnText: {
    color: "#333",
    fontWeight: "bold",
  },

  // ---- Botões inferiores ----
  buttons: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "90%", // Em vez de 100%, use 90% para não colar nas bordas
    maxWidth: 500,
    height: 60,
    paddingHorizontal: 10, // Diminuí para dar mais espaço aos botões
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(27,27,27,0.85)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    zIndex: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  buttonBase: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  add: {
    backgroundColor: "#ee8a2d",
    flex: 1,
    marginRight: 5,
  },
  limitButton: {
    backgroundColor: "#ee2d2d",
    flex: 1,
    marginLeft: 5,
  },
});