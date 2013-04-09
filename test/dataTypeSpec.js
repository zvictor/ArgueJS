define(['argue', 'underscore'], function(__, _) {

  describe('argue', function() {
    
    describe('typage restriction', function() {
      function fn(arg1, arg2){
        alert(2); 
      };
      
      it('should enforce String typed signature', function() {
        function upper() {
          __({param: String});
        }
        
        //right:
        upper("value");
        
        //wrong:
        try{//TODO:better catch
        //TODO:ensure that every other values fails
        }catch(e){}
      });

      it('should enforce Number typed signature', function() {
        function upper() {
          __({param: Number});
        }
        
        //right:
        upper(7);
        
        //wrong:
        try{//TODO:better catch
        //TODO:ensure that every other values fails
        }catch(e){}
      });

      it('should enforce Boolean typed signature', function() {
        function upper() {
          __({param: Boolean});
        }
        
        //right:
        upper(true);
        
        //wrong:
        try{//TODO:better catch
        //TODO:ensure that every other values fails
        }catch(e){}
      });

      it('should enforce Array typed signature', function() {
        function upper() {
          __({param: Array});
        }
        
        //right:
        upper([]);
        
        //wrong:
        try{//TODO:better catch
        //TODO:ensure that every other values fails
        }catch(e){}
      });

      it('should enforce Function typed signature', function() {
        function upper() {
          __({param: Function});
        }
        
        //right:
        upper(fn);
        
        //wrong:
        try{//TODO:better catch
        //TODO:ensure that every other values fails
        }catch(e){}
      });

      it('should enforce Object typed signature', function() {
        function upper() {
          __({param: Object});
        }
        
        //right:
        upper({key:"value"});
        
        //wrong:
        try{//TODO:better catch
        //TODO:ensure that every other values fails
        }catch(e){}
      });

      it('should enforce Date typed signature', function() {
        function upper() {
          __({param: Date});
        }
        
        //right:
        upper(new Date());
        
        //wrong:
        try{//TODO:better catch
        //TODO:ensure that every other values fails
        }catch(e){}
      });


      it('should enforce Date typed signature', function() {
        function upper() {
          __({param: RegExp});
        }
        
        //right:
        upper(new RegExp());
        
        //wrong:
        try{//TODO:better catch
        //TODO:ensure that every other values fails
        }catch(e){}
      });


      it('should allow any argument for undefined typed param', function() {
        function upper() {
          __({param: undefined});
        }
        
        //right:
        upper();
        upper("value");
        upper(7);
        upper(true);
        upper([]);
        upper(function(){});
        upper({key:"value"});
        upper(new Date());
        upper(new RegExp());
        upper(undefined);
        upper(null);
      });


    });
  });

});
