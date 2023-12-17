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
import { DeleteReportInput, ListReportsQueryVariables, ModelReportFilterInput } from "../API";
import _ from "lodash";
import DeviceInfo from 'react-native-device-info';
import { Dropdown } from 'react-native-element-dropdown';
import moment from "moment";
import { deleteReport } from "../graphql/mutations";

const MyStatsScreen = () => {
    const [metrics, setMetrics] = useState([
        { id: 1, name: FieldLabelType.Urgency, displayName: FieldLabelType.Urgency_Only, isChecked: false },
        { id: 2, name: FieldLabelType.Gas, displayName: FieldLabelType.Gas, isChecked: true },
        { id: 3, name: FieldLabelType.Consistency, displayName: FieldLabelType.Consistency, isChecked: false },
        { id: 4, name: FieldLabelType.Pain, displayName: FieldLabelType.Pain, isChecked: false },
        { id: 5, name: FieldLabelType.Spray, displayName: FieldLabelType.Spray, isChecked: true },
        { id: 6, name: FieldLabelType.Nausea, displayName: FieldLabelType.Nausea, isChecked: true },
        { id: 7, name: FieldLabelType.Volume, displayName: FieldLabelType.Volume, isChecked: false },
        { id: 8, name: FieldLabelType.Blood, displayName: FieldLabelType.Blood, isChecked: false }
    ]);
    const [reports, setReports] = useState([]);
    const [deviceId, setDeviceId] = useState("");

    // dataSets: [
    //     {"config": 
    //     {"circleColor": -16777216, "circleRadius": 3, "color": -4995329, "drawFilled": true, "drawHighlightIndicators": false, 
    // "drawValues": false, "fillColor": -4995329, "highlightEnabled": false, "lineWidth": 3,
    //  "valueFormatter": "###", "valueTextSize": 10}, "label": "Gas", "values": [{"x": 17, "y": 5}]}, 
    //  {"config": {"circleColor": -16777216, "circleRadius": 3, "color": -1127169, "drawFilled": true,
    //  "drawHighlightIndicators": false, "drawValues": false, "fillColor": -1127169, "highlightEnabled": false,
    //   "lineWidth": 3, "valueFormatter": "###", "valueTextSize": 10}, "label": "Spray", "values": [{"x": 17, "y": 3}]},
    //    {"config": {"circleColor": -16777216, "circleRadius": 3, "color": -3344897, "drawFilled": true, 
    //    "drawHighlightIndicators": false, "drawValues": false, "fillColor": -3344897, "highlightEnabled": false,
    //     "lineWidth": 3, "valueFormatter": "###", "valueTextSize": 10}, "label": "Nausea", "values": [{"x": 17, "y": 2}]}]


    const [data, setData] = useState({});
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

    const metricNameColorMap = {
        [FieldLabelType.Urgency]: { light: "#8585e0", dark: "#5c5cd6" },
        [FieldLabelType.Gas]: { light: "#aa80ff", dark: "#884dff" },
        [FieldLabelType.Consistency]: { light: "#cccc99", dark: "#aaaa55" },
        [FieldLabelType.Pain]: { light: "#ffad99", dark: "#ff8566" },
        [FieldLabelType.Spray]: { light: "#df80ff", dark: "#d24dff" },
        [FieldLabelType.Nausea]: { light: "#d98cb3", dark: "#d98cb3" },
        [FieldLabelType.Volume]: { light: "#ffb3d9", dark: "#ff4da6" },
        [FieldLabelType.Blood]: { light: "#ffbb99", dark: "#ff884d" }
    }

    useEffect(() => {
        DeviceInfo.getUniqueId().then((id) => {
            fetchReports(id, duration)
            setDeviceId(id);
        });
    }, []);

    const fetchReports = async (deviceId: string, duration: string) => {
        try {
            console.log("deviceId ", deviceId)
            console.log("duration", duration);
            console.log(moment().subtract(+duration, "days").toISOString());
            const variables: ListReportsQueryVariables = {
                filter: {
                    profileReportsDeviceId: { eq: deviceId },
                    dateTime: { gt: moment().subtract(+duration, "days").toISOString() }
                }
            }
            const response: any = await API.graphql<GraphQLQuery<ListReportsQueryVariables>>(
                {
                    query: query.listReports,
                    variables
                })
            console.log("Success")
            console.log("reports ", response.data.listReports);
            setReports(response.data.listReports.items);
            buildChartData(response.data.listReports.items);
        } catch (err) {
            console.error("Failed to fetch tags");
            console.error(err);
        }
    }

    const buildChartData = (data) => {
        const selectedMetrics = _.filter(metrics, "isChecked");
        console.log("Cheked ", selectedMetrics);
        const dateKeyAndReportsMap = {};
        _.each(data, (report) => {
            // to make date into no of days. 
            let period = moment().diff(moment(report.dateTime), 'days');
            if (period == 0) period = 1
            console.log("date", period);
            let metric;
            try {
                metric = JSON.parse(report.data);
            } catch (error) { }
            report.metric = metric;
            if (dateKeyAndReportsMap[period]) {
                dateKeyAndReportsMap[period].push(report);
            } else {
                dateKeyAndReportsMap[period] = [report];
            }
        });
    
        const metricNameAndDataPointsMap = {};
        _.each(Object.keys(dateKeyAndReportsMap), (key) => {
            if (dateKeyAndReportsMap[key].length > 1) {
                _.each(selectedMetrics, (selectedMetric) => {
                    let highestMetricInTheDate = 0;
                    _.each(dateKeyAndReportsMap[key], report => {
                        if (report.metric && report.metric[selectedMetric.name] && metricKeyAndValueMap[report.metric[selectedMetric.name]] > highestMetricInTheDate) {
                            highestMetricInTheDate = metricKeyAndValueMap[report.metric[selectedMetric.name]];
                        }
                    });
                    const metricPoint = { x: Number(key), y: highestMetricInTheDate };
                    if (metricNameAndDataPointsMap[selectedMetric.name]) {
                        metricNameAndDataPointsMap[selectedMetric.name].push(metricPoint);
                    } else {
                        metricNameAndDataPointsMap[selectedMetric.name] = [metricPoint];
                    }
                });
            } else {
                _.each(selectedMetrics, (selectedMetric) => {
                    const report = dateKeyAndReportsMap[key][0]
                    if (report.metric[selectedMetric.name]) {
                        const metricPoint = { x: Number(key), y: metricKeyAndValueMap[report.metric[selectedMetric.name]] };
                        if (metricNameAndDataPointsMap[selectedMetric.name]) {
                            metricNameAndDataPointsMap[selectedMetric.name].push(metricPoint);
                        } else {
                            metricNameAndDataPointsMap[selectedMetric.name] = [metricPoint];
                        }
                    }
                });
            }
        });

        const dataSets = [];
        _.each(Object.keys(metricNameAndDataPointsMap), metricName => {
            const values = [{ x: 0, y: 0 }, ...metricNameAndDataPointsMap[metricName], { x: 30, y: 0 }];
            dataSets.push({
                label: metricName,
                values,
                config: {
                    lineWidth: 3,
                    drawValues: false,
                    circleRadius: 4,
                    highlightEnabled: false,
                    drawHighlightIndicators: false,
                    color: processColor(metricNameColorMap[metricName].dark),
                    drawFilled: true,
                    fillColor: processColor(metricNameColorMap[metricName].light),
                    valueTextSize: 10,
                    valueFormatter: "###",
                    circleColor: processColor(metricNameColorMap[metricName].dark)
                }
            })
        });
        setData({ dataSets });
        // console.log("dataSets ", dataSets);
    };

    const handleTagChange = (tag) => {
        if (!tag.isChecked) {
            let selectedMetricCount = 0;
            _.each(metrics, metric => {
                if (metric.isChecked) {
                    selectedMetricCount++;
                }
                if (selectedMetricCount === 3) metric.isChecked = false;
            });
        }
        tag.isChecked = !tag.isChecked;
        setMetrics([...metrics]);
        buildChartData(reports);
    }

    const handleDurationChange = ({ value }) => {
        setDuration(value);
        fetchReports(deviceId, value);
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
                <View width={"100%"} style={{ display: "flex", marginHorizontal: 10, marginBottom: 15, alignItems: "center" }}>
                    <Text text70 style={{
                        width: "100%", textAlign: "center", color: "#514D4A", fontWeight: "700",
                        fontSize: 20, marginBottom: 10
                    }}>My Stats</Text>
                    <Dropdown
                        style={{
                            height: 30,
                            borderColor: 'gray',
                            borderWidth: 0.5,
                            paddingHorizontal: 8,
                            width: 100
                        }}
                        data={durationOptions}
                        value={duration}
                        labelField={"label" as any}
                        valueField={"value"}
                        onChange={handleDurationChange}
                    />
                </View>

                <View width={"100%"} style={{ marginBottom: 20, height: 200 }}>
                    <LineChart style={{ flex: 1 }}
                        borderColor={processColor("#bfbfbf")}
                        borderWidth={2}
                        drawBorders={true}
                        chartDescription={{ text: '' }}
                        marker={{
                            enabled: true,
                            markerColor: processColor('#F0C0FF8C'),
                            textColor: processColor('white'),
                            markerFontSize: 14
                        }}
                        xAxis={{ position: "BOTTOM", drawAxisLine: false, granularityEnabled: true, granularity: 1 }}
                        yAxis={{
                            limitLines: [{ lineColor: 0 }],
                            axisLineColor: 0,
                            left: {
                                granularityEnabled: true,
                                granularity: 1,
                                drawAxisLine: false,
                            },
                            right: {
                                granularityEnabled: true,
                                granularity: 1,
                                drawLabels: false,
                                drawAxisLine: false,
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
                                        {item.displayName}
                                    </Text>
                                </Button>
                            </View>
                        )}
                        numColumns={2}
                        itemSpacing={Spacings.s2}
                        listPadding={Spacings.s2}
                    />

                    <Text style={{ marginLeft: 10, fontWeight: "400", fontSize: 12, color: "#000000" }}>
                        Note: Only three metrics at the time
                    </Text>
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
