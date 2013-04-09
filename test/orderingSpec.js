define(['argue', 'underscore', 'chai'], function(__, _, chai) {
  chai.should();
  
  describe('argue', function() {
    describe('empty signature', function() {
      function upper() {
        return __();
      }

      it('should return no arguments', function() {
        
        upper();
        //TODO:must be equal to object just with .doc()
        
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
      upper();
      upper("value");

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
      upper(7);
      upper(7, "value");
      upper(7, "value", "value", "value", "value", "value");

      //wrong:
      (function(){
        upper("value", 7);
      }).should.throw("parameter 'first' waiting for a Number argument but received a string");
    });

  });

});
