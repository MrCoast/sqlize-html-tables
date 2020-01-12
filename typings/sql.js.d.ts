declare module 'sql.js' {
    namespace SQL {
        export interface IDatabaseSelectResult {
            columns: string[];
            values: any[][];
        }

        export class Database {
            public run(sql: string): void;
            public exec(sql: string): IDatabaseSelectResult[];
        }
    }

    export default SQL;
}
