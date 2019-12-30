const mongodb = require("mongodb")
const mongoClient = mongodb.MongoClient

const url = process.env.DB_URL
const dbName = process.env.DB_NAME

let connect = ()=>{
    return new Promise((resolve, reject) => {
        const client = new mongoClient(url, {useUnifiedTopology:true, useNewUrlParser:true})
        client.connect(function(err){
            if(err){
                console.error("[Db] Unable to connect to server: " + err.message)
                reject(err)
            }else{
                console.info("[Db] Connected successfully to server")
                exports.db = client.db(dbName)
                resolve(exports.db)
            }
        })
    })
}

exports.connect = connect
exports.db = null
exports.ObjectID = mongodb.ObjectID;
