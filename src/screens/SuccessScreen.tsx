import React, { useEffect, useState } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Text, View } from "react-native-ui-lib";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import firstPageBg from "../../assets/first-page-bg.png";
import pageBg from "../../assets/first-page.png";
import _ from "lodash";
import { SUCCESS_SCREEN_MESSAGES } from "../constants";
import ConfettiCannon from 'react-native-confetti-cannon';

export default function SuccessScreen({ route }) {
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();
  const [messageInfo, setMessageInfo] = useState<any>({ redirect: "", heading: "", messageTop: "", messageBottom: "", type: "" });

  useEffect(() => {
    console.log("routeParam", route?.params?.messageType);
    if (route?.params?.messageType && SUCCESS_SCREEN_MESSAGES[route?.params?.messageType]) {
      setMessageInfo(SUCCESS_SCREEN_MESSAGES[route?.params?.messageType]);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log("messageInfo.redirect", messageInfo.redirect);
      if (messageInfo.redirect) {
        navigate(messageInfo.redirect);
        setMessageInfo({ redirect: "", heading: "", messageTop: "", messageBottom: "", type: "" });
      }
    }, 4000);
    console.log("routing to", messageInfo.redirect);
  }, [messageInfo.redirect]);

  return (
    <ImageBackground
      source={firstPageBg}
      resizeMode="contain"
      style={{
        overflow: "hidden",
        flex: 1
      }}>
      {![SUCCESS_SCREEN_MESSAGES.DATA_DELETE].includes(messageInfo.type) && <ConfettiCannon fallSpeed={4000} count={200} origin={{ x: -10, y: 0 }} />}
      <View style={{
        flex: 1, justifyContent: "center",
        alignItems: "center"
      }}>
        <SafeAreaView style={{ opacity: 0 }} />

        <View style={{ position: 'absolute', minWidth: 350, minHeight: 400, top: 0, zIndex: 10 }}>
          <ImageBackground source={pageBg} resizeMode="contain" width={50} height={50} style={{ flex: 1 }}>
          </ImageBackground>
        </View>

        <View style={{
          display: "flex", flexDirection: "column", justifyContent: "space-between", paddingVertical: 40,
          paddingTop: 20, paddingHorizontal: 10, zIndex: 12, height: "100%", width: "100%"
        }}>
          <View style={{}}>
            <View style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../assets/menu.png')}
              />
            </View>

            <View style={{}}>
              <Text style={{ fontSize: 35, fontFamily: 'Poppins-Medium', color: "#020202", width: "100%" }}>{messageInfo.heading} </Text>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-Light', color: "#020202", width: "100%" }}>
                {messageInfo.messageTop}
              </Text>
            </View>
          </View>

          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: "#020202", width: "100%" }}>
            {messageInfo.messageBottom}
          </Text>

        </View>

      </View >

      <SafeAreaView style={{ opacity: 0 }} />

    </ImageBackground>

  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const HeaderViewContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FlatListContainer = styled(View)`
  gap: 12px;
  margin-top: 24px;
`;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});