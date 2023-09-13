import { ParsedOffer, Updates } from "../utils/types";
import getPool from "../utils/database";
import { DatabasePoolConnection, sql } from "slonik";
import fs from "fs";

export async function insertOffer(offer: { [key: string]: string }) {
  const parsedOffer: ParsedOffer = {
    merchantID: parseInt(offer.merchantID),
    merchant: offer.merchant,
    bicode: offer.bicode,
    boutid: parseInt(offer.boutid),
    cur: offer.cur,
    pri: parseFloat(offer.pri),
    qua: parseInt(offer.qua),
    cas: parseInt(offer.cas),
    form: parseInt(offer.form),
    url: offer.url,
    upd: offer.upd,
  };

  let countResult = await count(parsedOffer);

  if (countResult > 0) {
    console.log(`offer already exists`);
    return;
  }

  store(parsedOffer);
}

async function count(parsedOffer: ParsedOffer) {
  const offerCount = (async () => {
    const pool = await getPool();
    const offerCountResult = await pool.one(sql.unsafe`
          SELECT COUNT(*) FROM offers 
          WHERE merchant = ${parsedOffer.merchant}
            AND merchantid = ${parsedOffer.merchantID}
            AND upd = ${parsedOffer.upd}
            AND boutid = ${parsedOffer.boutid}
            AND cas = ${parsedOffer.cas}
            AND form = ${parsedOffer.form}
            AND bicode = ${parsedOffer.bicode}
            AND qua = ${parsedOffer.qua}
            AND url = ${parsedOffer.url}
            AND pri = ${parsedOffer.pri}`);
    return offerCountResult.count;
  })();

  return await offerCount;
}

async function store(parsedOffer: ParsedOffer) {
  (async () => {
    const pool = await getPool();
    await pool.connect(async (connection: DatabasePoolConnection) => {
      const query = sql.unsafe`
    INSERT INTO offers (bicode, boutid, merchant, merchantid, cur, pri, qua, cas, form, url, upd)
            VALUES (${parsedOffer.bicode},${parsedOffer.boutid},${parsedOffer.merchant},${parsedOffer.merchantID},${parsedOffer.cur},${parsedOffer.pri},${parsedOffer.qua},${parsedOffer.cas},${parsedOffer.form},${parsedOffer.url},${parsedOffer.upd})`;
      await connection.query(query);
    });
  })();
}
