export interface createGetUlIpDTOParams {
  c: string;
  i?: string;
  n: string;
  o: string;
  p?: string;
  r: string;
  e?: string;
  cnt: string;
  pg: string;
}

export interface filterType {
  stopped?: boolean,
}

export interface responseItemParams {
  title: string,
  shortName?: string,
  gosRegNum: number,
  inn?: number,
  kpp?: number,
  registeredAt: string,
  stopped: boolean,
  stoppedAt: string
}

export interface OrConditionTypes {
  [key: string]: { $regex: RegExp } | number | undefined;
}