import csvtojson from "csvtojson";
import { insertOffer } from "./ingestion-offers";
import fs from "fs";
import { Offer } from "../utils/types";

main();

function main() {
  readCsvFile();
}

function readCsvFile() {
  if (process.argv.length === 2) {
    console.error("Expected exactly one argument!");
    process.exit(1);
  }

  if (!fs.existsSync(process.argv[2])) {
    console.log("File doesn't exist");
    process.exit(2);
  }

  const readCsvFilePath = process.argv[2];

  const readstream = fs.createReadStream(readCsvFilePath);

  csvtojson()
    .fromStream(readstream)
    .subscribe(
      async (offer: Offer) => {
        await insertOffer(offer);
      },
      onError,
      onComplete
    );
}

function onError(error: Error) {
  console.log("Something Went wrong");
}

function onComplete(): void {
  console.log("Success");
}
