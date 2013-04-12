define(['argue', 'chai'], function(__, chai) {
  chai.Assertion.includeStack = true;
  var should = chai.should();

  describe('argue', function() {
    
    describe('without signature without upperArguments', function() {
      function upper() {
        return __();
      }

      it('should throw error when called', function() {
        
        (function(){
          upper();
        }).should.throw(/^parameter 'signature' waiting for a Object argument but received a (Undefined|DOMWindow)/);

      });

    });
    describe('without signature with upperArguments', function() {
      function upper() {
        return __(arguments);
      }

      it('should throw error when called', function() {

        (function(){
          upper();
        }).should.throw("parameter 'signature' waiting for a Object argument but received a Arguments");
        
      });

    });
    describe('with signature without upperArguments', function() {
      function upper() {
        return __({});
      }

      it('should return no arguments', function() {
        
        var instance = upper();

        instance.should.be.an('object');
        instance.should.have.ownProperty('doc');
        instance.doc.should.be.a('function');
        
        delete instance.doc
        instance.should.be.empty;

      });

    });
    describe('with signature with upperArguments', function() {
      function upper() {
        return __({foo: String}, arguments);
      }

      it('should have the same behavior as without upperArguments', function() {
        function upper2() {
          return __({foo: String});
        }
        
        should.equal(upper('bar').foo, upper2('bar').foo);
        
      });

    });    
      
    
  });
});
