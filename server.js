require('dotenv').config();
const app = require("../Booklet.AI/src/app");
const connectDB = require("../Booklet.AI/src/db/db");

connectDB();

app.listen(3000, () => {
    console.log(" Server is created at port 3000");

})