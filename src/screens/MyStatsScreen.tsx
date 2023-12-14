import React, { useEffect, useState } from "react";
import { processColor } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button, Card, Checkbox, GridList, Picker, Spacings, Text, View } from "react-native-ui-lib";
import { AntDesign } from "@expo/vector-icons";
import { LineChart } from 'react-native-charts-wrapper';
import { FieldLabelType, MetricType } from "../constants";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from 'aws-amplify';
import * as query from "../graphql/queries";
import { ListReportsQueryVariables, ModelReportFilterInput } from "../API";
import _ from "lodash";
import DeviceInfo from 'react-native-device-info';
import { Dropdown } from 'react-native-element-dropdown';
import moment from "moment";

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
    const [duration, setDuration] = useState("30");

    const durationOptions = [
        { label: "30 Days", value: "30" },
        { label: "60 Days", value: "60" },
        { label: "90 Days", value: "90" }
    ];
    const metricKeyAndValueMap = {
        [MetricType.NONE]: 0,
        [MetricType.LOW]: 1,
        [MetricType.MODERATE]: 2,
        [MetricType.HIGH]: 3,
        [MetricType.VERY_HIGH]: 4,
        [MetricType.EMERGENCY]: 5
    }

    useEffect(() => {
        DeviceInfo.getUniqueId().then((id) => fetchReports(id));
    }, []);

    const fetchReports = async (deviceId: string) => {
        try {
            console.log("deviceId ", deviceId)
            const reportsInput: ListReportsQueryVariables = {
                filter: { profileReportsDeviceId: { eq: deviceId } }
            }
            const response: any = await API.graphql<GraphQLQuery<ModelReportFilterInput>>(
                {
                    query: query.listReports,
                    variables: { reportsInput }
                })
            console.log("Success")
            console.log("reports ", response.data.listReports);
        } catch (err) {
            console.error("Failed to fetch tags");
            console.error(err);
        }
    }

    // const buildChartData = (data) => {
    //     const selectedField = _.filter(metrics, "isChecked");
    //     console.log("Cheked ", selectedField);
    //     const fieldNameKeyAndDateKeyAndValueMap = {}
    //     _.each(selectedField, (field, index) => {
    //         let metrics;
    //         try {
    //             metrics = JSON.parse(data[index].data);
    //         } catch (error) { }
    //         console.log("Metrics ", metrics);
    //         if (metrics[field.name]) {
    //             const date = moment(data[index].createdAt).get("date");

    //         }


    //     });


    // };

    // buildChartData([{ "__typename": "Report", "createdAt": "2023-12-14T19:00:42.234Z", "data": "{\"volume\":\"Emergency!\",\"pain\":\"\",\"spray\":\"Moderate\",\"urgency\":\"High\",\"gas\":\"\",\"consistency\":\"Very High\",\"blood\":\"Moderate\",\"nausea\":\"\"}", "dateTime": "2023-12-14T18:58:30.168Z", "id": "cf729eb6-e018-4db0-9292-e912fdaec581", "profileReportsDeviceId": "b010e056640b2a0d", "type": "POO", "updatedAt": "2023-12-14T19:00:42.234Z" }, { "__typename": "Report", "createdAt": "2023-12-14T19:01:59.943Z", "data": "{\"volume\":\"Very High\",\"pain\":\"\",\"spray\":\"Low\",\"urgency\":\"Moderate\",\"gas\":\"Moderate\",\"consistency\":\"High\",\"blood\":\"Low\",\"nausea\":\"\"}", "dateTime": "2023-12-14T19:01:19.693Z", "id": "36c592e4-e575-4639-817d-67da66822883", "profileReportsDeviceId": "b010e056640b2a0d", "type": "POO", "updatedAt": "2023-12-14T19:01:59.943Z" }])

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
                    <Dropdown
                        data={durationOptions}
                        value={duration}
                        labelField={"label"}
                        valueField={"value"}
                        onChange={item => setDuration(item.value)}
                    />
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
