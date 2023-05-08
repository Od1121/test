import { Configure } from "@goodtechsoft/xs-micro-service";

export const config = Configure<Variables, Config>(
  ({ REDIS_HOST, REDIS_PORT, KAFKA, PORT, DATABASE, DATADISK, MEDIA_DOMAIN, SMSHOST }) => ({
    server: {
      name: "cb-auth-service",
      port: PORT || 3000
    },
    jwt: {
      apiSecret: "cb-auth.api"
    },
    redis: {
      host: REDIS_HOST,
      port: REDIS_PORT
    },
    upload: {
      datadisk: DATADISK || `${__dirname}/../../../datadisk`,
      domain  : MEDIA_DOMAIN || "/"
    },
    kafka   : KAFKA,
    database: DATABASE,
    email   : {
      domain: "http://192.168.1.4:3001",
      // domain: "http://192.168.1.26:30550",
      from  : "noreply@dep.mn"
    },
    smsGateway: {
      url     : SMSHOST,
      username: "CLI100004",
      password: "196aa106-3c2d-4e70-87da-be7d3fd56489"
    }
  }), {
    test: {
      PORT      : 30550,
      REDIS_HOST: "127.0.0.1",
      REDIS_PORT: 6379,
      KAFKA     : {
        kafkaHost: "127.0.0.1:9092",
        clientId : "cb-auth-service",
        groupId  : "cb-auth-service-group"
      },
      DATABASE: {
        database: "de_auth_2",
        username: "postgres",
        password: "p7GkK25Pl0gsNOzJ",
        host    : "127.0.0.1",
        port    : 5432,
        dialect : "postgres"
      },
      SMSHOST: "http://172.16.101.21:30010/cli/sms/send"
    },
    development: {
      PORT      : parseInt(`${process.env.PORT}`),
      REDIS_HOST: "172.16.101.33",
      REDIS_PORT: 6379,
      KAFKA     : {
        kafkaHost: "172.16.101.33:9092",
        clientId : "cb-auth-service",
        groupId  : "cb-auth-service-group"
      },
      DATABASE: {
        database: "de_auth_2",
        username: "postgres",
        password: "p7GkK25Pl0gsNOzJ",
        host    : "172.16.101.32",
        port    : 5432,
        dialect : "postgres"
      },
      SMSHOST: "http://172.16.101.21:30010/cli/sms/send"
    },
    dev: {
      PORT      : parseInt(`${process.env.PORT}`),
      REDIS_HOST: "172.16.101.33",
      REDIS_PORT: 6379,
      KAFKA     : {
        kafkaHost: "172.16.101.33:9092",
        clientId : "cb-auth-service",
        groupId  : "cb-auth-service-group"
      },
      DATABASE: {
        database: "de_auth_2",
        username: "postgres",
        password: "p7GkK25Pl0gsNOzJ",
        host    : "172.16.101.32",
        port    : 5432,
        dialect : "postgres"
      },
      DATADISK    : "/datadisk",
      MEDIA_DOMAIN: "http://dev-de-s3.zto.mn",
      SMSHOST     : "http://172.16.101.21:30010/cli/sms/send"
    }
  }
);

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
    host : string;
    port : number;
    dialect : "postgres";
  };
  upload: {
    datadisk: string;
    domain: string;
  };
  email: {
    domain: string;
    from: string;
  },
  smsGateway:{
    url: string;
    username: string;
    password: string;
  }
}

interface Variables {
  PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  KAFKA: {
    kafkaHost: string;
    clientId: string;
    groupId: string;
  };
  DATABASE: {
    database: string;
    username: string;
    password: string;
    host : string;
    port : number;
    dialect : "postgres"
  };  
  DATADISK?: string;
  MEDIA_DOMAIN?: string;
  SMSHOST: string;
}