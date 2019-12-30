/**
 * Load modules
 */

require("dotenv").config()

const db = require('./modules/db')
const server = require('./modules/server');

/**
 * Start API server
 */
db.connect().then( db =>{
    let collection = db.collection('Users')
    collection.countDocuments().then((res) =>{
        if(res===0){
            collection.insertOne({
                name:"Stiers",
                surname:"Nathan",
                password:"hello",
                hours:"999999999"
            }).catch((err)=>{
                console.log('[App] Unable to insert default user')
            })
        }
    })
}).then(server.start)