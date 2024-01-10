import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Carousel from "react-native-reanimated-carousel";
import { ActivityIndicator, Dimensions, ImageBackground, Keyboard, TouchableWithoutFeedback } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import _ from "lodash";
import {
  View,
  Text,
  Card,
  Button,
  Colors,
  Checkbox,
  TextField,
  Image,
  TouchableOpacity,
} from "react-native-ui-lib";
import { DEVICE_UNIQUE_ID_KEY, FieldLabelType } from "../../constants";
import {
  CreateReportInput, CreateReportMutation, CreateTagMutationVariables, GetProfileQueryVariables, ListTagsQueryVariables, ModelTagFilterInput, ReportType
} from "../../API";
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { CreateTagInput, DeleteTagInput } from "../../API";
import * as mutation from "../../graphql/mutations";
import * as query from "../../graphql/queries";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { generateUUID } from "../../utils";
import DateField from "../../components/DateTimeUCComponent";
import SingleChoiceUCComponent from "../../components/SingleChoiceUCComponent";
import Fuse from 'fuse.js'
import firstPageBg from "../../../assets/uc-bg.png";
import pageBg from "../../../assets/first-page.png";
import DateTimeField from "../../components/DateTimeUCComponent";
import * as SecureStore from 'expo-secure-store';
import moment from "moment";

const config: any = {
  mode: "parallax",
  snapDirection: "left",
  pagingEnabled: true,
  loop: false,
  snapEnabled: true,
  autoPlay: false,
  autoPlayReverse: false,
};

const DATA = [
  {
    id: 2,
    label: FieldLabelType.Urgency,
    subText: "Are you running to the toilet?",
    page: 0
  },
  {
    id: 3,
    label: FieldLabelType.Consistency,
    page: 1
  },
  {
    id: 4,
    label: FieldLabelType.Spray,
    page: 2
  },
  {
    id: 5,
    label: FieldLabelType.Volume,
    page: 3
  },
  {
    id: 6,
    label: FieldLabelType.Blood,
    page: 4
  },
  {
    id: 7,
    label: FieldLabelType.Gas,
    page: 5
  },
  {
    id: 8,
    label: FieldLabelType.Pain,
    page: 6
  },
  {
    id: 9,
    label: FieldLabelType.Nausea,
    page: 7
  },
  {
    id: 10,
    label: FieldLabelType.Tag,
    page: 8
  },
  {
    id: 11,
    label: FieldLabelType.Submit,
  },
];
let fuse: any;

