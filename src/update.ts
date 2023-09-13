import { sql } from "slonik";
import getPool from "../utils/database";
import { Updates } from "../utils/types";
import fs from "fs";

retriveData();

async function retriveData() {
  const pool = await getPool();
  await pool.connect(async (connection) => {
    const updateOffersQuery = sql.unsafe`
    SELECT merchant, merchantID, MAX(upd) AS date
    FROM offers
    GROUP BY merchant, merchantID
    ORDER BY merchantID;`;

    const updateOfferResult = await connection.query(updateOffersQuery);
    writeToJsonFile(updateOfferResult.rows);
  });
}

function writeToJsonFile(updates: readonly Updates[]): void {
  let date = new Date();
  let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  fs.writeFile(
    `./updates/update-${today}.json`,
    JSON.stringify(Object.values(updates), null, 2),
    (error) => {
      if (error) {
        console.log(error);
      }
    }
  );
}
