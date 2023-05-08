export declare const config: Config;
interface Config {
    server: {
        name: string;
        port: number;
    };
    jwt: {
        apiSecret: string;
    };
    redis: {
        host: string;
        port: number;
    };
    kafka: {
        kafkaHost: string;
        clientId: string;
        groupId: string;
    };
    database: {
        database: string;
        username: string;
        password: string;
        host: string;
        port: number;
        dialect: "postgres";
    };
    upload: {
        datadisk: string;
        domain: string;
    };
    email: {
        domain: string;
        from: string;
    };
    smsGateway: {
        url: string;
        username: string;
        password: string;
    };
}
export {};
