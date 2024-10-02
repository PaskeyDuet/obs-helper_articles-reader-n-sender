export type ArticleBaseAttributes = {
  name: string;
  content: string;
  tags: string[];
};
export type listOfUpdates = {
  [created: string]: string[];
  updated: string[];
  deleted: string[];
};
//Тип представленный ниже был неясен на момент его создания
export type listsOfUpdatedArticles = {
  updated: ArticleBaseAttributes[];
  deleted: string[];
} & {
  [created: string]: ArticleBaseAttributes[];
};
export type folderMdObj = {
  folders: string[];
  mdFiles: string[];
};
export type updatesResObj = {
  status: string;
  data: listsOfUpdatedArticles | null;
  error?: Error | null;
};
export type requestStatus = {
  status: string;
  response?: DbApiResArr;
  error?: string;
};

export type DbApiBaseRes = {
  status: "success" | "error";
  requests: number;
  fulfilled: number;
  rejected: number;
  error?: string;
};

export type DbApiCreatedRes = DbApiBaseRes & {
  created: number;
};
export type DbApiUpdatedRes = DbApiBaseRes & {
  updated: number;
};
export type DbApiDeletedRes = DbApiBaseRes & {
  deleted: number;
};

type ApiStatus = {
  status: "fulfiled" | "rejected";
};

export type ApiCreateSettledPromiseRes = DbApiCreatedRes & {
  value: ApiStatus;
};
export type ApiUpdateSettledPromiseRes = DbApiUpdatedRes & {
  value: ApiStatus;
};
export type ApiDeleteSettledPromiseRes = DbApiDeletedRes & {
  value: ApiStatus;
};

export type DbApiResAlias =
  | ApiCreateSettledPromiseRes
  | ApiUpdateSettledPromiseRes
  | ApiDeleteSettledPromiseRes;

export type DbApiResArr = DbApiResAlias[];
export type SettledPromisesApiRes = PromiseSettledResult<T> & {
  value: DbApiBaseRes;
};
