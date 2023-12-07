/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const searchTags = /* GraphQL */ `query SearchTags(
  $filter: SearchableTagFilterInput
  $sort: [SearchableTagSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableTagAggregationInput]
) {
  searchTags(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
      id
      name
      createdAt
      updatedAt
      __typename
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchTagsQueryVariables,
  APITypes.SearchTagsQuery
>;
export const getReport = /* GraphQL */ `query GetReport($id: ID!) {
  getReport(id: $id) {
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
export const getTag = /* GraphQL */ `query GetTag($id: ID!) {
  getTag(id: $id) {
    id
    name
    createdAt
    updatedAt
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
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTagsQueryVariables, APITypes.ListTagsQuery>;
export const getReportTags = /* GraphQL */ `query GetReportTags($id: ID!) {
  getReportTags(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetReportTagsQueryVariables,
  APITypes.GetReportTagsQuery
>;
export const listReportTags = /* GraphQL */ `query ListReportTags(
  $filter: ModelReportTagsFilterInput
  $limit: Int
  $nextToken: String
) {
  listReportTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      reportID
      tagID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListReportTagsQueryVariables,
  APITypes.ListReportTagsQuery
>;
export const reportTagsByReportID = /* GraphQL */ `query ReportTagsByReportID(
  $reportID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelReportTagsFilterInput
  $limit: Int
  $nextToken: String
) {
  reportTagsByReportID(
    reportID: $reportID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      reportID
      tagID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ReportTagsByReportIDQueryVariables,
  APITypes.ReportTagsByReportIDQuery
>;
