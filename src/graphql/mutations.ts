/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createReport = /* GraphQL */ `mutation CreateReport(
  $input: CreateReportInput!
  $condition: ModelReportConditionInput
) {
  createReport(input: $input, condition: $condition) {
    id
    dateTime
    data
    type
    reportTags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
    reportTags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
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
    reportTags {
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReportMutationVariables,
  APITypes.DeleteReportMutation
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTagMutationVariables,
  APITypes.DeleteTagMutation
>;
export const createReportTags = /* GraphQL */ `mutation CreateReportTags(
  $input: CreateReportTagsInput!
  $condition: ModelReportTagsConditionInput
) {
  createReportTags(input: $input, condition: $condition) {
    id
    reportID
    tagID
    report {
      id
      dateTime
      data
      type
      createdAt
      updatedAt
      __typename
    }
    tag {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateReportTagsMutationVariables,
  APITypes.CreateReportTagsMutation
>;
export const updateReportTags = /* GraphQL */ `mutation UpdateReportTags(
  $input: UpdateReportTagsInput!
  $condition: ModelReportTagsConditionInput
) {
  updateReportTags(input: $input, condition: $condition) {
    id
    reportID
    tagID
    report {
      id
      dateTime
      data
      type
      createdAt
      updatedAt
      __typename
    }
    tag {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateReportTagsMutationVariables,
  APITypes.UpdateReportTagsMutation
>;
export const deleteReportTags = /* GraphQL */ `mutation DeleteReportTags(
  $input: DeleteReportTagsInput!
  $condition: ModelReportTagsConditionInput
) {
  deleteReportTags(input: $input, condition: $condition) {
    id
    reportID
    tagID
    report {
      id
      dateTime
      data
      type
      createdAt
      updatedAt
      __typename
    }
    tag {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteReportTagsMutationVariables,
  APITypes.DeleteReportTagsMutation
>;
