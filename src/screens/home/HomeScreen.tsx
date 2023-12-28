import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Image, processColor, ImageBackground, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button, Card, Modal, Text, View } from "react-native-ui-lib";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { LineChart } from 'react-native-charts-wrapper';
import DeviceInfo from 'react-native-device-info';
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import * as query from "../../graphql/queries";
import { CreateProfileInput, CreateProfileMutationVariables, GetProfileQueryVariables } from "../../API";
import { createProfile } from "../../graphql/mutations";
import firstPageBg from "../../../assets/first-page-bg.png";
import pageBg from "../../../assets/first-page.png";
import _ from "lodash";
import { RedirectionType } from "../../utils/config";

const DATA = [
  {
    id: "1",
    title: "Submit a report",
    isChecked: false,
    route: "ReportModal"
  },
  {
    id: "2",
    title: "Practical Advice",
    isChecked: false
  },
  {
    id: "3",
    title: "My data privacy",
    isChecked: false
  },
];

export default function HomeScreen() {
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();
  const [isMyStateActive, setIsMyStateActive] = useState(false);
  const [menuOption, setMenuOption] = useState(DATA);
  const [activeLink, setActiveLink] = useState<any>("");

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    console.log("callsed 1");
    setTimeout(() => {
      if (activeLink) {
        navigate(activeLink);
        setActiveLink("");
        setIsMyStateActive(false);
      }
    }, 100);
  }, [activeLink]);



  useEffect(() => {
    console.log("callsed 3");
    setTimeout(() => {
      const item: any = _.find(menuOption, { isChecked: true });
      if (item) {
        setActiveLink(item.route);
        _.each(menuOption, report => { report.isChecked = false });
        setMenuOption(menuOption);
      }
    }, 100);
  }, [menuOption]);

  const fetchProfile = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      const profile: any = await API.graphql<GraphQLQuery<GetProfileQueryVariables>>(
        {
          query: query.getProfile,
          variables: { deviceId }
        });
      console.log("profile ", profile.data.getProfile);
      console.log("deviceId ", deviceId);
      if (!profile.data.getProfile) {
        const input: CreateProfileMutationVariables = {
          input: { deviceId: deviceId }
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

  const handleNavClick = (report) => {
    _.each(menuOption, report => {
      report.isChecked = false
    });
    report.isChecked = true;
    setMenuOption([...menuOption]);
  }

  const handleMyStateClick = () => {
    setIsMyStateActive(true);
    setActiveLink(RedirectionType.GO_TO_MY_STATS);
  }

  return (
    <View style={{
      flex: 1, justifyContent: "center",
      alignItems: "center"
    }}>

      <ImageBackground source={firstPageBg} resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ position: 'absolute', minWidth: 350, minHeight: 400, top: 0, zIndex: 10 }}>
          <ImageBackground source={pageBg} resizeMode="contain" width={50} height={50} style={{
            flex: 1
          }}>
          </ImageBackground>
        </View>
        <View style={{ flex: 1, paddingVertical: 40, paddingTop: 50, paddingHorizontal: 20, zIndex: 20 }}>

          <HeaderViewContainer>

            <View>
              <Text style={{ fontSize: 40, fontFamily: 'Neuton-Regular', color: "#020202", width: "100%" }}>Hello 👋, </Text>
              <Text style={{ fontSize: 20, fontFamily: 'Neuton-Regular', color: "#020202", width: "100%" }}>To My UC Healing Journey</Text>
            </View>
            <View>
              <Image
                style={{ width: 30, height: 30 }}
                source={require('../../../assets/menu.png')}
              />
            </View>
          </HeaderViewContainer>

          <FlatListContainer>
            <View row marginV-15 width={"100%"} style={{ flexDirection: "column" }} >
              <Card
                activeOpacity={1}
                enableShadow={false}
                style={{
                  backgroundColor: "#0202020D",
                  borderRadius: 15,
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  paddingHorizontal: 10,
                  height: 180,
                  width: "100%",
                }}
                enableBlur={false}
                paddingH-10
                paddingV-20
              >
                <View width={"100%"} style={{ marginHorizontal: 5 }}>
                  <Text text70 style={{
                    color: "#020202", fontWeight: "400", fontFamily: "Poppins-Medium", textAlign: "center",
                    fontSize: 20, marginBottom: 10
                  }}>
                    Last 7 days summary
                  </Text>
                </View>

                <View width={"100%"} style={{ paddingHorizontal: 5, marginBottom: 5, height: 110 }}>
                  <LineChart style={{ flex: 1 }}
                    chartDescription={{ text: '' }}
                    marker={{
                      enabled: true,
                      markerColor: processColor('#F0C0FF8C'),
                      textColor: processColor('white'),
                      markerFontSize: 14
                    }}
                    xAxis={{
                      drawGridLines: false, position: "BOTTOM", drawAxisLine: false, drawLabels: false,
                      granularityEnabled: true, granularity: 1
                    }}
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
                          label: "Movements", values: [{ y: 1 }, { y: 2 }, { y: 1 }, { y: 3 }, { y: 4 },
                          { y: 3 }, { y: 3 }], config: {
                            lineWidth: 3,
                            drawValues: false,
                            circleRadius: 3,
                            highlightEnabled: false,
                            drawHighlightIndicators: false,
                            color: processColor('#020202'),
                            drawFilled: false,
                            valueTextSize: 10,
                            valueFormatter: "###",
                            circleColor: processColor('#020202')
                          }
                        }
                      ]
                    }}
                  />
                </View>
              </Card>

              <View>
                <Button
                  outline
                  borderRadius={0}
                  size={Button.sizes.xSmall}
                  onPress={() => handleMyStateClick()}
                  labelStyle={{
                    fontFamily: "Poppins-Medium", fontSize: 16, textAlign: "center",
                    color: isMyStateActive ? "#EBEEF6" : "#020202"
                  }}
                  label="My Stats"
                  $textDefault
                  style={{
                    height: 53, backgroundColor: isMyStateActive ? "#020202" : "#0202020D",
                    borderColor: "#5C5A57", borderWidth: 0, marginBottom: 5,
                    width: "100%", justifyContent: "center", borderRadius: 15, marginTop: 15
                  }}
                />
              </View>
            </View>

            <View row marginV-5 width={"100%"} style={{ flexDirection: "column" }}>
              <View width={"100%"} style={{ marginHorizontal: 5 }}>
                <Text style={{ color: "#020202", fontFamily: "Poppins-Medium", fontSize: 22, marginBottom: 10 }}>
                  What would you like to do today?
                </Text>
              </View>
              <Card
                activeOpacity={1}
                enableShadow={false}
                style={{
                  backgroundColor: "#0202020D",
                  borderRadius: 15,
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  width: "100%",
                }}
                enableBlur={false}
                paddingH-10
                paddingV-10
              >
                <FlatList
                  data={menuOption}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View row key={item.id}>
                      <Button
                        key={item.id}
                        borderRadius={0}
                        size={Button.sizes.xSmall}
                        onPress={() => handleNavClick(item)}
                        labelStyle={{
                          fontWeight: "500", fontFamily: "Poppins-Medium", fontSize: 16, textAlign: "center",
                          color: item.isChecked ? "#EBEEF6" : "#020202"
                        }}
                        label={item.title}
                        style={{
                          height: 50, backgroundColor: item.isChecked ? "#020202" : "#0202020D", borderRadius: 15, borderWidth: 0, marginBottom: 5,
                          width: "100%", justifyContent: "center", alignItems: "center"
                        }}
                      />
                    </View>
                  )}
                  contentContainerStyle={{
                    alignItems: "center",
                    gap: 3,
                    width: "100%",
                  }}
                  showsHorizontalScrollIndicator={false}
                />
              </Card>
            </View>
          </FlatListContainer>

        </View>
      </ImageBackground>
    </View >
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