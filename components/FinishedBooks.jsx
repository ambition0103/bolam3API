import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "@emotion/native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import { LIGHTGRAY_COLOR } from "../colors";
import { Theme } from "@react-navigation/native";

function FinishedBooks() {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  // const goDetail = () => {
  //   navigation.navigate("Stacks", { screen: "Detail" });
  // };

  const goFinished = () => {
    navigation.navigate("Tabs", { screen: "Finished" });
  };

  const [finishedBookData, setFinishedBookData] = useState([]);

  const finishedBooks = async () => {
    try {
      const serverFinishedBooks = await axios.get(
        `http://172.30.1.39:4000/data`
      );
      // npm start 해서 나오는 자신의 주소로 봐꾸셔야 실행이 됩니다!
      setFinishedBookData(serverFinishedBooks.data);
    } catch (error) {
      console.log("Error 가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    finishedBooks();
  }, []);

  return (
    <ReadBook>
      <ReadingBookText>
        <ReadingBookTextTitle>완독한 책</ReadingBookTextTitle>
        <More>
          <MoreText onPress={goFinished}>더보기</MoreText>
        </More>
      </ReadingBookText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {finishedBookData.map((obj) =>
          obj.isDone === true ? (
            <Poster
              onPress={() =>
                navigation.navigate("Stacks", {
                  screen: "Detail",
                  params: obj,
                })
              }
              key={obj.id}
            >
              <TouchableOpacity>
                <View
                  style={{
                    shadowColor: "black",
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.5,
                    height: "auto",
                  }}
                >
                  <ReadingBookPoster
                    source={{
                      uri: obj.imgUri,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <PosterTitle>{obj.title}</PosterTitle>
            </Poster>
          ) : null
        )}
      </ScrollView>
    </ReadBook>
  );
}

export default FinishedBooks;

const ReadingBookText = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 5px;
`;
const ReadingBookTextTitle = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.text};
  font-weight: 600;
`;
const More = styled.Pressable`
  justify-content: center;
`;
const MoreText = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.text};
  justify-content: center;
  font-weight: 400;
`;
const Poster = styled.View`
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  padding-right: 10px;
`;
const PosterTitle = styled.Text`
  padding: 10px;
  color: ${(props) => props.theme.text};
`;
const ReadingBookPoster = styled.Image`
  width: 142px;
  height: 205px;
  background-color: gray;
  border-radius: 17px;
`;
const ReadBook = styled.View`
  margin: 10px 0px;
  flex: 1;
  width: 100%;
  height: 270px;
`;
