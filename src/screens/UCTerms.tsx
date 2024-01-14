import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button, Card, Text, View } from "react-native-ui-lib";
import { NavigationProp, useIsFocused, useNavigation } from "@react-navigation/native";
import firstPageBg from "../../assets/first-page-bg.png";
import pageBg from "../../assets/first-page.png";
import _ from "lodash";
import { v4 as uuidv4 } from 'uuid';
import { DEVICE_UNIQUE_ID_KEY } from "../constants";
import * as SecureStore from 'expo-secure-store';

export default function UCTerms() {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(true);
  const focus = useIsFocused();
  const { navigate }: NavigationProp<any> = useNavigation();

  useEffect(() => {
    if (acceptTerms) {
      navigate("Home");
      setAcceptTerms(false);
    }
  }, [acceptTerms]);

  useEffect(() => {
    if (focus == true) {
      initDeviceId();
    }
  }, [focus]);

  const initDeviceId = async () => {
    let fetchUUID = await getFromSecureStore(DEVICE_UNIQUE_ID_KEY);
    console.log("terms fetchUUID", fetchUUID);
    if (fetchUUID) {
      navigate("Home");
    } else {
      setIsProfileCreated(false);
    }
  }

  const getFromSecureStore = async (key) => {
    let attempts = 0;
    while (attempts < 5) {
      try {
        return await SecureStore.getItemAsync(key);
      } catch (error) {
        attempts++;
      }
    }
    return null;
  };

  return (
    <ImageBackground source={firstPageBg}
      resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{
        flex: 1, justifyContent: "center",
        alignItems: "center"
      }}>
        <SafeAreaView style={{ opacity: 0 }} />

        <View style={{ position: 'absolute', minWidth: 350, minHeight: 400, top: 0, zIndex: 10 }}>
          <ImageBackground source={pageBg} resizeMode="contain" width={50} height={50} style={{
            flex: 1
          }}>
          </ImageBackground>
        </View>

        {!isProfileCreated &&
          <View style={{
            display: "flex", paddingTop: 25, paddingHorizontal: 15, zIndex: 12, height: "100%",
            width: "100%"
          }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 40, fontFamily: 'Neuton-Regular', color: "#020202" }}>My UC Healing </Text>
            </View>

            <FlatListContainer>
              <View row width={"100%"} style={{ flexDirection: "column", paddingTop: 15, marginTop: "30%" }} >
                <Card
                  activeOpacity={1}
                  enableShadow={false}
                  style={{
                    backgroundColor: "#0202020D",
                    borderRadius: 15,
                    shadowOpacity: 1,
                    shadowRadius: 0,
                    paddingHorizontal: 10,
                    width: "100%",
                  }}
                  enableBlur={false}
                  paddingH-10
                  paddingV-20
                >
                  <View width={"100%"} style={{ marginHorizontal: 5 }}>
                    <Text style={{
                      color: "#020202", fontSize: 18, fontWeight: "400", fontFamily: "Poppins-Regular",
                      textAlign: "center", marginBottom: 10
                    }}>
                      Not Medial Advice
                    </Text>
                    <Text style={{
                      color: "#020202", fontWeight: "400", fontFamily: "Poppins-Regular",
                      fontSize: 16, marginBottom: 10
                    }}>
                      <Text style={{ color: "#020202", fontWeight: "600" }}>Important Notice: </Text>
                      This health app is not a substitute for professional medical advice. Information provided here is for general purposes only.
                      Consult with a qualified healthcare professional for personalized guidance regarding your health.
                    </Text>
                  </View>

                </Card>

                <View style={{ marginTop: 10 }}>
                  <Button
                    outline
                    borderRadius={0}
                    size={Button.sizes.xSmall}
                    onPress={() => setAcceptTerms(true)}
                    labelStyle={{
                      fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "center",
                      color: acceptTerms ? "#EBEEF6" : "#020202"
                    }}
                    label="Accept and Start!"
                    $textDefault
                    style={{
                      height: 53, backgroundColor: acceptTerms ? "#020202" : "#0202020D",
                      borderColor: "#5C5A57", borderWidth: 0, marginBottom: 5,
                      width: "100%", justifyContent: "center", borderRadius: 15, marginTop: 10
                    }}
                  />
                </View>
              </View>

            </FlatListContainer>

          </View>

        }

      </View >

      <SafeAreaView style={{ opacity: 0 }} />

    </ImageBackground>

  );
}

const HeaderViewContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FlatListContainer = styled(View)`
  gap: 12px;
  margin-top: 20px;
`;
