import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, FlatList } from "react-native";
import { processColor } from "react-native-reanimated";
import { Card, Image, View, Text, Button, Colors, TextField, NumberInput, NumberInputData, TouchableOpacity } from "react-native-ui-lib";
import firstPageBg from "../../../assets/first-page-bg.png";
import pageBg from "../../../assets/first-page.png";
import styled from "styled-components/native";
import { CreateReportInput, CreateReportMutation, ReportType } from "../../API";
import moment from "moment";
import * as SecureStore from 'expo-secure-store';
import { DEVICE_UNIQUE_ID_KEY, MoodTypes } from "../../constants";
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import _ from "lodash";


export default function MoodReport() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [profileId, setProfileId] = useState("");
    const [moods, setMoods] = useState(Object.values(MoodTypes));
    const [mood, setMood] = useState("");
    const { navigate }: NavigationProp<TabNavigationType> = useNavigation();
    const [toastInfo, setToastInfo] = useState({
        isSuccess: false,
        message: "",
        isShowToast: false
    });

    useEffect(() => {
        if (isSubmitted) {
            handleOnSubmit();
            _.each(moods, mood => {
                mood.isSelected = false;
            });
            setMoods([...moods]);
        }
    }, [isSubmitted]);


    useEffect(() => {
        SecureStore.getItemAsync(DEVICE_UNIQUE_ID_KEY)
            .then((id) => {
                console.log("uuid", id);
                setProfileId(id);
            });
    }, []);

    const handleOnSubmit = async () => {
        const dateTimeIso = moment().toISOString();
        const mood = _.find(moods, {isSelected: true});
        const input: CreateReportInput = {
            type: ReportType.MOOD,
            dateTime: dateTimeIso,
            profileReportsDeviceId: profileId,
            data: JSON.stringify({ mood: mood.label })
        }
        console.log("input", input);
        try {
            const reportResponse: any = await API.graphql<GraphQLQuery<CreateReportMutation>>(
                {
                    query: mutations.createReport, variables: { input }
                });
            console.log(" Success", reportResponse);
            setIsSubmitted(false);
            navigate("Home");
        } catch (err) {
            console.error("Failed to create report");
            setToastInfo({ isShowToast: true, message: "Failed to create report. Please try after sometime", isSuccess: false });
            console.error(err);
        }

    }

    const handleClick = (mood) => {
        _.each(moods, mood => {
            mood.isSelected = false;
        });
        mood.isSelected = true;
        setMoods([...moods]);
    }

    return (
        <ImageBackground source={firstPageBg} resizeMode="cover" style={{ flex: 1 }}>
            <SafeAreaView style={{ opacity: 0 }} />
            <View style={{ flex: 1 }}>

                <View style={{ position: 'absolute', minWidth: 350, minHeight: 400, top: 0, zIndex: 10 }}>
                    <ImageBackground source={pageBg} resizeMode="contain" width={50} height={50} style={{
                        flex: 1
                    }}>
                    </ImageBackground>
                </View>

                <View style={{ display: "flex", marginBottom: 5, marginTop: 10, justifyContent: "space-between", flexDirection: "row", zIndex: 12 }}>
                    <Image
                        style={{ width: 53, height: 53 }}
                        source={require('../../../assets/back-icon.png')}
                    />
                    <Image
                        style={{ width: 53, height: 53 }}
                        source={require('../../../assets/menu2.png')}
                    />
                </View>

                <View style={{ display: "flex", paddingVertical: 40, paddingTop: 20, paddingHorizontal: 20, zIndex: 12 }}>

                    <HeaderViewContainer>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ color: "#312E2B", fontWeight: "600", fontSize: 40, fontFamily: "Poppins-SemiBold" }}>Mood Report</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Poppins-Regular', color: "#020202", width: "100%" }}>How you feeling?</Text>
                        </View>
                    </HeaderViewContainer>

                    <View style={{ paddingRight: 15 }}>
                        <Card
                            activeOpacity={1}
                            enableShadow={true}
                            style={{
                                borderRadius: 25,
                                height: 350,
                                marginHorizontal: 5,
                                elevation: 10,
                                backgroundColor: "#fff7ff",
                                shadowColor: "#52006A",
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                                width: "95%",
                                alignItems: "center",
                            }}
                            enableBlur={false}
                            paddingH-10
                            paddingV-20
                        >
                            <View style={{ alignItems: "center", display: "flex", width: "100%" }}>


                                <View row style={{
                                    width: "100%", display: "flex", justifyContent: "space-between",
                                    flexWrap: "wrap", marginTop: 10, marginBottom: 10
                                }}>
                                    {moods.map(mood => (
                                        <View style={{ width: "25%", marginBottom: 15 }}>
                                            <TouchableOpacity onPress={() => handleClick(mood)}>
                                                <View style={{
                                                    width: 50, height: 50, borderRadius: 50, backgroundColor: mood.isSelected ? "#5C5A57" : "#0202020D",
                                                    justifyContent: "center", alignItems: "center"
                                                }}>
                                                    <Text style={{ fontSize: 23 }}>{mood.emoji}</Text>
                                                </View>
                                                <Text style={{ textAlign: "center"}}>{mood.label}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>


                                <View row style={{ width: "100%", display: "flex", flexWrap: "wrap", marginTop: 5, marginBottom: 20 }}>
                                    <Button
                                        borderRadius={25}
                                        style={{
                                            backgroundColor: isSubmitted ? "#5C5A57" : "#0202020D", justifyContent: "center", marginLeft: 5,
                                            paddingHorizontal: 10, paddingVertical: 10
                                        }}
                                        onPress={() => { setIsSubmitted(true) }}
                                        labelStyle={{
                                            fontWeight: "400", fontSize: 16, textAlign: "center", color: isSubmitted ? "#FFFFFF" : "#020202",
                                            fontFamily: "Poppins-Regular", width: "100%"
                                        }}
                                        label="Submit"
                                    />
                                </View>
                            </View>

                        </Card>
                    </View>
                </View>

                {toastInfo.isShowToast && <Text style={{
                    width: "100%", paddingVertical: 10, paddingHorizontal: 10, color: "white", fontSize: 17, fontWeight: "400",
                    backgroundColor: toastInfo.isSuccess ? Colors.green30 : Colors.red30
                }}>{toastInfo.message}</Text>}

            </View >
            <SafeAreaView style={{ opacity: 0 }} />
        </ImageBackground>
    )
}


const HeaderViewContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FlatListContainer = styled(View)`
  gap: 12px;
  margin-top: 24px;
`;

