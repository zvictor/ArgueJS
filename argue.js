!function (name, context, definition) {
  // Export ArgueJS as module, or __ as global, if not using module loaders.
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
    // Util function to check if an object is actually an Array.
    return toString.call(obj) == '[object Array]';
  }
  
  var toType = function(obj) {
    // Util function that gives us the String representation of the type of the given object.
    
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
    // Util function that determines if a given instance belongs to the given type class.
    // code highly inpired on UnderscoreJS.
        
    var result = false;

    if(type === undefined)
      // In our library, the 'undefined type' represents ANY type, so any value is accepted for this type.
      result = true;
    else if (type == Function && typeof (/./) !== 'function' /* Hack needed, as seen on UnderscoreJS' isFunction. Reasons unknown. */)
      result = typeof value === 'function';
    else if (type == Boolean)
      result = value === true || value === false || toType(value) == 'Boolean';
    else if (type == Array)
      result = isArray(value);
    else if (['Arguments'].indexOf( type ) != -1)
      result = toType(value) == type;
    else if (['Function', 'String', 'Number', 'Date', 'RegExp',   'Object'].indexOf( type.name ) != -1)
      result = toType(value) == type.name;

    return result;
  }

  var __ = function(signature, upperArguments) {
    // The ArgueJS constructor method.
    var input;
    
    if (!belongs(signature, Object))
      // If 'signature' is not defined or is not an object, goes away.
      throw new Error("parameter 'signature' waiting for Object argument but received " + toType(signature));
      
    if (upperArguments !== undefined && !belongs(upperArguments, Array) && !belongs(upperArguments, 'Arguments'))
      // If 'upperArguments' is defined it must be a valid arguments list
      throw new Error("parameter 'upperArguments' waiting for Array or Arguments argument but received " + toType(upperArguments));
    
    try{
      // Assumes upperArguments as the passed arguments or try to infer from the caller function.
      input = upperArguments || arguments.callee.caller.arguments;
    } catch(e){
      throw new Error('It is not possible to infer arguments in strict mode. See http://github.com/zvictor/ArgueJs#propagating-arguments for alternatives.');
    }
    
    // Makes a copy of the input, transforming Arguments (if is the case) into Array.
    input = Array.prototype.slice.call( input );
    
    var paramSum = 0;
    for (var name in signature)
      // We just count how many parameters we have to evaluate...
      paramSum++;
    
    if(input.length > paramSum)
      // Ops, someone really likes to talk here!
      throw new Error("Too many arguments");
      
    // As we can have optional arguments,
    //   there are many ways to consider the same call to a function.
    // A call (1, 3) to range([Number], Number, [Number])
    //   could be validated as (1, 3), (1, 3, undefined) or (undefined, 1, 3).
    // In order to determine which one has the best fit to the given signature,
    //   we need to generate all of them.
    var expansion = [input];
    // Here we start to expand the passed arguments.
    // We start with just the given input...

    var pivotIndex = -1;
    for (var name in signature) {
      // ... and for each parameter...
      pivotIndex++;
      var optional = isArray(signature[name]);
      var type = (optional) ? signature[name][0] : signature[name];
        
      var copy = expansion.slice(0);
      // (we make a copy here to avoid infinity loop)
      for(var i=0; i<copy.length; i++){
        var args = copy[i];
        var value = args[pivotIndex];
        // ... we evaluate the respective argument value of each possible argument list.
        
        if (!belongs(value, type)){
          // If the argument value does not pass through the type checking,
          //   the argument list is not valid for the given signature...
          // ... and we delete the current argument list, entirely!
          // Note that it happens even if the parameter is optional.
          expansion.splice( expansion.indexOf(args), 1);
          if(!optional && !expansion.length)
            // If no more arguments list remains, the input is not compatible. Cheeky arguments, go play with the kids!
            throw new Error("parameter '" + name + "' waiting for " + (type.name || type) + " argument but received " + toType(value));
        }
        
        args = copy[i].slice(0);
        args.splice(pivotIndex, 0, undefined);
        if(optional && args.length <= paramSum)
          // In case the parameter is opcional,
          //   it means that the same argument list we are iterating now
          //   would also be valid if we added a "undefined" value at this position,
          //   passing the current value to the next parameter.
          expansion.push(args);
      }
    }
    
    if(!expansion.length)
      // This Error happens when all the required parameters are satisfied,
      //   but is not possible to satisfy the type checking of any of the optional parameters.
      throw new Error("Incompatible type signature");
      
    // Now that we finished the expansion,
    //   which of the arguments list are we supposed to choose?
    input = expansion[expansion.length-1];
    // This way we are putting the required arguments in the leftmost valid side 
    
    var result = {'doc':doc};
    // Reference for the API doc generator.
    
    var paramIndex = 0;
    // Now, whith the input extended,
    //   is time to pass through the arguments and parameters againg...
    for (var name in signature) {
      var value = input[paramIndex];
      var definition = signature[name];
      var optional = isArray(definition);
      
      var type = (optional) ? definition[0] : definition;
  
      if (optional && !belongs(value, type))
        // ... replacing undefined optional values by their default values...
        value = definition[1];
        
      paramIndex++;
      // and generating the final object.
      result[name] = value;
    }
      
    return result;
  };

  var doc = function() {
    // Coming soon. Here you will be able to generate JSDoc, JavaDoc, etc, for your functions.
    throw Error('Not implemented yet');
  };

  return __;

});
