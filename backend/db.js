const mongoose = require('mongoose')
const mongoUrI = "mongodb://localhost:27017/iNoteBook"


const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUrI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};


module.exports = connectToMongo;