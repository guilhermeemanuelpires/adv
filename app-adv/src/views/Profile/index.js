import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import {
    Container,
    ContainerTitle,
    Title,
    ContainerCardMain,
    ContentCardMain,
    ContainerImage,
    ViewImage,
    ContainerSettings,
    Settings,
    ContainerCardMainNameUser,
    CardMainNameUser,
    ContainerScore,
    ViewImageProfile,
    Separator,
    Score,
    ScoreTitle,
    Value,
    ContainerCard,
    ContentCard,
    Card,
    CardContent,
    CardContainerImage,
    CardImage,
    CardText,
    Styles,
    BackButton,
    ContainerHeader
} from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from '@expo/vector-icons';
const ImageUser = require("../../../assets/images/ImageUser.png");
// const ImageProfile = require("../../../assets/images/ImageProfile.png");
// const ImageReport = require("../../../assets/images/ImageReport.png");

export const Profile = () => {
    const [user, setUser] = useState({});
    const navigation = useNavigation();

    const fetchUser = async () => {
        const data = await AsyncStorage.getItem("user");
        console.log(data)
        setUser(JSON.parse(data));
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handledReport = () => {
        navigation.navigate("AddressRegister", { userId: user.id });
    };

    const handledSettings = () => {
        navigation.navigate("Settings");
    };

    const handlerBack = () => {
        navigation.reset({
            routes: [{ name: "ViewMap" }],
        });
    };

    return (
        <Container>
            <ContainerHeader>
                <BackButton onPress={handlerBack}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </BackButton>
                <ContainerTitle>
                    {/* <Title>Perfil</Title> */}
                </ContainerTitle>
            </ContainerHeader>

            <ContainerCardMain style={Styles.CardStyle}>
                <ContentCardMain>
                    <ContainerImage>
                        <ViewImage source={user.url ? { uri: user.url } : ImageUser}/>
                        <ContainerSettings onPress={handledSettings}>
                            <Settings>
                                <Ionicons name="settings-sharp" size={20} color="white" />
                            </Settings>
                        </ContainerSettings>
                    </ContainerImage>

                    <ContentCard>
                        <ContainerCardMainNameUser>
                            <CardMainNameUser>Dr. {user.name}</CardMainNameUser>
                        </ContainerCardMainNameUser>
                        {/* <ContainerScore>
                            <ViewImageProfile source={ImageProfile}></ViewImageProfile> */}
                            {/* <Separator /> */}
                            {/* <Score>
                                 <ScoreTitle>Pontos Disponíveis</ScoreTitle>
                                <Value>300 pts</Value> 
                            </Score> 
                        </ContainerScore>*/}
                    </ContentCard>
                    
                </ContentCardMain>

            </ContainerCardMain>

            <ContainerCard>
                <Card style={Styles.CardStyle} onPress={handledReport}>
                    <CardContent>
                        <CardContainerImage >
                            {/* <CardImage source={ImageReport} /> */}
                            <Octicons name="location" size={75} color="#ffff" />
                        </CardContainerImage>
                        <CardText>Endereços</CardText>
                    </CardContent>
                </Card>
            </ContainerCard>

        </Container>
    );
}