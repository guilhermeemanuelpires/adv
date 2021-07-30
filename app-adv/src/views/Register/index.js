import React, { useState, useEffect } from "react";
import {
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Container,
    Scroller,
    ContainerImage,
    ViewImage,
    Form,
    Input,
    BtnRegister,
    BtnText,
    Styles,
    TextError,
} from "./styles";
import { cpfMask, foneMask } from "../../utils/mask";
import api from "../../api";

// const ImageRegister = require("../../../assets/images/ImageConductor.png");

export const Register = () => {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmePassword, setConfirmePassword] = useState("");
    const [nextCpf, setNextCpf] = useState();
    const [nextEmail, setNextEmail] = useState();
    const [nextPhone, setNextPhone] = useState();
    const [nextPassword, setNextPassword] = useState();
    const [nextConfirmePassword, setNextConfirmePassword] = useState();
    const [error, setError] = useState([]);
    const [focus, setFocus] = useState([]);
    const [message, setMessage] = useState([]);
    const [close, setClose] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        setClose(true);
    };

    const _keyboardDidHide = () => {
        setClose(false);
    };

    const handlerApp = () => {
        setLoading(true);
        const cpfReplace = cpf
            .replace(".", "")
            .replace("-", "")
            .replace("/", "")
            .replace(".", "");
        const phoneReplace = phone
            .replace("-", "")
            .replace("(", "")
            .replace(")", "")
            .replace(" ", "");

        setFocus([]);
        const dataError = {
            name: false,
            cpf: false,
            email: false,
            phone: false,
            password: false,
            confirmePassword: false,
            diffPassword: false,
        };

        setError(dataError);

        if (name.trim() === "") {
            dataError.name = true;
            setError(dataError);

            const data = {
                name: "Preencha o campo nome",
            };

            setMessage(data);
            setLoading(false);
        } else if (cpf.trim() === "") {
            dataError.cpf = true;
            setError(dataError);

            const data = {
                cpf: "Preencha o campo CPF",
            };

            setMessage(data);
        } else if (email.trim() === "") {
            dataError.email = true;
            setError(dataError);

            const data = {
                email: "Preencha o campo Email",
            };

            setMessage(data);
            setLoading(false);
        } else if (phone.trim() === "") {
            dataError.phone = true;
            setError(dataError);

            const data = {
                phone: "Preencha o campo Telefone",
            };

            setMessage(data);
            setLoading(false);
        } else if (password.trim() === "") {
            dataError.password = true;
            setError(dataError);

            const data = {
                password: "Preencha o campo Senha",
            };

            setMessage(data);
            setLoading(false);
        } else if (confirmePassword.trim() === "") {
            dataError.confirmePassword = true;
            setError(dataError);

            const data = {
                confirmePassword: "Preencha o campo Confirma Senha",
            };

            setMessage(data);
            setLoading(false);
        } else if (confirmePassword.trim() !== password.trim()) {
            dataError.diffPassword = true;
            setError(dataError);

            const data = {
                diffPassword: "Os campos senha e confirma senha precisam ser iguais",
            };

            setMessage(data);
            setLoading(false);
        } else {
            const save = async () => {
                setLoading(true);
                const user = {
                    fullName: name,
                    cpf: cpfReplace,
                    email: email,
                    phone: phoneReplace,
                    password: password,
                };

                await api
                    .post("/user", user)
                    .then(async (response) => {
                        if (response.status === 202) {
                            const res = response.data;
                            const data = {
                                id: res.user.id,
                                name: res.user.fullName,
                                url: res.url,
                            };
                            await AsyncStorage.setItem("token", res.token);
                            await AsyncStorage.setItem("user", JSON.stringify(data));

                            navigation.reset({
                                routes: [{ name: "Profile" }],
                            });
                        }
                        if (response.status === 406) {
                            if (response.data.error === "O CPF já está em utilização!") {
                                dataError.cpf = true;
                                setError(dataError);
                                const data = {
                                    cpf: response.data.error,
                                };
                                setMessage(data);
                            } else {
                                dataError.email = true;
                                setError(dataError);

                                const data = {
                                    email: response.data.error,
                                };
                                setMessage(data);
                            }
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                        Alert.alert("Erro!", "Verifique se está conectado a internet!!");
                    });
            };

            save();
        }
    };
    return (
        <Container>
            <KeyboardAvoidingView behavior="height" enabled>
                <ContainerImage>
                    {!close && (
                        <Animatable.Image
                            animation="fadeInUp"
                            useNativeDriver
                        // source={ImageRegister}
                        />
                    )}
                </ContainerImage>
                <Scroller>
                    <Form>
                        <Input
                            style={[
                                (error.name && Styles.InputError) ||
                                (focus.name && Styles.InputFocus),
                            ]}
                            value={name}
                            placeholder="Nome Completo"
                            returnKeyType={"next"}
                            onFocus={() => {
                                setError([]);
                                setFocus({ name: true });
                            }}
                            onChangeText={(text) => {
                                setName(text);
                            }}
                            onSubmitEditing={() => {
                                nextCpf.focus();
                                setFocus([]);
                            }}
                            blurOnSubmit={false}
                        />
                        {error.name && <TextError>{message.name}</TextError>}
                        <Input
                            style={[
                                (error.cpf && Styles.InputError) ||
                                (focus.cpf && Styles.InputFocus),
                            ]}
                            placeholder="CPF"
                            returnKeyType={"next"}
                            onFocus={() => {
                                setError([]);
                                setFocus({ cpf: true });
                            }}
                            ref={(input) => {
                                setNextCpf(input);
                            }}
                            keyboardType="numeric"
                            value={cpf}
                            onChangeText={(text) => {
                                setCpf(cpfMask(text));
                            }}
                            onSubmitEditing={() => {
                                nextEmail.focus();
                                setFocus([]);
                            }}
                            blurOnSubmit={false}
                        />
                        {error.cpf && <TextError>{message.cpf}</TextError>}
                        <Input
                            style={[
                                (error.email && Styles.InputError) ||
                                (focus.email && Styles.InputFocus),
                            ]}
                            value={email}
                            placeholder="E-mail"
                            returnKeyType={"next"}
                            onFocus={() => {
                                setError([]);
                                setFocus({ email: true });
                            }}
                            ref={(input) => {
                                setNextEmail(input);
                            }}
                            onSubmitEditing={() => {
                                nextPhone.focus();
                                setFocus([]);
                            }}
                            onChangeText={(text) => setEmail(text)}
                            blurOnSubmit={false}
                        />
                        {error.email && <TextError>{message.email}</TextError>}
                        <Input
                            style={[
                                (error.phone && Styles.InputError) ||
                                (focus.phone && Styles.InputFocus),
                            ]}
                            placeholder="Telefone"
                            returnKeyType={"next"}
                            keyboardType="numeric"
                            onFocus={() => {
                                setError([]);
                                setFocus({ phone: true });
                            }}
                            ref={(input) => {
                                setNextPhone(input);
                            }}
                            onSubmitEditing={() => {
                                nextPassword.focus();
                                setFocus([]);
                            }}
                            value={phone}
                            onChangeText={(text) => {
                                setPhone(foneMask(text));
                            }}
                            blurOnSubmit={false}
                        />
                        {error.phone && <TextError>{message.phone}</TextError>}
                        <Input
                            style={[
                                (error.password && Styles.InputError) ||
                                (focus.password && Styles.InputFocus),
                            ]}
                            value={password}
                            placeholder="Senha"
                            secureTextEntry={true}
                            returnKeyType={"next"}
                            onFocus={() => {
                                setError([]);
                                setFocus({ password: true });
                            }}
                            ref={(input) => {
                                setNextPassword(input);
                            }}
                            onSubmitEditing={() => {
                                nextConfirmePassword.focus();
                                setFocus([]);
                            }}
                            onChangeText={(text) => setPassword(text)}
                            blurOnSubmit={false}
                        />
                        {error.password && <TextError>{message.password}</TextError>}
                        <Input
                            style={[
                                (error.confirmePassword && Styles.InputError) ||
                                (focus.confirmePassword && Styles.InputFocus),
                            ]}
                            placeholder="Confirmar Senha"
                            secureTextEntry={true}
                            value={confirmePassword}
                            onFocus={() => {
                                setError([]);
                                setFocus({ confirmePassword: true });
                            }}
                            ref={(input) => {
                                setNextConfirmePassword(input);
                            }}
                            onChangeText={(text) => setConfirmePassword(text)}
                        />
                        {error.confirmePassword && (
                            <TextError>{message.confirmePassword}</TextError>
                        )}
                        {error.diffPassword && (
                            <TextError>{message.diffPassword}</TextError>
                        )}
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
            </KeyboardAvoidingView>
        </Container>
    );
}