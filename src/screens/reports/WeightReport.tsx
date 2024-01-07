import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, FlatList } from "react-native";
import { processColor } from "react-native-reanimated";
import { Card, Image, View, Text, Button, Colors, TextField, NumberInput, NumberInputData } from "react-native-ui-lib";
import firstPageBg from "../../../assets/first-page-bg.png";
import pageBg from "../../../assets/first-page.png";
import styled from "styled-components/native";
import { CreateReportInput, CreateReportMutation, ReportType } from "../../API";
import moment from "moment";
import * as SecureStore from 'expo-secure-store';
import { DEVICE_UNIQUE_ID_KEY } from "../../constants";
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Toast from "../../components/Toast";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function WeightReport() {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [profileId, setProfileId] = useState("");
    const [weight, setWeight] = useState("");
    const { goBack }: NavigationProp<TabNavigationType> = useNavigation();
    const [toastInfo, setToastInfo] = useState({
        isSuccess: false,
        message: "",
        navigatePath: ""
    });

    useEffect(() => {
        if (isSubmitted) {
            handleOnSubmit();
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

        const input: CreateReportInput = {
            type: ReportType.WEIGHT,
            dateTime: dateTimeIso,
            profileReportsDeviceId: profileId,
            data: JSON.stringify({ weight })
        }
        console.log("input", input);
        try {
            const reportResponse: any = await API.graphql<GraphQLQuery<CreateReportMutation>>(
                {
                    query: mutations.createReport, variables: { input }
                });
            console.log(" Success", reportResponse);
            setIsSubmitted(false);
            setToastInfo({ message: "Report created successfully", isSuccess: true, navigatePath: "Home" });
        } catch (err) {
            console.error("Failed to create report");
            setToastInfo({ message: "Failed to create report. Please try after sometime", isSuccess: false, navigatePath: "" });
            console.error(err);
        }

    }


    return (
        <ImageBackground source={firstPageBg} resizeMode="cover" style={{ flex: 1 }}>
            <SafeAreaView style={{ opacity: 0 }} />
            <View style={{ flex: 1, paddingHorizontal: 10, }}>

                <View style={{ position: 'absolute', minWidth: 350, minHeight: 400, top: 0, zIndex: 10 }}>
                    <ImageBackground source={pageBg} resizeMode="contain" width={50} height={50} style={{
                        flex: 1
                    }}>
                    </ImageBackground>
                </View>

                <View style={{ display: "flex", marginBottom: 5, marginTop: 10, justifyContent: "space-between", flexDirection: "row", zIndex: 12 }}>
                    <TouchableOpacity onPress={goBack}>
                        <Image
                            style={{ width: 53, height: 53 }}
                            source={require('../../../assets/back-icon.png')}
                        />
                    </TouchableOpacity>
                    <Image
                        style={{ width: 53, height: 53 }}
                        source={require('../../../assets/menu2.png')}
                    />
                </View>

                <View style={{ display: "flex", paddingVertical: 40, paddingTop: 20, zIndex: 12 }}>

                    <HeaderViewContainer>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{ color: "#312E2B", fontWeight: "600", fontSize: 38, fontFamily: "Poppins-SemiBold" }}>Weight Report </Text>
                        </View>
                    </HeaderViewContainer>

                    <View style={{ paddingRight: 15, width: "100%" }}>
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
                                alignItems: "center",
                            }}
                            enableBlur={false}
                            paddingH-10
                            paddingV-20
                        >
                            <View style={{ alignItems: "center", display: "flex", width: "100%" }}>
                                <Text text70 style={{
                                    color: "#312E2B", fontWeight: "500", fontSize: 23, paddingVertical: 5, marginBottom: 15,
                                    marginLeft: 20, marginTop: 10, textAlign: "center", width: "100%", fontFamily: "Poppins-Medium"
                                }}>
                                    Add Weight
                                </Text>

                                <View row style={{ width: "100%", display: "flex", flexWrap: "wrap", marginTop: 10, marginBottom: 10 }}>
                                    <View style={{ width: "50%", borderRadius: 25, backgroundColor: "#0202020D" }}>
                                        <NumberInput
                                            fractionDigits={1}
                                            onChangeNumber={(value: NumberInputData) => { setWeight(value.userInput) }}
                                            containerStyle={{ paddingBottom: 4, paddingHorizontal: 15, paddingVertical: 7 }}
                                        />
                                    </View>

                                    <Button
                                        borderRadius={25}
                                        style={{
                                            backgroundColor: "#0202020D", justifyContent: "center", marginLeft: 5,
                                            paddingHorizontal: 10, paddingVertical: 10
                                        }}
                                        labelStyle={{
                                            fontWeight: "400", fontSize: 16, textAlign: "center", color: "#312E2B",
                                            fontFamily: "Poppins-Regular"
                                        }}
                                        label="Unit KG / LBS"
                                    />
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

                                <Toast toastInfo={toastInfo} setToastInfo={setToastInfo} />
                            </View>

                        </Card>
                    </View>
                </View>



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

