var config = require('config.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('books');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.getByFrom = getByFrom;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

/*function getAll() {
    var deferred = Q.defer();

    db.books.find().toArray(function (err, books) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(books);
    });

    return deferred.promise;
}*/

function getAll(userid) {
console.log("getall id");
    var deferred = Q.defer();

    db.books.find({'userid':userid}).toArray(function (err, books) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(books);
    });

    return deferred.promise;
}


function getById(_id) {
    var deferred = Q.defer();

    db.books.findById(_id, function (err, book) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(book);
    });

    return deferred.promise;
}

function getByFrom(from) {
    var deferred = Q.defer();

    db.books.findOne({
        from: from
    }, function (err, book) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(book);
    });

    return deferred.promise;
}

function create(bookParam) {
    var deferred = Q.defer();

    // validate 
    var errors = [];
    if (!bookParam.from) { errors.push('From is required'); }
    if (!bookParam.to) { errors.push('To is required'); }

    if (!errors.length) {
        // ensure to and from are lowercase
        bookParam.from = bookParam.from.toLowerCase();
        bookParam.to = bookParam.to.toLowerCase();

        db.books.insert(
            bookParam,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    } else {
        deferred.reject(errors.join('\r\n'));
    }

    return deferred.promise;
}

function update(_id, bookParam) {
    var deferred = Q.defer();

    // validate 
    var errors = [];
    if (!bookParam.from) { errors.push('From is required'); }
    if (!bookParam.to) { errors.push('To is required'); }

    if (!errors.length) {
        // ensure to and from are lowercase
        bookParam.from = bookParam.from.toLowerCase();
        bookParam.to = bookParam.to.toLowerCase();

        // fields to update
        var set = _.omit(bookParam, '_id');

        db.books.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    } else {
        deferred.reject(errors.join('\r\n'));
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.books.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}
