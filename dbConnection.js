//mongodb://userdb:userdb@ac-tuaq12n-shard-00-00.8eev3k2.mongodb.net:27017,ac-tuaq12n-shard-00-01.8eev3k2.mongodb.net:27017,ac-tuaq12n-shard-00-02.8eev3k2.mongodb.net:27017/?ssl=true&replicaSet=atlas-a6asbg-shard-0&authSource=admin/users
//mongodb://localhost:27017/users
// mongodb+srv://userdb:userdb@cluster0.8eev3k2.mongodb.net/users
// const DB_URL="mongodb+srv://userdb:userdb@cluster0.8eev3k2.mongodb.net/"

const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
// console.log(DB_URL);

mongoose
  .connect(DB_URL)
  .then((data) => {
    console.log("Connected to DB Success!!!");
  })
  .catch((err) => {
    console.error(err);
  });
