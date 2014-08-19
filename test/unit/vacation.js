/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Vacation   = require('../../app/models/vacations'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'vacation-test';

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new vacation object', function(){
      var o = {name: 'Thailand', start:'01/02/2003', end:'02/04/2005', lat:40, lng:42};
      var v = new Vacation(o);
      expect(v).to.be.instanceof(Vacation);
      console.log(v.start);
    });
  });

  describe('.all', function(){
    it('should get all vacations', function(done){
      Vacation.all(function(err, vacations){
        expect(vacations).to.have.length(2);
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a new vacation object', function(done){
      Vacation.create({name: 'Thailand', start:'01/01/2001', end:'01/02/2002', lat:40, lng:42}, function(err, vacation){
        expect(vacation).to.be.instanceof(Vacation);
        expect(vacation.name).to.equal('Thailand');
        done();
      });
    });
  });
});

