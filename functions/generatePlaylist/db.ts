import * as sql from 'mssql';

export class DBService {
    private connectionPool: sql.ConnectionPool;

    public async connect() {
        try {
            this.connectionPool = await sql.connect(process.env.dbConnectionString);
        } catch (err) {
            console.error('Error connecting to DB', err);
            throw err;
        }
    }

    public cleanup() {
        try {
            return this.connectionPool?.close();
        } catch (err) {
            console.error('Error closing DB connection', err);
            throw err;
        }
    }

    public async query<T>(query: string) {
        try {
            return this.connectionPool.request().query<T>(query);
        } catch (err) {
            console.error('Error querying DB', err);
            throw err;
        }
    }
}