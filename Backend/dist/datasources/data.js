"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = void 0;
const pg_1 = __importDefault(require("pg"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { Pool } = pg_1.default;
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'to-do',
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PWD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});
class PGQueries {
    async getAllTasks() {
        try {
            const client = await pool.connect();
            let result = await client.query("SELECT * FROM TASKS WHERE deleted=false ORDER BY startDate desc");
            client.release();
            return result.rows;
        }
        catch (err) {
            throw err;
        }
    }
    async getTaskByKey(key) {
        try {
            const client = await pool.connect();
            let result = await client.query("SELECT * FROM tasks WHERE task LIKE $1", [`%${key}%`]);
            client.release();
            return result.rows;
        }
        catch (error) {
            throw error;
        }
    }
    async createTask(task, startDate, enddate) {
        try {
            const client = await pool.connect();
            let result = await client.query("INSERT INTO tasks(task, startDate, enddate) VALUES($1, $2, $3)", [task, startDate, enddate]);
            client.release();
            return result.rows;
        }
        catch (err) {
            throw err;
        }
    }
    async removeTask(tno) {
        try {
            const client = await pool.connect();
            let result = await client.query("UPDATE tasks SET deleted = true WHERE tno = $1", [tno]);
            client.release();
            return result.rows;
        }
        catch (error) {
            throw error;
        }
    }
    async updateTask(tno, task, startDate, enddate, deleted, done) {
        try {
            const client = await pool.connect();
            let result = await client.query("UPDATE tasks SET task = $2, startDate = $3, enddate = $4, deleted = $5, done = $6 WHERE tno = $1", [tno, task, startDate, enddate, deleted, done]);
            client.release();
            return result.rows;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.tasks = [
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
exports.default = PGQueries;
