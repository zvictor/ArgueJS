define(function() {
  function belongs(value, type) {
    var result = false;

    if(type === undefined)
      result = true;    
    else if (type == Function && typeof (/./) !== 'function') // Optimize `isFunction` if appropriate.
      result = typeof value === 'function';
    else if (type == Boolean)
      result = value === true || value === false || toString.call(value) == '[object Boolean]';
    else if (type == Array)
      result = Array.isArray(value) || toString.call(value) == '[object Array]';
    else if (['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp',   'Object'].indexOf( type.name ) != -1)
      result = toString.call(value) == '[object ' + type.name + ']';

    return result;
  }

  var __ = function(params) {
    var arguments = arguments.callee.caller.arguments;
    var result = {};
    var count = 0;
    
    for (var prop in params) {
      var value = arguments[count];
      var definition = params[prop];
      var optional = Array.isArray(definition) || toString.call(definition) == '[object Array]';
      
      definition = (optional) ? definition[0] : definition;

      if (belongs(value, definition))
        count++;
      else if (!optional)
        throw Error("parameter '" + prop + "' waiting for a " + definition.name + " argument but received a " + typeof value);
        
      result[prop] = value;
    }

    console.log("result:");
    console.log(result);

    if (count < arguments.length)
      throw new Error("Too many arguments.");

    return result;
  };

  __.prototype.doc = function() {
    return 123123;
  };

  return __;

});
