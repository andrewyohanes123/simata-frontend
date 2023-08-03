/* eslint-disable @typescript-eslint/no-explicit-any */
import { TablerIconProps } from "@tabler/icons-react";
import { FC } from "react";
import { Application, Params, Id, NullableId } from "@feathersjs/feathers";

export type TStatsData = {
  label: string;
  value: number;
  color: string;
};

export interface BaseAttributes {
  id?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface DistrictAttributes extends BaseAttributes {
  name: string;
}

export interface DocumentAttributes extends BaseAttributes {
  name: string;
  address: string;
  phone: string;
  job: string;
  type: string;
  latitude: number;
  longitude: number;
  street: string;
  neighbor: string;
  subdistrict: string;
  district: string;
  userId: number | null;
  user?: UserAttributes;
  verified: boolean;
}

export interface FileAttributes extends BaseAttributes {
  name: string;
  mime: string;
  type: "result" | "attachment";
}

export interface NeighborAttributes extends BaseAttributes {
  name: string;
  subdistrictId: number | null;
  subdistrict?: SubdistrictAttributes;
}

export interface OrderAttributes
  extends Pick<QueueAttributes, Exclude<keyof QueueAttributes, "code">> {
  productId: number | null;
  product?: ProductAttributes;
  done: boolean;
  quantity: number;
}

export interface ProductAttributes extends BaseAttributes {
  name: string;
  price: number;
}

export interface ProfileAttributes extends BaseAttributes {
  nik: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string;
  instagram: string;
  twitter: string;
  facebook: string;
  neighborId: string | null;
  verified: boolean;
  neighbor?: NeighborAttributes;
}

export interface QueueAttributes extends BaseAttributes {
  code: string;
  name: string;
  nik: string;
  phone: string;
  finishDate: string;
  typeId: number | null;
  type?: TypeAttributes;
}

export interface ResultAttributes extends BaseAttributes {
  mime: "application/pdf" | "image/png" | "image/jpeg" | "image/webp";
  data: Blob;
  name: string;
  queueId: number | null;
  queue?: QueueAttributes;
}

export interface SubdistrictAttributes extends BaseAttributes {
  name: string;
  districtId: number | null;
  district?: DistrictAttributes;
}

export interface StatisticAttributes extends BaseAttributes {
  name: string;
  data: TStatsData[];
}

export interface TypeAttributes extends BaseAttributes {
  name: string;
  requirements: string[];
}

export interface UserAttributes extends BaseAttributes {
  name: string;
  username: string;
  password: string;
  type: "public" | "administrator";
}

export interface MaterialChartData {
  material: string;
  total: number;
}

export interface LiveChartData {
  status: string;
  total: number;
}

export interface UnitChartData {
  time: string;
  total: number;
}

export type MaterialChart = MaterialChartData[];
export type UnitChart = UnitChartData[];

export interface FindResult<T extends BaseAttributes> {
  data: T[];
  limit: number;
  skip: number;
  total: number;
}

export interface FeathersError {
  code: number;
  message: string;
  name: string;
}

export interface ITPVData {
  altitude: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
  time: string;
}

export interface ISKYData {
  satellitesInView: number;
  satellitesUsed: number;
}

export interface IRoutePath {
  path: string;
  label: ReactNode;
  icon: FC<TablerIconProps>;
}

export interface IRouteGroup {
  name: string;
  routes: IRoutePath[];
  icon: FC<TablerIconProps>;
}

export type FileWithProgress = { progress: number; file: File };

export type ExcludeAttributes<
  Attributes extends BaseAttributes,
  ExcludedProps
> = Pick<Attributes, Exclude<keyof Attributes, ExcludedProps>>;

interface BaseService<T extends BaseAttributes> {
  find: (params: Params) => Promise<FindResult<T>>;
  get: (id: Id, params?: Params) => Promise<T>;
  create: (data: any, params?: Params) => Promise<T>;
  update: (id: NullableId, data: any, params?: Params) => Promise<T>;
  patch: (id: NullableId, data: any, params?: Params) => Promise<T>;
  remove: (id: NullableId, params?: Params) => Promise<T>;
  setup: (path: string, app: Application) => Promise<T>;
  teardown: (path: string, app: Application) => Promise<T>;
}

export type UserService = BaseService<UserAttributes>;
export type DocumentService = BaseService<DocumentAttributes>;
export type FileService = BaseService<FileAttributes>;