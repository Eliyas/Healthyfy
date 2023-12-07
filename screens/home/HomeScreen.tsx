import React, { useState } from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Button, Card, Text, View } from "react-native-ui-lib";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "1",
    title: "Submit a nature call report",
    isChecked: false
  },
  {
    id: "2",
    title: "Food insensitivity report",
    isChecked: false
  },
];

export default function HomeScreen() {
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();

  return (
    <Container style={{ backgroundColor: "#E6DBD9" }}>
      <HeaderViewContainer>
         <Text text50 style={{ color: "#514D4A", textAlign: "center", width: "100%", fontFamily: "inter-bold" }}>My UC Healing Journey</Text>
      </HeaderViewContainer>

      <FlatListContainer>
        <View row marginV-10 width={"100%"} >
          <Card
            activeOpacity={1}
            enableShadow={true}
            style={{
              elevation: 10,
              shadowColor: "#52006A",
              backgroundColor: "#F6F1F1",
              borderRadius: 0,
              shadowOpacity: 0.2,
              shadowRadius: 3,
              paddingHorizontal: 10,
              width: "100%",
            }}
            enableBlur={false}
            paddingH-10
            paddingV-20
            onPress={() => console.log("pressed")}
          >
            <View width={"100%"} style={{marginHorizontal: 10}}>
              <Text text70  style={{ color: "#514D4A", fontWeight: "400", fontSize: 20, marginBottom: 20 }}>What would you like to do today?</Text>
            </View>

            <FlatList
              data={DATA}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View row paddingH-10 key={item.id}>
                  <Button
                    key={item.id}
                    outline
                    borderRadius={0}
                    size={Button.sizes.xSmall}
                    onPress={() => navigate("UCLogging")}
                    labelStyle={{ fontWeight: "400", fontSize: 20, textAlign: "center", color: item.isChecked ? "#FFFFFF" : "#312E2B" }}
                    label={item.title}
                    $textDefault
                    onPressIn={() => { item.isChecked = !item.isChecked }}
                    style={{
                      height: 50, backgroundColor:  item.isChecked ? "#5C5A57" : "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1, marginBottom: 5,
                      width: "100%", justifyContent: "center"
                    }}
                  />
                </View>
              )}
              contentContainerStyle={{
                alignItems: "center",
                gap: 12,
                width: "100%",
              }}
              showsHorizontalScrollIndicator={false}
            />
          </Card>
        </View>
      </FlatListContainer>
    </Container>
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
