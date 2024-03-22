import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'to-do',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PWD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})
class PGQueries {
    async getAllTasks() {
        try {
            const client = await pool.connect();
            let result = await client.query("SELECT * FROM TASKS WHERE deleted=false ORDER BY startDate desc");
            client.release();
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    async getTaskByKey(key: String) {
        try {
            const client = await pool.connect();
            let result = await client.query("SELECT * FROM tasks WHERE task LIKE $1", [`%${key}%`]);
            client.release();
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    async createTask(task: String, startDate: String, enddate: String) {
        try {
            const client = await pool.connect();
            let result = await client.query("INSERT INTO tasks(task, startDate, enddate) VALUES($1, $2, $3)", [task, startDate, enddate]);
            client.release();
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    async removeTask(tno: Number) {
        try {
            const client = await pool.connect();
            let result = await client.query("UPDATE tasks SET deleted = true WHERE tno = $1", [tno]);
            client.release();
            return result.rows;
        } catch (error) {
            throw error
        }
    }
    async updateTask(tno:Number, task: String, startDate: String, enddate:String,deleted:Boolean, done:Boolean) {
        try {
            const client = await pool.connect();
            let result = await client.query(
                "UPDATE tasks SET task = $2, startDate = $3, enddate = $4, deleted = $5, done = $6 WHERE tno = $1",
                [tno, task, startDate, enddate, deleted, done]
            );
            client.release();
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    
}


export const tasks = [
    {
        tno: 123,
        task: 'Kate Chopin',
        done: true,
        deleted: false,
        created: "2023-07-10 14:43:44.926",
        deadline: "2023-07-10 14:43:44.926"
    },
    {
        tno: 113,
        task: 'Kate Chopin',
        done: true,
        deleted: false,
        created: "2023-07-10 14:43:44.926",
        deadline: "2023-07-10 14:43:44.926"
    },
    {
        tno: 193,
        task: 'Kate Chopin',
        done: true,
        deleted: false,
        created: "2023-07-10 14:43:44.926",
        deadline: "2023-07-10 14:43:44.926"
    },
    {
        tno: 153,
        task: 'Kate Chopin',
        done: true,
        deleted: false,
        created: "2023-07-10 14:43:44.926",
        deadline: "2023-07-10 14:43:44.926"
    },
];
export default PGQueries