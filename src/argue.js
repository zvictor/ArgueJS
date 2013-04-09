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

  var __ = function(description) {
    var args = arguments.callee.caller.arguments;
    console.log("description:");
    console.log(description);
    console.log("arguments:");
    console.log(arguments);
    console.log("caller.arguments:");
    console.log(args);

    var result = {};
    var count = 0;
    for (var prop in description) {
      var value = arguments.callee.caller.arguments[count];
      var definition = description[prop];

      if (!belongs(value, definition)) {
        //TODO: se for arg opcional, passa, se nao, lanca erro.
        throw Error("parameter '" + prop + "' waiting for a " + definition.name + " argument but received a " + typeof value);
      }
      result[prop] = value;
      count++;
    }

    console.log("result:");
    console.log(result);

    if (count < args.length)
      throw new Error("Too many arguments.");

    return result;
  };

  __.prototype.doc = function() {
    return 123123;
  };

  return __;

});
