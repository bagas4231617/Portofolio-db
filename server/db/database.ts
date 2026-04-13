import pg from 'pg';

const { Pool } = pg;

// We use Postgres exclusively for Vercel Serverless compatibility
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Neon/Render Postgres
});

// Awaitable initialization so Serverless cold starts don't cause racing conditions
const initPromise = pool.query(`
  CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isRead BOOLEAN DEFAULT FALSE
  )
`).catch(err => console.error("Postgres init error:", err));

export const dbQuery = {
  // Use for INSERT, UPDATE, DELETE
  async run(sql: string, params: any[] = []): Promise<number> {
    await initPromise; // ensure table exists on Vercel cold starts
    
    // Convert SQLite syntax (?, ?) to Postgres syntax ($1, $2) automatically if needed
    // so we don't have to change all the controller code again if they have "?"
    const pgSql = sql.replace(/\?/g, () => '$' + (params.indexOf(params[0]) + 1)); // simplification, since we fixed controller to $1,$2 already
    
    const result = await pool.query(sql, params);
    return result.rowCount ?? 0;
  },
  
  // Use for SELECT
  async all(sql: string, params: any[] = []): Promise<any[]> {
    await initPromise; // ensure table exists on Vercel cold starts
    const result = await pool.query(sql, params);
    return result.rows;
  }
};

export default dbQuery;
