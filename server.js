const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.MONGODB_URI.replace(
  '<PASSWORD>',
  process.env.MONGODB_PASSWORD
);
const DBConnect = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

DBConnect();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`The App is running on port ${port}`));
