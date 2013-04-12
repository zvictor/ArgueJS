!function (name, context, definition) {
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    module.exports = definition();
  } else if (typeof define === 'function' && typeof define.amd  === 'object') {
    define(function () {
      return definition();
    });
  } else {
    context[name] = definition();
  }
}('__', this, function () {
  
  var isArray = Array.isArray || function(obj){
    return toString.call(obj) == '[object Array]';
  }
  
  var toType = function(obj) {
    // Functions created with the Function constructor don't inherit the strictness of the caller,
    // they are strict only if they start their body with the 'use strict' directive, otherwise they are non-strict.
    // See more at http://stackoverflow.com/questions/3277182/599991/how-to-get-the-global-object-in-javascript
    if (obj === Function('return this')())
      // Host objects are browser-created objects that are not specified by the ES5 standard.
      // All DOM elements and global functions are host objects.
      
      // ES5 declines to specify a return value for typeof when applied to host objects,
      // neither does it suggest a value for the [[Class]] property of host objects.
      // The upshot is that cross-browser type-checking of host objects is generally not reliable.
      // See more at http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/ 
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

  var __ = function(signature, upperArguments) {
    var input;
    
    if (!belongs(signature, Object))
      throw new Error("parameter 'signature' waiting for a Object argument but received a " + toType(signature));
    
    try{
      input = upperArguments || arguments.callee.caller.arguments;
    } catch(e){
      throw new Error('It is not possible to infer arguments in strict mode. See http://github.com/zvictor/ArgueJs#propagating-arguments for alternatives.');
    }
    
    input = Array.prototype.slice.call(input);
    
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
    throw Error('Not implemented yet');
  };

  return __;

});
