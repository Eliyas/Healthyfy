import React, { useEffect, useState } from "react";
import { ImageBackground, FlatList } from "react-native";
import { Card, Text, View, Button } from "react-native-ui-lib";
import firstPageBg from "../../assets/first-page-bg.png";
import { FontAwesome } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RedirectionType } from "../utils/config";
import _ from "lodash";


const reports = [
    {
        id: "1",
        title: "Nature call",
        isChecked: false,
        route: RedirectionType.GO_TO_NATURE_CALL_REPORT
    },
    {
        id: "2",
        title: "Meal",
        isChecked: false
    },
    {
        id: "3",
        title: "Exercise",
        isChecked: false
    },
    {
        id: "4",
        title: "Weight",
        isChecked: false
    },
    {
        id: "5",
        title: "Personal note",
        isChecked: false
    },
];


export default function ReportPopup() {
    const [allReports, setAllReports] = useState(reports);
    const { navigate }: NavigationProp<TabNavigationType> = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            const activeReport: any = _.find(allReports, { isChecked: true });
            if (activeReport && activeReport.route) {
                navigate(activeReport.route);
                _.each(reports, report => report.isChecked = false);
                setAllReports(reports);
            }
        }, 100);
    }, [allReports]);


    const handleReportClick = (report) => {
        _.each(allReports, report => {
            report.isChecked = false
        });
        report.isChecked = true;
        setAllReports([...allReports]);
    }

    return (
        <View style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            width: "100%"
        }}>
            <ImageBackground resizeMethod="resize" source={firstPageBg} resizeMode="cover" style={{
                width: "100%", justifyContent: 'center', height: "100%", alignItems: 'center'
            }}>
                <View style={{
                    paddingHorizontal: 20
                }}>
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
                        <View style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                            <FontAwesome
                                onPress={() => { navigate("Home"); }}
                                name="close"
                                size={24}
                                color="black"
                                style={{ marginLeft: 15 }}
                            />
                        </View>
                        <Text style={{
                            fontWeight: "500", fontFamily: "Poppins-Medium", fontSize: 20, textAlign: "center", color: "#020202",
                            marginTop: 20, marginBottom: 30
                        }}>
                            Submit a report
                        </Text>
                        <FlatList
                            data={allReports}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <View row key={item.id}>
                                    <Button
                                        key={item.id}
                                        borderRadius={0}
                                        size={Button.sizes.xSmall}
                                        onPress={() => { handleReportClick(item) }}
                                        labelStyle={{
                                            fontWeight: "500", fontFamily: "Poppins-Medium", fontSize: 16, textAlign: "center",
                                            color: item.isChecked ? "#EBEEF6" : "#020202"
                                        }}
                                        label={item.title}
                                        style={{
                                            height: 50, backgroundColor: item.isChecked ? "#020202" : "#0202020D", borderRadius: 15,
                                            borderWidth: 0, marginBottom: 5, width: "100%", justifyContent: "center", alignItems: "center"
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
            </ImageBackground>
        </View>
    )
}