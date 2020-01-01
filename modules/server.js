/**
 * Load modules
 */

const express = require('express');
const bodyParser = require('body-parser')
const usersRouter = require('../routes/users');
const oldJobsRouter = require('../routes/oldJobs')
const futureJobsRouter = require('../routes/futureJobs')



/**
 * Variables
 */

// Global variables
const host = process.env.HOST || '0.0.0.0';
const port = process.env.MYPORT || process.env.PORT || 80;
const app = express();



/**
 * Configuration
 */

// Configure routes
app.use(bodyParser.json({limit:"1.1MB"}))
app.use('/users', usersRouter);
app.use('/oldjobs', oldJobsRouter)
app.use('/futurejobs', futureJobsRouter)

// Start server
var start = function (callback) {
    app.listen(port, host, () => {
        console.info(`[SERVER] Listening on http://${host}:${port}`);
        if (callback) callback(null);
    });
};



/**
 * Exports
 */
exports.start = start;