const express = require('express');
const bodyParser = require('body-parser');
const promoteRouter = express.Router();

promoteRouter.use(bodyParser.json());

promoteRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotes to you!');
})
.post((req, res, next) => {
    res.end('Will add the promote: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotes');
})
.delete((req, res, next) => {
    res.end('Deleting all promotes');
});

promoteRouter.route('/:promoteId')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get( (req,res,next) => {
    res.end('Will send details of the promote: ' + req.params.promoteId +' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promote/'+ req.params.promoteId);
})
.put((req, res, next) => {
    res.write('Updating the promote: ' + req.params.promoteId + '\n');
    res.end('Will update the promote: ' + req.body.name +
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting promote: ' + req.params.promoteId);
});

module.exports = promoteRouter;