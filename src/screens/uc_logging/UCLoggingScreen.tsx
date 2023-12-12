import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import Carousel from "react-native-reanimated-carousel";
import { ActivityIndicator, Dimensions, Keyboard, KeyboardAvoidingView, Platform, StatusBar, TouchableWithoutFeedback } from "react-native";
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
} from "react-native-ui-lib";
import { FieldLabelType } from "../../constants";
import { CreateReportInput, CreateReportMutation, CreateReportTagsMutation, CreateTagMutation, CreateTagMutationVariables, DeleteTagMutation, ReportType, SearchTagsQueryVariables, SearchableSortDirection, SearchableTagSortableFields } from "../../src/API";
import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../src/graphql/mutations';
import { CreateTagInput, DeleteTagInput } from "../../src/API";
import moment from "moment";
import * as mutation from "../../src/graphql/mutations";
import * as query from "../../src/graphql/queries";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { generateUUID } from "../../utils"; 
import DateField from "../../components/DateTimeUCComponent";
import SingleChoiceUCComponent from "../../components/SingleChoiceUCComponent";
import Fuse from 'fuse.js'

const config: any = {
  mode: "horizontal-stack",
  snapDirection: "left",
  pagingEnabled: true,
  loop: false,
  snapEnabled: false,
  autoPlay: false,
  autoPlayReverse: false,
};

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
let fuse: Fuse<any[]>;
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
  const [tagSearchText, setTagSearchText] = useState("");
  const [isAutoFullSlideOver, setIsAutoFullSlideOver] = useState(false);

  const [currentTagEdit, setCurrentTagEdit] = useState({ id: "", name: "" });
  const [tags, setTags] = useState([]);
  const [isTagEditMode, setIsTagEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastInfo, setToastInfo] = useState({
    isSuccess: false,
    message: "",
    isShowToast: false
  });
  const carouselRef: any = useRef();
  const width = Dimensions.get('window').width;
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();
  const viewCount = 5;

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
    console.log("timout calling")
    setTimeout(() => {
      setToastInfo({ ...toastInfo, isShowToast: false });
    }, 3000);
  }, [toastInfo.isShowToast]);

  useEffect(() => {
    fetchTags();
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

  const fetchTags = async () => {
    try {
      const response: any = await API.graphql<GraphQLQuery<SearchTagsQueryVariables>>(
        {
          query: query.searchTags,
          variables: {
            filter: { name: { wildcard: "*" } },
            sort: [{
              field: SearchableTagSortableFields.createdAt,
              direction: SearchableSortDirection.asc
            }]
          }
        })
      console.log("Success")
      console.log("tags", response.data.searchTags.items)
      setTags(response.data.searchTags.items);
      fuse = new Fuse(response.data.searchTags.items, { includeScore: true, keys: ['name'] });
    } catch (err) {
      console.error("Failed to fetch tags");
      console.error(err);
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
    const input: CreateTagInput = { name: currentTagEdit.name };
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
      fetchTags();
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
    const result = fuse.search(value);
    setTagSearchText(value);
    setTags(_.map(result, tag => tag.item));
  };

  const handleValueSelect = (label, value) => {
    if (fieldLabelSetStateMap[label]) {
      fieldLabelSetStateMap[label](value);
      nextSlide();
    }
  }

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
      type: ReportType.POO,
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

    let reportTagsInput = [];
    _.each(tags, (tag) => {
      if (tag.isChecked) reportTagsInput.push({ reportID: "", tagID: tag.id })
    });

    try {
      const reportResponse: any = await API.graphql<GraphQLQuery<CreateReportMutation>>(
        {
          query: mutations.createReport, variables: { input }
        });

      _.each(reportTagsInput, tag => {
        tag.reportID = reportResponse.data.createReport.id;
      });

      console.log(" reportTagsInput ", reportTagsInput)
      const promises = _.map(reportTagsInput, input => {
        return API.graphql<GraphQLQuery<CreateReportTagsMutation>>(
          {
            query: mutations.createReportTags,
            variables: { input }
          })
      });
      await Promise.all(promises);
      console.log(" Success")
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

      {toastInfo.isShowToast && <Text style={{
        width: "100%", paddingVertical: 10, paddingHorizontal: 10, color: "white", fontSize: 17, fontWeight: "400",
        backgroundColor: toastInfo.isSuccess ? Colors.green30 : Colors.red30
      }}>{toastInfo.message}</Text>}

    </Card>
  )

  return (

    <View style={{ flex: 1, backgroundColor: "#E6DBD9" }}>
      <Container style={{ backgroundColor: "#E6DBD9" }}>
        <HeaderViewContainer>
          <Text text50 style={{ color: "#514D4A", textAlign: "center", width: "100%" }}>My UC Healing Journey</Text>
        </HeaderViewContainer>

        <View style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, marginTop: "15%", flexDirection: "row" }}>
          <Text style={{ color: "#312E2B", fontWeight: "400", fontSize: 20 }}>Nature's Call Report</Text>
          {!!currentPage && currentPage <= 10 && <Text style={{ color: "#312E2B", fontWeight: "400", fontSize: 20 }}>
            {!!currentPage ? currentPage : 1}/10
          </Text>}
        </View>
        <View style={{ display: "flex", }}>
          <Carousel
            ref={carouselRef}
            onScrollEnd={handleSlideEnd}
            style={{
              height: 700,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 10
            }}
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
                    >
                      {item.label == FieldLabelType.DateTime && <DateField label={item.label} dateValue={date} timeValue={time} setDateValue={handleDateSelect}
                        setTimeValue={handleTimeSelect} />}
                      {item.label == FieldLabelType.Urgency && <SingleChoiceUCComponent label={item.label} value={urgency} handleValueSelect={handleValueSelect} />}
                      {item.label == FieldLabelType.Consistency && <SingleChoiceUCComponent label={item.label} value={consistency} handleValueSelect={handleValueSelect} />}
                      {item.label == FieldLabelType.Spray && <SingleChoiceUCComponent label={item.label} value={spray} handleValueSelect={handleValueSelect} />}
                      {item.label == FieldLabelType.Volume && <SingleChoiceUCComponent label={item.label} value={volume} handleValueSelect={handleValueSelect} />}
                      {item.label == FieldLabelType.Blood && <SingleChoiceUCComponent label={item.label} value={blood} handleValueSelect={handleValueSelect} />}
                      {item.label == FieldLabelType.Gas && <SingleChoiceUCComponent label={item.label} value={gas} handleValueSelect={handleValueSelect} />}
                      {item.label == FieldLabelType.Pain && <SingleChoiceUCComponent label={item.label} value={pain} handleValueSelect={handleValueSelect} />}
                      {item.label == FieldLabelType.Nausea && <SingleChoiceUCComponent label={item.label} value={nausea} handleValueSelect={handleValueSelect} />}

                    </Card>

                    :
                    <Card
                      activeOpacity={1}
                      enableShadow={true}
                      style={{
                        borderRadius: 0,
                        marginHorizontal: 5,
                        backgroundColor: "#F6F1F1",
                        width: "88%",
                        height: 504,
                        elevation: 10,
                        shadowColor: "#52006A",
                        shadowOpacity: 0.2,
                        shadowRadius: 3,
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
                      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <ScrollView style={{ height: 280 }} keyboardShouldPersistTaps="always">
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
                                onPress={() => {
                                  if (!tag.isEditMode) handleTagChange(tag)
                                }}
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
                                  !isTagEditMode && <Text text80 style={{
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
                                    }}>
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

                        </ScrollView>
                      </TouchableWithoutFeedback>
                    </Card>
                }
              </View>
            )}
          />

        </View>
      </Container>
    </View>

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
