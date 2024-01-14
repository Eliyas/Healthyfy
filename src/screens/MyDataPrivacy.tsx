import React, { useEffect, useState } from "react";
import { Alert, Image, ImageBackground, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Button, Card, Text, View } from "react-native-ui-lib";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import firstPageBg from "../../assets/first-page-bg.png";
import pageBg from "../../assets/first-page.png";
import _ from "lodash";
import * as SecureStore from 'expo-secure-store';
import { DEVICE_UNIQUE_ID_KEY, SUCCESS_SCREEN_MESSAGES } from "../constants";
import { GraphQLQuery } from '@aws-amplify/api';
import { API } from 'aws-amplify';
import { DeleteProfileInput, DeleteReportInput, DeleteTagInput, GetProfileQueryVariables, ListReportsQueryVariables, ListTagsQueryVariables } from "../API";
import * as mutations from "../graphql/mutations";
import * as query from "../graphql/queries";
import { TouchableOpacity } from "react-native-gesture-handler";


export default function MyDataPrivacy({route}) {
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);

  const { navigate, goBack }: NavigationProp<any> = useNavigation();

  useEffect(() => {
    console.log('isDeleteClicked ', isDeleteClicked)
    if (isDeleteClicked) {
      deleteUserData();
    }
  }, [isDeleteClicked]);

  const deleteUserData = async () => {
    let deviceId = await SecureStore.getItemAsync(DEVICE_UNIQUE_ID_KEY);
    console.log("deviceId ", deviceId);
    try {

      const input: ListTagsQueryVariables = { filter: { profileTagsDeviceId: { eq: deviceId } } };
      const tagsResponse: any = await API.graphql<GraphQLQuery<ListTagsQueryVariables>>({ query: query.listTags, variables: input });
      const tags = tagsResponse.data.listTags.items;
      console.log("Before tags", tags);
      for (let i = 0; i < tags?.length; i++) {
        console.log("tags[i].id", tags[i].id);
        const inputTag: DeleteTagInput = { id: tags[i].id };
        await API.graphql<GraphQLQuery<DeleteTagInput>>({ query: mutations.deleteTag, variables: { input: inputTag } });
      }

      const response: any = await API.graphql<GraphQLQuery<ListTagsQueryVariables>>({ query: query.listTags, variables: input })
      console.log("After Tags", response.data.listTags.items.length)

      const variables: ListReportsQueryVariables = { filter: { profileReportsDeviceId: { eq: deviceId } } };
      const reportsRes: any = await API.graphql<GraphQLQuery<ListReportsQueryVariables>>({ query: query.listReports, variables });

      const reports = reportsRes.data.listReports.items;
      console.log("reports", reports?.length);
      for (let i = 0; i < reports?.length; i++) {
        console.log(`reports[i].id: ${reports[i].id}  and deviceId: ${reports[i].profileReportsDeviceId}`,);
        const inputReport: DeleteReportInput = { id: reports[i].id };
        await API.graphql<GraphQLQuery<DeleteReportInput>>({ query: mutations.deleteReport, variables: { input: inputReport } });
      }

      const variables1: ListReportsQueryVariables = { filter: { profileReportsDeviceId: { eq: deviceId } } };
      const reportsRes1: any = await API.graphql<GraphQLQuery<ListReportsQueryVariables>>({ query: query.listReports, variables: variables1 });
      const reports1 = reportsRes1.data.listReports.items;
      console.log("after reports", reports1?.length);


      const inputProfile: DeleteProfileInput = { deviceId };
      const profileRes = await API.graphql<GraphQLQuery<DeleteProfileInput>>({ query: mutations.deleteProfile, variables: { input: inputProfile } });

      console.log("profileRes ", profileRes);
      console.log("deviceId ", deviceId);

      const profileRes1 = await API.graphql<GraphQLQuery<GetProfileQueryVariables>>({ query: query.getProfile, variables: { deviceId } });
      console.log("after profileRes1 ", profileRes1);

      await SecureStore.deleteItemAsync(DEVICE_UNIQUE_ID_KEY);

      navigate("SuccessScreen", { messageType: SUCCESS_SCREEN_MESSAGES.DATA_DELETE.type });
      console.log(" Success");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleteClicked(true);
  }

  const onConfirmationDelete = () => {
    Alert.alert('Delete Confirmation', 'Are you sure you want to delete all your data?', [
      {
        text: 'Cancel',
        onPress: () => { },
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => handleDeleteClick(),
      }
    ], { cancelable: true });
  }

  return (
    <ImageBackground source={firstPageBg}
      resizeMode="cover" style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{
        flex: 1, justifyContent: "center",
        alignItems: "center"
      }}>
        <SafeAreaView style={{ opacity: 0 }} />

        <View style={{ position: 'absolute', minWidth: 350, minHeight: 400, top: 0, zIndex: 10 }}>
          <ImageBackground source={pageBg} resizeMode="contain" width={50} height={50} style={{
            flex: 1
          }}>
          </ImageBackground>
        </View>

        <View style={{
          display: "flex", paddingTop: 25, paddingHorizontal: 15, zIndex: 12, height: "100%", width: "100%"
        }}>
          <View style={{ display: "flex", marginBottom: 5, marginTop: 10, justifyContent: "space-between", flexDirection: "row", zIndex: 12 }}>
            <TouchableOpacity onPress={goBack}>
              <Image
                style={{ width: 53, height: 53 }}
                source={require('../../assets/back-icon.png')}
              />
            </TouchableOpacity>
            <Image
              style={{ width: 53, height: 53 }}
              source={require('../../assets/menu2.png')}
            />
          </View>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 40, fontFamily: 'Neuton-Regular', color: "#020202" }}>My Data Privacy </Text>
          </View>

          <FlatListContainer>
            <View row width={"100%"} style={{ flexDirection: "column", paddingTop: 15 }} >
              <Card
                activeOpacity={1}
                enableShadow={false}
                style={{
                  backgroundColor: "#0202020D",
                  borderRadius: 15,
                  shadowOpacity: 1,
                  shadowRadius: 0,
                  paddingHorizontal: 10,
                  width: "100%",
                }}
                enableBlur={false}
                paddingH-10
                paddingV-20
              >
                <View width={"100%"} style={{ marginHorizontal: 5 }}>
                  <Text style={{
                    color: "#020202", fontWeight: "400", fontFamily: "Poppins-Regular", textAlign: "center",
                    fontSize: 16, marginBottom: 10
                  }}>
                    At UC Healing, we prioritize your privacy and believe in giving you control over your personal data.
                    If you ever decide to delete your data from our system, you can do so effortlessly. Simply by clicking the 'Delete My Data' option.
                    Clicking on this option will initiate the data deletion process. Please be aware that this action is irreversible, and once your data is deleted,
                    it cannot be recovered. We want to assure you that our commitment to safeguarding your information remains our top priority, and we're here to
                    ensure your experience with UCHealth is both seamless and secure.
                  </Text>
                </View>

              </Card>

              <View style={{ marginTop: 10 }}>
                <Button
                  outline
                  borderRadius={0}
                  size={Button.sizes.xSmall}
                  onPress={onConfirmationDelete}
                  labelStyle={{
                    fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "center",
                    color: isDeleteClicked ? "#EBEEF6" : "#020202"
                  }}
                  label="Delete My Data"
                  $textDefault
                  style={{
                    height: 53, backgroundColor: isDeleteClicked ? "#020202" : "#0202020D",
                    borderColor: "#5C5A57", borderWidth: 0, marginBottom: 5,
                    width: "100%", justifyContent: "center", borderRadius: 15, marginTop: 10
                  }}
                />
              </View>
            </View>

          </FlatListContainer>

        </View>

      </View >

      <SafeAreaView style={{ opacity: 0 }} />

    </ImageBackground>

  );
}

const HeaderViewContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const FlatListContainer = styled(View)`
  gap: 12px;
  margin-top: 20px;
`;
