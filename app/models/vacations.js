'use strict';

var Mongo = require('mongodb');

function Vacation(o){
  this.name = o.name;
  this.start = new Date(o.start);
  this.end  = new Date(o.end);
  this.lat = o.lat;
  this.lng = o.lng;
  this.photo = [];

}

Object.defineProperty(Vacation, 'collection', {
  get: function(){return global.mongodb.collection('vacations');}
});

Vacation.all = function(cb){
  Vacation.collection.find().toArray(cb);
};

Vacation.create = function(o, cb){
  var v = new Vacation(o);
  Vacation.collection.save(v, cb);
};

Vacation.removeById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Vacation.collection.findAndRemove({_id:_id}, cb);
};

module.exports = Vacation;

