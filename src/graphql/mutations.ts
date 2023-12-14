/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createProfile = /* GraphQL */ `mutation CreateProfile(
  $input: CreateProfileInput!
  $condition: ModelProfileConditionInput
) {
  createProfile(input: $input, condition: $condition) {
    deviceId
    tags {
      nextToken
      __typename
    }
    reports {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProfileMutationVariables,
  APITypes.CreateProfileMutation
>;
export const updateProfile = /* GraphQL */ `mutation UpdateProfile(
  $input: UpdateProfileInput!
  $condition: ModelProfileConditionInput
) {
  updateProfile(input: $input, condition: $condition) {
    deviceId
    tags {
      nextToken
      __typename
    }
    reports {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProfileMutationVariables,
  APITypes.UpdateProfileMutation
>;
export const deleteProfile = /* GraphQL */ `mutation DeleteProfile(
  $input: DeleteProfileInput!
  $condition: ModelProfileConditionInput
) {
  deleteProfile(input: $input, condition: $condition) {
    deviceId
    tags {
      nextToken
      __typename
    }
    reports {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProfileMutationVariables,
  APITypes.DeleteProfileMutation
>;
export const createTag = /* GraphQL */ `mutation CreateTag(
  $input: CreateTagInput!
  $condition: ModelTagConditionInput
) {
  createTag(input: $input, condition: $condition) {
    id
    name
    createdAt
    updatedAt
    profileTagsDeviceId
    reportTagsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTagMutationVariables,
  APITypes.CreateTagMutation
>;
export const updateTag = /* GraphQL */ `mutation UpdateTag(
  $input: UpdateTagInput!
  $condition: ModelTagConditionInput
) {
  updateTag(input: $input, condition: $condition) {
    id
    name
    createdAt
    updatedAt
    profileTagsDeviceId
    reportTagsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTagMutationVariables,
  APITypes.UpdateTagMutation
>;
export const deleteTag = /* GraphQL */ `mutation DeleteTag(
  $input: DeleteTagInput!
  $condition: ModelTagConditionInput
) {
  deleteTag(input: $input, condition: $condition) {
    id
    name
    createdAt
    updatedAt
    profileTagsDeviceId
    reportTagsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTagMutationVariables,
  APITypes.DeleteTagMutation
>;
export const createReport = /* GraphQL */ `mutation CreateReport(
  $input: CreateReportInput!
  $condition: ModelReportConditionInput
) {
  createReport(input: $input, condition: $condition) {
    id
    dateTime
    data
    type
    tags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    profileReportsDeviceId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReportMutationVariables,
  APITypes.CreateReportMutation
>;
export const updateReport = /* GraphQL */ `mutation UpdateReport(
  $input: UpdateReportInput!
  $condition: ModelReportConditionInput
) {
  updateReport(input: $input, condition: $condition) {
    id
    dateTime
    data
    type
    tags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    profileReportsDeviceId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReportMutationVariables,
  APITypes.UpdateReportMutation
>;
export const deleteReport = /* GraphQL */ `mutation DeleteReport(
  $input: DeleteReportInput!
  $condition: ModelReportConditionInput
) {
  deleteReport(input: $input, condition: $condition) {
    id
    dateTime
    data
    type
    tags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    profileReportsDeviceId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReportMutationVariables,
  APITypes.DeleteReportMutation
>;
