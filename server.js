import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB conections succesful!!');
  })
  .catch((err) => {
    console.log(err);
  });

const port = 5000;
app.listen(port, () => {
  console.log(`Server runing in 127.0.0.1:${port}`);
});

// // handle error
// app.use((err, req, res, next) => {
//   res.status(500).json({
//     status: 'fail',
//     message: err.message,
//   });
// });
