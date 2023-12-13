import { Button, DateTimePicker, Text, View } from "react-native-ui-lib";

const DateField = ({ label, dateValue, timeValue, setDateValue, setTimeValue }: any) => {
    return (
      <View style={{ alignItems: "center", display: "flex", width: "100%" }}>
        <Text text70 style={{ color: "#312E2B", fontWeight: "700", fontSize: 20, paddingTop: 30, paddingBottom: 40 }}>{label}</Text>
        <Button
          outline
          borderRadius={0}
          size={Button.sizes.xSmall}
          text60
          $textDefault
          style={{
            height: 55, backgroundColor: "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1, marginBottom: 13,
            width: "100%", justifyContent: "center"
          }}
        >
          <DateTimePicker
            value={dateValue}
            style={{ fontWeight: "400", fontSize: 20 }}
            onChange={(currentValue) => { setDateValue(currentValue); }}
            placeholder={"Select a date"}
          />
        </Button>

        <Button
          outline
          borderRadius={0}
          size={Button.sizes.xSmall}
          text60
          $textDefault
          style={{
            height: 55, backgroundColor: "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1,
            marginBottom: 13, width: "100%", justifyContent: "center"
          }}
        >
          <DateTimePicker
            value={ timeValue}
            style={{ fontWeight: "400", fontSize: 20 }}
            onChange={(currentValue) => { setTimeValue(currentValue); }}
            mode={"time"}
            placeholder={"Select a Time"}
          />
        </Button>
      </View>
    );
  };

  export default DateField;