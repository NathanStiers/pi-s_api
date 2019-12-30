/**
 * Load modules
 */

var express = require('express')
var router = express.Router()
const db = require('../modules/db')


/**
 * Routes
 */

// Return All FutureJobs
router.get('/', function (req, res) {
    db.db.collection('FutureJobs').find().toArray().then(all_jobs => {
        res.json(all_jobs)
    }).catch(err =>{
        console.error("Error with route listeUser GET: " + err.message)
    }) 
})

// Delete a FutureJobs
router.post('/del/:id', function (req, res, next) {
    db.db.collection('FutureJobs').findOneAndDelete({_id: new db.ObjectID(req.params.id)}, {returnOriginal:false})
    .then(result => {
        if(result.value){
            res.status(200).send()
        }else{
            res.status(404).send()
        }
    }).catch(err => {
        res.status(500).send(err)
    })
})

// Add a FutureJobs
router.post('/add', function (req, res, next) {
    console.log(req.body)
    db.db.collection('FutureJobs').insertOne(req.body)
    .then(result => {
        req.body._id = result.insertedId
		res.json(req.body)
    }).catch(err => {
        res.status(500).send(err)
    })
})



/**
 * Exports
 */

module.exports = router