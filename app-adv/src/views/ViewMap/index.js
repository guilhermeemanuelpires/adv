import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import {
  Container,
  Scroller,
  SearchArea,
  SearchInput,
  SearchIcon,
  Options,
  OptionsBoby,
  OptionsTitle,
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
  HeaderContent,
  SelectedArea,
  BtnFloating,
  BtnText,
} from "./styles";

import Dropdow from "../../components/dropdown";

const CalloutPng = require("../../../assets/images/map-marker.png");
const MyPng = require("../../../assets/images/my-location-pin-1.png");
import api from "../../api/index";
import { Alert } from "react-native";

export const ViewMap = () => {
  const [myLocation, setMyLocation] = useState();
  const [position, setPosition] = useState();
  const [locationsUsersData, setLocationsUsersData] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const navigation = useNavigation();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Todos", id: "0" },
    { label: "Direito Civil", id: "1" },
    { label: "Direito Penal ", id: "2" },
    { label: "Direito Tributário", id: "3" },
    { label: "Direito Trabalhista", id: "4" },
    { label: "Direito Contratual", id: "5" },
  ]);
  const [category, setCategory] = useState();
  const [categoryID, setCategoryID] = useState();
  const [categorysSelected, setCategorysSelected] = useState([]);

  const fetchLocations = async () => {
    await api
      .get("findUsersLocation")
      .then(async (response) => {
        const { locationsUsers } = response.data;
        setLocationsUsersData(locationsUsers);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro!", "Verique se está conectado a internet");
      });
  };

  const fetchCategorys = async () => {
    await api
      .get("category")
      .then(async (response) => {
        const { category } = response.data;
        setCategoryData(category);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro!", "Verique se está conectado a internet");
      });
  };

  const handlerLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    (async () => {
      fetchLocations();

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Ative as permissões de uso do GPS para acessar o APP");
      } else {
        let location = await Location.getCurrentPositionAsync({});
        const data = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setMyLocation(data);
      }
    })();
  }, []);

  const selectedCategory = (category) => {
    setCategoryID(category);
    const categorySelID = items.find((categorySel) => {
      if (categorySel.id == category) {
        return categorySel;
      }
    });
    addCategorySearch(categorySelID);
    setCategory(categorySelID);
  };

  const addCategorySearch = (category) => {
    if (category.id == 0) {
      return;
    }

    const exists = categorysSelected.find((c) => {
      if (c.id == category.id) {
        return true;
      }
    });
    if (exists) {
      removeCategorySearch(category);
      setCategoryID(0);
      return;
    }

    if (categorysSelected.length >= 3) {
      Alert.alert("Atenção", "Número maximo de categorias");
      return;
    }
    const idSearch = Math.random() * 10;
    const data = {
      id: category.id,
      idSearch,
      label: category.label,
    };
    setCategoryID(0);
    setCategorysSelected((previous) => [...previous, data]);
  };
  const removeCategorySearch = (search) => {
    const find = categorysSelected.filter((r) => r.id !== search.id);
    setCategorysSelected(find);
  };

  return (
    <Container>
      <HeaderArea>
        <SearchArea>
          <SearchIcon>
            <AntDesign name="search1" size={30} color="#DADADA" />
          </SearchIcon>
          <SearchInput placeholder="pesquisar..." />
        </SearchArea>
        <Dropdow
          style={{
            width: "90%",
            borderWidth: 1.4,
            borderColor: "#d3e2e6",
            borderRadius: 10,
            height: 50,
            marginBottom: 16,
            textAlignVertical: "top",
          }}
          descricao="label"
          lista={items}
          sel={categoryID}
          handleClick={selectedCategory}
        />
      </HeaderArea>
      {myLocation && locationsUsersData ? (
        <MapView
          style={Styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: myLocation.latitude,
            longitude: myLocation.longitude,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
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

          {locationsUsersData.map((locationsUsers) => {
            const { locations } = locationsUsers;
            return locations.map((location) => {
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
            });
          })}
        </MapView>
      ) : (
        <CalloutText>Carregando..</CalloutText>
      )}
      {categorysSelected.length > 0 && (
        <Options>
          {categorysSelected.map((search) => (
            <OptionsBoby
              key={search.id}
              onPress={() => removeCategorySearch(search)}
            >
              <OptionsTitle>{search.label}</OptionsTitle>
              <AntDesign
                name="closecircle"
                size={15}
                color="white"
                style={{ margin: 3 }}
              />
            </OptionsBoby>
          ))}
        </Options>
      )}
      <BtnFloating onPress={handlerLogin}>
        <BtnText>Login</BtnText>
      </BtnFloating>
    </Container>
  );
};
