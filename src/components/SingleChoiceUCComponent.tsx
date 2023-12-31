import { Button, Text, View } from "react-native-ui-lib";
import { ConsistencyType, FieldLabelType, MetricTypeInfo } from "../constants";

const FieldTypeMetricOptionsMap = {
    [FieldLabelType.Urgency]: {
        "section-1": [
            MetricTypeInfo.EMERGENCY, MetricTypeInfo.VERY_HIGH
        ],
        "section-2": [MetricTypeInfo.HIGH, MetricTypeInfo.LOW, MetricTypeInfo.MODERATE],
        "section-3": [MetricTypeInfo.NONE]
    },
    [FieldLabelType.Consistency]: {
        "section-1": [
            ConsistencyType.FORMED, ConsistencyType.SOFT, ConsistencyType.LOOSE
        ],
        "section-2": [ConsistencyType.LIQUID]
    },
    [FieldLabelType.Spray]: {
        "section-1": [
            MetricTypeInfo.EMERGENCY, MetricTypeInfo.VERY_HIGH,
        ],
        "section-2": [MetricTypeInfo.NONE, MetricTypeInfo.LOW, MetricTypeInfo.MODERATE]
    },
    [FieldLabelType.Volume]: {
        "section-1": [
            MetricTypeInfo.VERY_HIGH, MetricTypeInfo.HIGH, MetricTypeInfo.LOW
        ],
        "section-2": [MetricTypeInfo.NONE, MetricTypeInfo.MODERATE]
    },
    [FieldLabelType.Blood]: {
        "section-1": [
            MetricTypeInfo.VERY_HIGH, MetricTypeInfo.HIGH, MetricTypeInfo.LOW,
        ],
        "section-2": [MetricTypeInfo.NONE, MetricTypeInfo.MODERATE]
    },
    [FieldLabelType.Gas]: {
        "section-1": [
            MetricTypeInfo.VERY_HIGH, MetricTypeInfo.HIGH, MetricTypeInfo.LOW,
        ],
        "section-2": [MetricTypeInfo.NONE, MetricTypeInfo.MODERATE]
    },
    [FieldLabelType.Pain]: {
        "section-1": [
            MetricTypeInfo.VERY_HIGH, MetricTypeInfo.HIGH, MetricTypeInfo.LOW,
        ],
        "section-2": [MetricTypeInfo.NONE, MetricTypeInfo.MODERATE]
    },
    [FieldLabelType.Nausea]: {
        "section-1": [
            MetricTypeInfo.VERY_HIGH, MetricTypeInfo.HIGH, MetricTypeInfo.LOW,
        ],
        "section-2": [MetricTypeInfo.NONE, MetricTypeInfo.MODERATE]
    }
}

const SingleChoiceUCComponent = ({ label, subLabel, metricType, value, handleValueSelect }: any) => {
    return (
        <View style={{ alignItems: "center", display: "flex", width: "100%" }}>
            <Text text70 style={{
                color: "#312E2B", fontWeight: "500", fontSize: 25, paddingVertical: 5,
                marginLeft: 20, marginTop: 10, textAlign: "center", width: "100%", fontFamily: "Poppins-Regular"
            }}>
                {label}
            </Text>
            <Text text70 style={{
                color: "#000000", fontWeight: "200", fontSize: 18, marginBottom: 10, paddingVertical: 5,
                marginLeft: 20, textAlign: "center", width: "100%", fontFamily: "Poppins-Light"
            }}>
                {subLabel}
            </Text>

            <View row style={{ width: "100%", display: "flex", flexWrap: "wrap", marginTop: 10, marginBottom: 20 }}>
                {
                    Object.keys(FieldTypeMetricOptionsMap[metricType]).map((sectionKey, index) => {
                        return (
                            <View key={index} row style={{ width: "100%", display: "flex", justifyContent: "flex-end", marginBottom: 15 }}>
                                {FieldTypeMetricOptionsMap[metricType][sectionKey].map((metric, index) => (
                                    <Button
                                        key={index}
                                        borderRadius={25}
                                        style={{
                                            backgroundColor: value == metric.label ? "#5C5A57" : "#0202020D", justifyContent: "center", marginLeft: 5,
                                            paddingHorizontal: 10, paddingVertical: 10
                                        }}
                                        onPress={() => { handleValueSelect(label, metric.label); }}
                                        labelStyle={{
                                            fontWeight: "400", fontSize: 16, textAlign: "center", color: value == metric.label ? "#FFFFFF" : "#020202",
                                            fontFamily: "Poppins-Regular"
                                        }}
                                        label={metric.displayName}
                                    />
                                ))}
                            </View>
                        )
                    })
                }
            </View>
        </View>
    );
};

export default SingleChoiceUCComponent;