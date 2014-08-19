'use strict';
var moment         = require('moment'),
    Vacation       = require('../models/vacations'),
    mp             = require('multiparty');

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

exports.show = function(req, res){
  Vacation.findById(req.params.id, function(err, vacation){
    res.render('vacations/show', {vacation:vacation, moment:moment});
  });
};

exports.downloadPhoto = function(req,res){
  Vacation.findById(req.params.id, function(err, vacation){
    vacation.downloadPhoto(req.body.url, function(){
      res.redirect('/vacations/' + req.params.id);
    });
  });
};

exports.uploadPhotos = function(req,res){
  Vacation.findById(req.params.id, function(err, vacation){
    var form = new mp.Form();
    form.parse(req, function(err, fields, files){
      vacation.uploadPhotos(files, function(){
        res.redirect('/vacations/' + req.params.id);
      });
    });
  });
};

