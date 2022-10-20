import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import sequelize from './utils/database.js';
import router from './routes/index.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', router);
const PORT = process.env.PORT || 3001;

const startApp = async () => {
  try {
    // {force:true}
    await sequelize.sync();
    app.listen(PORT, () => { console.log(`App has been started on the port ${PORT}`); });
  } catch (e) {
    console.log(e);
  }
};

startApp();
