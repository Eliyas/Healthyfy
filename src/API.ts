/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProfileInput = {
  deviceId: string,
};

export type ModelProfileConditionInput = {
  and?: Array< ModelProfileConditionInput | null > | null,
  or?: Array< ModelProfileConditionInput | null > | null,
  not?: ModelProfileConditionInput | null,
};

export type Profile = {
  __typename: "Profile",
  deviceId: string,
  tags?: ModelTagConnection | null,
  reports?: ModelReportConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelTagConnection = {
  __typename: "ModelTagConnection",
  items:  Array<Tag | null >,
  nextToken?: string | null,
};

export type Tag = {
  __typename: "Tag",
  id: string,
  name: string,
  createdAt: string,
  updatedAt: string,
  profileTagsDeviceId?: string | null,
  reportTagsId?: string | null,
};

export type ModelReportConnection = {
  __typename: "ModelReportConnection",
  items:  Array<Report | null >,
  nextToken?: string | null,
};

export type Report = {
  __typename: "Report",
  id: string,
  dateTime: string,
  data: string,
  type?: ReportType | null,
  tags?: ModelTagConnection | null,
  createdAt: string,
  updatedAt: string,
  profileReportsDeviceId?: string | null,
};

export enum ReportType {
  POO = "POO",
  WEIGHT = "WEIGHT",
  MOOD = "MOOD",
}


export type UpdateProfileInput = {
  deviceId: string,
};

export type DeleteProfileInput = {
  deviceId: string,
};

export type CreateTagInput = {
  id?: string | null,
  name: string,
  profileTagsDeviceId?: string | null,
  reportTagsId?: string | null,
};

export type ModelTagConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelTagConditionInput | null > | null,
  or?: Array< ModelTagConditionInput | null > | null,
  not?: ModelTagConditionInput | null,
  profileTagsDeviceId?: ModelIDInput | null,
  reportTagsId?: ModelIDInput | null,
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

export type UpdateTagInput = {
  id: string,
  name?: string | null,
  profileTagsDeviceId?: string | null,
  reportTagsId?: string | null,
};

export type DeleteTagInput = {
  id: string,
};

export type CreateReportInput = {
  id?: string | null,
  dateTime: string,
  data: string,
  type?: ReportType | null,
  profileReportsDeviceId?: string | null,
};

export type ModelReportConditionInput = {
  dateTime?: ModelStringInput | null,
  data?: ModelStringInput | null,
  type?: ModelReportTypeInput | null,
  and?: Array< ModelReportConditionInput | null > | null,
  or?: Array< ModelReportConditionInput | null > | null,
  not?: ModelReportConditionInput | null,
  profileReportsDeviceId?: ModelIDInput | null,
};

export type ModelReportTypeInput = {
  eq?: ReportType | null,
  ne?: ReportType | null,
};

export type UpdateReportInput = {
  id: string,
  dateTime?: string | null,
  data?: string | null,
  type?: ReportType | null,
  profileReportsDeviceId?: string | null,
};

export type DeleteReportInput = {
  id: string,
};

export type ModelProfileFilterInput = {
  deviceId?: ModelIDInput | null,
  and?: Array< ModelProfileFilterInput | null > | null,
  or?: Array< ModelProfileFilterInput | null > | null,
  not?: ModelProfileFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelProfileConnection = {
  __typename: "ModelProfileConnection",
  items:  Array<Profile | null >,
  nextToken?: string | null,
};

export type ModelTagFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelTagFilterInput | null > | null,
  or?: Array< ModelTagFilterInput | null > | null,
  not?: ModelTagFilterInput | null,
  profileTagsDeviceId?: ModelIDInput | null,
  reportTagsId?: ModelIDInput | null,
};

export type ModelReportFilterInput = {
  id?: ModelIDInput | null,
  dateTime?: ModelStringInput | null,
  data?: ModelStringInput | null,
  type?: ModelReportTypeInput | null,
  and?: Array< ModelReportFilterInput | null > | null,
  or?: Array< ModelReportFilterInput | null > | null,
  not?: ModelReportFilterInput | null,
  profileReportsDeviceId?: ModelIDInput | null,
};

export type ModelSubscriptionProfileFilterInput = {
  deviceId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionProfileFilterInput | null > | null,
  or?: Array< ModelSubscriptionProfileFilterInput | null > | null,
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

export type ModelSubscriptionTagFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTagFilterInput | null > | null,
  or?: Array< ModelSubscriptionTagFilterInput | null > | null,
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

export type ModelSubscriptionReportFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  data?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionReportFilterInput | null > | null,
  or?: Array< ModelSubscriptionReportFilterInput | null > | null,
};

export type CreateProfileMutationVariables = {
  input: CreateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type CreateProfileMutation = {
  createProfile?:  {
    __typename: "Profile",
    deviceId: string,
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    reports?:  {
      __typename: "ModelReportConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateProfileMutationVariables = {
  input: UpdateProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type UpdateProfileMutation = {
  updateProfile?:  {
    __typename: "Profile",
    deviceId: string,
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    reports?:  {
      __typename: "ModelReportConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteProfileMutationVariables = {
  input: DeleteProfileInput,
  condition?: ModelProfileConditionInput | null,
};

export type DeleteProfileMutation = {
  deleteProfile?:  {
    __typename: "Profile",
    deviceId: string,
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    reports?:  {
      __typename: "ModelReportConnection",
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
    profileTagsDeviceId?: string | null,
    reportTagsId?: string | null,
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
    profileTagsDeviceId?: string | null,
    reportTagsId?: string | null,
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
    profileTagsDeviceId?: string | null,
    reportTagsId?: string | null,
  } | null,
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
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    profileReportsDeviceId?: string | null,
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
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    profileReportsDeviceId?: string | null,
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
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    profileReportsDeviceId?: string | null,
  } | null,
};

export type GetProfileQueryVariables = {
  deviceId: string,
};

export type GetProfileQuery = {
  getProfile?:  {
    __typename: "Profile",
    deviceId: string,
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    reports?:  {
      __typename: "ModelReportConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListProfilesQueryVariables = {
  deviceId?: string | null,
  filter?: ModelProfileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProfilesQuery = {
  listProfiles?:  {
    __typename: "ModelProfileConnection",
    items:  Array< {
      __typename: "Profile",
      deviceId: string,
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
    profileTagsDeviceId?: string | null,
    reportTagsId?: string | null,
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
      profileTagsDeviceId?: string | null,
      reportTagsId?: string | null,
    } | null >,
    nextToken?: string | null,
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
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    profileReportsDeviceId?: string | null,
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
      profileReportsDeviceId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnCreateProfileSubscription = {
  onCreateProfile?:  {
    __typename: "Profile",
    deviceId: string,
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    reports?:  {
      __typename: "ModelReportConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnUpdateProfileSubscription = {
  onUpdateProfile?:  {
    __typename: "Profile",
    deviceId: string,
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    reports?:  {
      __typename: "ModelReportConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteProfileSubscriptionVariables = {
  filter?: ModelSubscriptionProfileFilterInput | null,
};

export type OnDeleteProfileSubscription = {
  onDeleteProfile?:  {
    __typename: "Profile",
    deviceId: string,
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    reports?:  {
      __typename: "ModelReportConnection",
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
    profileTagsDeviceId?: string | null,
    reportTagsId?: string | null,
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
    profileTagsDeviceId?: string | null,
    reportTagsId?: string | null,
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
    profileTagsDeviceId?: string | null,
    reportTagsId?: string | null,
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
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    profileReportsDeviceId?: string | null,
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
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    profileReportsDeviceId?: string | null,
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
    tags?:  {
      __typename: "ModelTagConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    profileReportsDeviceId?: string | null,
  } | null,
};
