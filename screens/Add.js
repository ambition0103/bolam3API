import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import { AntDesign } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useEffect } from "react";
import useColorScheme from "react-native/Libraries/Utilities/useColorScheme";
import axios from "axios";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import { getDataFromServer } from "../api";

const Add = ({ navigation: { goBack, navigate } }) => {
  const isDark = useColorScheme() === "dark";

  const [imgUri, setImgUri] = useState("");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [rating, setRating] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [bestSentence, setbestSentence] = useState("");
  const [myThinking, setMyThinking] = useState("");

  // const [allData, setAllData] = useState({
  //   imgUri: "",
  //   title: "",
  //   writer: "",
  //   period: "",
  //   isDone: false,
  //   bestSentence: "",
  //   myThinking: ""
  // })
  // const [rating, setRating] = useState(0);

  // console.log("imgUri: ", imgUri);

  // 데이터 구조
  const data = {
    id: uuid.v4(),
    imgUri: imgUri,
    title: title,
    writer: writer,
    rating: rating,
    isDone: isDone,
    bestSentence: bestSentence,
    myThinking: myThinking,
  };

  // 별점 기록
  const getRatings = (ratings) => {
    setRating(ratings);
  };

  // json-server 추가
  const postData = async () => {
    if (
      imgUri === "" ||
      title === "" ||
      writer === "" ||
      rating === 0 ||
      bestSentence === "" ||
      myThinking === ""
    ) {
      alert("입력을 완료해주세요");
      return;
    } else if (myThinking.length < 10) {
      alert("나의 생각을 10글자 이상 작성해주세요.");
      return;
    }
    Alert.alert("리드미 작성", "리드미를 작성하시겠습니까?", [
      { text: "취소", style: "destructive" },
      {
        text: "작성",
        onPress: async () => {
          try {
            // console.log("data: ", data);
            await axios.post("http://172.30.1.39:4000/data", data);
            goBack();
            // navigate("Tabs", { screen: "Finished" })
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);
  };

  // 이미지 업로드
  const imageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log("result.assets[0].uri: ", result.assets[0].uri);
    setImgUri(result.assets[0].uri);

    if (!result.canceled) {
      setImgUri(result.assets[0].uri);
    }
  };

  // json-server 조회 : react-query
  // const { data: fromServerData, isLoading: isLoadingData } = useQuery(
  //   "getDataKey",
  //   getDataFromServer
  // );

  return (
    <StAddContainer scrollIndicatorInsets={{ right: 1 }}>
      <StContents>
        <StImageContainer onPress={imageUpload}>
          {imgUri ? (
            <StImage source={{ uri: imgUri }} />
          ) : (
            <AntDesign name="pluscircleo" size={40} color="white" />
          )}
        </StImageContainer>

        <StOnelineInputContainer>
          <StOnelineText>제목</StOnelineText>
          <StOnelineInput value={title} onChangeText={setTitle} />
        </StOnelineInputContainer>

        <StOnelineInputContainer>
          <StOnelineText>저자</StOnelineText>
          <StOnelineInput value={writer} onChangeText={setWriter} />
        </StOnelineInputContainer>

        <StOnelineInputContainer>
          <StOnelineText>평점</StOnelineText>
          <Rating
            onFinishRating={getRatings}
            startingValue={rating}
            style={{ marginLeft: 20 }}
            ratingCount={5}
            imageSize={30}
            tintColor={isDark ? "#333030" : "#E1DEDA"}
          />
        </StOnelineInputContainer>

        <StOnelineInputContainer>
          <StOnelineText>진행 상황</StOnelineText>
          <Picker
            value={isDone}
            selectedValue={isDone}
            onValueChange={(itemValue) => setIsDone(itemValue)}
            style={{
              backgroundColor: "white",
              width: 265,
              marginLeft: 20,
            }}
          >
            <Picker.Item label="Reading" value={false} />
            <Picker.Item label="Finished" value={true} />
          </Picker>
        </StOnelineInputContainer>

        <StOverlinesInputContainer>
          <StOverlineText>인상 깊었던 문장</StOverlineText>
          <StLinesInput
            value={bestSentence}
            multiline
            numberOfLines={2}
            style={{ height: 80 }}
            onChangeText={setbestSentence}
          />
        </StOverlinesInputContainer>

        <StOverlinesInputContainer>
          <StOverlineText>나의 생각</StOverlineText>
          <StLinesInput
            value={myThinking}
            multiline
            numberOfLines={10}
            style={{ height: 150 }}
            onChangeText={setMyThinking}
          />
        </StOverlinesInputContainer>
      </StContents>

      <StButtons>
        <StButton style={{ backgroundColor: "#959d90" }} onPress={postData}>
          <StButtonText>Done</StButtonText>
        </StButton>
        <StButton
          style={{ backgroundColor: "#BDBDBD" }}
          onPress={() => goBack()}
        >
          <StButtonText>Cancle</StButtonText>
        </StButton>
      </StButtons>
    </StAddContainer>
  );
};

export default Add;

/////////////// 레이아웃 ///////////////

const StAddContainer = styled.ScrollView`
  padding-left: 30px;
  padding-right: 30px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

/////////////// 레이아웃, 콘텐츠 구분 ///////////////

const StContents = styled.View``;

const StImageContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${SCREEN_HEIGHT / 5 + "px"};
  background-color: #b5aeae;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const StImage = styled.Image`
  width: 70%;
  height: 100%;
  border-radius: 10px;
`;

const StOnelineInputContainer = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

const StOnelineText = styled.Text`
  font-size: 16px;
  align-self: center;
  color: ${(props) => props.theme.text};
`;

const StOnelineInput = styled.TextInput`
  flex: 1;
  margin-left: 20px;
  background-color: white;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;
`;

const StOverlinesInputContainer = styled.View``;

const StOverlineText = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.text};
`;

const StLinesInput = styled.TextInput`
  background-color: white;
  border-radius: 10px;
  margin-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
`;

/////////////// 콘텐츠, 버튼 구분 ///////////////

const StButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StButton = styled.TouchableOpacity`
  border-radius: 5px;
  height: 40px;
  width: 150px;
  justify-content: center;
  align-items: center;
`;

const StButtonText = styled.Text`
  color: white;
  font-size: 20px;
`;
