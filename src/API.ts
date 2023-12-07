/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateReportInput = {
  id?: string | null,
  dateTime: string,
  data: string,
  type?: ReportType | null,
};

export enum ReportType {
  POO = "POO",
}


export type ModelReportConditionInput = {
  dateTime?: ModelStringInput | null,
  data?: ModelStringInput | null,
  type?: ModelReportTypeInput | null,
  and?: Array< ModelReportConditionInput | null > | null,
  or?: Array< ModelReportConditionInput | null > | null,
  not?: ModelReportConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelReportTypeInput = {
  eq?: ReportType | null,
  ne?: ReportType | null,
};

export type Report = {
  __typename: "Report",
  id: string,
  dateTime: string,
  data: string,
  type?: ReportType | null,
  reportTags?: ModelReportTagsConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelReportTagsConnection = {
  __typename: "ModelReportTagsConnection",
  items:  Array<ReportTags | null >,
  nextToken?: string | null,
};

export type ReportTags = {
  __typename: "ReportTags",
  id: string,
  reportID: string,
  tagID: string,
  report?: Report | null,
  tag?: Tag | null,
  createdAt: string,
  updatedAt: string,
};

export type Tag = {
  __typename: "Tag",
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateReportInput = {
  id: string,
  dateTime?: string | null,
  data?: string | null,
  type?: ReportType | null,
};

export type DeleteReportInput = {
  id: string,
};

export type CreateTagInput = {
  id?: string | null,
  name: string,
};

export type ModelTagConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
};

export type UpdateTagInput = {
  id: string,
  name?: string | null,
};

export type DeleteTagInput = {
  id: string,
};

export type CreateReportTagsInput = {
  id?: string | null,
  reportID: string,
  tagID: string,
};

export type ModelReportTagsConditionInput = {
  reportID?: ModelIDInput | null,
  tagID?: ModelIDInput | null,
  and?: Array< ModelReportTagsConditionInput | null > | null,
  or?: Array< ModelReportTagsConditionInput | null > | null,
  not?: ModelReportTagsConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateReportTagsInput = {
  id: string,
  reportID?: string | null,
  tagID?: string | null,
};

export type DeleteReportTagsInput = {
  id: string,
};

export type SearchableTagFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableTagFilterInput | null > | null,
  or?: Array< SearchableTagFilterInput | null > | null,
  not?: SearchableTagFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableTagSortInput = {
  field?: SearchableTagSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableTagSortableFields {
  id = "id",
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableTagAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableTagAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableTagAggregateField {
  id = "id",
  name = "name",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableTagConnection = {
  __typename: "SearchableTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type ModelReportFilterInput = {
  id?: ModelIDInput | null,
  dateTime?: ModelStringInput | null,
  data?: ModelStringInput | null,
  type?: ModelReportTypeInput | null,
  and?: Array< ModelReportFilterInput | null > | null,
  or?: Array< ModelReportFilterInput | null > | null,
  not?: ModelReportFilterInput | null,
};

export type ModelReportConnection = {
  __typename: "ModelReportConnection",
  items:  Array<Report | null >,
  nextToken?: string | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
};

export type ModelReportTagsFilterInput = {
  id?: ModelIDInput | null,
  reportID?: ModelIDInput | null,
  tagID?: ModelIDInput | null,
  and?: Array< ModelReportTagsFilterInput | null > | null,
  or?: Array< ModelReportTagsFilterInput | null > | null,
  not?: ModelReportTagsFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionReportFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  data?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReportFilterInput | null > | null,
  or?: Array< ModelSubscriptionReportFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionTagFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionTagFilterInput | null > | null,
};

export type ModelSubscriptionReportTagsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  reportID?: ModelSubscriptionIDInput | null,
  tagID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionReportTagsFilterInput | null > | null,
  or?: Array< ModelSubscriptionReportTagsFilterInput | null > | null,
};

export type CreateReportMutationVariables = {
  input: CreateReportInput,
  condition?: ModelReportConditionInput | null,
};

export type CreateReportMutation = {
  createReport?:  {
    __typename: "Report",
    id: string,
    dateTime: string,
    data: string,
    type?: ReportType | null,
    reportTags?:  {
      __typename: "ModelReportTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReportMutationVariables = {
  input: UpdateReportInput,
  condition?: ModelReportConditionInput | null,
};

export type UpdateReportMutation = {
  updateReport?:  {
    __typename: "Report",
    id: string,
    dateTime: string,
    data: string,
    type?: ReportType | null,
    reportTags?:  {
      __typename: "ModelReportTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReportMutationVariables = {
  input: DeleteReportInput,
  condition?: ModelReportConditionInput | null,
};

export type DeleteReportMutation = {
  deleteReport?:  {
    __typename: "Report",
    id: string,
    dateTime: string,
    data: string,
    type?: ReportType | null,
    reportTags?:  {
      __typename: "ModelReportTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTagMutationVariables = {
  input: CreateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type CreateTagMutation = {
  createTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTagMutationVariables = {
  input: UpdateTagInput,
  condition?: ModelTagConditionInput | null,
};

export type UpdateTagMutation = {
  updateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTagMutationVariables = {
  input: DeleteTagInput,
  condition?: ModelTagConditionInput | null,
};

export type DeleteTagMutation = {
  deleteTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateReportTagsMutationVariables = {
  input: CreateReportTagsInput,
  condition?: ModelReportTagsConditionInput | null,
};

export type CreateReportTagsMutation = {
  createReportTags?:  {
    __typename: "ReportTags",
    id: string,
    reportID: string,
    tagID: string,
    report?:  {
      __typename: "Report",
      id: string,
      dateTime: string,
      data: string,
      type?: ReportType | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateReportTagsMutationVariables = {
  input: UpdateReportTagsInput,
  condition?: ModelReportTagsConditionInput | null,
};

export type UpdateReportTagsMutation = {
  updateReportTags?:  {
    __typename: "ReportTags",
    id: string,
    reportID: string,
    tagID: string,
    report?:  {
      __typename: "Report",
      id: string,
      dateTime: string,
      data: string,
      type?: ReportType | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteReportTagsMutationVariables = {
  input: DeleteReportTagsInput,
  condition?: ModelReportTagsConditionInput | null,
};

export type DeleteReportTagsMutation = {
  deleteReportTags?:  {
    __typename: "ReportTags",
    id: string,
    reportID: string,
    tagID: string,
    report?:  {
      __typename: "Report",
      id: string,
      dateTime: string,
      data: string,
      type?: ReportType | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SearchTagsQueryVariables = {
  filter?: SearchableTagFilterInput | null,
  sort?: Array< SearchableTagSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableTagAggregationInput | null > | null,
};

export type SearchTagsQuery = {
  searchTags?:  {
    __typename: "SearchableTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type GetReportQueryVariables = {
  id: string,
};

export type GetReportQuery = {
  getReport?:  {
    __typename: "Report",
    id: string,
    dateTime: string,
    data: string,
    type?: ReportType | null,
    reportTags?:  {
      __typename: "ModelReportTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReportsQueryVariables = {
  filter?: ModelReportFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportsQuery = {
  listReports?:  {
    __typename: "ModelReportConnection",
    items:  Array< {
      __typename: "Report",
      id: string,
      dateTime: string,
      data: string,
      type?: ReportType | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTagQueryVariables = {
  id: string,
};

export type GetTagQuery = {
  getTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagConnection",
    items:  Array< {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReportTagsQueryVariables = {
  id: string,
};

export type GetReportTagsQuery = {
  getReportTags?:  {
    __typename: "ReportTags",
    id: string,
    reportID: string,
    tagID: string,
    report?:  {
      __typename: "Report",
      id: string,
      dateTime: string,
      data: string,
      type?: ReportType | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListReportTagsQueryVariables = {
  filter?: ModelReportTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReportTagsQuery = {
  listReportTags?:  {
    __typename: "ModelReportTagsConnection",
    items:  Array< {
      __typename: "ReportTags",
      id: string,
      reportID: string,
      tagID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ReportTagsByReportIDQueryVariables = {
  reportID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReportTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ReportTagsByReportIDQuery = {
  reportTagsByReportID?:  {
    __typename: "ModelReportTagsConnection",
    items:  Array< {
      __typename: "ReportTags",
      id: string,
      reportID: string,
      tagID: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnCreateReportSubscription = {
  onCreateReport?:  {
    __typename: "Report",
    id: string,
    dateTime: string,
    data: string,
    type?: ReportType | null,
    reportTags?:  {
      __typename: "ModelReportTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnUpdateReportSubscription = {
  onUpdateReport?:  {
    __typename: "Report",
    id: string,
    dateTime: string,
    data: string,
    type?: ReportType | null,
    reportTags?:  {
      __typename: "ModelReportTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteReportSubscriptionVariables = {
  filter?: ModelSubscriptionReportFilterInput | null,
};

export type OnDeleteReportSubscription = {
  onDeleteReport?:  {
    __typename: "Report",
    id: string,
    dateTime: string,
    data: string,
    type?: ReportType | null,
    reportTags?:  {
      __typename: "ModelReportTagsConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnCreateTagSubscription = {
  onCreateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnUpdateTagSubscription = {
  onUpdateTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTagSubscriptionVariables = {
  filter?: ModelSubscriptionTagFilterInput | null,
};

export type OnDeleteTagSubscription = {
  onDeleteTag?:  {
    __typename: "Tag",
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateReportTagsSubscriptionVariables = {
  filter?: ModelSubscriptionReportTagsFilterInput | null,
};

export type OnCreateReportTagsSubscription = {
  onCreateReportTags?:  {
    __typename: "ReportTags",
    id: string,
    reportID: string,
    tagID: string,
    report?:  {
      __typename: "Report",
      id: string,
      dateTime: string,
      data: string,
      type?: ReportType | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateReportTagsSubscriptionVariables = {
  filter?: ModelSubscriptionReportTagsFilterInput | null,
};

export type OnUpdateReportTagsSubscription = {
  onUpdateReportTags?:  {
    __typename: "ReportTags",
    id: string,
    reportID: string,
    tagID: string,
    report?:  {
      __typename: "Report",
      id: string,
      dateTime: string,
      data: string,
      type?: ReportType | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteReportTagsSubscriptionVariables = {
  filter?: ModelSubscriptionReportTagsFilterInput | null,
};

export type OnDeleteReportTagsSubscription = {
  onDeleteReportTags?:  {
    __typename: "ReportTags",
    id: string,
    reportID: string,
    tagID: string,
    report?:  {
      __typename: "Report",
      id: string,
      dateTime: string,
      data: string,
      type?: ReportType | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    tag?:  {
      __typename: "Tag",
      id: string,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
