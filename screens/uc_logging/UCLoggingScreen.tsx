import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { FadeInRight } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { TextInput, Dimensions } from "react-native";
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
  Toast,
} from "react-native-ui-lib";
import { FieldLabelType } from "../../constants";
import { generateUUID } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { CreateReportInput, PostStatus } from "../../src/API";
import { generateClient } from 'aws-amplify/api';
import * as mutations from '../../src/graphql/mutations';
import TagsComponent from "../../components/TagsComponent";
import moment from "moment";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const client = generateClient();

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
  const [currentPage, setCurrentPage] = useState(0);
  const [tags, setTags] = useState([
    { id: generateUUID(), label: "Walk", isChecked: false },
    { id: generateUUID(), label: "Stressful meeting", isChecked: false },
    { id: generateUUID(), label: "Gym", isChecked: false },
    { id: generateUUID(), label: "Sport", isChecked: false },
  ]);
  const [isTagEditMode, setIsTagEditMode] = useState(false);
  const [isAutoFullSlideOver, setIsAutoFullSlideOver] = useState(false);
  const [toastInfo, setToastInfo] = useState({
    isSuccess: false,
    message: "",
    isShowToast: false
  });
  const carouselRef: any = useRef();
  const width = Dimensions.get('window').width;
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();

  useEffect(() => {
    console.log("carouselRef.current " + carouselRef.current.getCurrentIndex() + " " + currentPage);
    if (carouselRef.current) {
      if (!isAutoFullSlideOver && carouselRef.current && carouselRef.current.getCurrentIndex() < currentPage) {
        console.log("carouselRef.current inner " + carouselRef.current.getCurrentIndex() + " " + currentPage);
        console.log("changing");
        carouselRef.current.next(1);
        if ((carouselRef.current.getCurrentIndex() + 1) == 10) setIsAutoFullSlideOver(true);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    setTimeout(() => {
      setToastInfo({ ...toastInfo, isShowToast: false });
    }, 3000);
  }, [toastInfo]);

  const DateField = ({ label, dateValue, timeValue, setDateValue, setTimeValue }: any) => {
    return (
      <>
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
            value={timeValue}
            style={{ fontWeight: "400", fontSize: 20 }}
            onChange={(currentValue) => { setTimeValue(currentValue); }}
            mode={"time"}
            placeholder={"Select a Time"}
          />
        </Button>
      </>
    );
  };

  const RadioBtnField = ({ label, value, setValue, page }: any) => {
    return (
      <>
        <Text text70 style={{
          color: "#312E2B", fontWeight: "700", fontSize: 20, marginBottom: 13,
          marginLeft: 20, textAlign: "center", width: "100%"
        }}>
          {label}
        </Text>
        <RadioGroup
          width={"90%"}
          initialValue={value}
          onValueChange={(currentValue: any) => { setValue(currentValue); }}
        >
          {radioOptions.map((option) => (
            <Button
              key={option.id}
              outline
              borderRadius={0}
              size={Button.sizes.xSmall}
              onPress={() => { setValue(option.label); setCurrentPage(page + 1); }}
              labelStyle={{ fontWeight: "400", fontSize: 20, textAlign: "center", color: value == option.label ? "#FFFFFF" : "#312E2B" }}
              label={option.label}
              $textDefault
              style={{
                height: 50, backgroundColor: value == option.label ? "#5C5A57" : "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1, marginBottom: 13,
                width: "100%", justifyContent: "center"
              }}
            >
              <RadioButton style={{ marginHorizontal: 5, marginVertical: 5, display: "none" }} value={option.label} />
            </Button>
          ))}

        </RadioGroup>
      </>
    );
  };

  const radioOptions = [
    { id: "1", label: "None" },
    { id: "2", label: "Low" },
    { id: "3", label: "Moderate" },
    { id: "4", label: "High" },
    { id: "5", label: "Very High" },
    { id: "6", label: "Emergency!" },
  ]


  const handleDateSelect = (value) => {
    setDate(value);
    if (time) {
      setCurrentPage(1);
    }
  };

  const handleTimeSelect = (value) => {
    setTime(value);
    if (date) {
      setCurrentPage(1);
    }
  };

  const handleTagValueChange = (value: string, tag: any) => {
    console.log("ch value " + value);
    tag.label = value;
    setTags([...tags]);
  };

  const handleScrollEnd = (index) => {
    console.log("index ", index);
    _.debounce(() => {
      setCurrentPage(index); 
      console.log("throttle ");
    }, 2000)();
  }

  const viewCount = 5;

  const DATA = [
    {
      id: 1,
      label: FieldLabelType.DateTime,
      page: 0
    },
    {
      id: 2,
      label: FieldLabelType.Urgency,
      page: 1
    },
    {
      id: 3,
      label: FieldLabelType.Consistency,
      page: 2
    },
    {
      id: 4,
      label: FieldLabelType.Spray,
      page: 3
    },
    {
      id: 5,
      label: FieldLabelType.Volume,
      page: 4
    },
    {
      id: 6,
      label: FieldLabelType.Blood,
      page: 5
    },
    {
      id: 7,
      label: FieldLabelType.Gas,
      page: 6
    },
    {
      id: 8,
      label: FieldLabelType.Pain,
      page: 7
    },
    {
      id: 9,
      label: FieldLabelType.Nausea,
      page: 8
    },
    {
      id: 10,
      label: FieldLabelType.Tag,
      page: 9
    },
    {
      id: 11,
      label: FieldLabelType.Submit,
    },
  ];

  const handleOnSubmit = async () => {
    console.log("Date ", date);
    console.log("time ", time);
    const dateIso = new Date(date).toISOString();
    const timeIso = new Date(time).toISOString();
    console.log("dateIso ", dateIso);
    console.log("timeIso ", timeIso);
    const datePortion = moment(dateIso).format("YYYY-MM-DD");
    const timeWithTimeZonePortion = moment(timeIso).format("THH:mm:ss.SSSSZ");
    console.log("datePortion ", datePortion);
    console.log("timeWithTimeZonePortion ", timeWithTimeZonePortion);
    const dateTimeIso = moment(datePortion + timeWithTimeZonePortion).toISOString();
    console.log("dateTimeIso ", dateTimeIso);

    const input: CreateReportInput = {
      type: PostStatus.POO,
      dateTime: dateTimeIso,
      data: JSON.stringify({
        urgency: urgency,
        consistency: consistency,
        spray: spray,
        volume: volume,
        blood: blood,
        gas: gas,
        pain: pain,
        nausea: nausea
      })
    }

    console.log("data ", input);

    try {
      const newTodo = await client.graphql({
        query: mutations.createReport,
        variables: { input }
      });
      console.log(" Success")
      console.log(" newTodo ", newTodo)
      setToastInfo({ isShowToast: true, message: "Report save successfully", isSuccess: true });
      navigate("Home");
    } catch (err) {
      console.error("Failed to create report");
      setToastInfo({ isShowToast: true, message: "Failed to create report. Please try after sometime", isSuccess: false });
      console.error(err);
    }

  }

  const handleReset = () => {
    setDate("");
    setTime("");
    setUrgency("");
    setConsistency("");
    setBlood("");
    setGas("");
    setSpray("");
    setPain("");
    setNausea("");
    setDate("");
    setIsAutoFullSlideOver(false);
    if (carouselRef.current) {
      setCurrentPage(0);
      carouselRef.current.scrollTo({ count: -10, animated: true });
      console.log("prev")
    }
  }


  const SubmitSection = (item) => (
    <Card
      activeOpacity={1}
      enableShadow={true}
      style={{
        height: 504,
        elevation: 10,
        shadowColor: "#52006A",
        backgroundColor: "#F6F1F1",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderRadius: 0,
        marginHorizontal: 5,
        width: "88%",
        alignItems: "center"
      }}
      enableBlur={false}
      paddingH-10
      paddingV-20
      key={item.id}
      onPress={() => console.log("pressed")}
    >
      <View width={"100%"}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 30, textAlign: "center", paddingVertical: 40, }}>Submit the report?</Text>
        <Button
          fullWidth
          borderRadius={0}
          size={Button.sizes.xSmall}
          text70H
          color="white"
          label="Submit"
          $textDefault
          onPress={handleOnSubmit}
          labelStyle={{ textAlign: "center" }}
          backgroundColor="#5C5A57"
          style={{ borderWidth: 1, paddingVertical: 10, marginBottom: 13 }}
        />

        <Button
          label="Reset"
          fullWidth
          borderRadius={0}
          size={Button.sizes.xSmall}
          text70H
          onPress={handleReset}
          $textDefault
          backgroundColor="white"
          style={{ borderWidth: 1, paddingVertical: 10, marginBottom: 13 }}
        />
      </View>

      { toastInfo.isShowToast && <Text style={{ width: "100%", paddingVertical: 10, paddingHorizontal: 10, color: "white", fontSize: 17, fontWeight: "400", 
       backgroundColor: toastInfo.isSuccess ? Colors.green30 : Colors.red30}}>{toastInfo.message}</Text> }

    </Card>
  )



  const SingleSelectComponent = ({ item }) => (
    <Card
      activeOpacity={1}
      enableShadow={true}
      style={{
        borderRadius: 0,
        marginHorizontal: 5,
        height: 504,
        elevation: 10,
        backgroundColor: "#F6F1F1",
        shadowColor: "#52006A",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: "88%",
        alignItems: "center",
      }}
      enableBlur={false}
      paddingH-10
      paddingV-20
      key={item.id}
      onPress={() => console.log("pressed")}
    >
      {item.label == FieldLabelType.DateTime && <DateField label={item.label} dateValue={date} timeValue={time} setDateValue={handleDateSelect}
        setTimeValue={handleTimeSelect} />}
      {item.label == FieldLabelType.Urgency && <RadioBtnField label={item.label} value={urgency} setValue={setUrgency} page={item.page} />}
      {item.label == FieldLabelType.Consistency && <RadioBtnField label={item.label} value={consistency} setValue={setConsistency} page={item.page} />}
      {item.label == FieldLabelType.Spray && <RadioBtnField label={item.label} value={spray} setValue={setSpray} page={item.page} />}
      {item.label == FieldLabelType.Volume && <RadioBtnField label={item.label} value={volume} setValue={setVolume} page={item.page} />}
      {item.label == FieldLabelType.Blood && <RadioBtnField label={item.label} value={blood} setValue={setBlood} page={item.page} />}
      {item.label == FieldLabelType.Gas && <RadioBtnField label={item.label} value={gas} setValue={setGas} page={item.page} />}
      {item.label == FieldLabelType.Pain && <RadioBtnField label={item.label} value={pain} setValue={setPain} page={item.page} />}
      {item.label == FieldLabelType.Nausea && <RadioBtnField label={item.label} value={nausea} setValue={setNausea} page={item.page} />}

    </Card>
  )

  return (
    <Container style={{ backgroundColor: "#E6DBD9" }}>
      <HeaderViewContainer>
        <Text text50 style={{ color: "#514D4A", textAlign: "center", width: "100%", fontFamily: "inter-bold" }}>My UC Healing Journey</Text>
      </HeaderViewContainer>

      <View style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, marginTop: "15%", flexDirection: "row" }}>
        <Text style={{ color: "#312E2B", fontWeight: "400", fontSize: 20 }}>Nature's Call Report</Text>
        {currentPage < 10 && <Text style={{ color: "#312E2B", fontWeight: "400", fontSize: 20 }}>{currentPage + 1}/10</Text>}
      </View>
      <View style={{ display: "flex", }}>
        <Carousel
          ref={carouselRef}
          style={{
            height: 700,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 10
          }}
          onScrollEnd={handleScrollEnd}
          width={width}
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
              {item.label == FieldLabelType.Submit
                ?
                <SubmitSection item={item} />
                :
                item.label != FieldLabelType.Tag
                  ?
                  <SingleSelectComponent item={item} />
                  :
                  <TagsComponent item={item} tags={tags} setTags={setTags} handleTagValueChange={handleTagValueChange} />}
            </View>
          )}
        />

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
