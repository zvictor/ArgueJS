define(['argue', 'underscore', 'chai'], function(__, _, chai) {
  var should = chai.should();

  describe('argue', function() {
    describe('empty signature', function() {
      function upper() {
        return __();
      }

      it('should return no arguments', function() {
        
        var instance = upper();

        instance.should.be.an('object');
        instance.should.have.ownProperty('doc');
        instance.doc.should.be.a('function');
        
        delete instance.doc
        instance.should.be.empty;

      });

      it('should throw an Error when arguments exceed', function() {

        (function(){
          upper("value");
        }).should.throw('Too many arguments');
        
      });

    });
  });
  describe('optional arguments', function() {

    it('should accept both defined and not defined arguments', function() {
      function upper() {
        return __({
          param : [String]
        });
      }

      //right:
      var emptyCall = upper(); 
      emptyCall.should.have.ownProperty('param')
      should.not.exist(emptyCall.param);
      
      var stringCall = upper("value"); 
      should.equal(stringCall.param, "value");

      //wrong:
      (function(){
        upper(7);
      }).should.throw('Incompatible type signature');

      (function(){
        upper("value", 7);
      }).should.throw('Too many arguments');
    });

    it('should not worry about not set optional arguments', function() {
      function upper() {
        return __({
          first : Number,
          second : [String],
          third : [String],
          fourth : [String],
          fifth : [String],
          sixth : [String]
        });
      }

      //right:
      var numberAlone = upper(7);
      numberAlone.first.should.be.equal(7)
      numberAlone.should
        .have.ownProperty('second')
        .have.ownProperty('third')
        .have.ownProperty('fourth')
        .have.ownProperty('fifth')
        .have.ownProperty('sixth');
      should.not.exist(numberAlone.second);
      should.not.exist(numberAlone.third);
      should.not.exist(numberAlone.fourth);
      should.not.exist(numberAlone.fifth);
      should.not.exist(numberAlone.sixth);
      
      var numberStrings = upper(7, "value", "value", "value", "value", "value");
      numberStrings.first.should.be.equal(7);
      numberStrings.second.should.be.equal("value");
      numberStrings.third.should.be.equal("value");
      numberStrings.fourth.should.be.equal("value");
      numberStrings.fifth.should.be.equal("value");
      numberStrings.sixth.should.be.equal("value");
      
      //wrong:
      (function(){
        upper("value", 7);
      }).should.throw("parameter 'first' waiting for a Number argument but received a String");
    });

  });

});
