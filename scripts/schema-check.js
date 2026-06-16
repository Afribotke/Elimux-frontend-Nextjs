import dotenv from "dotenv";

dotenv.config({ path: ".env.schema" });

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

function assertDefined(name, value) {
  if (!value) {
    console.log(`? Missing required env: ${name} in .env.schema`);
    process.exit(1);
  }
}

async function main() {
  assertDefined("SUPABASE_URL", url);
  assertDefined("SUPABASE_SERVICE_ROLE_KEY", key);

  console.log("? schema-check.js: basic Supabase env validated");
  process.exit(0);
}

main();
