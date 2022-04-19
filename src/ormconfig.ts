import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'movies_user',
    password: 'movies',
    database: 'movies',

    entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    }
}

export default config;