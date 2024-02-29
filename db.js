const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected Successfully"))
  .catch((err) => console.log(err));
