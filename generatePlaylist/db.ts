import * as sql from 'mssql';

export class DBService {
    private connectionPool: sql.ConnectionPool;

    public async connect() {
        this.connectionPool = await sql.connect(process.env.dbConnectionString);
    }

    public cleanup() {
        return this.connectionPool?.close();
    }

    public async query<T>(query: string) {
        return this.connectionPool.request().query<T>(query);
    }
}