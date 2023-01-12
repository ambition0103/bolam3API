import styled from "@emotion/native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../util";
import Swiper from "react-native-swiper";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Recommend = () => {
  const [bookApiObj, setBookApiObj] = useState({
    title: "",
    author: "",
    description: "",
    cover: "",
  });
  const [etcBookImg, setEtcBookImg] = useState([]);

  const getBooks = async () => {
    try {
      const bookApi = await axios.get(
        `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbsoojae10291105001&QueryType=BlogBest&start=1&MaxResults=10&SearchTarget=Book&output=JS&Version=20131101`
      );
      const aaa = JSON.parse(bookApi.request._response);
      setBookApiObj(aaa.item[0]);
      setEtcBookImg(aaa.item.sort((a, b) => a.itemId - b.itemId));
    } catch (error) {
      console.log("Error가 발생했습니다.", error);
    }
  };

  const navigation = useNavigation();
  const goAdd = () => {
    navigation.navigate("Stacks", { screen: "Add" });
  };

  useLayoutEffect(() => {
    getBooks();
  }, []);
  // const [title, setTitle] = useState("어떤 양형 이유");
  // const [writer, setWriter] = useState("박주영");
  // const [text, setText] = useState(
  //   "'세상이 평온할수록 법정은 최소한 그만큼 참혹해진다' 판사가 써 내려간 법정 뒷면의 이야기법원은 세상의 원망과 고통, 절망과 눈물, 죽음과 절규가 모이는 곳이다. 판사는 법정에 선 모든 이의 책망과 옹호를 감당하며 판결문을 써 내려간다. 피도 눈물도, 형용사와 ..."
  // );

  return (
    <StRecommendContainer>
      <StContents>
        {/* <Swiper height="100%" showsPagination={false} autoplay loop> */}
        <StContentMain>
          <StImgContainer>
            <StImg source={{ uri: bookApiObj.cover }} />
          </StImgContainer>

          <StTitleContainer>
            <StTitle numberOfLines={1} ellipsizeMode="tail">
              {bookApiObj.title}
            </StTitle>
          </StTitleContainer>

          <StWriterContainer>
            <StWriter numberOfLines={1} ellipsizeMode="tail">
              {bookApiObj.author}
            </StWriter>
          </StWriterContainer>

          <StTextContainer>
            <StText numberOfLines={5} ellipsizeMode="tail">
              {bookApiObj.description}
            </StText>
          </StTextContainer>
        </StContentMain>

        {/* <StContentMain>
            <StImgContainer>
              <StImg source={require("../assets/icon.png")} />
            </StImgContainer>

            <StTitleContainer>
              <StTitle>{title}</StTitle>
            </StTitleContainer>

            <StWriterContainer>
              <StWriter>{writer}</StWriter>
            </StWriterContainer>

            <StTextContainer>
              <StText>{text}</StText>
            </StTextContainer>
          </StContentMain>

          <StContentMain>
            <StImgContainer>
              <StImg source={require("../assets/icon.png")} />
            </StImgContainer>

            <StTitleContainer>
              <StTitle>{title}</StTitle>
            </StTitleContainer>

            <StWriterContainer>
              <StWriter>{writer}</StWriter>
            </StWriterContainer>

            <StTextContainer>
              <StText>{text}</StText>
            </StTextContainer>
          </StContentMain>
        </Swiper> */}

        <StContentSub>
          <StSubText>📚 연관 도서</StSubText>

          {etcBookImg.length !== 0 && (
            <StSubImgsContainer>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <StSubImgContainer>
                  <StSubImg
                    source={{
                      uri: etcBookImg[1].cover,
                    }}
                  />
                </StSubImgContainer>

                <StSubImgContainer>
                  <StSubImg
                    source={{
                      uri: etcBookImg[2].cover,
                    }}
                  />
                </StSubImgContainer>

                <StSubImgContainer>
                  <StSubImg
                    source={{
                      uri: etcBookImg[3].cover,
                    }}
                  />
                </StSubImgContainer>

                <StSubImgContainer>
                  <StSubImg
                    source={{
                      uri: etcBookImg[4].cover,
                    }}
                  />
                </StSubImgContainer>
              </ScrollView>
            </StSubImgsContainer>
          )}
        </StContentSub>
      </StContents>

      <StButtons>
        <StButtonContainer onPress={goAdd}>
          <StButtonText>Add review</StButtonText>
        </StButtonContainer>
      </StButtons>
    </StRecommendContainer>
  );
};

export default Recommend;

/////////////// 레이아웃 ///////////////

const StRecommendContainer = styled.ScrollView`
  padding-left: 30px;
  padding-right: 30px;
  background-color: ${(props) => props.theme.backgroundColor};
`;

/////////////// 레이아웃, 콘텐츠 구분 ///////////////

const StContents = styled.View``;

const StContentMain = styled.View`
  margin-top: 20px;
`;

const StContentSub = styled.View``;

const StImgContainer = styled.View`
  width: ${SCREEN_WIDTH / 1.18 + "px"};
  height: ${SCREEN_HEIGHT / 3.5 + "px"};
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const StImg = styled.Image`
  width: 200px;
  height: 100%;
  margin-bottom: 5px;
  border-radius: 10px;
  border: 1px;
`;

const StTitleContainer = styled.View``;

const StTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: ${(props) => props.theme.text};
`;

const StWriterContainer = styled.View`
  flex-direction: row-reverse;
`;

const StWriter = styled.Text`
  margin-bottom: 5px;
  font-size: 13px;
  color: ${(props) => props.theme.text};
`;

const StTextContainer = styled.View``;

const StText = styled.Text`
  color: ${(props) => props.theme.text};
  line-height: 20px;
  font-size: 13px;
`;

const StSubText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  margin-top: 20px;
  color: ${(props) => props.theme.text};
`;

const StSubImgsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
  margin-top: 5px;
`;

const StSubImgContainer = styled.View`
  margin-bottom: 5px;
  margin-right: 20px;
`;

const StSubImg = styled.Image`
  width: ${SCREEN_WIDTH / 2.8 + "px"};
  height: 200px;
  border-radius: 10px;
  border: 1px;
`;

/////////////// 콘텐츠, 버튼 구분 ///////////////

const StButtons = styled.View`
  align-items: center;
`;

const StButtonContainer = styled.TouchableOpacity`
  border-radius: 5px;
  height: 40px;
  width: 250px;
  justify-content: center;
  align-items: center;
  background-color: #959d90;
`;

const StButtonText = styled.Text`
  color: white;
  font-size: 20px;
`;
