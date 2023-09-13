export type Offer = {
  bicode: string;
  boutid: string;
  merchantID: string;
  merchant: string;
  cur: string;
  pri: string;
  qua: string;
  cas: string;
  form: string;
  url: string;
  upd: string;
};

export type ParsedOffer = {
  bicode: string;
  boutid: number;
  merchantID: number;
  merchant: string;
  cur: string;
  pri: number;
  qua: number;
  cas: number;
  form: number;
  url: string;
  upd: string;
};

export type MerchantUpdate = {
  merchantID: number;
  merchant: string;
  date: string;
};

export type Updates = {
  [merchantID: string]: MerchantUpdate;
};
