define(['argue', 'underscore', 'chai'], function(__, _, chai) {
  var should = chai.should();
  
  describe('argue', function() {
    
    describe('typage restriction', function() {
      
      it('should enforce String typed signature', function() {
        function upper() {
          return __({param: String});
        }
        
        //right:
        should.equal(upper("value").param, "value");
        
        //wrong:
        (function(){
          upper();
        }).should.throw(/^parameter 'param' waiting for a String argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(7);
        }).should.throw("parameter 'param' waiting for a String argument but received a Number");
        
        (function(){
          upper(true);
        }).should.throw("parameter 'param' waiting for a String argument but received a Boolean");
        
        (function(){
          upper([]);
        }).should.throw("parameter 'param' waiting for a String argument but received a Array");
        
        (function(){
          upper(function(){});
        }).should.throw("parameter 'param' waiting for a String argument but received a Function");
        
        (function(){
          upper({key:"value"});
        }).should.throw("parameter 'param' waiting for a String argument but received a Object");
        
        (function(){
          upper(new Date());
        }).should.throw("parameter 'param' waiting for a String argument but received a Date");
        
        (function(){
          upper(new RegExp());
        }).should.throw("parameter 'param' waiting for a String argument but received a ");
        
        (function(){
          upper(undefined);
        }).should.throw(/^parameter 'param' waiting for a String argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(null);
        }).should.throw(/^parameter 'param' waiting for a String argument but received a (Null|DOMWindow)/);
        
      });

      it('should enforce Number typed signature', function() {
        function upper() {
          return __({param: Number});
        }
        
        //right:
        should.equal(upper(7).param, 7);
        
        //wrong:
        (function(){
          upper();
        }).should.throw(/^parameter 'param' waiting for a Number argument but received a (Undefined|DOMWindow)/);
          
        (function(){
          upper("value");
        }).should.throw("parameter 'param' waiting for a Number argument but received a String");
        
        (function(){
          upper(true);
        }).should.throw("parameter 'param' waiting for a Number argument but received a Boolean");
        
        (function(){
          upper([]);
        }).should.throw("parameter 'param' waiting for a Number argument but received a Array");
        
        (function(){
          upper(function(){});
        }).should.throw("parameter 'param' waiting for a Number argument but received a Function");
        
        (function(){
          upper({key:"value"});
        }).should.throw("parameter 'param' waiting for a Number argument but received a Object");
        
        (function(){
          upper(new Date());
        }).should.throw("parameter 'param' waiting for a Number argument but received a Date");
        
        (function(){
          upper(new RegExp());
        }).should.throw("parameter 'param' waiting for a Number argument but received a ");
        
        (function(){
          upper(undefined);
        }).should.throw(/^parameter 'param' waiting for a Number argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(null);
        }).should.throw(/^parameter 'param' waiting for a Number argument but received a (Null|DOMWindow)/);
        
      });

      it('should enforce Boolean typed signature', function() {
        function upper() {
          return __({param: Boolean});
        }
        
        //right:
        should.equal(upper(true).param, true);
        
        //wrong:
        (function(){
          upper();
        }).should.throw(/^parameter 'param' waiting for a Boolean argument but received a (Undefined|DOMWindow)/);
          
        (function(){
          upper("value");
        }).should.throw("parameter 'param' waiting for a Boolean argument but received a String");
        
        (function(){
          upper(7);
        }).should.throw("parameter 'param' waiting for a Boolean argument but received a Number");
        
        (function(){
          upper([]);
        }).should.throw("parameter 'param' waiting for a Boolean argument but received a Array");
        
        (function(){
          upper(function(){});
        }).should.throw("parameter 'param' waiting for a Boolean argument but received a Function");
        
        (function(){
          upper({key:"value"});
        }).should.throw("parameter 'param' waiting for a Boolean argument but received a Object");
        
        (function(){
          upper(new Date());
        }).should.throw("parameter 'param' waiting for a Boolean argument but received a Date");
        
        (function(){
          upper(new RegExp());
        }).should.throw("parameter 'param' waiting for a Boolean argument but received a ");
        
        (function(){
          upper(undefined);
        }).should.throw(/^parameter 'param' waiting for a Boolean argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(null);
        }).should.throw(/^parameter 'param' waiting for a Boolean argument but received a (Null|DOMWindow)/);
        
      });

      it('should enforce Array typed signature', function() {
        function upper() {
          return __({param: Array});
        }
        
        //right:
        upper([]).param.should.eql([]);
        
        
        //wrong:
        (function(){
          upper();
        }).should.throw(/^parameter 'param' waiting for a Array argument but received a (Undefined|DOMWindow)/);
          
        (function(){
          upper("value");
        }).should.throw("parameter 'param' waiting for a Array argument but received a String");
        
        (function(){
          upper(7);
        }).should.throw("parameter 'param' waiting for a Array argument but received a Number");
        
        (function(){
          upper(true);
        }).should.throw("parameter 'param' waiting for a Array argument but received a Boolean");
        
        (function(){
          upper(function(){});
        }).should.throw("parameter 'param' waiting for a Array argument but received a Function");
        
        (function(){
          upper({key:"value"});
        }).should.throw("parameter 'param' waiting for a Array argument but received a Object");
        
        (function(){
          upper(new Date());
        }).should.throw("parameter 'param' waiting for a Array argument but received a Date");
        
        (function(){
          upper(new RegExp());
        }).should.throw("parameter 'param' waiting for a Array argument but received a ");
        
        (function(){
          upper(undefined);
        }).should.throw(/^parameter 'param' waiting for a Array argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(null);
        }).should.throw(/^parameter 'param' waiting for a Array argument but received a (Null|DOMWindow)/);
        
      });

      it('should enforce Function typed signature', function() {
        function upper() {
          return __({param: Function});
        }
        
        var fn = function(){};
        
        //right:
        should.equal(upper(fn).param, fn);
        
        //wrong:
        (function(){
          upper();
        }).should.throw(/^parameter 'param' waiting for a Function argument but received a (Undefined|DOMWindow)/);
          
        (function(){
          upper("value");
        }).should.throw("parameter 'param' waiting for a Function argument but received a String");
        
        (function(){
          upper(7);
        }).should.throw("parameter 'param' waiting for a Function argument but received a Number");
        
        (function(){
          upper(true);
        }).should.throw("parameter 'param' waiting for a Function argument but received a Boolean");
        
        (function(){
          upper([]);
        }).should.throw("parameter 'param' waiting for a Function argument but received a Array");
        
        (function(){
          upper({key:"value"});
        }).should.throw("parameter 'param' waiting for a Function argument but received a Object");
        
        (function(){
          upper(new Date());
        }).should.throw("parameter 'param' waiting for a Function argument but received a Date");
        
        (function(){
          upper(new RegExp());
        }).should.throw("parameter 'param' waiting for a Function argument but received a ");
        
        (function(){
          upper(undefined);
        }).should.throw(/^parameter 'param' waiting for a Function argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(null);
        }).should.throw(/^parameter 'param' waiting for a Function argument but received a (Null|DOMWindow)/);
        
      });

      it('should enforce Object typed signature', function() {
        function upper() {
          return __({param: Object});
        }
        
        //right:
        upper({key:"value"}).param.should.eql({key:"value"});
        
        //wrong:
        (function(){
          upper();
        }).should.throw(/^parameter 'param' waiting for a Object argument but received a (Undefined|DOMWindow)/);
          
        (function(){
          upper("value");
        }).should.throw("parameter 'param' waiting for a Object argument but received a String");
        
        (function(){
          upper(7);
        }).should.throw("parameter 'param' waiting for a Object argument but received a Number");
        
        (function(){
          upper(true);
        }).should.throw("parameter 'param' waiting for a Object argument but received a Boolean");
        
        (function(){
          upper([]);
        }).should.throw("parameter 'param' waiting for a Object argument but received a Array");
        
        (function(){
          upper(function(){});
        }).should.throw("parameter 'param' waiting for a Object argument but received a Function");
        
        (function(){
          upper(new Date());
        }).should.throw("parameter 'param' waiting for a Object argument but received a Date");
        
        (function(){
          upper(new RegExp());
        }).should.throw("parameter 'param' waiting for a Object argument but received a ");
        
        (function(){
          upper(undefined);
        }).should.throw(/^parameter 'param' waiting for a Object argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(null);
        }).should.throw(/^parameter 'param' waiting for a Object argument but received a (Null|DOMWindow)/);
        
      });

      it('should enforce Date typed signature', function() {
        function upper() {
          return __({param: Date});
        }
        var dt = new Date();
        
        //right:
        should.equal(upper(dt).param, dt);
        
        //wrong:
        (function(){
          upper();
        }).should.throw(/^parameter 'param' waiting for a Date argument but received a (Undefined|DOMWindow)/);
          
        (function(){
          upper("value");
        }).should.throw("parameter 'param' waiting for a Date argument but received a String");
        
        (function(){
          upper(7);
        }).should.throw("parameter 'param' waiting for a Date argument but received a Number");
        
        (function(){
          upper(true);
        }).should.throw("parameter 'param' waiting for a Date argument but received a Boolean");
        
        (function(){
          upper([]);
        }).should.throw("parameter 'param' waiting for a Date argument but received a Array");
        
        (function(){
          upper(function(){});
        }).should.throw("parameter 'param' waiting for a Date argument but received a Function");
        
        (function(){
          upper({key:"value"});
        }).should.throw("parameter 'param' waiting for a Date argument but received a Object");
        
        (function(){
          upper(new RegExp());
        }).should.throw("parameter 'param' waiting for a Date argument but received a ");
        
        (function(){
          upper(undefined);
        }).should.throw(/^parameter 'param' waiting for a Date argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(null);
        }).should.throw(/^parameter 'param' waiting for a Date argument but received a (Null|DOMWindow)/);
        
      });


      it('should enforce RegExp typed signature', function() {
        function upper() {
          return __({param: RegExp});
        }
        
        //right:
        upper(new RegExp()).param.should.eql( new RegExp());
        
        //wrong:
        (function(){
          upper();
        }).should.throw(/^parameter 'param' waiting for a RegExp argument but received a (Undefined|DOMWindow)/);
          
        (function(){
          upper("value");
        }).should.throw("parameter 'param' waiting for a RegExp argument but received a String");
        
        (function(){
          upper(7);
        }).should.throw("parameter 'param' waiting for a RegExp argument but received a Number");
        
        (function(){
          upper(true);
        }).should.throw("parameter 'param' waiting for a RegExp argument but received a Boolean");
        
        (function(){
          upper([]);
        }).should.throw("parameter 'param' waiting for a RegExp argument but received a Array");
        
        (function(){
          upper(function(){});
        }).should.throw("parameter 'param' waiting for a RegExp argument but received a Function");
        
        (function(){
          upper({key:"value"});
        }).should.throw("parameter 'param' waiting for a RegExp argument but received a Object");
        
        (function(){
          upper(new Date());
        }).should.throw("parameter 'param' waiting for a RegExp argument but received a Date");
        
        (function(){
          upper(undefined);
        }).should.throw(/^parameter 'param' waiting for a RegExp argument but received a (Undefined|DOMWindow)/);
        
        (function(){
          upper(null);
        }).should.throw(/^parameter 'param' waiting for a RegExp argument but received a (Null|DOMWindow)/);
        
      });


      it('should allow any argument for undefined typed param', function() {
        function upper() {
          return __({param: undefined});
        }
        
        //right [accept all!]:
        should.equal(upper().param, undefined);
        should.equal(upper("value").param, "value");
        should.equal(upper(7).param, 7);
        should.equal(upper(true).param, true);
        upper([]).param.should.eql([]);
        
        var fn = function(){};
        should.equal(upper(fn).param, fn);
        upper({key:"value"}).param.should.eql({key:"value"});
        
        var dt = new Date();
        should.equal(upper(dt).param, dt);
        upper(new RegExp()).param.should.eql( new RegExp());
        
        should.equal(upper(undefined).param, undefined);
        should.equal(upper(null).param, null);
      });


    });
  });

});
