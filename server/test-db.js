const mongoose = require('mongoose');

// Your current connection string
const uri = "mongodb+srv://GayathriVyshnavi:Vyshu2984@rentlycluster.nidrxdn.mongodb.net/test?retryWrites=true&w=majority";

console.log("Attempting to connect to MongoDB...");

mongoose.connect(uri)
  .then(() => {
    console.log("✅ SUCCESS: Connection established!");
    process.exit(0); // Closes the script
  })
  .catch(err => {
    console.error("❌ CONNECTION FAILED!");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);
    process.exit(1);
  });