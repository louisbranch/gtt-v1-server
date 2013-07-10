var assert = require('assert');
var time = require('../../lib/time');

describe('time', function(){
  var day;

  beforeEach(function(){
    day = {start: '09:00', end: '18:00', breaks: [], tasks: []};
  });

  describe('.toMinutes', function(){

    it('returns the total time worked in minutes', function(){
      assert.equal(time.toMinutes(day), 540);
    });

    it('reduces break times', function(){
      day.breaks = [{start: '10:00', end: '10:10'}, {start: '11:20', end: '11:40'}];
      assert.equal(time.toMinutes(day), 510);
    });

    it('returns a partial time when day is not over', function(){
      delete day.end;
      day.tasks = [{end: '10:10'}, {end: '10:30'}];
      assert.equal(time.toMinutes(day), 90);
    });

    it('returns no time when none was done', function(){
      delete day.end;
      assert.equal(time.toMinutes(day), 0);
    });

    it('throws error when time format is invalid', function(){
      var day = {start: '9:00'};
      assert.throws(function(){ time.toMinutes(day); });
    });

  });

  describe('.display', function(){

    it('formats minutes in hours and minutes', function(){
      assert.equal(time.display( 71), '01:11');
      assert.equal(time.display(185), '03:05');
      assert.equal(time.display(600), '10:00');
    });

  });

});
