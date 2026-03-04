import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {

  const [valorAtual, setValorAtual] = useState("0");
  const [valorAnterior, setValorAnterior] = useState(null);
  const [operador, setOperador] = useState(null);
  const [expressao, setExpressao] = useState("");


  function calcularExpressao(n1, op, n2) {
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    if (op === "+") return num1 + num2;
    if (op === "-") return num1 - num2;
    if (op === "×") return num1 * num2;

    if (op === "÷") {
      if (num2 === 0) return "Erro"; 
      return num1 / num2;
    }

    return "Erro";
  }

  function inserirNumero(num) {
    if (num === "." && valorAtual.includes(".")) return;

    if (valorAtual === "0" && num !== ".") {
      setValorAtual(num);
    } else {
      setValorAtual(valorAtual + num);
    }
  }

  function escolherOperador(op) {
    if (operador !== null) return; 

    setValorAnterior(valorAtual);
    setOperador(op);
    setExpressao(valorAtual + " " + op);
    setValorAtual("0");
  }

  function calcular() {
    if (!operador || valorAnterior === null) return;

    const resultado = calcularExpressao(valorAnterior, operador, valorAtual);

    if (resultado === "Erro") {
      setValorAtual("Erro");
    } else {
      setValorAtual(String(resultado));
    }

    setOperador(null);
    setValorAnterior(null);
    setExpressao("");
  }

  function limpar() {
    setValorAtual("0");
    setValorAnterior(null);
    setOperador(null);
    setExpressao("");
  }

  function inverterSinal() {
    if (valorAtual !== "0") {
      setValorAtual(String(parseFloat(valorAtual) * -1));
    }
  }

  function raizQuadrada() {
    const numero = parseFloat(valorAtual);

    if (numero < 0) {
      setValorAtual("Erro"); 
      return;
    }

    const resultado = Math.sqrt(numero);

    setValorAtual(String(resultado));
    setExpressao("√(" + numero + ")");
  }


  function Botao({ texto, onPress, tipo, grande }) {
    return (
      <TouchableOpacity
        style={[
          styles.botao,
          grande && styles.botaoGrande,
          tipo === "operador" && styles.operador,
          tipo === "especial" && styles.especial
        ]}
        onPress={onPress}
      >
        <Text style={styles.texto}>{texto}</Text>
      </TouchableOpacity>
    );
  }


  return (
    <View style={styles.container}>

      <View style={styles.display}>
        <Text style={styles.expressao}>{expressao}</Text>
        <Text
          style={styles.resultado}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {valorAtual}
        </Text>
      </View>

      <View style={styles.teclado}>
        <Botao texto="AC" onPress={limpar} tipo="especial" />
        <Botao texto="+/-" onPress={inverterSinal} tipo="especial" />
        <Botao texto="√" onPress={raizQuadrada} tipo="especial" />
        <Botao texto="÷" onPress={() => escolherOperador("÷")} tipo="operador" />

        <Botao texto="7" onPress={() => inserirNumero("7")} />
        <Botao texto="8" onPress={() => inserirNumero("8")} />
        <Botao texto="9" onPress={() => inserirNumero("9")} />
        <Botao texto="×" onPress={() => escolherOperador("×")} tipo="operador" />

        <Botao texto="4" onPress={() => inserirNumero("4")} />
        <Botao texto="5" onPress={() => inserirNumero("5")} />
        <Botao texto="6" onPress={() => inserirNumero("6")} />
        <Botao texto="-" onPress={() => escolherOperador("-")} tipo="operador" />

        <Botao texto="1" onPress={() => inserirNumero("1")} />
        <Botao texto="2" onPress={() => inserirNumero("2")} />
        <Botao texto="3" onPress={() => inserirNumero("3")} />
        <Botao texto="+" onPress={() => escolherOperador("+")} tipo="operador" />

        <Botao texto="0" onPress={() => inserirNumero("0")} grande />
        <Botao texto="." onPress={() => inserirNumero(".")} />
        <Botao texto="=" onPress={calcular} tipo="operador" />
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    padding: 20
  },

  display: {
    backgroundColor: "#D9D9D9",
    borderRadius: 40,
    padding: 25,
    marginBottom: 30,
    height: 200,
    justifyContent: "center",
    alignItems: "flex-end"
  },

  expressao: {
    fontSize: 25,
    color: "#333",
    marginBottom: 10
  },

  resultado: {
    fontSize: 60,
    color: "#000",
    fontWeight: "300",
    maxWidth: "100%"
  },

  teclado: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  botao: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "#D100D1",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18
  },

  botaoGrande: {
    width: "48%",
    aspectRatio: 2
  },

  operador: {
    backgroundColor: "#19B5E4"
  },

  especial: {
    backgroundColor: "#8E008E"
  },

  texto: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold"
  }
});