import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

import {
  Container,
  Scroller,
  ContainerHeader,
  BackButton,
  Form,
  Input,
  BtnRegister,
  BtnText,
  Styles,
  TextError,
  ContainerTitle,
  Title,
  FakeDropdown,
} from "./styles";
import Dropdown from "../../components/dropdown";
import { cpfMask, foneMask } from "../../utils/mask";
import api from "../../api";

export const AddressRegister = () => {
  const DATA_DEFAULT_STATE = {
    id: 0,
    uf: "TESTE",
    name: "Selecione um estado",
  };
  const DATA_DEFAULT_CITY = {
    id: 0,
    uf: "TESTE",
    name: "Selecione uma cidade",
  };

  const [description, setDescription] = useState("");
  const [states, setStates] = useState([]);
  const [stateID, setStateID] = useState(0);
  const [stateSelected, setStateSelected] = useState();
  const [cities, setCities] = useState([DATA_DEFAULT_CITY]);
  const [cityID, setCityID] = useState(0);
  const [citySelected, setCitySelected] = useState();
  const [street, setStreet] = useState("");
  const [publicPlace, setPublicPlace] = useState("");
  const [number, setNumber] = useState("");

  const [nextStreet, setNextStreet] = useState();
  const [nextPublicPlace, setNextPublicPlace] = useState();
  const [nextNumber, setNextNumber] = useState();
  const [error, setError] = useState([]);
  const [focus, setFocus] = useState([]);
  const [message, setMessage] = useState([]);
  const [close, setClose] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const fetchStates = async () => {
    setLoadingState(true);
    await api
      .get("/findUsersLocation/states")
      .then((response) => {
        setLoadingState(false);
        response.data.unshift(DATA_DEFAULT_STATE);

        setStates(response.data);
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        Alert.alert("Erro", "Erro ao carregar os estados");
      });
  };

  const selectedState = async (state) => {
    setStateID(state);
    const stateSelID = states.find((stateSel) => {
      if (stateSel.id == state) {
        return stateSel;
      }
    });
    setStateSelected(stateSelID);
    if (state) {
      await fetchCitys(state);
    }
    if (state == 0) {
      setCities([DATA_DEFAULT_CITY]);
    }
  };

  const selectedCity = (state) => {
    setCityID(state);
    const stateSelID = cities.find((stateSel) => {
      if (stateSel.id == state) {
        return stateSel;
      }
    });
    setCitySelected(stateSelID);
  };

  const fetchCitys = async (state) => {
    setLoadingCity(true);
    await api
      .get(`/findUsersLocation/citys/${state}`)
      .then((response) => {
        setLoadingCity(false);
        response.data.unshift(DATA_DEFAULT_CITY);
        setCities(response.data);
      })
      .catch((error) => {
        console.error(error);
        setLoadingCity(false);
        Alert.alert("Erro", "Erro ao carregar as cidades");
      });
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handlerApp = async () => {
    // ID DO USUARIO PARA INSERIR O ENDERECO
    const { userId } = route.params;
    setLoading(true);
    setFocus([]);
    const dataError = {
      description: false,
      state: false,
      city: false,
      street: false,
      publicPlace: false,
      number: false,
    };

    const dataBody = {
      description,
      city: cityID,
      street,
      publicPlace,
      number,
    };

    setError(dataError);

    if (description.trim() === "") {
      dataError.description = true;
      setError(dataError);

      const data = {
        description: "Preencha o campo descrição do endereço",
      };

      setMessage(data);
      setLoading(false);
    } else if (stateID == 0) {
      dataError.state = true;
      setError(dataError);

      const data = {
        state: "Selecione um estado",
      };

      setMessage(data);
      setLoading(false);
    } else if (cityID == 0) {
      dataError.city = true;
      setError(dataError);

      const data = {
        city: "Selecione uma cidade",
      };

      setMessage(data);
      setLoading(false);
    } else if (street.trim() === "") {
      dataError.street = true;
      setError(dataError);

      const data = {
        street: "Preencha o campo endereço",
      };

      setMessage(data);
      setLoading(false);
    } else if (publicPlace.trim() === "") {
      dataError.publicPlace = true;
      setError(dataError);

      const data = {
        publicPlace: "Preencha o campo Avenida",
      };

      setMessage(data);
      setLoading(false);
    } else if (number.trim() === "") {
      dataError.number = true;
      setError(dataError);

      const data = {
        number: "Preencha o campo numero",
      };

      setMessage(data);
      setLoading(false);
    } else {
      await api
        .post(`/findUsersLocation/register/${userId}`, dataBody)
        .then((response) => {
          setLoading(false);
          Alert.alert("Sucesso", "Endereço cadastrado com sucesso!");
          navigation.navigate("ViewMap");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          Alert.alert("Erro", "Erro ao gravar endereço");
        });
    }
  };

  const handlerBack = () => {
    navigation.reset({
      routes: [{ name: "Profile" }],
    });
  };
  return (
    <Container>
      <ContainerHeader>
        <BackButton onPress={handlerBack}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </BackButton>
        <ContainerTitle>
          <Title>Registro de endereços</Title>
        </ContainerTitle>
      </ContainerHeader>
      <Scroller>
        <Form>
          <Input
            style={[
              (error.description && Styles.InputError) ||
              (focus.description && Styles.InputFocus),
            ]}
            value={description}
            placeholder="Descrição do endereço"
            returnKeyType={"next"}
            onFocus={() => {
              setError([]);
              setFocus({ description: true });
            }}
            onChangeText={(text) => {
              setDescription(text);
            }}
            onSubmitEditing={() => {
              nextStreet.focus();
              setFocus([]);
            }}
            blurOnSubmit={false}
          />
          {error.description && <TextError>{message.description}</TextError>}
          {loadingState ? (
            <FakeDropdown>
              <ActivityIndicator size="large" color="rgba(0, 0, 0, 0.4)" />
            </FakeDropdown>
          ) : (
            <Dropdown
              color={"rgba(0, 0, 0, 0.4)"}
              style={Styles.Dropdown}
              descricao="name"
              lista={states}
              sel={stateID}
              handleClick={selectedState}
            />
          )}

          {error.state && <TextError>{message.state}</TextError>}

          {loadingCity ? (
            <FakeDropdown>
              <ActivityIndicator size="large" color="rgba(0, 0, 0, 0.4)" />
            </FakeDropdown>
          ) : (
            <Dropdown
              enabled={stateID != 0 && true}
              color={stateID != 0 ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"}
              style={Styles.Dropdown}
              descricao="name"
              lista={cities}
              sel={cityID}
              handleClick={selectedCity}
            />
          )}

          {error.city && <TextError>{message.city}</TextError>}
          <Input
            style={[
              (error.street && Styles.InputError) ||
              (focus.street && Styles.InputFocus),
            ]}
            value={street}
            placeholder="Informe o endereço"
            returnKeyType={"next"}
            onFocus={() => {
              setError([]);
              setFocus({ street: true });
            }}
            ref={(input) => {
              setNextStreet(input);
            }}
            onSubmitEditing={() => {
              nextPublicPlace.focus();
              setFocus([]);
            }}
            onChangeText={(text) => setStreet(text)}
            blurOnSubmit={false}
          />
          {error.street && <TextError>{message.street}</TextError>}
          <Input
            style={[
              (error.publicPlace && Styles.InputError) ||
              (focus.publicPlace && Styles.InputFocus),
            ]}
            placeholder="logradouro"
            returnKeyType={"next"}
            onFocus={() => {
              setError([]);
              setFocus({ publicPlace: true });
            }}
            ref={(input) => {
              setNextPublicPlace(input);
            }}
            onSubmitEditing={() => {
              nextNumber.focus();
              setFocus([]);
            }}
            value={publicPlace}
            onChangeText={(text) => {
              setPublicPlace(text);
            }}
            blurOnSubmit={false}
          />
          {error.publicPlace && <TextError>{message.publicPlace}</TextError>}
          <Input
            style={[
              (error.number && Styles.InputError) ||
              (focus.number && Styles.InputFocus),
            ]}
            value={number}
            placeholder="Informe o número"
            returnKeyType={"next"}
            onFocus={() => {
              setError([]);
              setFocus({ number: true });
            }}
            ref={(input) => {
              setNextNumber(input);
            }}
            onChangeText={(text) => setNumber(text)}
          />
          {error.number && <TextError>{message.number}</TextError>}
          <BtnRegister
            style={
              (Styles.ButtonStyle,
                [loading ? Styles.btnInactive : Styles.btnActive])
            }
            disabled={loading}
            onPress={handlerApp}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <BtnText>Registrar</BtnText>
            )}
          </BtnRegister>
        </Form>
      </Scroller>
    </Container>
  );
};
