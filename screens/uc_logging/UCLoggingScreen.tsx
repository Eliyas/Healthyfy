import React, { useEffect, useRef, useState } from "react";
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
  Button,
  Colors,
  TextField,
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
  const [nausea, setNausea] = useState("");
  const [tags, setTags] = useState([
    { id: generateUUID(), label: "Walk", isChecked: false },
    { id: generateUUID(), label: "Stressful meeting", isChecked: false },
    { id: generateUUID(), label: "Gym", isChecked: false },
    { id: generateUUID(), label: "Sport", isChecked: false },
  ]);
  const [isTagEditMode, setIsTagEditMode] = useState(false);
  const carouselRef: any = useRef();

  useEffect(() => {
    if(carouselRef.current) {
      setTimeout(() => {
        if(carouselRef.current) carouselRef.current.next();
      }, 2000);
    }
  }, [date, time, urgency, consistency, spray, volume, blood, gas, pain, nausea ]);

  const nextCard = () => {
    
  }

  const DateField = ({ label, value, setValue }: any) => {
    return (
      <>
        <Text text70>{label}</Text>
        <DateTimePicker
          value={value}
          onChange={(currentValue) => {setValue(currentValue)}}
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
          onChange={(currentValue) => {setValue(currentValue);}}
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
        <Text text70 style={{ marginBottom: 13, marginLeft: 20, textAlign: "left", width: "100%" }}>
          {label}
        </Text>
        <RadioGroup
          width={"90%"}
          initialValue={value}
          onValueChange={(currentValue: any) => { setValue(currentValue);}}
        >
          <Button
            outline
            outlineColor={value == "0" ? "blue" : "lightgray"}
            borderRadius={0}
            size={Button.sizes.xSmall}
            onPress={() => setValue("0")}
            text60
            $textDefault
            style={{ borderWidth: 3, marginBottom: 13, width: "100%", justifyContent: "flex-start" }}
          >
            <RadioButton style={{ marginHorizontal: 5, marginVertical: 5 }} value={"0"} label={"0"} />
          </Button>

          <Button
            outline
            outlineColor={value == "1" ? "blue" : "lightgray"}
            borderRadius={0}
            size={Button.sizes.xSmall}
            text60
            onPress={() => setValue("1")}
            $textDefault
            style={{ borderWidth: 3, marginBottom: 13, width: "100%", justifyContent: "flex-start" }}
          >
            <RadioButton style={{ marginHorizontal: 5, marginVertical: 5 }} value={"1"} label={"1"} />
          </Button>

          <Button
            outline
            outlineColor={value == "2" ? "blue" : "lightgray"}
            borderRadius={0}
            size={Button.sizes.xSmall}
            onPress={() => setValue("2")}
            text60
            $textDefault
            style={{ borderWidth: 3, marginBottom: 13, width: "100%", justifyContent: "flex-start" }}
          >
            <RadioButton style={{ marginHorizontal: 5, marginVertical: 5 }} value={"2"} label={"2"} />
          </Button>

          <Button
            outline
            outlineColor={value == "3" ? "blue" : "lightgray"}
            borderRadius={0}
            size={Button.sizes.xSmall}
            onPress={() => setValue("3")}
            text60
            $textDefault
            style={{ borderWidth: 3, marginBottom: 13, width: "100%", justifyContent: "flex-start" }}
          >
            <RadioButton style={{ marginHorizontal: 5, marginVertical: 5 }} value={"3"} label={"3"} />
          </Button>

          <Button
            outline
            outlineColor={value == "4" ? "blue" : "lightgray"}
            borderRadius={0}
            size={Button.sizes.xSmall}
            onPress={() => setValue("4")}
            text60
            $textDefault
            style={{ borderWidth: 3, marginBottom: 13, width: "100%", justifyContent: "flex-start" }}
          >
            <RadioButton style={{ marginHorizontal: 5, marginVertical: 5 }} value={"4"} label={"4"} />
          </Button>

          <Button
            outline
            outlineColor={value == "5" ? "blue" : "lightgray"}
            borderRadius={0}
            size={Button.sizes.xSmall}
            onPress={() => setValue("5")}
            text60
            $textDefault
            style={{ borderWidth: 3, marginBottom: 13, width: "100%", justifyContent: "flex-start" }}
          >
            <RadioButton style={{ marginHorizontal: 5, marginVertical: 5 }} value={"5"} label={"5"} />
          </Button>
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
      label: FieldLabelType.Date
    },
    {
      id: 2,
      label: FieldLabelType.Time
    },
    {
      id: 3,
      label: FieldLabelType.Urgency
    },
    {
      id: 4,
      label: FieldLabelType.Consistency
    },
    {
      id: 5,
      label: FieldLabelType.Spray
    },
    {
      id: 6,
      label: FieldLabelType.Volume
    },
    {
      id: 7,
      label: FieldLabelType.Blood
    },
    {
      id: 8,
      label: FieldLabelType.Gas
    },
    {
      id: 9,
      label: FieldLabelType.Pain
    },
    {
      id: 10,
      label: FieldLabelType.Nausea
    },
    {
      id: 11,
      label: FieldLabelType.Tag,
      fieldComponent: null,
    },
  ];

  return (
    <Container>
      <HeaderViewContainer>
        <Text text50>UC Logging</Text>
      </HeaderViewContainer>

      <View style={{ flex: 1, marginTop: "40%" }}>
        <Carousel
          ref={carouselRef}
          style={{
            width: "100%",
            height: 700,
            alignItems: "center",
            justifyContent: "center",
          }}
          width={280}
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
                    height: 400,
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
                  {item.label == FieldLabelType.Date && <DateField label={item.label} value={date} setValue={setDate} />}
                  {item.label == FieldLabelType.Time && <TimeField label={item.label} value={time} setValue={setTime} />}
                  {item.label == FieldLabelType.Urgency && <RadioBtnField label={item.label} value={urgency} setValue={setUrgency} />}
                  {item.label == FieldLabelType.Consistency && <RadioBtnField label={item.label} value={consistency} setValue={setConsistency} />}
                  {item.label == FieldLabelType.Spray && <RadioBtnField label={item.label} value={spray} setValue={setSpray} />}
                  {item.label == FieldLabelType.Volume && <RadioBtnField label={item.label} value={volume} setValue={setVolume} />}
                  {item.label == FieldLabelType.Blood && <RadioBtnField label={item.label} value={blood} setValue={setBlood} />}
                  {item.label == FieldLabelType.Gas && <RadioBtnField label={item.label} value={gas} setValue={setGas} />}
                  {item.label == FieldLabelType.Pain && <RadioBtnField label={item.label} value={pain} setValue={setPain} />}
                  {item.label == FieldLabelType.Nausea && <RadioBtnField label={item.label} value={nausea} setValue={setNausea} />}

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
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                      <Text
                        text70
                        style={{ marginBottom: 13, marginRight: 20, marginLeft: 10 }}
                      >
                        {item.label}
                      </Text>
                      <FontAwesome
                        onPress={() => setIsTagEditMode(!isTagEditMode)}
                        name="edit"
                        size={21}
                        color="black"
                        style={{ marginTop: 5, marginRight: 10 }}
                      />
                    </View>

                    {tags.map((tag: any, index: number) => (
                      <View
                        style={{ flexDirection: "row", marginHorizontal: 10 }}
                        id={tag.id}
                        key={tag.id}
                      >
                        <Button
                          outline
                          outlineColor={tag.isChecked ? "blue" : "lightgray"}
                          borderRadius={0}
                          size={Button.sizes.xSmall}
                          text60
                          $textDefault
                          style={{ borderWidth: 3, marginBottom: 13, width: "100%", justifyContent: "space-between" }}
                        >
                          <Checkbox
                            style={{ marginVertical: 5, marginHorizontal: 5, marginRight: 10 }}
                            value={tag.isChecked}
                            onValueChange={() => handleTagChange(tag)}
                          />
                          { isTagEditMode && index == tags.length - 1 ? (
                            <TextField
                              style={{ marginRight: 10, width: 120, height: 20 }}
                              placeholder={"Tag Name"}
                              value={tag.label}
                              fieldStyle={ {
                                borderWidth: 1,
                                borderColor: Colors.$outlineDisabledHeavy,
                                padding: 4,
                                borderRadius: 2
                              }}
                              onChangeText={(currentValue) =>
                                handleTagValueChange(currentValue, tag)
                              }
                            />
                          ) : (
                            <Text text80 style={{ marginRight: 10, width: 135}}>
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
                        </Button>
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
