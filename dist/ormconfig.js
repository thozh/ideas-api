require('dotenv').config();
module.exports = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: ['dist/**/*.entity.{ts,js}'],
};
//# sourceMappingURL=ormconfig.js.map