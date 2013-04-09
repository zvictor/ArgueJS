define(['argue', 'underscore'], function(__, _) {

  describe('argue', function() {
    describe('empty signature', function() {
      
      it('should return no arguments', function() {
        function upper() {
          return __();
        }
        
        upper(); //TODO:must be equal to object just with .doc()
      });


    });
    describe('excess of arguments', function() {
      
      it('should throw an Error', function() {
        function upper() {
          return __();
        }
        
        try{
        upper("value"); //TODO:must fail!
        }catch(e){}
      });


    });
  });

});
