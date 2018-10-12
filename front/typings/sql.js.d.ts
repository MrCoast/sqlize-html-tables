declare module 'sql.js' {
    namespace SQL {
        export interface DatabaseSelectResult {
            columns: string[];
            values: any[][];
        }

        export class Database {
            public run(sql: string): void;
            public exec(sql: string): DatabaseSelectResult[];
        }
    }

    export default SQL;
}
