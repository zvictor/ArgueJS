define(['argue', 'underscore'], function(__, _) {

  describe('argue', function() {
    describe('empty signature', function() {

      it('should return no arguments', function() {
        function upper() {
          return __();
        }

        upper();
        //TODO:must be equal to object just with .doc()
      });

    });
    describe('excess of arguments', function() {

      it('should throw an Error', function() {
        function upper() {
          return __();
        }

        try {
          upper("value");
          //TODO:must fail!
        } catch(e) {
        }
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
      try{
      upper(7); //TODO! better catch fails
      upper("value", 7);
      }catch(e){};
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
      try{
      upper(7); //TODO! better catch fails
      upper("value", 7);
      }catch(e){};
    });

  });

});
