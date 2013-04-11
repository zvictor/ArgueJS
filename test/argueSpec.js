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
});
