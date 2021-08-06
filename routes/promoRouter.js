const express = require('express');
const bodyParser = require('body-parser');
const promoteRouter = express.Router();
const mongooes = require('mongoose');

const Promotions = require('../models/promotions');
const authenticate = require("../authenticate");

promoteRouter.use(bodyParser.json());

promoteRouter.route('/')
.get((req,res,next) => {
    Promotions.find({})
        .then((promotions) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promotions);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
   Promotions.create(req.body)
       .then((promotion) => {
           console.log('Promotion created', promotion);
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json(promotion);
       }, (err) => next(err))
       .catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotes');
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.remove({})
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

promoteRouter.route('/:promoteId')
.get( (req,res,next) => {
    Promotions.findById(req.params.promoteId)
        .then((promote) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promote);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promote/'+ req.params.promoteId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoteId, {
        $set: req.body
    }, {new: true})
        .then((promote) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promote);
        }, (err) => next(err))
        .catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoteId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
});

module.exports = promoteRouter;