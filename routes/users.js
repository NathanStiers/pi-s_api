/**
 * Load modules
 */

var express = require('express')
var router = express.Router()
const db = require('../modules/db')


/**
 * Routes
 */

// Return All Users
router.get('/listeUser', function (req, res) {
    db.db.collection('Users').find().toArray().then(all_users => {
        all_users.forEach(el => delete el.password)      
        res.json(all_users)
    }).catch(err =>{
        console.error("Error with route listeUser GET: " + err.message)
    }) 
})

// Update hours
router.post('/hours', function (req, res, next) {
    console.log(req.body)
    db.db.collection('Users').findOneAndUpdate({name:req.body.name}, {$set: {hours:req.body.hours}}, {returnOriginal:false})
    .then(result => {
        if(result.value){
            console.log(result.value)
            delete result.value.password
            res.json(result.value)
        }else{
            res.status(404).send()
        }
    }).catch(err => {
        console.log(err.message)
        res.status(500).send(err)
    })
})



/**
 * Exports
 */

module.exports = router