import Database from 'better-sqlite3';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;

// We use Postgres if DATABASE_URL is defined, otherwise fallback to SQLite
const usePostgres = !!process.env.DATABASE_URL;

let pool: pg.Pool | null = null;
let sqliteDb: Database.Database | null = null;

if (usePostgres) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Render Postgres
  });
  
  // Initialize Postgres DB schema
  pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      isRead BOOLEAN DEFAULT FALSE
    )
  `).catch(err => console.error("Postgres init error:", err));

} else {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dbPath = path.join(__dirname, '..', 'database.sqlite');
  
  sqliteDb = new Database(dbPath);
  
  // Initialize SQLite schema
  sqliteDb.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      isRead INTEGER DEFAULT 0
    )
  `);
}

// Convert PostgreSQL $1, $2 placeholder to SQLite ? 
const convertToSqlite = (sql: string) => sql.replace(/\$\d+/g, '?');

export const dbQuery = {
  // Use for INSERT, UPDATE, DELETE
  async run(sql: string, params: any[] = []): Promise<number> {
    if (usePostgres) {
      const result = await pool!.query(sql, params);
      return result.rowCount ?? 0;
    } else {
      const sqliteSql = convertToSqlite(sql);
      const stmt = sqliteDb!.prepare(sqliteSql);
      const result = stmt.run(...params);
      return result.changes;
    }
  },
  
  // Use for SELECT
  async all(sql: string, params: any[] = []): Promise<any[]> {
    if (usePostgres) {
      const result = await pool!.query(sql, params);
      return result.rows;
    } else {
      const sqliteSql = convertToSqlite(sql);
      const stmt = sqliteDb!.prepare(sqliteSql);
      return stmt.all(...params);
    }
  }
};

export default dbQuery;
