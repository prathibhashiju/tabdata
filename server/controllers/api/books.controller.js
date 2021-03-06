﻿var config = require('config.json');
var _ = require('lodash');
var express = require('express');
var jwt = require('express-jwt')({ secret: config.secret });
var router = express.Router();
var bookService = require('services/book.service');

// routes
router.get('/', jwt, getAll);
router.get('/:_id', jwt, getById);
router.post('/', jwt, create);
router.put('/:_id', jwt, update);
router.delete('/:_id', jwt, _delete);

module.exports = router;

function getAll(req, res) {
console.log("bok"+req.user.sub);

    //bookService.getAll()
console.log("ser getall");
    bookService.getAll(req.user.sub)
        .then(function (books) {
            res.send(books);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    bookService.getById(req.params._id)
        .then(function (book) {
            res.send(book);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req, res) {
    bookService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    bookService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    bookService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
