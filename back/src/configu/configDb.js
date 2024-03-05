import dotenv from "dotenv";

dotenv.config();
const configDb = {
    mysql: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3306,
        user: process.env.USER || 'root',
        password: process.env.PASSWORD || '',
        database: process.env.DV || 'quiz'
    }
};

export default configDb;