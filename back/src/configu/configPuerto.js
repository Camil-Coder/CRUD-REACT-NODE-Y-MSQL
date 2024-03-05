import dotenv from "dotenv";

dotenv.config();
const configPuerto = {
    puerto: process.env.PORTLISTEN || 3001,
};

export default configPuerto;