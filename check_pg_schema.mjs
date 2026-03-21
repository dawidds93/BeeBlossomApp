import { Client } from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

async function checkDb(name, url) {
  console.log(`\nChecking ${name}...`);
  const client = new Client({ connectionString: url });
  try {
    await client.connect();
    const res = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'Product' AND column_name = 'size';
    `);
    if (res.rows.length > 0) {
      console.log(`✅ [${name}] Column 'size' EXACT MATCH:`, res.rows[0]);
    } else {
      console.log(`❌ [${name}] Column 'size' DOES NOT EXIST.`);
    }
  } catch (err) {
    console.error(`Error connecting to ${name}:`, err.message);
  } finally {
    await client.end();
  }
}

async function main() {
  const envContent = fs.readFileSync('.env', 'utf-8');
  const envLocalContent = fs.readFileSync('.env.local', 'utf-8');
  
  const envConfig = dotenv.parse(envContent);
  const envLocalConfig = dotenv.parse(envLocalContent);

  await checkDb('PROD (.env)', envConfig.DATABASE_URL);
  await checkDb('DEV (.env.local)', envLocalConfig.DATABASE_URL);
}

main();
