  
// const mongoose = require("mongoose");

// module.exports = () => {
//   const self = module.exports;
//   return mongoose
//     .connect(process.env.DATABASE, {
//       useNewUrlParser: true,
//       useCreateIndex: true
//     })
//     .then(() => console.log("DB Connected"))
//     .catch(err => {
//       console.error(
//         "Failed to connect to mongo on startup - retrying in 5 sec"
//       );
//       setTimeout(self, 5000);
//     });
// };