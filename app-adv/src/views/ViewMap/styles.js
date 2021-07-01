import styled from "styled-components/native";
import { StyleSheet, Dimensions } from "react-native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const Scroller = styled.ScrollView`
`;

export const HeaderArea = styled.View`
   height: 50%;
   width: 100%;
`;

export const HeaderContent = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const SearchArea = styled.View`
  margin-left: 2%;
  margin-right: 2%;
`;

export const SelectedArea = styled.View`
  margin-left: 2%;
  margin-right: 2%;
`
export const SearchInput = styled.TextInput`
    background-color: red;
    height: 50px;
    width: 90%;
    background: #fafafa;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 15px;
    justify-content: center;
     
`;
export const SearchIcon = styled.View`
  align-items: center;
  justify-content: center;
  width: 50px;
`;

export const MarkerContainer = styled.TouchableOpacity`
  position: absolute;
  width: 45px;
  height: 45px;
  background: #4D4845;
  border-top-right-radius: 70px;
  border-top-left-radius: 70px;
  border-bottom-right-radius: 70px;
  transform: rotate(-46.26deg);
  align-items: center;
  justify-content: center;
`;

export const ContainerMarkerIcon = styled.View`
  transform: rotate(46.26deg);
`;
export const MarkerText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: green;
`;


export const CalloutContainer = styled.View`
  height: 100px;
  width: 300px;
  background: #ffffff;
  border-radius: 13px;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`;

export const CalloutImageContainer = styled.Text`
  padding-bottom: 40px;
`;

export const CalloutImage = styled.Image``;

export const CalloutContainerText = styled.View``;

export const CalloutText = styled.Text`
  color: #333333;
  font-size: 18px;
`;

export const CalloutContainerTextKM = styled.View`
  flex-direction: row;
`;

export const CalloutTextKM = styled.Text`
  left: 5px;
  color: green;
`;

export const CalloutIcon = styled.View``;

export const BtnFloating = styled.TouchableOpacity`
  position: absolute;
  width: 20%;
  height: 10%;
  bottom:5%;
  right: 10%;
  background: #2d8eff;
  box-shadow: 0px 4px 4px rgba(1, 1, 1, 1);
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const BtnText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

// !Style para fazer shadow do button
export const Styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  MarkerStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    zIndex: 1,
    elevation: 10,
  },
  PetalaStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
    zIndex: 1,
  },
});