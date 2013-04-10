define(function() {
  var isArray = Array.isArray || function(obj){
    return toString.call(obj) == '[object Array]';
  }
  
  var toType = function(obj) {
      if (obj === window)
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
    var input = Array.prototype.slice.call( arguments.callee.caller.arguments );
    
    var paramSum = 0;
    for (var name in signature)
      paramSum++;
    
    if(input.length > paramSum)
      throw new Error("Too many arguments");
      
    var expansion = [input];
      
    var pivotIndex = -1;
    for (var name in signature) {
      pivotIndex++;
      var optional = isArray(signature[name]);
      var type = (optional) ? signature[name][0] : signature[name];
        
      var copy = expansion.slice(0);
      for(var i=0; i<copy.length; i++){
        var args = copy[i].slice(0);
        var value = args[pivotIndex];
        
        if (!belongs(value, type)){
          expansion.splice(i, 1); 
          if(!optional && !expansion.length)
            throw new Error("parameter '" + name + "' waiting for a " + type.name + " argument but received a " + toType(value));
        }
        
        args.splice(pivotIndex, 0, undefined);
        if(optional && args.length <= paramSum)
          expansion.push(args);
      }
    }
    
    if(!expansion.length)
      throw new Error("Incompatible type signature");
      
    input = expansion[expansion.length-1];
    
    var result = {'doc':doc};
    var paramIndex = 0;
    for (var name in signature) {
      var value = input[paramIndex];
      var definition = signature[name];
      var optional = isArray(definition);
      
      var type = (optional) ? definition[0] : definition;
  
      if (optional && !belongs(value, type))
        value = definition[1];
        
      paramIndex++;
      result[name] = value;
    }
      
    return result;
  };

  var doc = function() {
    return 123123;
  };

  return __;

});
