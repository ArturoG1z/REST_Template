const mongoose = require('mongoose');

const dbConnecion = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    console.log('Database online');
  } catch (error) {
    console.log(error);
    throw new Error('Error conection to db');
  }
}

module.exports = {
  dbConnecion
}

