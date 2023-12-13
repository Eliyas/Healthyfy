import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Image, processColor } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button, Card, Checkbox, GridList, GridListItem, GridView, Picker, Spacings, Text, View } from "react-native-ui-lib";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { LineChart } from 'react-native-charts-wrapper';
import { FieldLabelType } from "../constants";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from 'aws-amplify';
import * as query from "../graphql/queries";
import { ListReportsQueryVariables, ListTagsQueryVariables, ModelReportFilterInput } from "../API";
import _ from "lodash";
import DeviceInfo from 'react-native-device-info';

const MyStatsScreen = () => {
    const [metrics, setMetrics] = useState([
        { id: 1, name: FieldLabelType.Urgency_Only, isChecked: false },
        { id: 2, name: FieldLabelType.Gas, isChecked: false },
        { id: 3, name: FieldLabelType.Consistency, isChecked: false },
        { id: 4, name: FieldLabelType.Pain, isChecked: false },
        { id: 5, name: FieldLabelType.Spray, isChecked: false },
        { id: 6, name: FieldLabelType.Nausea, isChecked: false },
        { id: 7, name: FieldLabelType.Volume, isChecked: false },
        { id: 8, name: FieldLabelType.Blood, isChecked: false }
    ]);
    const [data, setData] = useState({
        dataSets: [
            {
                label: "Movements",
                values: [{ y: 1 }, { y: 2 }, { y: 1 }],
                config: {
                    lineWidth: 3,
                    drawValues: false,
                    circleRadius: 3,
                    highlightEnabled: false,
                    drawHighlightIndicators: false,
                    color: processColor('#cccccc'),
                    drawFilled: true,
                    fillColor: processColor('#cccccc'),
                    valueTextSize: 10,
                    valueFormatter: "###",
                    circleColor: processColor('black')
                }
            }
        ]
    });
    const [duration, setDuration] = useState("30 Days");
    const [durationOptions, setDurationOptions] = useState(["30 Days", "90 Days", "60 Days"]);

    useEffect(() => {
        DeviceInfo.getUniqueId().then((id) => fetchReports(id));
    }, []);

    const fetchReports = async (deviceId: string) => {
        try {
            const reportsInput: ListReportsQueryVariables = {
                filter: {}
            }
            const response: any = await API.graphql<GraphQLQuery<ModelReportFilterInput>>(
                {
                    query: query.listReports,
                    variables: {}
                })
            console.log("Success")
            console.log("reports ", response.data.listReports.items)
            const input: ListTagsQueryVariables = {
                filter: {
                    profileTagsId: { eq: deviceId },
                    reportTagsId: {
                        between: _.map(response.data.listReports.items, "id") as string[]
                    }
                }
            }
            const response1: any = await API.graphql<GraphQLQuery<string>>(
                {
                    query: query.getReport,
                    variables: input
                })
            const tagIdInfoMap = {};
            console.log("response1 ", response1);
            // _.each(tags, tag => {
            //     tagIdInfoMap[tag.id] = tag;
            // });
            // _.each(response.data.listTags.items, tag => {
            //     if (tagIdInfoMap[tag.id]) {
            //         tag.isChecked = tagIdInfoMap[tag.id].isChecked;
            //     }
            // });
            // setTags(_.sortBy(response.data.listTags.items, "createdAt"));
            // fuse = new Fuse(response.data.listTags.items, { includeScore: true, keys: ['name'] });
        } catch (err) {
            console.error("Failed to fetch tags");
            console.error(err);
        }
    }

    const handleTagChange = (tag) => {
        tag.isChecked = !tag.isChecked;
        setMetrics([...metrics]);
    }

    return <Container style={{ backgroundColor: "#E6DBD9" }}>
        <HeaderViewContainer>
            <Text text50 style={{ color: "#514D4A", textAlign: "center", width: "100%" }}>My UC Healing Journey</Text>
        </HeaderViewContainer>

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
                    width: "100%",
                }}
                enableBlur={false}
                paddingH-5
                paddingV-20
                onPress={() => console.log("pressed")}
            >
                <View width={"100%"} style={{ marginHorizontal: 10 }}>
                    <Text text70 style={{ color: "#514D4A", fontWeight: "400", fontSize: 20, marginBottom: 20 }}>My Stats</Text>
                </View>

                <View width={"100%"} style={{ marginHorizontal: 10 }}>
                    <Picker
                        label="Wheel Picker"
                        placeholder="Pick a Language"
                        useWheelPicker
                        value={duration}
                        onChange={(nativePickerValue: string) => setDuration(nativePickerValue)}
                        trailingAccessory={<AntDesign
                            name="downsquare"
                            size={21}
                            style={{ marginLeft: 10 }}
                            color="black"
                        />}
                    >
                        {durationOptions.map(option => (
                            <Picker.Item key={option} value={option} label={option} />
                        ))}
                    </Picker>

                </View>

                <View width={"100%"} style={{ marginBottom: 20, height: 200 }}>
                    <LineChart style={{ flex: 1 }}
                        borderColor={processColor("black")}
                        borderWidth={2}
                        drawBorders={true}
                        chartDescription={{ text: '' }}
                        marker={{
                            enabled: true,
                            markerColor: processColor('#F0C0FF8C'),
                            textColor: processColor('white'),
                            markerFontSize: 14
                        }}
                        xAxis={{ position: "BOTTOM", drawAxisLine: false, drawLabels: false, granularityEnabled: true, granularity: 1 }}
                        yAxis={{
                            limitLines: [{ lineColor: 0 }],
                            axisLineColor: 0,
                            drawLabels: false,
                            left: {
                                granularityEnabled: true,
                                granularity: 1, drawLabels: false, drawAxisLine: false,
                            },
                            right: {
                                granularityEnabled: true,
                                granularity: 1, drawLabels: false, drawAxisLine: false,
                            },
                        }}
                        data={data}
                    />
                </View>

                <View style={{ display: "flex", width: "100%" }}>
                    <GridList
                        containerWidth={310}
                        maxItemWidth={150}
                        data={metrics}
                        renderItem={({ item }) => (
                            <View key={item.id}>
                                <Button
                                    outline
                                    borderRadius={0}
                                    size={Button.sizes.xSmall}
                                    $textDefault
                                    onPress={() => handleTagChange(item)}
                                    style={{
                                        height: 50, backgroundColor: "#FFFFFF", borderColor: "#5C5A57",
                                        borderWidth: 1, marginBottom: 5, justifyContent: "flex-start"
                                    }}
                                >
                                    <Checkbox
                                        style={{ width: 20, height: 20, display: item.isChecked ? "flex" : "none" }}
                                        value={item.isChecked}
                                        borderRadius={100}
                                        color="#5C5A57"
                                        onValueChange={() => handleTagChange(item)}
                                    />
                                    <Text style={{
                                        width: "80%", justifyContent: "center", fontWeight: "400", fontSize: 15,
                                        textAlign: "center", color: "#000000"
                                    }}>
                                        {item.name}
                                    </Text>
                                </Button>
                            </View>
                        )}
                        numColumns={2}
                        itemSpacing={Spacings.s2}
                        listPadding={Spacings.s2}
                    />
                </View>

            </Card>
        </View>
    </Container>
}

export default MyStatsScreen;


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
