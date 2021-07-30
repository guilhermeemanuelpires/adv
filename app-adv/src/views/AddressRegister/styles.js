import React from "react";
import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export const Container = styled.SafeAreaView`
  background-color: #f0f3f8;
  flex: 1;
  height: 100%;
`;

export const ContainerHeader = styled.View`
  width: 100%;
  top: 12%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ContainerTitle = styled.View`
  width: 85%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
  margin-left: 5%;
  width: 15%;
  height: 30px;
`;

export const Title = styled.Text`
  font-family: "AveriaSansLibre_400Regular";
  font-size: 25px;
`;

export const Scroller = styled.ScrollView`
  margin-top: 14%;
  height: 100%;
`;

export const Form = styled.SafeAreaView`
  top: 2%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
export const Input = styled.TextInput`
  margin-top: 2%;
  width: 85%;
  height: 60px;
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 100px;
  font-family: "RobotoRegular";
  color: rgba(0, 0, 0, 0.4);
  padding-left: 20px;
  padding-right: 20px;
`;

export const TextError = styled.Text`
  margin-top: 2%;
  font-family: "RobotoRegular";
  font-size: 15px;
  color: #fd5555;
  text-align: center;
  margin-left: 10%;
  margin-right: 10%;
`;

export const BtnRegister = styled.TouchableOpacity`
  margin-top: 5%;
  margin-bottom: 5%;
  width: 85%;
  height: 60px;
  background: #2d8eff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

export const FakeDropdown = styled.View`
  margin-top: 2%;
  width: 85%;
  height: 60px;
  background: #fafafa;
  border: 1px solid rgba(0, 0, 0, 0.13);
  border-radius: 100px;
  font-family: "RobotoRegular";
  color: rgba(0, 0, 0, 0.4);
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
`;

// !Style para fazer shadow do button
export const Styles = StyleSheet.create({
  ButtonStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  InputError: {
    borderColor: "rgba(255, 14, 14, 0.5)",
    color: "rgba(255, 14, 14, 0.5)",
  },
  InputFocus: {
    borderColor: "rgba(45, 142, 255, 0.7)",
  },

  Dropdown: {
    marginTop: "2%",
    width: "85%",
    height: 60,
    backgroundColor: "#fafafa",
    borderColor: "solid rgba(0, 0, 0, 0.13)",
    borderWidth: 1,
    borderRadius: 100,
    fontFamily: "RobotoRegular",
    paddingLeft: 10,
    justifyContent: "center",
  },
});

export const BtnText = styled.Text`
  font-family: "RobotoBold";
  font-size: 16px;
  color: #fff;
`;
