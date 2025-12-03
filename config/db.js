import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config();

// Create a connection using the DATABASE_URL from .env
const sql = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    
});

export const testConnection = async () => {
  return new Promise((resolve) => {
    sql.connect((err, client, release) => {
      if (err) {
        console.error("❌ Database connection failed:", err.stack);
        return resolve(false);
      }

      client.query("SELECT NOW()", (err, result) => {
        release(); 

        if (err) {
          console.error("❌ Test query failed:", err.stack);
          return resolve(false);
        }

        console.log("✅ Database connected successfully!");
        console.log("⏱ Current time:", result.rows[0].now);

        return resolve(true);
      });
    });
  });
};

// Export the sql instance for queries
export default sql;
