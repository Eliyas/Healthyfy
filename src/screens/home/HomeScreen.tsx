import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Image, processColor } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { Button, Card, Text, View } from "react-native-ui-lib";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LineChart } from 'react-native-charts-wrapper';
import DeviceInfo from 'react-native-device-info';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import * as query from "../../graphql/queries";
import { CreateProfileInput, CreateProfileMutationVariables, GetProfileQueryVariables } from "../../API";
import { createProfile } from "../../graphql/mutations";

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

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const profile: any = await API.graphql<GraphQLQuery<GetProfileQueryVariables>>(
        {
          query: query.getProfile,
          variables: { id: deviceId }
        });
      console.log("profile ", profile.getProfile);
      console.log("deviceId ", deviceId);
      if (!profile.getProfile) {
        const input: CreateProfileMutationVariables = {
          input: { id: deviceId }
        }
        const newProfile: any = await API.graphql<GraphQLQuery<CreateProfileInput>>(
          {
            query: createProfile,
            variables: input
          });
        console.log("newProfile ", newProfile);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Container style={{ backgroundColor: "#E6DBD9" }}>
      <HeaderViewContainer>
        <Text text50 style={{ color: "#514D4A", textAlign: "center", width: "100%" }}>My UC Healing Journey</Text>
      </HeaderViewContainer>

      <FlatListContainer>
        <View row marginV-15 width={"100%"} >

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
            <View width={"100%"} style={{ marginHorizontal: 10 }}>
              <Text text70 style={{ color: "#514D4A", fontWeight: "400", fontSize: 20, marginBottom: 20 }}>Last 7 days summary</Text>
            </View>

            <View width={"100%"} style={{ paddingHorizontal: 10, marginBottom: 20, height: 200 }}>
              <LineChart style={{ flex: 1 }}
                chartDescription={{ text: '' }}
                marker={{
                  enabled: true,
                  markerColor: processColor('#F0C0FF8C'),
                  textColor: processColor('white'),
                  markerFontSize: 14
                }}
                xAxis={{ drawGridLines: false, position: "BOTTOM", drawAxisLine: false, drawLabels: false, granularityEnabled: true, granularity: 1 }}
                yAxis={{
                  limitLines: [{ lineColor: 0 }],
                  axisLineColor: 0,
                  drawLabels: false,
                  left: {
                    granularityEnabled: true,
                    granularity: 1, drawGridLines: false, drawLabels: false, drawAxisLine: false,
                  },
                  right: {
                    granularityEnabled: true,
                    granularity: 1, drawGridLines: false, drawLabels: false, drawAxisLine: false,
                  },
                }}
                data={{
                  dataSets: [
                    {
                      label: "Movements", values: [{ y: 1 }, { y: 2 }, { y: 1 }], config: {
                        lineWidth: 3,
                        drawValues: false,
                        circleRadius: 3,
                        highlightEnabled: false,
                        drawHighlightIndicators: false,
                        color: processColor('#CA6E29'),
                        drawFilled: false,
                        valueTextSize: 10,
                        valueFormatter: "###",
                        circleColor: processColor('#CA6E29')
                      }
                    }
                  ]
                }}
              />
            </View>

            <View row paddingH-10>
              <Button
                outline
                borderRadius={0}
                size={Button.sizes.xSmall}
                onPress={() => navigate("MyStats")}
                labelStyle={{ fontWeight: "400", fontSize: 20, textAlign: "center", color: "#312E2B" }}
                label="My Stats"
                $textDefault
                style={{
                  height: 50, backgroundColor: "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1, marginBottom: 5,
                  width: "100%", justifyContent: "center"
                }}
              />
            </View>
          </Card>
        </View>

        <View row marginV-15 width={"100%"} >
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
            <View width={"100%"} style={{ marginHorizontal: 10 }}>
              <Text text70 style={{ color: "#514D4A", fontWeight: "400", fontSize: 20, marginBottom: 20 }}>What would you like to do today?</Text>
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
                      height: 50, backgroundColor: item.isChecked ? "#5C5A57" : "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1, marginBottom: 5,
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
