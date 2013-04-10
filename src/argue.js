define(function() {
  var isArray = Array.isArray || function(obj){
    return toString.call(obj) == '[object Array]';
  }
  
  var toType = function(obj) {
      if (obj === global)
        // http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
        return "global";
        
      return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1];
    }
  
  function belongs(value, type) {
    var result = false;

    if(type === undefined)
      result = true;    
    else if (type == Function && typeof (/./) !== 'function') // Optimize `isFunction` if appropriate.
      result = typeof value === 'function';
    else if (type == Boolean)
      result = value === true || value === false || toType(value) == 'Boolean';
    else if (type == Array)
      result = isArray(value);
    else if (['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp',   'Object'].indexOf( type.name ) != -1)
      result = toType(value) == type.name;

    return result;
  }

  var __ = function(signature) {
    var inputs = [Array.prototype.slice.call( arguments.callee.caller.arguments )];
    var result, paramCount;
    var error;
    
    var paramSum = 0;
    for (var name in signature)
      paramSum++;
      
    var pivotIndex = -1;
    for (var name in signature) {
      pivotIndex++;
      
      var optional = isArray(signature[name]);
      if(!optional)
        continue;
        
      var reversed = inputs.slice(0).reverse();
      for(var i=0; i<reversed.length; i++){
        var args = reversed[i].slice(0);
        args.splice(pivotIndex, 0, undefined);
        inputs.unshift(args);
      }
    }
    
    var tooMany = true;
    inputs = inputs.filter(function(element, index, array) {
      tooMany = tooMany && (element.length > paramSum); //If we have some valid number of arguments, we are not with too many arguments anymore.
      return (element.length == paramSum);
    });
    
    search:
      for(var i=0; i<inputs.length; i++){
        result = {'doc':doc};
        paramCount = 0;
        var args = inputs[i];
        
        for (var name in signature) {
          var value = args[paramCount];
          var definition = signature[name];
          var optional = isArray(definition);
          
          var type = (optional) ? definition[0] : definition;
      
          if (!belongs(value, type))
            if (optional && value == void 0)
              value = definition[1];
            else{
              error = "parameter '" + name + "' waiting for a " + type.name + " argument but received a " + toType(value);
              continue search;
            }
            
          paramCount++;
          result[name] = value;
          
          if(paramCount == paramSum)
            break search;
        }
      }
      
    if(tooMany)
      throw new Error("Too many arguments");
    if (paramCount != paramSum)
      throw new Error("Incompatible type signature");

    return result;
  };

  var doc = function() {
    return 123123;
  };

  return __;

});
