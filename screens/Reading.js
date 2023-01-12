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
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

// 컴포넌트명 변경했습니다 App => ReadingBooks
export default function ReadingBooks() {
  // 버튼 누르면 Add 페이지로 이동
  const navigation = useNavigation();
  const goAdd = () => {
    navigation.navigate("Stacks", { screen: "Add" });
  };

  //json 데이터 가져오기
  const [readingBookData, setReadingBookData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get("http://172.30.1.39:4000/data");
      setReadingBookData(res.data);
    } catch (error) {
      console.log("Error!", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ReadingPage horizontal={false}>
      <SafeAreaView style={{ alignItems: "stretch" }}>
        <ReadingTitle>📚 독서리스트 추가하기</ReadingTitle>

        <ReadAddButton onPress={goAdd} style={{ backgroundColor: "#E7DFD4" }}>
          <ReadAddButtonText>➕</ReadAddButtonText>
        </ReadAddButton>

        <ReadingListWrapper style={styles.stylegridView}>
          {readingBookData.map((obj) =>
            obj.isDone === false ? (
              <ReadingCard
                onPress={() =>
                  navigation.navigate("Stacks", {
                    screen: "Detail",
                    params: obj,
                  })
                }
                key={obj.id}
              >
                <ReadingImg
                  source={{
                    uri: obj.imgUri,
                  }}
                />
                <ReadingText>
                  <ReadingCardTitle>{obj.title}</ReadingCardTitle>
                  <ReadingCardAuthor>⭐ {obj.rating} / 5</ReadingCardAuthor>
                </ReadingText>
              </ReadingCard>
            ) : null
          )}
        </ReadingListWrapper>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ReadingPage>
  );
}

const ReadingPage = styled.ScrollView`
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
    marginLeft: 13,
    // margin: "auto",
    // justifyContent: "space-between",
    // width: "100%",
    // justifyContent: "center",
    // marginRight: 5,
  },
});

const ReadingTitle = styled.Text`
  margin-top: 20px;
  font-size: 18px;
  color: #513d34;
  text-align: left;
  margin-left: 55px;
  color: ${(props) => props.theme.text};
`;

const ReadAddButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: 10px;
  width: 300px;
  height: 150px;
  border-radius: 25px;
`;

const ReadAddButtonText = styled.Text`
  text-align: center;
  color: white;
`;

const ReadingListWrapper = styled.View`
  /* padding-left: 20px; */
  /* padding-right: 20px; */
  justify-content: center;
`;

const ReadingCard = styled.TouchableOpacity`
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

const ReadingText = styled.View`
  width: 100%;
`;

const ReadingCardTitle = styled.Text`
  color: #513d34;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
`;

const ReadingCardAuthor = styled.Text`
  color: #6a6c6b;
  font-size: 13px;
  font-weight: 400;
  text-align: right;
  margin-top: 2px;
  margin-right: 12px;
`;

const ReadingImg = styled.Image`
  width: 170px;
  height: 210px;
  margin-top: -9px;
  margin-bottom: 4px;
`;
