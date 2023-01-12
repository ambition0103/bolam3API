import { StatusBar } from "expo-status-bar";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "@emotion/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

// 컴포넌트명 변경했습니다 App => ReadBooks
export default function ReadBooks() {
  const navigation = useNavigation();

  // const goDetail = () => {
  //   navigation.navigate("Stacks", { screen: "Detail" });
  // };

  const [finishedBookData, setFinishedBookData] = useState([]);

  const [finishedBookCount, setFinishedBookCount] = useState(0);
  const [goalBooksCount, setGoalBooksCount] = useState(0);

  const finishedBooks = async () => {
    try {
      const serverFinishedBooks = await axios.get(
        `http://172.30.1.39:4000/data`
      );
      // npm start 해서 나오는 자신의 주소로 봐꾸셔야 실행이 됩니다!
      setFinishedBookData(serverFinishedBooks.data);
      const allReadBooks = finishedBookData.map((allRead) => allRead.length);
      setGoalBooksCount(allReadBooks.length);
      const trueReadBooks = finishedBookData.filter(
        (allRead) => allRead.isDone === true
      );
      setFinishedBookCount(trueReadBooks.length);
    } catch (error) {
      console.log("Error 가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    finishedBooks();
  }, []);

  return (
    <FinishedPage horizontal={false}>
      <SafeAreaView style={{ alignItems: "stretch" }}>
        <FinishedTitle>
          🏆 총 {finishedBookCount} 권의 책을 읽었어요!
        </FinishedTitle>
        <FinishedSubTitle>📚 나의 목표: {goalBooksCount} 권</FinishedSubTitle>
        <FinishedListWrapper style={styles.stylegridView}>
          {finishedBookData.map((obj) =>
            obj.isDone === true ? (
              <FinishedCard
                onPress={() =>
                  navigation.navigate("Stacks", {
                    screen: "Detail",
                    params: obj,
                  })
                }
                key={obj.id}
              >
                <FinishedImg
                  source={{
                    uri: obj.imgUri,
                  }}
                />
                <FinishedText>
                  <FinishedCardTitle>{obj.title}</FinishedCardTitle>
                  <FinishedRating>⭐ {obj.rating} / 5</FinishedRating>
                </FinishedText>
              </FinishedCard>
            ) : null
          )}
        </FinishedListWrapper>
        <StatusBar style="auto" />
      </SafeAreaView>
    </FinishedPage>
  );
}

const FinishedPage = styled.ScrollView`
  flex: 1;
`;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
  stylegridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    // justifyContent: "space-between",
    // marginLeft: 15,
    // marginRight: 5,
    marginLeft: 13,
  },
});

const FinishedTitle = styled.Text`
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #513d34;
  text-align: center;
  color: ${(props) => props.theme.text};
`;

const FinishedSubTitle = styled.Text`
  margin-top: 10px;
  margin-right: 24px;
  margin-bottom: -7px;
  font-size: 17px;
  font-weight: 500;
  text-align: right;
  color: #513d34;
  color: ${(props) => props.theme.text};
`;

const FinishedListWrapper = styled.View`
  justify-content: center;
`;

const FinishedCard = styled.TouchableOpacity`
  margin-top: 20px;
  margin-right: 10px;
  width: 170px;
  height: 250px;
  background-color: #e2d9ce;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const FinishedText = styled.View`
  width: 100%;
`;

const FinishedCardTitle = styled.Text`
  color: #513d34;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
`;

const FinishedRating = styled.Text`
  color: #6a6c6b;
  font-size: 13px;
  font-weight: 400;
  text-align: right;
  margin-top: 2px;
  margin-right: 12px;
`;

const FinishedImg = styled.Image`
  width: 170px;
  height: 210px;
  margin-top: -9px;
  margin-bottom: 4px;
`;
