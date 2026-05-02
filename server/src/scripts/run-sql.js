import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlFile = process.argv[2];

if (!sqlFile) {
  console.error('Usage: node src/scripts/run-sql.js <path-to-sql-file>');
  process.exit(1);
}

const absolutePath = path.resolve(__dirname, '..', '..', sqlFile);
const sql = await fs.readFile(absolutePath, 'utf8');

try {
  await pool.query(sql);
  console.log(`Executed ${absolutePath}`);
} finally {
  await pool.end();
}