const window = Dimensions.get('window');
const PAGE_WIDTH = window.width;
export default function UCLoggingScreen() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [urgency, setUrgency] = useState("");
  const [consistency, setConsistency] = useState("");
  const [spray, setSpray] = useState("");
  const [volume, setVolume] = useState("");
  const [blood, setBlood] = useState("");
  const [gas, setGas] = useState("");
  const [pain, setPain] = useState("");
  const [nausea, setNausea] = useState("");
  const [tagSearchText, setTagSearchText] = useState("");
  const [isAutoFullSlideOver, setIsAutoFullSlideOver] = useState(false);
  const [valueTest, setValueTest] = useState("");
  const [currentTagEdit, setCurrentTagEdit] = useState({ id: "", name: "" });
  const [tags, setTags] = useState([]);
  const [isTagEditMode, setIsTagEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [profileId, setProfileId] = useState("");
  const carouselRef: any = useRef();
  const width = Dimensions.get('window').width;
  const viewCount = 5;
  const { goBack, navigate }: NavigationProp<TabNavigationType> = useNavigation();
  
  const fieldLabelSetStateMap = {
    [FieldLabelType.Blood]: setBlood,
    [FieldLabelType.Urgency]: setUrgency,
    [FieldLabelType.Consistency]: setConsistency,
    [FieldLabelType.Gas]: setGas,
    [FieldLabelType.Pain]: setPain,
    [FieldLabelType.Spray]: setSpray,
    [FieldLabelType.Volume]: setVolume,
    [FieldLabelType.Nausea]: setNausea,
  }

  useEffect(() => {
    SecureStore.getItemAsync(DEVICE_UNIQUE_ID_KEY)
      .then((id) => {
        console.log("uuid", id);
        setProfileId(id);
        fetchTags(id);
      });
  }, []);

  const nextSlide = () => {
    if (!isAutoFullSlideOver && carouselRef.current && (carouselRef.current.getCurrentIndex() + 1) < 10) {
      console.log("carouselRef.current inner " + carouselRef.current.getCurrentIndex());
      console.log("changing");
      carouselRef.current.next(1);
      if ((carouselRef.current.getCurrentIndex() + 1) == 10) setIsAutoFullSlideOver(true);
    }
  }

  const handleSlideEnd = () => {
    console.log("setting page number" + carouselRef.current.getCurrentIndex());
    setCurrentPage(carouselRef.current.getCurrentIndex() + 1);
  }

  console.log("Rerendering!");

  const fetchTags = async (deviceId: string) => {
    try {
      console.log("DeviceId ", deviceId);
      const input: ListTagsQueryVariables = {
        filter: {
          profileTagsDeviceId: { eq: deviceId },
          reportTagsId: { attributeExists: false }
        }
      }
      const response: any = await API.graphql<GraphQLQuery<ListTagsQueryVariables>>(
        {
          query: query.listTags,
          variables: input
        })
      console.log("Success")
      console.log("tags", response.data.listTags.items)
      const tagIdInfoMap = {};
      _.each(tags, tag => {
        tagIdInfoMap[tag.id] = tag;
      });
      _.each(response.data.listTags.items, tag => {
        if (tagIdInfoMap[tag.id]) {
          tag.isChecked = tagIdInfoMap[tag.id].isChecked;
        }
      });
      setTags(_.sortBy(response.data.listTags.items, "createdAt"));
      fuse = new Fuse(response.data.listTags.items, { includeScore: true, keys: ['name'] });
    } catch (err) {
      console.error("Failed to fetch tags");
      console.error(err.errors ? err.errors : err);
    }
  }

  const handleTagChange = (tag: any) => {
    tag.isChecked = !tag.isChecked;
    setTags([...tags]);
  };

  const handleTagAdd = () => {
    const newTag = { id: generateUUID(), name: "", isChecked: false };
    setTags([...tags, newTag]);
    setIsTagEditMode(true);
  }

  const handleTagValueChange = (value, tag) => {
    tag.name = value;
    setTags([...tags]);
    setCurrentTagEdit(tag);
  }

  const saveCurrentTag = async () => {
    if (!currentTagEdit.name) return;
    const input: CreateTagInput = { name: currentTagEdit.name, profileTagsDeviceId: profileId };
    console.log("input ", input)
    setIsLoading(true);
    try {
      const newTag: any = await API.graphql<GraphQLQuery<CreateTagInput>>(
        {
          query: mutation.createTag,
          variables: { input }
        });
      console.log("Success")
      console.log("newTodo", newTag);
      setCurrentTagEdit(null);
      fetchTags(profileId);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to add tag");
      console.error(err);
      setIsLoading(false);
    }
  };

  const deleteTag = async (tagId) => {
    const input: DeleteTagInput = { id: tagId };
    console.log(" delete ", input);
    try {
      const removedTag: any = await API.graphql<GraphQLQuery<DeleteTagInput>>(
        {
          query: mutation.deleteTag,
          variables: { input }
        });
      console.log("Success")
      console.log("removedTag", removedTag)
      setCurrentTagEdit(null);
      const newTags = [];
      _.each(tags, tag => {
        if (tag.id != tagId) newTags.push(tag);
      });
      setTags(newTags);
      fetchTags(profileId);
    } catch (err) {
      console.error("Failed to remove tag");
      console.error(err);
    }
  };

  const handleDateSelect = (value) => {
    setDate(value);
  };

  const handleTimeSelect = (value) => {
    setTime(value);
    if (date) {
      nextSlide();
    }
  };

  const handleSearch = (value) => {
    let result = fuse.search(value);
    if (result && result.length == 0 && !value) {
      setTags(fuse._docs);
    } else {
      setTags(_.map(result, tag => tag.item));
    }
    setTagSearchText(value);
  };

  const handleValueSelect = (label, value) => {
    if (fieldLabelSetStateMap[label]) {
      fieldLabelSetStateMap[label](value);
      nextSlide();
    }
  }

  const handleOnSubmit = async () => {
    console.log("submit")
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
      type: ReportType.POO,
      dateTime: dateTimeIso,
      profileReportsDeviceId: profileId,
      data: JSON.stringify({
        [FieldLabelType.Urgency]: urgency,
        [FieldLabelType.Consistency]: consistency,
        [FieldLabelType.Spray]: spray,
        [FieldLabelType.Volume]: volume,
        [FieldLabelType.Blood]: blood,
        [FieldLabelType.Gas]: gas,
        [FieldLabelType.Pain]: pain,
        [FieldLabelType.Nausea]: nausea
      })
    }

    let reportTagsInput: CreateTagInput[] = [];
    _.each(tags, (tag) => {
      if (tag.isChecked) reportTagsInput.push({ profileTagsDeviceId: tag.profileTagsDeviceId, reportTagsId: "", name: tag.name })
    });

    try {
      const reportResponse: any = await API.graphql<GraphQLQuery<CreateReportMutation>>(
        {
          query: mutations.createReport, variables: { input }
        });
      console.log("reportInput", input);
      _.each(reportTagsInput, tag => {
        tag.reportTagsId = reportResponse.data.createReport.id;
      });

      console.log(" reportTagsInput ", reportTagsInput)
      const promises = _.map(reportTagsInput, input => {
        return API.graphql<GraphQLQuery<CreateTagInput>>(
          {
            query: mutations.createTag,
            variables: { input }
          })
      });
      await Promise.all(promises);
      navigate("SuccessScreen");
      console.log(" Success")
    } catch (err) {
      console.error("Failed to create report");
      console.error(err);
    }

  }

  const handleReset = () => {
    setDate(new Date());
    setTime(new Date());
    setUrgency("");
    setConsistency("");
    setBlood("");
    setGas("");
    setSpray("");
    setPain("");
    setNausea("");
    setIsAutoFullSlideOver(false);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ count: -10, animated: true });
      console.log("prev")
    }
  }

  const SubmitSection = (item) => (
    <Card
      activeOpacity={1}
      enableShadow={true}
      style={{
        elevation: 10,
        shadowColor: "#52006A",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderRadius: 25,
        height: 400,
        marginHorizontal: 5,
        width: "95%",
        alignItems: "center",
        backgroundColor: "#fff7ff"
      }}
      enableBlur={false}
      paddingH-10
      paddingV-20
      key={item.id}
    >
      <View width={"100%"}>
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 30, textAlign: "center", paddingVertical: 40, }}>Submit the report?</Text>
        <Button
          fullWidth
          borderRadius={25}
          size={Button.sizes.xSmall}
          text70H
          color="white"
          label="Submit"
          $textDefault
          onPress={handleOnSubmit}
          labelStyle={{ textAlign: "center" }}
          backgroundColor="#5C5A57"
          style={{ borderWidth: 0, borderRadius: 25, paddingVertical: 10, marginBottom: 13 }}
        />

        <Button
          label="Reset"
          fullWidth
          borderRadius={25}
          size={Button.sizes.xSmall}
          text70H
          onPress={handleReset}
          $textDefault
          backgroundColor="white"
          style={{ borderWidth: 0, borderRadius: 25, paddingVertical: 10, marginBottom: 13 }}
        />
      </View>

    </Card>
  )

  return (
    <ImageBackground
      source={firstPageBg}
      resizeMode="contain"
      style={{
        overflow: "hidden",
        flex: 1
      }}>
      <SafeAreaView style={{ opacity: 0 }} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>

          <View style={{ position: 'absolute', minWidth: 350, minHeight: 400, top: 0, zIndex: 10 }}>
            <ImageBackground source={pageBg} resizeMode="contain" width={50} height={50} style={{
              flex: 1
            }}>
            </ImageBackground>
          </View>

          <View style={{ display: "flex", marginBottom: 5, marginTop: 10, justifyContent: "space-between", flexDirection: "row", zIndex: 12 }}>
            <TouchableOpacity onPress={goBack}>
            <Image
              style={{ width: 53, height: 53 }}
              source={require('../../../assets/back-icon.png')}
            />
            </TouchableOpacity>
           
            <Image
              style={{ width: 53, height: 53 }}
              source={require('../../../assets/menu2.png')}
            />
          </View>

          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", zIndex: 12 }}>
            <View style={{ display: "flex", marginBottom: 10, flexDirection: "column" }}>
              <Text style={{ color: "#312E2B", fontWeight: "600", fontSize: 40, fontFamily: "Poppins-SemiBold" }}>Poo</Text>
              <Text style={{ color: "#312E2B", fontWeight: "300", fontSize: 20, fontFamily: "Poppins-Regular" }}>Report</Text>
            </View>

            <View>
              <DateTimeField dateValue={date} timeValue={time} setDateValue={handleDateSelect}
                setTimeValue={handleTimeSelect} />
            </View>
          </View>

          <View style={{ display: "flex", zIndex: 12 }}>
            <Carousel
              ref={carouselRef}
              onScrollEnd={handleSlideEnd}
              style={{
                width: PAGE_WIDTH * 0.92,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 10,
                height: 420,
              }}
              pagingEnabled={config.pagingEnabled}
              snapEnabled={config.snapEnabled}
              mode={"parallax"}
              loop={config.loop}
              autoPlay={config.autoPlay}
              width={width}
              autoPlayReverse={config.autoPlayReverse}
              data={DATA}
              modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
              }}
              customConfig={() => ({ type: "positive", viewCount })}
              renderItem={({ item }) => (
                <View style={{ paddingRight: 15 }}>
                  {item.label == FieldLabelType.Submit
                    ?
                    <SubmitSection item={item} />
                    :
                    item.label != FieldLabelType.Tag
                      ?
                      <Card
                        activeOpacity={1}
                        enableShadow={true}
                        style={{
                          borderRadius: 25,
                          height: 400,
                          marginHorizontal: 5,
                          marginLeft: 10,
                          elevation: 3,
                          backgroundColor: "#fff7ff",
                          shadowColor: "#52006A",
                          shadowOpacity: 0.1,
                          shadowRadius: 1,
                          width: "100%",
                          alignItems: "center",
                        }}
                        enableBlur={false}
                        paddingH-10
                        paddingV-20
                        key={item.id}
                      >
                        {item.label == FieldLabelType.DateTime && <DateField label={item.label} dateValue={date} timeValue={time} setDateValue={handleDateSelect}
                          setTimeValue={handleTimeSelect} />}

                        {item.label == FieldLabelType.Urgency && <SingleChoiceUCComponent subLabel={"Are you running to the toilet?"} metricType={FieldLabelType.Urgency}
                          label={item.label} value={urgency} handleValueSelect={handleValueSelect} />}

                        {item.label == FieldLabelType.Consistency && <SingleChoiceUCComponent subLabel={"How does the poo look?"} metricType={FieldLabelType.Consistency}
                          label={item.label} value={consistency} handleValueSelect={handleValueSelect} />}

                        {item.label == FieldLabelType.Spray && <SingleChoiceUCComponent subLabel={"Is the spray on the toilet bowel"} metricType={FieldLabelType.Spray}
                          label={item.label} value={spray} handleValueSelect={handleValueSelect} />}

                        {item.label == FieldLabelType.Volume && <SingleChoiceUCComponent subLabel={"How much is coming out?"} metricType={FieldLabelType.Volume}
                          label={item.label} value={volume} handleValueSelect={handleValueSelect} />}

                        {item.label == FieldLabelType.Blood && <SingleChoiceUCComponent subLabel={"Is there blood in the poop?"} metricType={FieldLabelType.Blood}
                          label={item.label} value={blood} handleValueSelect={handleValueSelect} />}

                        {item.label == FieldLabelType.Gas && <SingleChoiceUCComponent subLabel={"How much gas is released?"} metricType={FieldLabelType.Gas}
                          label={item.label} value={gas} handleValueSelect={handleValueSelect} />}

                        {item.label == FieldLabelType.Pain && <SingleChoiceUCComponent subLabel={"Are you experiencing pain?"} metricType={FieldLabelType.Pain}
                          label={item.label} value={pain} handleValueSelect={handleValueSelect} />}

                        {item.label == FieldLabelType.Nausea && <SingleChoiceUCComponent subLabel={"Are you feeling nauseous?"} metricType={FieldLabelType.Nausea}
                          label={item.label} value={nausea} handleValueSelect={handleValueSelect} />}

                      </Card>

                      :
                      <Card
                        activeOpacity={1}
                        enableShadow={true}
                        style={{
                          borderRadius: 25,
                          marginHorizontal: 5,
                          backgroundColor: "#fff7ff",
                          elevation: 10,
                          shadowColor: "#52006A",
                          shadowOpacity: 0.2,
                          shadowRadius: 3,
                          width: "95%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        enableBlur={false}
                        paddingH-10
                        paddingV-20
                        key={item.id}
                      >

                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                          <Text
                            text70
                            style={{
                              color: "#312E2B", fontWeight: "700", fontSize: 20, textAlign: "center"
                            }}
                          >
                            {item.label}
                          </Text>
                          <FontAwesome
                            onPress={() => setIsTagEditMode(!isTagEditMode)}
                            name="edit"
                            size={21}
                            color="black"
                            style={{ marginTop: 3, marginLeft: 15 }}
                          />
                        </View>

                        <View style={{ paddingHorizontal: 10, marginTop: 10, marginBottom: 20, width: "100%" }}>
                          <TextField
                            placeholder={'Filter for a tag...'}
                            onChangeText={(value) => handleSearch(value)}
                            style={{ fontWeight: "400", fontSize: 20, marginRight: 10 }}
                            fieldStyle={{
                              borderBottomWidth: 1,
                              borderColor: Colors.$outlineDisabledHeavy,
                              paddingBottom: 4
                            }}
                          />
                        </View>

                        <ScrollView style={{ height: 270 }} automaticallyAdjustKeyboardInsets={true}>
                          {tags.map((tag: any, index: number) => (
                            <View
                              style={{ flexDirection: "row", marginHorizontal: 10 }}
                              id={tag.id}
                              key={tag.id}
                            >
                              <Button
                                outline
                                borderRadius={0}
                                size={Button.sizes.xSmall}
                                text60
                                $textDefault
                                labelStyle={{ fontWeight: "400", fontSize: 20, textAlign: "center", color: "#FFFFFF" }}
                                style={{
                                  height: 50, backgroundColor: "#FFFFFF", borderColor: "#5C5A57", borderWidth: 1, marginBottom: 13,
                                  width: "100%"
                                }}
                              >
                                <Checkbox
                                  value={!!tag.isChecked}
                                  borderRadius={100}
                                  color="#5C5A57"
                                  onValueChange={() => handleTagChange(tag)}
                                />

                                {
                                  !isTagEditMode && <Text text80 onPress={() => {
                                    if (!tag.isEditMode) handleTagChange(tag)
                                  }} style={{
                                    fontWeight: "400", fontSize: 20, width: 200, textAlign: "center",
                                    color: "#312E2B"
                                  }}>
                                    {tag.name ? tag.name : ""}
                                  </Text>
                                }

                                {
                                  isTagEditMode && index != tags.length - 1 && <View style={{ display: "flex", flexDirection: "row" }}>
                                    <Text text80 style={{
                                      fontWeight: "400", fontSize: 20, width: 170, textAlign: "center",
                                      color: "#312E2B"
                                    }} onPress={() => { if (!tag.isEditMode) handleTagChange(tag) }}>
                                      {tag.name ? tag.name : ""}
                                    </Text>
                                    <AntDesign
                                      onPress={() => deleteTag(tag.id)}
                                      name="minuscircleo"
                                      size={21}
                                      style={{ marginLeft: 10 }}
                                      color="black"
                                    />
                                  </View>
                                }

                                {
                                  isTagEditMode && index == tags.length - 1 && <View style={{ display: "flex", flexDirection: "row", width: 200 }}>
                                    <TextField
                                      style={{ fontWeight: "400", fontSize: 20, width: 150, height: 20 }}
                                      placeholder={"Tag Name"}
                                      value={tag.name ? tag.name : ""}
                                      fieldStyle={{
                                        marginHorizontal: 10,
                                        padding: 4,
                                        borderBottomWidth: 1,
                                        borderColor: Colors.$outlineDisabledHeavy,
                                      }}
                                      onChangeText={(currentValue) => handleTagValueChange(currentValue, tag)}
                                      onBlur={() => saveCurrentTag()}
                                    />
                                    <AntDesign
                                      onPress={() => deleteTag(tag.id)}
                                      name="minuscircleo"
                                      size={21}

                                      color="black"
                                    />
                                  </View>
                                }

                              </Button>
                            </View>
                          ))}

                          <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: 10 }} >
                            <AntDesign
                              onPress={() => handleTagAdd()}
                              name="plus"
                              size={18}
                              color="black"
                            />
                            <Text onPress={() => { if (!isLoading) handleTagAdd() }} text80 style={{ marginLeft: 10, marginRight: 10, fontWeight: "400", fontSize: 20 }}>
                              Add a tag
                            </Text>
                            {isLoading && <ActivityIndicator color={'black'} />}
                          </View>
                          <View style={{ height: 150 }} />
                        </ScrollView>
                      </Card>
                  }
                </View>
              )}
            />
          </View>

          <View style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexDirection: "row", zIndex: 12 }}>
            {!!currentPage && currentPage <= 10 && <Text style={{ color: "#312E2B", fontWeight: "400", fontSize: 16 }}>
              {!!currentPage ? currentPage : 1}/10
            </Text>}
            <Text style={{ fontSize: 16, color: "#020202", fontWeight: "300", fontFamily: "Poppins-regular" }}>swipe to next 👉</Text>
          </View>

        </View>

      </TouchableWithoutFeedback>
      <SafeAreaView style={{ opacity: 0 }} />
    </ImageBackground>


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
