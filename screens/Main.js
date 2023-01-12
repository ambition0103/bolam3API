import styled from "@emotion/native";
import React from "react";
import { Button, Pressable, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import FinishedBooks from "../components/FinishedBooks";
import ReadingBooks from "../components/ReadingBooks";
import { ScrollView } from "react-native-gesture-handler";
import TodayBooks from "../components/TodayBooks";

// const BOOK_KEY = process.env.REACT_APP_OPENBOOK_KEY;

function Main({ navigation: { navigate } }) {
  return (
    <MainPage>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TodayBooks />
        <ReadingBooks />
        <FinishedBooks />
      </ScrollView>
      <ReadingBooks />
    </MainPage>
  );
}

export default Main;

const MainPage = styled.View`
  padding-left: 30px;
  padding-right: 30px;
`;

// const TodayBook = styled.Text`
//   border: 1px solid gray;
//   margin: 10px 0px;
//   flex: 1;
//   width: 100%;
//   height: 280px;
// `;
// const Addbooks = styled.Text`
//   border: 1px solid gray;
//   margin: 10px 0px;
//   flex: 1;
//   width: 100%;
//   height: 250px;
// `;
// const ReadingBook = styled.View`
//   margin: 10px 0px;
//   flex: 1;
//   width: 100%;
//   height: 270px;
// `;
// const ReadingBookText = styled.View`
//   flex-direction: row;
//   justify-content: space-between;
//   padding-bottom: 5px;
// `;
// const ReadingBookTextTitle = styled.Text`
//   font-size: 20px;
//   color: #513d34;
//   font-weight: 600;
// `;
// const More = styled.Pressable`
//   justify-content: center;
// `;
// const MoreText = styled.Text`
//   font-size: 15px;
//   color: #513d34;
//   justify-content: center;
//   font-weight: 400;
// `;
// const Poster = styled.View`
//   flex-direction: column;
//   align-items: center;
//   padding-top: 10px;
//   padding-right: 10px;
// `;
// const PosterTitle = styled.Text`
//   padding: 10px;
//   color: #513d3466;
// `;
// const ReadingBookPoster = styled.Image`
//   width: 142px;
//   height: 205px;
//   background-color: gray;
//   border-radius: 17px;
// `;
// const ReadBook = styled.View`
//   margin: 10px 0px;
//   flex: 1;
//   width: 100%;
//   height: 270px;
// `;
// const MainToDayTitle = styled.Text`
//   margin-top: 10px;
//   font-size: 25px;
//   color: #513d34;
// `;

// const ToDay = styled.TouchableOpacity`
//   flex-direction: row;
//   margin-top: 15px;
//   background-color: #e2d9ce;
//   padding: 20px;
//   border-radius: 10px;
// `;

// const TodayText = styled.View`
//   padding-left: 20px;
// `;

// const ToDayTitle = styled.Text`
//   width: 140px;
//   font-size: 20px;
//   font-weight: 500;
// `;

// const ToDayOuter = styled.Text`
//   width: 150px;
//   font-size: 10px;
//   font-weight: 400;
//   text-align: right;
// `;

// const ToDayContents = styled.Text`
//   width: 140px;
// `;

// const ToDayImg = styled.Image`
//   width: 150px;
//   height: 200px;
// `;

// const AddBook = styled.Text`
//   margin-top: 10px;
//   font-size: 25px;
//   color: #513d34;
// `;

// const AddBookBack = styled.View`
//   background-color: #e2d9ce;
//   height: 160px;
//   border-radius: 25px;
//   margin-top: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const AddBookBtn = styled.TouchableOpacity`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 50px;
//   height: 50px;
// `;
