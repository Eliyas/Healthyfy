import moment from "moment";
import { Button, DateTimePicker, Text, View } from "react-native-ui-lib";

const DateTimeField = ({ dateValue, timeValue, setDateValue, setTimeValue }: any) => {

  const formatDate = (value, mode) => {
    console.log(moment(value).format("MMM Do"));
    if(mode == "time") {
      return moment(value).format('LT');
    } else {
      return moment(value).format("MMM D");
    }
  }


  return (
    <View style={{marginTop: 15, alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "center" }}>
      <Button
        borderRadius={25}
        size={Button.sizes.xSmall}
        style={{
          backgroundColor: "#0202020D", justifyContent: "center",
        }}
      >
        <DateTimePicker
          value={dateValue}
          dateTimeFormatter={(value, mode) => formatDate(value, mode)}
          containerStyle={{paddingHorizontal: 8, paddingVertical: 8}}
          style={{ fontWeight: "400", fontSize: 15, width: 55, fontFamily: "Poppins-Regular" }}
          placeholderTextColor={"#020202"}
          mode={"date"}
          onChange={(currentValue) => { setDateValue(currentValue); }}
          placeholder={"Date"}
        />
      </Button>

      <Button
        borderRadius={25}
        size={Button.sizes.xSmall}
        style={{
          backgroundColor: "#0202020D", justifyContent: "center", marginLeft: 5, paddingHorizontal: 20, paddingVertical: 10
        }}
      >
        <DateTimePicker
          value={timeValue}
          placeholderTextColor={"#020202"}
          dateTimeFormatter={(value, mode) => formatDate(value, mode)}
          is24Hour={false}
          style={{ fontWeight: "400", fontSize: 15, width: 60, fontFamily: "Poppins-Regular" }}
          onChange={(currentValue) => { setTimeValue(currentValue); }}
          mode={"time"}
          placeholder={"Time"}
        />
      </Button>
    </View>
  );
};

export default DateTimeField;