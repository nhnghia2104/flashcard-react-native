import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { IconButton } from "react-native-paper";
import { Header } from "react-native-elements";
import { connect } from "react-redux";
function MultiChoice({ cardSet, handleAnswer, currentCardIndex }) {
  const [arrayIndex, setArrayIndex] = useState([]);
  useEffect(() => {
    if (cardSet) {
      var tmpArrIndex = generateUniqueNumberArray(
        currentCardIndex,
        cardSet.cards.length
      );
      tmpArrIndex.push(currentCardIndex);
      tmpArrIndex = shuffle(tmpArrIndex);
      setArrayIndex(tmpArrIndex);
    }
  }, []);
  return (
    <>
      {cardSet && (
        <View style={styles.container}>
          <View style={styles.question}>
            <View style={styles.card}>
              <Text style={styles.textQuestion}>
                {cardSet.cards[currentCardIndex].data.front.text}
              </Text>
              <Image
                style={styles.icon}
                source={require("../../assets/icon/question/question.png")}
              />
            </View>
          </View>
          <ScrollView scrollEnabled style={styles.answer}>
            <Text style={styles.answerHeader}>Choose the best answer</Text>
            {arrayIndex.map((item, index) => (
              <AnswerOption
                key={index}
                index={index}
                text={cardSet.cards[item].data.back.text}
                isAnswer={item == currentCardIndex}
                onPress={(isAnswer) => handleAnswer(isAnswer, item)}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

function generateUniqueNumberArray(except, max) {
  var arr = [];
  var target = max < 3 ? max - 1 : 3;
  while (arr.length < target) {
    var r = Math.floor(Math.random() * max);
    if (arr.indexOf(r) === -1 && r != except) arr.push(r);
  }
  return arr;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const AnswerOption = ({ index, text, onPress, isAnswer }) => {
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [selected, setSelected] = useState(false);
  const handleAnswer = () => {
    setBackgroundColor(isAnswer ? "#70DA7B" : "#D75050");
    setSelected(true);
    onPress(isAnswer);
  };

  return (
    <TouchableOpacity onPress={handleAnswer}>
      <View style={[styles.answerOption, { backgroundColor: backgroundColor }]}>
        <Text
          style={[
            styles.textAnswer,
            {
              color: selected ? "#fff" : "#333333",
              fontWeight: selected ? "bold" : "600",
            },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom:
      (Dimensions.get("screen").height - Dimensions.get("window").height) * 2,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  question: {
    height: "34%",
    justifyContent: "center",
    alignContent: "center",
  },
  textQuestion: {
    textAlign: "center",
    color: "#333333",
    fontSize: 16,
  },
  answer: {
    height: "66%",
    overflow: "scroll",
  },
  textAnswer: {
    fontSize: 15,
    color: "#333333",
  },
  answerHeader: {
    color: "#333333",
    fontSize: 16,
    margin: 20,
    fontWeight: "bold",
  },
  answerOption: {
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    // borderWidth: 2,
    // borderColor: "#E0FCFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    position: "absolute",
    transform: [{ rotate: "25deg" }],
    tintColor: "#FFDB6C",
    right: -10,
    top: -15,
    width: 36,
    height: 36,
  },
});
const selector = (store, props) => {
  return {
    data: store.game.data,
  };
};
export default MultiChoice;
