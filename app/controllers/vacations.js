'use strict';
var moment         = require('moment');

var Vacation = require('../models/vacations');

exports.init= function(req, res){
  res.render('vacations/init');
};

exports.index = function(req, res){
  Vacation.all(function(err, vacations){
    res.render('vacations/index', {vacations:vacations, moment:moment});
  });
};

exports.create= function(req, res){
   Vacation.create(req.body, function(){
    res.redirect('/vacations');
  });
};
