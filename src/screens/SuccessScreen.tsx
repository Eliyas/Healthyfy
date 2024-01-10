import React, { useEffect } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Text, View } from "react-native-ui-lib";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import firstPageBg from "../../assets/first-page-bg.png";
import pageBg from "../../assets/first-page.png";
import _ from "lodash";

export default function SuccessScreen() {
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate("Home");
    }, 4000)
  }, []);

  return (
    <ImageBackground
      source={firstPageBg}
      resizeMode="contain"
      style={{
        overflow: "hidden",
        flex: 1
      }}>
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
            <View style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../assets/menu.png')}
              />
            </View>

            <View style={{  }}>
              <Text style={{ fontSize: 35, fontFamily: 'Poppins-Medium', color: "#020202", width: "100%" }}>Good Job 👌 </Text>
              <Text style={{ fontSize: 20, fontFamily: 'Poppins-Light', color: "#020202", width: "100%" }}>You have submitted your report successfully!</Text>
            </View>
          </View>

          <Text style={{ fontSize: 15, fontFamily: 'Poppins-Regular', color: "#020202", width: "100%" }}>
            we hope you ll cure soon and ll be back to happy and normal life 😍
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