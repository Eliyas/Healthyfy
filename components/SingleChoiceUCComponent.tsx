import { Button, Text, View } from "react-native-ui-lib";

const radioOptions = [
    { id: "1", label: "None" },
    { id: "2", label: "Low" },
    { id: "3", label: "Moderate" },
    { id: "4", label: "High" },
    { id: "5", label: "Very High" },
    { id: "6", label: "Emergency!" },
]

const SingleChoiceUCComponent = ({ label, value, handleValueSelect }: any) => {
    return (
        <View style={{ alignItems: "center", display: "flex", width: "100%" }}>
            <Text text70 style={{
                color: "#312E2B", fontWeight: "700", fontSize: 20, marginBottom: 13,
                marginLeft: 20, textAlign: "center", width: "100%"
            }}>
                {label}
            </Text>

            <View width={"90%"}>
                {radioOptions.map((option) => (
                    <Button
                        key={option.id}
                        outline
                        borderRadius={0}
                        size={Button.sizes.xSmall}
                        onPress={() => { handleValueSelect(label, option.label); }}
                        labelStyle={{ fontWeight: "400", fontSize: 20, textAlign: "center", color: value == option.label ? "#FFFFFF" : "#312E2B"}}
                        label={option.label}
                        $textDefault
                        style={{
                            height: 50, backgroundColor: value == option.label ? "#5C5A57" : "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1, marginBottom: 13,
                            width: "100%", justifyContent: "center"
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default SingleChoiceUCComponent;