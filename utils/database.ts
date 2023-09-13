import { createPool } from "slonik";

import type { DatabasePool } from "slonik";
import config from "../src/config";

let pool: DatabasePool = undefined as unknown as DatabasePool;

async function createDatabasePool() {
  const pool = await createPool(
    `postgres://${config.db.user}:${config.db.password}@localhost:${config.db.port}/offer_db`
  );

  return pool;
}

export default async function getPool() {
  if (!pool) {
    pool = await createDatabasePool();
  }

  return pool;
}
