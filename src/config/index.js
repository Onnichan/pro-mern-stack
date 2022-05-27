if(process.env.NODE_ENV !== 'production'){
  const path = require('path').join(__dirname,'..','..','.env');
  require('dotenv').config({path});
}

module.exports = {
  PORT : process.env.PORT,
}