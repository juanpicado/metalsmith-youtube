/**
 * Created by jpicado on 30/09/16.
 */

var fs = require('fs');
var path = require('path');
var youtube = require('../../lib/index');
var Metalsmith = require('metalsmith');
var chai = require('chai');
var expect = chai.expect;

describe('metalsmith-youtube', function(){
  it('append', function(done){
      new Metalsmith(path.resolve(path.resolve(__dirname, '../fixtures/basic')))
       .source(path.resolve(__dirname, '../fixtures/basic'))
       .use(youtube())
      .build(function(err) {
        if (err){
          return done(err);
        }
        var build = fs.readFileSync('test/fixtures/basic/build/youtube_1', 'utf8');
        var result = fs.readFileSync('test/fixtures/results/youtube_1', 'utf8');
        expect(build.toString()).to.be.equal(result.toString());
        done();
      });
  });
});
