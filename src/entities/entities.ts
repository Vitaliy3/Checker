export interface IAboutUs {
  mainImage: string;
  text: string;
}

export interface IContract {
  name: string;
  dateOfConclusion: Date;
  startDate: Date;
  endDate: Date;
  conditions: string[];
  features: IFeature[];
}

export interface IComment {
  user: IAccount;
  message: string;
  date: Date;
}

export interface IAnalyseStatus {
  id: number;
  message: string;
}

export interface IFeature {
  id: number;
  feature: string;
}

export interface IAnalyse {
  name: string;
  loadDate: Date;
  tasks: number;
  graph: number[][];
  status: IAnalyseStatus;
}

export interface IAccount {
  login: string;
  password: string;
  token: string;
  email: string;
  rights: string[];
}

export interface IMessage {
  text: string;
  sender: IAccount;
  dispatchTime: Date;
}
