const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wfytu.mongodb.net/dbtest?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }, () => { })

        console.log(`MongoDb connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectDB;


