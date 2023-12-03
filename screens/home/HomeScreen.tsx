import React, { useState } from "react";
import { FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Card, Text, View } from "react-native-ui-lib";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const DATA = [
  {
    id: "1",
    title: "UC Healing Journey",
  },
  {
    id: "2",
    title: "More To Come",
  },
];

export default function HomeScreen() {
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();

  return (
    <Container>
      <HeaderViewContainer>
        <Text text50>Welcome To Hethyfi</Text>
      </HeaderViewContainer>

      <FlatListContainer>
        <FlatList
          data={DATA}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View row marginV-10 width={"90%"}>
              <Card
                activeOpacity={1}
                enableShadow={true}
                style={{
                  elevation: 10,
                  shadowColor: "#52006A",
                  shadowOpacity: 0.2,
                  shadowRadius: 3,
                  width: "100%",
                }}
                enableBlur={false}
                paddingH-10
                paddingV-20
                key={item.id}
                onPress={() => console.log("pressed")}
              >
                <View row paddingV-10 paddingH-20>
                  <View row left width={"90%"}>
                    <Text text70>{item.title}</Text>
                  </View>
                  <View row right>
                    <TouchableOpacity>
                      <AntDesign name="rightcircleo" size={24} color="black" onPress={() => navigate("UCLogging")} />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </View>
          )}
          contentContainerStyle={{
            alignItems: "center",
            gap: 12,
            width: "100%",
          }}
          showsHorizontalScrollIndicator={false}
        />
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
