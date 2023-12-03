import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { FadeInRight } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native";
import _ from "lodash";
import {
  DateTimePicker,
  RadioGroup,
  View,
  Text,
  Card,
  RadioButton,
  Checkbox,
} from "react-native-ui-lib";
import { FieldLabelType } from "../../constants";
import { generateUUID } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";

const config: any = {
  mode: "horizontal-stack",
  snapDirection: "left",
  pagingEnabled: true,
  loop: false,
  snapEnabled: false,
  autoPlay: false,
  autoPlayReverse: false,
};

export default function UCLoggingScreen() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [urgency, setUrgency] = useState("");
  const [consistency, setConsistency] = useState("");
  const [spray, setSpray] = useState("");
  const [volume, setVolume] = useState("");
  const [blood, setBlood] = useState("");
  const [gas, setGas] = useState("");
  const [pain, setPain] = useState("");
  const [testValue, setTestValue] = useState("");
  const [nausea, setNausea] = useState("");
  const [tags, setTags] = useState([
    { id: generateUUID(), label: "Walk", isChecked: false },
    { id: generateUUID(), label: "Stressful meeting", isChecked: false },
    { id: generateUUID(), label: "Gym", isChecked: false },
    { id: generateUUID(), label: "Sport", isChecked: false },
  ]);
  const [isTagEditMode, setIsTagEditMode] = useState(false);

  const DateField = ({ label, value, setValue }: any) => {
    return (
      <>
        <Text text70>{label}</Text>
        <DateTimePicker
          value={value}
          onChange={(currentValue) => setValue(currentValue)}
          containerStyle={{ marginVertical: 20 }}
          placeholder={"Select a date"}
        />
      </>
    );
  };

  const TimeField = ({ label, value, setValue }: any) => {
    return (
      <>
        <Text text70>{label}</Text>
        <DateTimePicker
          value={value}
          onChange={(currentValue) => setValue(currentValue)}
          mode={"time"}
          containerStyle={{ marginVertical: 20 }}
          placeholder={"Select a Time"}
        />
      </>
    );
  };

  const RadioBtnField = ({ label, value, setValue }: any) => {
    return (
      <>
        <Text text70 style={{ marginBottom: 13 }}>
          {label}
        </Text>
        <RadioGroup
          initialValue={value}
          onValueChange={(currentValue: any) => setValue(currentValue)}
        >
          <RadioButton style={{ marginBottom: 13 }} value={"0"} label={"0"} />
          <RadioButton style={{ marginBottom: 13 }} value={"1"} label={"1"} />
          <RadioButton style={{ marginBottom: 13 }} value={"2"} label={"2"} />
          <RadioButton style={{ marginBottom: 13 }} value={"3"} label={"3"} />
          <RadioButton style={{ marginBottom: 13 }} value={"4"} label={"4"} />
          <RadioButton style={{ marginBottom: 13 }} value={"5"} label={"5"} />
        </RadioGroup>
      </>
    );
  };

  const handleTagChange = (tag: any) => {
    tag.isChecked = !tag.isChecked;
    setTags([...tags]);
  };

  const handleTagRemove = (tagId: string) => {
    const updatedTags: any = [];
    tags.forEach((tag) => {
      if (tag.id !== tagId) updatedTags.push(tag);
    });
    setTags(updatedTags);
  };

  const handleTagAdd = () => {
    const newTag = { id: generateUUID(), label: "", isChecked: false };
    setTags([...tags, newTag]);
  };

  const handleTagValueChange = (value: string, tag: any) => {
    console.log("ch value " + value);
    tag.label = value;
    setTags([...tags]);
  };

  const viewCount = 5;

  const DATA = [
    {
      id: 1,
      label: FieldLabelType.Date,
      fieldComponent: (label: string) => (
        <DateField label={label} value={date} setValue={setDate} />
      ),
    },
    {
      id: 2,
      label: FieldLabelType.Time,
      fieldComponent: (label: string) => (
        <TimeField label={label} value={time} setValue={setTime} />
      ),
    },
    {
      id: 3,
      label: FieldLabelType.Urgency,
      fieldComponent: (label: string) => (
        <RadioBtnField label={label} value={urgency} setValue={setUrgency} />
      ),
    },
    {
      id: 4,
      label: FieldLabelType.Consistency,
      fieldComponent: (label: string) => (
        <RadioBtnField
          label={label}
          value={consistency}
          setValue={setConsistency}
        />
      ),
    },
    {
      id: 5,
      label: FieldLabelType.Spray,
      fieldComponent: (label: string) => (
        <RadioBtnField label={label} value={spray} setValue={setSpray} />
      ),
    },
    {
      id: 6,
      label: FieldLabelType.Volume,
      fieldComponent: (label: string) => (
        <RadioBtnField label={label} value={volume} setValue={setVolume} />
      ),
    },
    {
      id: 7,
      label: FieldLabelType.Blood,
      fieldComponent: (label: string) => (
        <RadioBtnField label={label} value={blood} setValue={setBlood} />
      ),
    },
    {
      id: 8,
      label: FieldLabelType.Gas,
      fieldComponent: (label: string) => (
        <RadioBtnField label={label} value={gas} setValue={setGas} />
      ),
    },
    {
      id: 9,
      label: FieldLabelType.Pain,
      fieldComponent: (label: string) => (
        <RadioBtnField label={label} value={pain} setValue={setPain} />
      ),
    },
    {
      id: 10,
      label: FieldLabelType.Nausea,
      fieldComponent: (label: string) => (
        <RadioBtnField label={label} value={nausea} setValue={setNausea} />
      ),
    },
    {
      id: 11,
      label: FieldLabelType.Tag,
      fieldComponent: null
    },
  ];

  return (
    <Container>
      <HeaderViewContainer>
        <Text text50>UC Logging</Text>
      </HeaderViewContainer>

      <View style={{ flex: 1, marginTop: "40%" }}>
        <Carousel
          style={{
            width: "100%",
            height: 600,
            alignItems: "center",
            justifyContent: "center",
          }}
          width={280}
          height={550}
          pagingEnabled={config.pagingEnabled}
          snapEnabled={config.snapEnabled}
          mode={config.mode}
          loop={config.loop}
          autoPlay={config.autoPlay}
          autoPlayReverse={config.autoPlayReverse}
          data={DATA}
          modeConfig={{
            snapDirection: config.snapDirection,
            stackInterval: config.mode === "vertical-stack" ? 8 : 18,
          }}
          customConfig={() => ({ type: "positive", viewCount })}
          renderItem={({ item }) => (

            <View>
              {item.label != FieldLabelType.Tag ? (

                <Card
                  activeOpacity={1}
                  enableShadow={true}
                  style={{
                    height: 300,
                    elevation: 10,
                    shadowColor: "#52006A",
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  enableBlur={false}
                  paddingH-10
                  paddingV-20
                  key={item.id}
                  onPress={() => console.log("pressed")}
                >
                  {item.fieldComponent(item.label)}
                </Card>

              ) : (

                <Card
                  activeOpacity={1}
                  enableShadow={true}
                  style={{
                    height: 300,
                    elevation: 10,
                    shadowColor: "#52006A",
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  enableBlur={false}
                  paddingH-10
                  paddingV-20
                  key={item.id}
                  onPress={() => console.log("pressed")}
                >
                  <ScrollView style={{ height: 280 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text
                        text70
                        style={{ marginBottom: 13, marginRight: 20 }}
                      >
                        {item.label}
                      </Text>
                      <FontAwesome
                        onPress={() => setIsTagEditMode(!isTagEditMode)}
                        name="edit"
                        size={21}
                        color="black"
                        style={{ marginTop: 5 }}
                      />
                    </View>

                    {tags.map((tag: any, index: number) => (
                      <View
                        style={{ flexDirection: "row" }}
                        id={tag.id}
                        key={tag.id}
                      >
                        <Checkbox
                          style={{ marginBottom: 13, marginRight: 10 }}
                          value={tag.isChecked}
                          onValueChange={() => setTestValue(tag)}
                        />
                        {isTagEditMode && index == tags.length - 1 ? (
                          <TextInput
                            style={{ marginRight: 10, marginBottom: 5 }}
                            placeholder={"Tag Name"}
                            value={tag.label}
                            onChangeText={(currentValue) =>
                              handleTagValueChange(currentValue, tag)
                            }
                          />
                        ) : (
                          <Text text80 style={{ marginRight: 10 }}>
                            {" "}
                            {tag.label}{" "}
                          </Text>
                        )}

                        {isTagEditMode && index + 1 == tags.length && (
                          <AntDesign
                            onPress={() => handleTagAdd()}
                            name="pluscircleo"
                            size={24}
                            color="black"
                          />
                        )}
                        {isTagEditMode && index < tags.length - 1 && (
                          <AntDesign
                            onPress={() => handleTagRemove(tag.id)}
                            name="minuscircleo"
                            size={21}
                            color="black"
                          />
                        )}
                      </View>
                    ))}
                  </ScrollView>
                </Card>
              )}

            </View>
          )}
        />

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        ></View>
      </View>
    </Container>
  );
}

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
