import React, { useState, useEffect } from "react";
import { View, Text, Linking , Alert} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../api";
export const ProfileMap = () => {

    const [user, setUser] = useState({});
    const navigation = useNavigation();
    const route = useRoute();

    const fetchUser = async () => {
        const { userId } = route.params;
        await api
            .get(`/user/${userId}`)
            .then((response) => {
                console.log(response.data)
                setUser(response.data);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Atenção", "Erro ao carregar as proficional selecionado");
            });
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const WhatsApp = (text, phone) => {
        Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
            if (supported) {
                return Linking.openURL(
                    `whatsapp://send?phone=${phone}&text=${text}`
                );
            } else {
                return Linking.openURL(
                    `https://api.whatsapp.com/send?phone=${phone}&text=${text}`
                );
            }
        })
    }

    const Email = (email) => {
        Linking.openURL(
            `mailto:${email}`
        );
    }

    const GoogleMaps = (lt, lg) => {
        Linking.openURL(
            `geo:${lt},${lg}`
        );
    }

    return (
        <View>
            <Text
                style={{ marginTop: 150 }}
                onPress={() => WhatsApp("5546984032084", "Oi")}>
                WhatsApp Mensagem
            </Text>

            <Text
                style={{ marginTop: 150 }}
                onPress={() => {
                    Email("guilhermeemanuel45@gmail.com")
                }}>
                Enviar Email
            </Text>

            <Text
                style={{ marginTop: 150 }}
                onPress={() => {
                    GoogleMaps("-1,121212", "-2,4344")
                }}>
                Google Maps
            </Text>
        </View>
    );
}