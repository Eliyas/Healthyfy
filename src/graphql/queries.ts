/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProfile = /* GraphQL */ `query GetProfile($id: ID!) {
  getProfile(id: $id) {
    id
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
` as GeneratedQuery<
  APITypes.GetProfileQueryVariables,
  APITypes.GetProfileQuery
>;
export const listProfiles = /* GraphQL */ `query ListProfiles(
  $filter: ModelProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProfilesQueryVariables,
  APITypes.ListProfilesQuery
>;
export const getTag = /* GraphQL */ `query GetTag($id: ID!) {
  getTag(id: $id) {
    id
    name
    createdAt
    updatedAt
    profileTagsId
    reportTagsId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTagQueryVariables, APITypes.GetTagQuery>;
export const listTags = /* GraphQL */ `query ListTags($filter: ModelTagFilterInput, $limit: Int, $nextToken: String) {
  listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      updatedAt
      profileTagsId
      reportTagsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTagsQueryVariables, APITypes.ListTagsQuery>;
export const getReport = /* GraphQL */ `query GetReport($id: ID!) {
  getReport(id: $id) {
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
    profileReportsId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetReportQueryVariables, APITypes.GetReportQuery>;
export const listReports = /* GraphQL */ `query ListReports(
  $filter: ModelReportFilterInput
  $limit: Int
  $nextToken: String
) {
  listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      dateTime
      data
      type
      createdAt
      updatedAt
      profileReportsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReportsQueryVariables,
  APITypes.ListReportsQuery
>;
