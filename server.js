require("dotenv").config();
require("./src/config/db"); 
const app = require("./src/app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});