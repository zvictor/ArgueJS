define(function() {
  var isArray = Array.isArray || function(obj){
    return toString.call(obj) == '[object Array]';
  }
  
  function belongs(value, type) {
    var result = false;

    if(type === undefined)
      result = true;    
    else if (type == Function && typeof (/./) !== 'function') // Optimize `isFunction` if appropriate.
      result = typeof value === 'function';
    else if (type == Boolean)
      result = value === true || value === false || toString.call(value) == '[object Boolean]';
    else if (type == Array)
      result = isArray(value);
    else if (['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp',   'Object'].indexOf( type.name ) != -1)
      result = toString.call(value) == '[object ' + type.name + ']';

    return result;
  }

  var __ = function(signature) {
    var arguments = arguments.callee.caller.arguments;
    var result = {};
    var argCount = 0;
    var paramCount = 0;
    
    for (var name in signature) {
      var value = arguments[argCount];
      var definition = signature[name];
      var optional = isArray(definition);
      
      definition = (optional) ? definition[0] : definition;

      if (belongs(value, definition))
        argCount++;
      else if (!optional)
        throw Error("parameter '" + name + "' waiting for a " + definition.name + " argument but received a " + typeof value);
      
      paramCount++;
      result[name] = value;
    }

    console.log(result);

    if (argCount < arguments.length)
      if(arguments.length > paramCount)
        throw new Error("Too many arguments");
      else
        throw new Error("Incompatible type signature");

    return result;
  };

  __.prototype.doc = function() {
    return 123123;
  };

  return __;

});
