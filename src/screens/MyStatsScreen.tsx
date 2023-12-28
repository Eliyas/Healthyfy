import React, { useEffect, useState } from "react";
import { ImageBackground, processColor } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button, Card, Checkbox, GridList, Image, Spacings, Text, View } from "react-native-ui-lib";
import { LineChart } from 'react-native-charts-wrapper';
import { FieldLabelType, MetricType } from "../constants";
import { GraphQLQuery } from "@aws-amplify/api";
import { API } from 'aws-amplify';
import * as query from "../graphql/queries";
import { ListReportsQueryVariables } from "../API";
import _ from "lodash";
import DeviceInfo from 'react-native-device-info';
import { Dropdown } from 'react-native-element-dropdown';
import moment from "moment";
import firstPageBg from "../../assets/first-page-bg.png";
import pageBg from "../../assets/first-page.png";
import checkbox1 from "../../assets/checkbox1.png";
import checkbox2 from "../../assets/checkbox2.png";
import filter from "../../assets/filter.png";

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

    const [data, setData] = useState({});
    const [duration, setDuration] = useState("1");

    const durationOptions = [
        { label: "Today", value: "1" },
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

    return <Container>
        <View style={{
            justifyContent: "center",
            alignItems: "center"
        }}>
            <ImageBackground source={firstPageBg} resizeMode="cover" style={{ paddingTop: 10, width: "100%", height: "100%", justifyContent: 'center' }}>
                <View style={{ position: 'absolute', minWidth: 350, minHeight: 400, top: 0, zIndex: 10 }}>
                    <ImageBackground source={pageBg} resizeMode="contain" width={50} height={50} style={{
                        flex: 1
                    }}></ImageBackground>
                </View>

                <View row width={"100%"} style={{
                    flexDirection: "column", height: "100%", alignItems: "center",
                    zIndex: 20
                }} >

                    <View style={{ display: "flex", paddingHorizontal: 10, marginBottom: 10, width: "100%" }}>
                        <Text style={{ fontSize: 40, fontFamily: 'Neuton-Regular', color: "#020202", width: "100%" }}>Your Stats, </Text>
                        <View style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>

                            <Dropdown
                                selectedTextStyle={{ display: "none" }}
                                data={durationOptions}
                                value={duration}
                                labelField={"label" as any}
                                valueField={"value"}
                                renderRightIcon={() => (
                                    <View style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ fontSize: 25, fontFamily: 'Neuton-Regular', color: "#020202", paddingRight: 20 }}>Today</Text>
                                        <Image
                                            style={{ width: 15, height: 15 }}
                                            source={filter}
                                        />
                                    </View>


                                )}
                                onChange={handleDurationChange}
                            />
                        </View>

                    </View>


                    <View style={{ width: "100%", height: 220, paddingHorizontal: 10, marginBottom: 10 }}>
                        <Card
                            activeOpacity={1}
                            enableShadow={false}
                            style={{
                                backgroundColor: "white",
                                borderWidth: 0,
                                borderRadius: 0,
                                shadowOpacity: 1,
                                shadowRadius: 0,
                                paddingHorizontal: 10,
                                height: 220,
                                width: "100%",
                            }}
                            enableBlur={false}
                            paddingH-10
                            paddingV-20
                        >
                            <LineChart style={{ flexGrow: 1 }}
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
                        </Card>
                    </View>

                    <View style={{ width: "100%", paddingHorizontal: 10 }}>
                        <Text style={{ color: "#020202", fontWeight: "400", fontFamily: "Poppins-Medium", fontSize: 23 }}>
                            Please select from following factors
                        </Text>
                    </View>

                    <GridList
                        data={metrics}
                        numColumns={3}
                        style={{ padding: 0 }}
                        renderItem={({ item }) => (
                            <View key={item.id}>
                                <Button
                                    borderRadius={0}
                                    $textDefault
                                    onPress={() => handleTagChange(item)}
                                    style={{
                                        height: 90, backgroundColor: item.isChecked ? "#020202" : "#0202020D", borderRadius: 15,
                                        borderColor: "#5C5A57", borderWidth: 0, justifyContent: "space-between", flexDirection: "column"
                                    }}
                                >
                                    <View style={{ width: "100%", display: "flex", alignItems: "flex-end" }}>
                                        <Checkbox
                                            style={{ display: "none" }}
                                            value={item.isChecked}
                                            borderRadius={100}
                                            color="#5C5A57"
                                            onValueChange={() => handleTagChange(item)}
                                        />

                                        {
                                            item.isChecked ? <Image
                                                style={{ width: 15, height: 15 }}
                                                source={checkbox1}
                                            /> :
                                                <Image
                                                    style={{ width: 15, height: 15 }}
                                                    source={checkbox2}
                                                />
                                        }

                                    </View>

                                    <Text style={{
                                        fontWeight: "400", fontFamily: "Poppins-Medium",
                                        justifyContent: "center", fontSize: 15,
                                        textAlign: "center", color: item.isChecked ? "#FEFEFE" : "#020202"
                                    }}>
                                        {item.displayName}
                                    </Text>
                                </Button>
                            </View>
                        )}
                        itemSpacing={Spacings.s3}
                        listPadding={Spacings.s3}
                    />

                </View>
            </ImageBackground>
        </View>
    </Container>
}

export default MyStatsScreen;


const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
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
