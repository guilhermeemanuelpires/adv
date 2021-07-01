import React, { useEffect, useState } from "react";
import {
    AntDesign,
    FontAwesome,
    FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import {
    Container,
    Scroller,
    SearchArea,
    SearchInput,
    SearchIcon,
    MarkerContainer,
    ContainerMarkerIcon,
    CalloutContainer,
    CalloutImageContainer,
    CalloutImage,
    CalloutContainerText,
    CalloutText,
    CalloutContainerTextKM,
    CalloutTextKM,
    CalloutIcon,
    Styles,
    HeaderArea,
    SelectedArea,
    BtnFloating,
    BtnText
} from "./styles";

const CalloutPng = require("../../../assets/images/map-marker.png");
const MyPng = require("../../../assets/images/my-location-pin-1.png");
import api from "../../api/index";
import { Alert } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';

export const ViewMap = () => {

    const [myLocation, setMyLocation] = useState();
    const [position, setPosition] = useState();
    const [locationsUsersData, setLocationsUsersData] = useState();
    const [categoryData, setCategoryData] = useState([]);
    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Todos', value: '0' },
        { label: 'Direito Civil', value: '1' },
        { label: 'Direito Penal ', value: '2' },
        { label: 'Direito Tributário', value: '3' },
        { label: 'Direito Trabalhista', value: '4' },
        { label: 'Direito Contratual', value: '5' }
    ]);

    function handlerSelectMapPosition(event) {
        // setPosition(event.nativeEvent.coordinate);
    }

    const fetchLocations = async () => {
        await api.get("findUsersLocation")
            .then(async (response) => {
                const { locationsUsers } = response.data;
                setLocationsUsersData(locationsUsers);
                // console.log(locationsUsers);
            }).catch((error) => {
                console.log(error);
                Alert.alert("Erro!", "Verique se está conectado a internet");
            });
    }

    const fetchCategorys = async () => {
        await api.get("category")
            .then(async (response) => {
                const { category } = response.data;
                setCategoryData(category);
            }).catch((error) => {
                console.log(error);
                Alert.alert("Erro!", "Verique se está conectado a internet");
            });
    }

    const handlerLogin = () => {
        navigation.navigate("Login");
    }

    useEffect(() => {
        (async () => {

            fetchLocations();
            // fetchCategorys();

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Ative as permissões de uso do GPS para acessar o APP");
            } else {
                let location = await Location.getCurrentPositionAsync({});
                const data = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                }
                setMyLocation(data);
            }
        })();
    }, []);

    return (

        <Container>

            {/* <HeaderArea >
                <SearchArea>
                    <SearchIcon>
                        <AntDesign name="search1" size={30} color="#DADADA" />
                    </SearchIcon>
                    <SearchInput placeholder="pesquisar..." />

                </SelectedArea> 
            </HeaderArea >*/}
            {/* 
            {myLocation && locationsUsersData ? (
                <HeaderArea>

                    <SelectedArea>
                        < DropDownPicker
                            mode="BADGE"
                            placeholder="Filtro Aria de atuação"
                            multiple={true}
                            min={1}
                            max={3}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            zIndex={2000}
                            zIndexInverse={2000}
                        />
                    </SelectedArea>
                </HeaderArea>
            ) : []} */}
            {
                myLocation && locationsUsersData ? (
                    <MapView
                        style={Styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: myLocation.latitude,
                            longitude: myLocation.longitude,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008,
                        }}
                        onPress={handlerSelectMapPosition}
                    >
                        <Marker
                            calloutAnchor={{ x: 0.3, y: 3 }}
                            title="Seu Local"
                            icon={MyPng}
                            coordinate={{
                                latitude: myLocation.latitude,
                                longitude: myLocation.longitude,
                            }}
                        />

                        {position && (
                            <Marker
                                icon={MyPng}
                                coordinate={{
                                    latitude: position.latitude,
                                    longitude: position.longitude,
                                }}
                            />
                        )}

                        {locationsUsersData.map((locationsUsers) => {
                            const { locations } = locationsUsers;
                            return (
                                locations.map((location) => {
                                    return (
                                        <Marker
                                            calloutAnchor={{ x: 0.3, y: 3 }}
                                            coordinate={{
                                                latitude: location.latitude,
                                                longitude: location.longitude,
                                            }}
                                            key={location.id}
                                        >
                                            <MarkerContainer>
                                                <ContainerMarkerIcon>
                                                    <FontAwesome5
                                                        name="balance-scale"
                                                        size={24}
                                                        color="white"
                                                    />
                                                </ContainerMarkerIcon>
                                            </MarkerContainer>
                                            <Callout tooltip>
                                                <CalloutContainer>
                                                    <CalloutImageContainer>
                                                        <CalloutImage source={CalloutPng} resizeMode="cover" />
                                                    </CalloutImageContainer>
                                                    <CalloutContainerText>
                                                        <CalloutText>{location.description}</CalloutText>
                                                        <CalloutContainerTextKM>
                                                            <FontAwesome5
                                                                name="map-marker-alt"
                                                                size={24}
                                                                color="#03A678"
                                                            />
                                                            <CalloutTextKM>2 km</CalloutTextKM>
                                                        </CalloutContainerTextKM>
                                                    </CalloutContainerText>
                                                    <CalloutIcon>
                                                        <FontAwesome name="qrcode" size={60} color="#03A678" />
                                                    </CalloutIcon>
                                                </CalloutContainer>
                                            </Callout>
                                        </Marker>
                                    );
                                })
                            );
                        })}
                    </MapView>


                ) : <CalloutText>Carregando..</CalloutText>}

            <BtnFloating
                onPress={handlerLogin}
            >
                <BtnText>Login</BtnText>
            </BtnFloating>

        </Container >
    );
}