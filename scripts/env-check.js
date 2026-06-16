import dotenv from "dotenv";

dotenv.config({ path: ".env.schema" });

async function main() {
  console.log("? env-check.js: env schema file loaded");
  process.exit(0);
}

main();
