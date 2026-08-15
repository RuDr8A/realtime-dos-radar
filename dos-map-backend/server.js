
require('dotenv').config();
const app = require("./src/app");
const connectToDB = require('./src/database/db');

const PORT = process.env.PORT || 3000; 

async function startServer() {
  try {
    
    await connectToDB();
    
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}....`);
    });
  } catch (error) {
    console.error("Critical: Server failed to start:", error.message);
    process.exit(1);
  }
}

startServer();
