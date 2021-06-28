export interface IMsgPerDevItem {
  ID: string;
  value: number;
  type: string;
}

export interface IMsgPerDayItem {
  ID: string;
  value: number;
  day: string;
}

export interface IFeature {
  type: string;
  properties: {};
  geometry: { type: string; coordinates: [] };
}

export interface IDataMap {
  type: string;
  features: IFeature[];
}

export interface ISunbusrt {
  name: string;
  children: any[];
}
