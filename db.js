const mongoose = require("mongoose");

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = async () => {
  const options = {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  };
  try {
    const url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
    await mongoose.connect(url, options);
    console.log("connected to database successfully");
  } catch (error) {
    console.log("could not connect to database.", error);
  }
};
