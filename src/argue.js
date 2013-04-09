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
    var arguments = arguments.callee.caller.arguments;
    var result = {'doc':doc};
    var argCount = 0;
    var paramCount = 0;
    
    for (var name in signature) {
      var value = arguments[argCount];
      var definition = signature[name];
      var optional = isArray(definition);
      
      definition = (optional) ? definition[0] : definition;

      if (belongs(value, definition))
        argCount++;
      else
        if (optional)
          value = signature[name][1];
        else
          throw Error("parameter '" + name + "' waiting for a " + definition.name + " argument but received a " + toType(value));
      
      paramCount++;
      result[name] = value;
    }

    if (argCount < arguments.length)
      if(arguments.length > paramCount)
        throw new Error("Too many arguments");
      else
        throw new Error("Incompatible type signature");

    return result;
  };

  var doc = function() {
    return 123123;
  };

  return __;

});
