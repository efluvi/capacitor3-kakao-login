/*!
 * Kakao SDK for JavaScript - v2.2.0
 *
 * Copyright 2017 Kakao Corp.
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 * OSS Notice | KakaoSDK-JavaScript
 *
 * This application is Copyright © Kakao Corp. All rights reserved.
 * The following sets forth attribution notices for third party software that may be contained in this application.
 * If you have any questions about these notices, please email us at opensource@kakaocorp.com
 *
 *
 * crypto-js
 *
 * https://github.com/brix/crypto-js
 *
 * Copyright 2009-2013 Jeff Mott
 * Copyright 2013-2016 Evan Vosberg
 *
 * MIT License
 *
 *
 * ES6-Promise
 *
 * https://github.com/stefanpenner/es6-promise
 *
 * Copyright 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 *
 * MIT License
 *
 *
 * Kakao Web2App Library
 *
 * https://github.com/kakao/web2app
 *
 * Copyright 2015 Kakao Corp. http://www.kakaocorp.com
 *
 * MIT License
 *
 *
 * lodash
 *
 * https://github.com/lodash/lodash
 *
 * Copyright JS Foundation and other contributors
 *
 * MIT License
 *
 *
 * ua_parser
 *
 * https://github.com/html5crew/ua_parser
 *
 * Copyright HTML5 Tech. Team in Daum Communications Corp.
 *
 * MIT License
 *
 *
 * ``````````
 * MIT License
 *
 * Copyright (c)
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * 'Software'), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ``````````
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Kakao = global.Kakao || {}));
})(this, (function (exports) { 'use strict';

  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
  var freeGlobal$1 = freeGlobal;

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  var root = freeGlobal$1 || freeSelf || Function('return this')();
  var root$1 = root;

  var Symbol$1 = root$1.Symbol;
  var Symbol$2 = Symbol$1;

  var objectProto$9 = Object.prototype;
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$9.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$7.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = undefined;
      var unmasked = true;
    } catch (e) {}
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }

  var objectProto$8 = Object.prototype;
  var nativeObjectToString = objectProto$8.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }

  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var symbolTag = '[object Symbol]';
  function isSymbol(value) {
    return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }

  var isArray = Array.isArray;
  var isArray$1 = isArray;

  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }

  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '') : string;
  }

  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? other + '' : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }

  var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = value < 0 ? -1 : 1;
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  function toInteger(value) {
    var result = toFinite(value),
      remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
  }

  function identity(value) {
    return value;
  }

  var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var coreJsData = root$1['__core-js_shared__'];
  var coreJsData$1 = coreJsData;

  var maskSrcKey = function () {
    var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }

  var funcProto$2 = Function.prototype;
  var funcToString$2 = funcProto$2.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$2.call(func);
      } catch (e) {}
      try {
        return func + '';
      } catch (e) {}
    }
    return '';
  }

  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto$1 = Function.prototype,
    objectProto$7 = Object.prototype;
  var funcToString$1 = funcProto$1.toString;
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString$1.call(hasOwnProperty$6).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  var HOT_COUNT = 800,
    HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0,
      lastCalled = 0;
    return function () {
      var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  function constant(value) {
    return function () {
      return value;
    };
  }

  var defineProperty = function () {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }();
  var defineProperty$1 = defineProperty;

  var baseSetToString = !defineProperty$1 ? identity : function (func, string) {
    return defineProperty$1(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };
  var baseSetToString$1 = baseSetToString;

  var setToString = shortOut(baseSetToString$1);
  var setToString$1 = setToString;

  function arrayEach(array, iteratee) {
    var index = -1,
      length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var MAX_SAFE_INTEGER$1 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER$1 : length;
    return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
  }

  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }

  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax(start === undefined ? func.length - 1 : start, 0);
    return function () {
      var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);
      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }

  function baseRest(func, start) {
    return setToString$1(overRest(func, start, identity), func + '');
  }

  var MAX_SAFE_INTEGER = 9007199254740991;
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }

  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
      return eq(object[index], value);
    }
    return false;
  }

  var objectProto$6 = Object.prototype;
  function isPrototype(value) {
    var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto$6;
    return value === proto;
  }

  function baseTimes(n, iteratee) {
    var index = -1,
      result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var argsTag$1 = '[object Arguments]';
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag$1;
  }

  var objectProto$5 = Object.prototype;
  var hasOwnProperty$5 = objectProto$5.hasOwnProperty;
  var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;
  var isArguments = baseIsArguments(function () {
    return arguments;
  }()) ? baseIsArguments : function (value) {
    return isObjectLike(value) && hasOwnProperty$5.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  };
  var isArguments$1 = isArguments;

  function stubFalse() {
    return false;
  }

  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var Buffer = moduleExports$1 ? root$1.Buffer : undefined;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
  var isBuffer = nativeIsBuffer || stubFalse;
  var isBuffer$1 = isBuffer;

  var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag$1 = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag = '[object WeakMap]';
  var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag] = false;
  function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  function baseUnary(func) {
    return function (value) {
      return func(value);
    };
  }

  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal$1.process;
  var nodeUtil = function () {
    try {
      var types = freeModule && freeModule.require && freeModule.require('util').types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }();
  var nodeUtil$1 = nodeUtil;

  var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
  var isTypedArray$1 = isTypedArray;

  var objectProto$4 = Object.prototype;
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray$1(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && (
      key == 'length' ||
      isBuff && (key == 'offset' || key == 'parent') ||
      isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') ||
      isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }

  function overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }

  var nativeKeys = overArg(Object.keys, Object);
  var nativeKeys$1 = nativeKeys;

  var objectProto$3 = Object.prototype;
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys$1(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  function keys$1(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var objectProto$2 = Object.prototype;
  var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
  function baseKeysIn(object) {
    if (!isObject(object)) {
      return nativeKeysIn(object);
    }
    var isProto = isPrototype(object),
      result = [];
    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$2.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  function keysIn(object) {
    return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
  }

  var getPrototype = overArg(Object.getPrototypeOf, Object);
  var getPrototype$1 = getPrototype;

  var objectTag = '[object Object]';
  var funcProto = Function.prototype,
    objectProto$1 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
  var objectCtorString = funcToString.call(Object);
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
      return false;
    }
    var proto = getPrototype$1(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
  }

  function createBaseFor(fromRight) {
    return function (object, iteratee, keysFunc) {
      var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  var baseFor = createBaseFor();
  var baseFor$1 = baseFor;

  function baseForOwn(object, iteratee) {
    return object && baseFor$1(object, iteratee, keys$1);
  }

  function createBaseEach(eachFunc, fromRight) {
    return function (collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);
      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }

  var baseEach = createBaseEach(baseForOwn);
  var baseEach$1 = baseEach;

  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var defaults = baseRest(function (object, sources) {
    object = Object(object);
    var index = -1;
    var length = sources.length;
    var guard = length > 2 ? sources[2] : undefined;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      var props = keysIn(source);
      var propsIndex = -1;
      var propsLength = props.length;
      while (++propsIndex < propsLength) {
        var key = props[propsIndex];
        var value = object[key];
        if (value === undefined || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
          object[key] = source[key];
        }
      }
    }
    return object;
  });
  var defaults$1 = defaults;

  function castFunction(value) {
    return typeof value == 'function' ? value : identity;
  }

  function forEach(collection, iteratee) {
    var func = isArray$1(collection) ? arrayEach : baseEach$1;
    return func(collection, castFunction(iteratee));
  }

  var stringTag = '[object String]';
  function isString(value) {
    return typeof value == 'string' || !isArray$1(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
  }

  var boolTag = '[object Boolean]';
  function isBoolean(value) {
    return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
  }

  function isElement(value) {
    return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
  }

  function isInteger(value) {
    return typeof value == 'number' && value == toInteger(value);
  }

  var numberTag = '[object Number]';
  function isNumber(value) {
    return typeof value == 'number' || isObjectLike(value) && baseGetTag(value) == numberTag;
  }

  function checkObjType(type) {
    return function (e) {
      return Object.prototype.toString.call(e) === "[object ".concat(type, "]");
    };
  }
  function isBlob(b) {
    return checkObjType('Blob')(b);
  }
  function isFile(f) {
    return checkObjType('File')(f);
  }
  function isFileList(fl) {
    return checkObjType('FileList')(fl);
  }
  function isURL(u) {
    var urlRegex = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
    return urlRegex.test(u);
  }
  function isJSONString(s) {
    try {
      JSON.parse(s);
    } catch (e) {
      return false;
    }
    return true;
  }
  function map(arr, fn) {
    return Array.prototype.slice.call(arr).map(fn);
  }
  function every(arr, fn) {
    return Array.prototype.slice.call(arr).every(fn);
  }
  function difference(a0, a1) {
    var arrays = [a0, a1];
    return arrays.reduce(function (a, b) {
      return a.filter(function (c) {
        return b.indexOf(c) === -1;
      });
    });
  }
  function keys(e) {
    return Object.keys(e || {});
  }
  function emptyFunc() {
  }
  function getElement(e) {
    if (isElement(e)) {
      return e;
    } else if (isString(e)) {
      return document.querySelector(e);
    } else {
      return null;
    }
  }
  function addEvent(target, type, callback) {
    if (target.addEventListener) {
      target.addEventListener(type, callback, false);
    }
  }
  function removeEvent(target, type, callback) {
    if (target.removeEventListener) {
      target.removeEventListener(type, callback, false);
    }
  }
  function buildQueryString(params) {
    var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var esc = encode ? encodeURIComponent : function (e) {
      return e;
    };
    return map(keys(params), function (k) {
      var v = params[k];
      return esc(k) + '=' + esc(isObjectLike(v) ? JSON.stringify(v) : v);
    }).join('&');
  }
  function isOneOf(elements) {
    if (!isArray$1(elements)) {
      throw new Error('elements should be an Array');
    }
    return function (e) {
      return elements.indexOf(e) > -1;
    };
  }
  function passesOneOf(validators) {
    if (!isArray$1(validators)) {
      throw new Error('validators should be an Array');
    }
    return function (e) {
      return validators.some(function (v) {
        return v(e);
      });
    };
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }
  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }
  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }
  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
        result;
      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return _possibleConstructorReturn(this, result);
    };
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var ua_parser = function () {
    if (!Array.isArray) {
      Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };
    }
    function checkUserAgent(ua) {
      var browser = {};
      var match = /(dolfin)[ \/]([\w.]+)/.exec(ua) || /(edge)[ \/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(tizen)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(webkit)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || ["", "unknown"];
      if (match[1] === "webkit") {
        match = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(ua) || /(android)[ \/]([\w._\-]+);/.exec(ua) || [match[0], "safari", match[2]];
      } else if (match[1] === "mozilla") {
        if (/trident/.test(ua)) {
          match[1] = "msie";
        } else {
          match[1] = "firefox";
        }
      } else if (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(ua)) {
        match[1] = "polaris";
      }
      browser[match[1]] = true;
      browser.name = match[1];
      browser.version = setVersion(match[2]);
      return browser;
    }
    function setVersion(versionString) {
      var version = {};
      var versions = versionString ? versionString.split(/\.|-|_/) : ["0", "0", "0"];
      version.info = versions.join(".");
      version.major = versions[0] || "0";
      version.minor = versions[1] || "0";
      version.patch = versions[2] || "0";
      return version;
    }
    function checkPlatform(ua) {
      if (isTablet(ua)) {
        return "tablet";
      } else if (isPc(ua)) {
        return "pc";
      } else if (isMobile(ua)) {
        return "mobile";
      } else {
        return "";
      }
    }
    function isPc(ua) {
      if (ua.match(/linux|windows (nt|98)|macintosh|cros/) && !ua.match(/android|mobile|polaris|lgtelecom|uzard|natebrowser|ktf;|skt;/)) {
        return true;
      }
      return false;
    }
    function isTablet(ua) {
      if (ua.match(/ipad/) || ua.match(/android/) && !ua.match(/mobi|mini|fennec/) || ua.match(/macintosh/) && window.navigator.maxTouchPoints > 1) {
        return true;
      }
      return false;
    }
    function isMobile(ua) {
      if (!!ua.match(/ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|tizen.+mobile|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/)) {
        return true;
      } else {
        return false;
      }
    }
    function checkOs(ua) {
      var os = {},
        match = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(ua) || (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(ua) ? ["", "polaris", "0.0.0"] : false) || /(windows)(?: nt | phone(?: os){0,1} | )([\w._\-]+)/.exec(ua) || /(android)[ \/]([\w._\-]+);/.exec(ua) || (/android/.test(ua) ? ["", "android", "0.0.0"] : false) || (/(windows)/.test(ua) ? ["", "windows", "0.0.0"] : false) || /(mac) os x ([\w._\-]+)/.exec(ua) || /(tizen)[ \/]([\w._\-]+);/.exec(ua) || (/(linux)/.test(ua) ? ["", "linux", "0.0.0"] : false) || (/webos/.test(ua) ? ["", "webos", "0.0.0"] : false) || /(cros)(?:\s[\w]+\s)([\d._\-]+)/.exec(ua) || /(bada)[ \/]([\w._\-]+)/.exec(ua) || (/bada/.test(ua) ? ["", "bada", "0.0.0"] : false) || (/(rim|blackberry|bb10)/.test(ua) ? ["", "blackberry", "0.0.0"] : false) || ["", "unknown", "0.0.0"];
      if (match[1] === "iphone" || match[1] === "ipad" || match[1] === "ipod") {
        match[1] = "ios";
      } else if (match[1] === "windows" && match[2] === "98") {
        match[2] = "0.98.0";
      }
      if (match[1] === "mac" && typeof window !== 'undefined' && window.navigator.maxTouchPoints > 1) {
        match[1] = "ios";
      }
      if (match[1] === 'cros') {
        match[1] = "chrome";
      }
      os[match[1]] = true;
      os.name = match[1];
      os.version = setVersion(match[2]);
      return os;
    }
    var baseAppList = ['crios', 'fxios', 'daumapps'];
    function checkApp(ua, customAppList) {
      var app = {},
        match = null,
        checkAppList = baseAppList;
      if (Array.isArray(customAppList)) {
        checkAppList = baseAppList.concat(customAppList);
      } else if (typeof customAppList === 'string') {
        checkAppList = baseAppList.concat([customAppList]);
      }
      for (var i = 0, len = checkAppList.length; i < len; i += 1) {
        var appname = checkAppList[i];
        var regex = new RegExp('(' + appname + ')[ \\/]([\\w._\\-]+)');
        match = regex.exec(ua);
        if (match) {
          break;
        }
      }
      if (!match) {
        match = ["", ""];
      }
      if (match[1]) {
        app.isApp = true;
        app.name = match[1];
        app.version = setVersion(match[2]);
      } else {
        app.isApp = false;
      }
      return app;
    }
    function getLowerUserAgent(ua) {
      var lowerUa = '';
      if (!ua) {
        if (typeof window !== 'undefined' && window.navigator && typeof window.navigator.userAgent === 'string') {
          lowerUa = window.navigator.userAgent.toLowerCase();
        } else {
          lowerUa = '';
        }
      } else {
        lowerUa = ua.toLowerCase();
      }
      return lowerUa;
    }
    var userAgent = function userAgent(ua, customAppList) {
      var lowerUa = getLowerUserAgent(ua);
      return {
        ua: lowerUa,
        browser: checkUserAgent(lowerUa),
        platform: checkPlatform(lowerUa),
        os: checkOs(lowerUa),
        app: checkApp(lowerUa, customAppList)
      };
    };
    return userAgent;
  }();
  var ua_parser$1 = getDefaultExportFromCjs(ua_parser);

  var UA$1 = ua_parser$1();
  function getOrigin() {
    var _location = location,
      protocol = _location.protocol,
      hostname = _location.hostname,
      port = _location.port;
    return "".concat(protocol, "//").concat(hostname).concat(port ? ':' + port : '');
  }
  function getNavigator() {
    return navigator;
  }
  function getUA() {
    return UA$1;
  }

  var ACCOUNT = "https://accounts.kakao.com";
  var AUTH = "https://kauth.kakao.com";
  var API$2 = "https://kapi.kakao.com";
  var SHARER_DOMAIN = "https://sharer.kakao.com";
  var PICKER_DOMAIN = "https://friend-picker.kakao.com";
  var APPS_DOMAIN = "https://apps.kakao.com";
  var CHANNEL = "https://pf.kakao.com";
  var STORY = "https://story.kakao.com";
  var STORY_POST_SCHEME = "storylink://posting";
  var REDIRECT_URI = "JS-SDK";
  var UNIVERSAL_LINK = "https://talk-apps.kakao.com";
  var TALK_INAPP_SCHEME = "kakaotalk://inappbrowser";
  var TALK_SYNCPLUGIN_SCHEME = "kakaotalk://bizplugin?plugin_id=6011263b74fc2b49c73a7298";
  var TALK_LINK_SCHEME = "kakaolink://send";
  var TALK_ANDROID_PACKAGE = "com.kakao.talk";
  var NAVI_SCHEME = "kakaonavi-sdk://navigate";
  var NAVI_FALLBACK_URL = "https://kakaonavi.kakao.com/launch/index.do";
  var DEVELOPERS = "https://developers.kakao.com";

  var origin = getOrigin();
  var UA = getUA();
  var isTalkWebview = /KAKAOTALK/i.test(UA.ua);
  var VERSION = "2.2.0".concat('');
  var navigator$1 = getNavigator();
  var KAKAO_AGENT = ["sdk/".concat(VERSION), 'os/javascript', 'sdk_type/javascript', "lang/".concat(navigator$1.userLanguage || navigator$1.language), "device/".concat(navigator$1.platform.replace(/ /g, '_')), "origin/".concat(encodeURIComponent(origin))].join(' ');
  var URL = {
    apiDomain: API$2,
    accountDomain: ACCOUNT,
    authDomain: AUTH,
    authorize: "".concat(AUTH, "/oauth/authorize"),
    redirectUri: REDIRECT_URI,
    universalKakaoLink: "".concat(UNIVERSAL_LINK, "/scheme/"),
    talkInappScheme: TALK_INAPP_SCHEME,
    talkSyncpluginScheme: TALK_SYNCPLUGIN_SCHEME,
    sharerDomain: SHARER_DOMAIN,
    pickerDomain: PICKER_DOMAIN,
    appsDomain: APPS_DOMAIN,
    talkLinkScheme: TALK_LINK_SCHEME,
    talkAndroidPackage: TALK_ANDROID_PACKAGE,
    channel: CHANNEL,
    channelIcon: "".concat(DEVELOPERS, "/assets/img/about/logos"),
    storyShare: "".concat(STORY, "/s/share"),
    storyChannelFollow: "".concat(STORY, "/s/follow"),
    storyIcon: "".concat(DEVELOPERS, "/sdk/js/resources/story/icon_small.png"),
    storyPostScheme: STORY_POST_SCHEME,
    naviScheme: NAVI_SCHEME,
    naviFallback: NAVI_FALLBACK_URL
  };
  var appKey$1 = null;
  function getAppKey$1() {
    return appKey$1;
  }
  function setAppKey(_appKey) {
    appKey$1 = _appKey;
  }
  function KakaoError(message) {
    Error.prototype.constructor.apply(this, arguments);
    this.name = 'KakaoError';
    this.message = message;
  }
  KakaoError.prototype = new Error();
  function makeModule(subModules) {
    var merged = subModules.reduce(function (acc, methods) {
      return _objectSpread2(_objectSpread2({}, acc), methods);
    }, {});
    return _objectSpread2(_objectSpread2({}, merged), {}, {
      cleanup: function cleanup() {
        forEach(subModules, function (e) {
          return e.cleanup && e.cleanup();
        });
      }
    });
  }
  function emptyCleanups(cleanups) {
    forEach(cleanups, function (fn) {
      fn();
    });
    cleanups.length = 0;
  }
  function validate(target, validator, callerMsg) {
    if (validator(target) === false) {
      throw new KakaoError("Illegal argument for ".concat(callerMsg));
    }
  }
  function processRules() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var rules = arguments.length > 1 ? arguments[1] : undefined;
    var callerMsg = arguments.length > 2 ? arguments[2] : undefined;
    if (!isObjectLike(params)) {
      throw new Error('params should be an Object');
    }
    if (isFunction(rules.before)) {
      rules.before(params);
    }
    if (isFunction(rules.defaults)) {
      defaults$1(params, rules.defaults(params));
    } else {
      defaults$1(params, rules.defaults);
    }
    var _rules$required = rules.required,
      required = _rules$required === void 0 ? {} : _rules$required,
      _rules$optional = rules.optional,
      optional = _rules$optional === void 0 ? {} : _rules$optional;
    var missingRequiredKeys = difference(keys(required), keys(params));
    if (missingRequiredKeys.length > 0) {
      throw new KakaoError("Missing required keys: ".concat(missingRequiredKeys.join(','), " at ").concat(callerMsg));
    }
    var allowed = _objectSpread2(_objectSpread2({}, required), optional);
    var invalidKeys = difference(keys(params), keys(allowed));
    if (invalidKeys.length > 0) {
      throw new KakaoError("Invalid parameter keys: ".concat(invalidKeys.join(','), " at ").concat(callerMsg));
    }
    forEach(params, function (value, key) {
      validate(value, allowed[key], "\"".concat(key, "\" in ").concat(callerMsg));
    });
    if (isFunction(rules.after)) {
      rules.after(params);
    }
    return params;
  }
  function getCrypto() {
    return window.crypto || window.msCrypto;
  }
  function generateRandomValue(length) {
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    var cl = characters.length;
    var seeds = getCrypto().getRandomValues(new Uint8Array(length));
    return map(seeds, function (seed) {
      return characters[seed % cl];
    }).join('');
  }
  function base64url(str) {
    return window.btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
  function getInstallUrl(androidAppId, iOSAppId) {
    if (UA.os.android) {
      var referrer = JSON.stringify({
        appKey: appKey$1,
        KA: KAKAO_AGENT
      });
      return "market://details?id=".concat(androidAppId, "&referrer=").concat(referrer);
    } else if (UA.os.ios) {
      return "https://itunes.apple.com/app/id".concat(iOSAppId);
    } else {
      return location.href;
    }
  }
  var popupWindows = {};
  function windowOpen(url, name, feature) {
    var popupWindow = popupWindows[name];
    if (popupWindow && popupWindow.close && !popupWindow.closed) {
      popupWindow.close();
    }
    popupWindows[name] = window.open(url, name, feature);
    return popupWindows[name];
  }
  function getPopupFeatures() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 480;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 700;
    var sLeft = window.screenLeft ? window.screenLeft : window.screenX ? window.screenX : 0;
    var sTop = window.screenTop ? window.screenTop : window.screenY ? window.screenY : 0;
    return ["width=".concat(width), "height=".concat(height), "left=".concat(screen.width / 2 - width / 2 + sLeft), "top=".concat(screen.height / 2 - height / 2 + sTop), 'scrollbars=yes', 'resizable=1'].join(',');
  }
  function applyAttributes(settings, container$, mapper) {
    forEach(mapper, function (value, key) {
      var attr = container$.getAttribute(value);
      if (attr !== null) {
        settings[key] = attr === 'true' || attr === 'false' ? attr === 'true' : attr;
      }
    });
  }
  function submitFormWithPopup(url, params, popupName, popupFeatures) {
    var popup = UA.browser.msie ? {} : windowOpen(url, popupName, popupFeatures || getPopupFeatures());
    if (popup.focus) {
      popup.focus();
    }
    submitForm(url, params, popupName);
    return popup;
  }
  function submitForm(url, params) {
    var popupName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '_self';
    var form = document.createElement('form');
    form.setAttribute('accept-charset', 'utf-8');
    form.setAttribute('method', 'post');
    form.setAttribute('action', url);
    form.setAttribute('target', popupName);
    form.setAttribute('style', 'display:none');
    forEach(params, function (value, key) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = isString(value) ? value : JSON.stringify(value);
      form.appendChild(input);
    });
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  }

  function commonjsRequire(path) {
  	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var es6Promise = {exports: {}};

  (function (module, exports) {
    (function (global, factory) {
      module.exports = factory() ;
    })(commonjsGlobal, function () {
      function objectOrFunction(x) {
        var type = typeof x;
        return x !== null && (type === 'object' || type === 'function');
      }
      function isFunction(x) {
        return typeof x === 'function';
      }
      var _isArray = void 0;
      if (Array.isArray) {
        _isArray = Array.isArray;
      } else {
        _isArray = function (x) {
          return Object.prototype.toString.call(x) === '[object Array]';
        };
      }
      var isArray = _isArray;
      var len = 0;
      var vertxNext = void 0;
      var customSchedulerFn = void 0;
      var asap = function asap(callback, arg) {
        queue[len] = callback;
        queue[len + 1] = arg;
        len += 2;
        if (len === 2) {
          if (customSchedulerFn) {
            customSchedulerFn(flush);
          } else {
            scheduleFlush();
          }
        }
      };
      function setScheduler(scheduleFn) {
        customSchedulerFn = scheduleFn;
      }
      function setAsap(asapFn) {
        asap = asapFn;
      }
      var browserWindow = typeof window !== 'undefined' ? window : undefined;
      var browserGlobal = browserWindow || {};
      var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
      var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
      var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
      function useNextTick() {
        return function () {
          return process.nextTick(flush);
        };
      }
      function useVertxTimer() {
        if (typeof vertxNext !== 'undefined') {
          return function () {
            vertxNext(flush);
          };
        }
        return useSetTimeout();
      }
      function useMutationObserver() {
        var iterations = 0;
        var observer = new BrowserMutationObserver(flush);
        var node = document.createTextNode('');
        observer.observe(node, {
          characterData: true
        });
        return function () {
          node.data = iterations = ++iterations % 2;
        };
      }
      function useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = flush;
        return function () {
          return channel.port2.postMessage(0);
        };
      }
      function useSetTimeout() {
        var globalSetTimeout = setTimeout;
        return function () {
          return globalSetTimeout(flush, 1);
        };
      }
      var queue = new Array(1000);
      function flush() {
        for (var i = 0; i < len; i += 2) {
          var callback = queue[i];
          var arg = queue[i + 1];
          callback(arg);
          queue[i] = undefined;
          queue[i + 1] = undefined;
        }
        len = 0;
      }
      function attemptVertx() {
        try {
          var vertx = Function('return this')().require('vertx');
          vertxNext = vertx.runOnLoop || vertx.runOnContext;
          return useVertxTimer();
        } catch (e) {
          return useSetTimeout();
        }
      }
      var scheduleFlush = void 0;
      if (isNode) {
        scheduleFlush = useNextTick();
      } else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
      } else if (isWorker) {
        scheduleFlush = useMessageChannel();
      } else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
        scheduleFlush = attemptVertx();
      } else {
        scheduleFlush = useSetTimeout();
      }
      function then(onFulfillment, onRejection) {
        var parent = this;
        var child = new this.constructor(noop);
        if (child[PROMISE_ID] === undefined) {
          makePromise(child);
        }
        var _state = parent._state;
        if (_state) {
          var callback = arguments[_state - 1];
          asap(function () {
            return invokeCallback(_state, child, callback, parent._result);
          });
        } else {
          subscribe(parent, child, onFulfillment, onRejection);
        }
        return child;
      }
      function resolve$1(object) {
        var Constructor = this;
        if (object && typeof object === 'object' && object.constructor === Constructor) {
          return object;
        }
        var promise = new Constructor(noop);
        resolve(promise, object);
        return promise;
      }
      var PROMISE_ID = Math.random().toString(36).substring(2);
      function noop() {}
      var PENDING = void 0;
      var FULFILLED = 1;
      var REJECTED = 2;
      function selfFulfillment() {
        return new TypeError("You cannot resolve a promise with itself");
      }
      function cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
      }
      function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
        try {
          then$$1.call(value, fulfillmentHandler, rejectionHandler);
        } catch (e) {
          return e;
        }
      }
      function handleForeignThenable(promise, thenable, then$$1) {
        asap(function (promise) {
          var sealed = false;
          var error = tryThen(then$$1, thenable, function (value) {
            if (sealed) {
              return;
            }
            sealed = true;
            if (thenable !== value) {
              resolve(promise, value);
            } else {
              fulfill(promise, value);
            }
          }, function (reason) {
            if (sealed) {
              return;
            }
            sealed = true;
            reject(promise, reason);
          }, 'Settle: ' + (promise._label || ' unknown promise'));
          if (!sealed && error) {
            sealed = true;
            reject(promise, error);
          }
        }, promise);
      }
      function handleOwnThenable(promise, thenable) {
        if (thenable._state === FULFILLED) {
          fulfill(promise, thenable._result);
        } else if (thenable._state === REJECTED) {
          reject(promise, thenable._result);
        } else {
          subscribe(thenable, undefined, function (value) {
            return resolve(promise, value);
          }, function (reason) {
            return reject(promise, reason);
          });
        }
      }
      function handleMaybeThenable(promise, maybeThenable, then$$1) {
        if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
          handleOwnThenable(promise, maybeThenable);
        } else {
          if (then$$1 === undefined) {
            fulfill(promise, maybeThenable);
          } else if (isFunction(then$$1)) {
            handleForeignThenable(promise, maybeThenable, then$$1);
          } else {
            fulfill(promise, maybeThenable);
          }
        }
      }
      function resolve(promise, value) {
        if (promise === value) {
          reject(promise, selfFulfillment());
        } else if (objectOrFunction(value)) {
          var then$$1 = void 0;
          try {
            then$$1 = value.then;
          } catch (error) {
            reject(promise, error);
            return;
          }
          handleMaybeThenable(promise, value, then$$1);
        } else {
          fulfill(promise, value);
        }
      }
      function publishRejection(promise) {
        if (promise._onerror) {
          promise._onerror(promise._result);
        }
        publish(promise);
      }
      function fulfill(promise, value) {
        if (promise._state !== PENDING) {
          return;
        }
        promise._result = value;
        promise._state = FULFILLED;
        if (promise._subscribers.length !== 0) {
          asap(publish, promise);
        }
      }
      function reject(promise, reason) {
        if (promise._state !== PENDING) {
          return;
        }
        promise._state = REJECTED;
        promise._result = reason;
        asap(publishRejection, promise);
      }
      function subscribe(parent, child, onFulfillment, onRejection) {
        var _subscribers = parent._subscribers;
        var length = _subscribers.length;
        parent._onerror = null;
        _subscribers[length] = child;
        _subscribers[length + FULFILLED] = onFulfillment;
        _subscribers[length + REJECTED] = onRejection;
        if (length === 0 && parent._state) {
          asap(publish, parent);
        }
      }
      function publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;
        if (subscribers.length === 0) {
          return;
        }
        var child = void 0,
          callback = void 0,
          detail = promise._result;
        for (var i = 0; i < subscribers.length; i += 3) {
          child = subscribers[i];
          callback = subscribers[i + settled];
          if (child) {
            invokeCallback(settled, child, callback, detail);
          } else {
            callback(detail);
          }
        }
        promise._subscribers.length = 0;
      }
      function invokeCallback(settled, promise, callback, detail) {
        var hasCallback = isFunction(callback),
          value = void 0,
          error = void 0,
          succeeded = true;
        if (hasCallback) {
          try {
            value = callback(detail);
          } catch (e) {
            succeeded = false;
            error = e;
          }
          if (promise === value) {
            reject(promise, cannotReturnOwn());
            return;
          }
        } else {
          value = detail;
        }
        if (promise._state !== PENDING) ; else if (hasCallback && succeeded) {
          resolve(promise, value);
        } else if (succeeded === false) {
          reject(promise, error);
        } else if (settled === FULFILLED) {
          fulfill(promise, value);
        } else if (settled === REJECTED) {
          reject(promise, value);
        }
      }
      function initializePromise(promise, resolver) {
        try {
          resolver(function resolvePromise(value) {
            resolve(promise, value);
          }, function rejectPromise(reason) {
            reject(promise, reason);
          });
        } catch (e) {
          reject(promise, e);
        }
      }
      var id = 0;
      function nextId() {
        return id++;
      }
      function makePromise(promise) {
        promise[PROMISE_ID] = id++;
        promise._state = undefined;
        promise._result = undefined;
        promise._subscribers = [];
      }
      function validationError() {
        return new Error('Array Methods must be provided an Array');
      }
      var Enumerator = function () {
        function Enumerator(Constructor, input) {
          this._instanceConstructor = Constructor;
          this.promise = new Constructor(noop);
          if (!this.promise[PROMISE_ID]) {
            makePromise(this.promise);
          }
          if (isArray(input)) {
            this.length = input.length;
            this._remaining = input.length;
            this._result = new Array(this.length);
            if (this.length === 0) {
              fulfill(this.promise, this._result);
            } else {
              this.length = this.length || 0;
              this._enumerate(input);
              if (this._remaining === 0) {
                fulfill(this.promise, this._result);
              }
            }
          } else {
            reject(this.promise, validationError());
          }
        }
        Enumerator.prototype._enumerate = function _enumerate(input) {
          for (var i = 0; this._state === PENDING && i < input.length; i++) {
            this._eachEntry(input[i], i);
          }
        };
        Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
          var c = this._instanceConstructor;
          var resolve$$1 = c.resolve;
          if (resolve$$1 === resolve$1) {
            var _then = void 0;
            var error = void 0;
            var didError = false;
            try {
              _then = entry.then;
            } catch (e) {
              didError = true;
              error = e;
            }
            if (_then === then && entry._state !== PENDING) {
              this._settledAt(entry._state, i, entry._result);
            } else if (typeof _then !== 'function') {
              this._remaining--;
              this._result[i] = entry;
            } else if (c === Promise$1) {
              var promise = new c(noop);
              if (didError) {
                reject(promise, error);
              } else {
                handleMaybeThenable(promise, entry, _then);
              }
              this._willSettleAt(promise, i);
            } else {
              this._willSettleAt(new c(function (resolve$$1) {
                return resolve$$1(entry);
              }), i);
            }
          } else {
            this._willSettleAt(resolve$$1(entry), i);
          }
        };
        Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
          var promise = this.promise;
          if (promise._state === PENDING) {
            this._remaining--;
            if (state === REJECTED) {
              reject(promise, value);
            } else {
              this._result[i] = value;
            }
          }
          if (this._remaining === 0) {
            fulfill(promise, this._result);
          }
        };
        Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
          var enumerator = this;
          subscribe(promise, undefined, function (value) {
            return enumerator._settledAt(FULFILLED, i, value);
          }, function (reason) {
            return enumerator._settledAt(REJECTED, i, reason);
          });
        };
        return Enumerator;
      }();
      function all(entries) {
        return new Enumerator(this, entries).promise;
      }
      function race(entries) {
        var Constructor = this;
        if (!isArray(entries)) {
          return new Constructor(function (_, reject) {
            return reject(new TypeError('You must pass an array to race.'));
          });
        } else {
          return new Constructor(function (resolve, reject) {
            var length = entries.length;
            for (var i = 0; i < length; i++) {
              Constructor.resolve(entries[i]).then(resolve, reject);
            }
          });
        }
      }
      function reject$1(reason) {
        var Constructor = this;
        var promise = new Constructor(noop);
        reject(promise, reason);
        return promise;
      }
      function needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
      }
      function needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
      }
      var Promise$1 = function () {
        function Promise(resolver) {
          this[PROMISE_ID] = nextId();
          this._result = this._state = undefined;
          this._subscribers = [];
          if (noop !== resolver) {
            typeof resolver !== 'function' && needsResolver();
            this instanceof Promise ? initializePromise(this, resolver) : needsNew();
          }
        }
        Promise.prototype.catch = function _catch(onRejection) {
          return this.then(null, onRejection);
        };
        Promise.prototype.finally = function _finally(callback) {
          var promise = this;
          var constructor = promise.constructor;
          if (isFunction(callback)) {
            return promise.then(function (value) {
              return constructor.resolve(callback()).then(function () {
                return value;
              });
            }, function (reason) {
              return constructor.resolve(callback()).then(function () {
                throw reason;
              });
            });
          }
          return promise.then(callback, callback);
        };
        return Promise;
      }();
      Promise$1.prototype.then = then;
      Promise$1.all = all;
      Promise$1.race = race;
      Promise$1.resolve = resolve$1;
      Promise$1.reject = reject$1;
      Promise$1._setScheduler = setScheduler;
      Promise$1._setAsap = setAsap;
      Promise$1._asap = asap;
      function polyfill() {
        var local = void 0;
        if (typeof commonjsGlobal !== 'undefined') {
          local = commonjsGlobal;
        } else if (typeof self !== 'undefined') {
          local = self;
        } else {
          try {
            local = Function('return this')();
          } catch (e) {
            throw new Error('polyfill failed because global object is unavailable in this environment');
          }
        }
        var P = local.Promise;
        if (P) {
          var promiseToString = null;
          try {
            promiseToString = Object.prototype.toString.call(P.resolve());
          } catch (e) {
          }
          if (promiseToString === '[object Promise]' && !P.cast) {
            return;
          }
        }
        local.Promise = Promise$1;
      }
      Promise$1.polyfill = polyfill;
      Promise$1.Promise = Promise$1;
      return Promise$1;
    });
  })(es6Promise);
  var es6PromiseExports = es6Promise.exports;
  getDefaultExportFromCjs(es6PromiseExports);

  function httpRequest(config) {
    return new es6PromiseExports.Promise(function (resolve, reject) {
      _xhr(config, function (_ref) {
        var status = _ref.status,
          response = _ref.response;
        var parsed = parseResponse(response);
        status === 200 ? resolve(parsed) : reject(parsed);
      });
    });
  }
  function parseResponse(response) {
    try {
      return JSON.parse(response);
    } catch (e) {
      return response;
    }
  }
  function _xhr(config, callback) {
    var url = config.url,
      method = config.method,
      headers = config.headers,
      data = config.data;
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    setRequestHeaders(xhr, headers);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        callback(xhr);
      }
    };
    xhr.send(data);
  }
  function setRequestHeaders(xhr) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.keys(headers).forEach(function (key) {
      xhr.setRequestHeader(key, headers[key]);
    });
  }

  var eventObserverMap = {};
  function subscribe(eventName, observer) {
    eventObserverMap[eventName] = eventObserverMap[eventName] || [];
    eventObserverMap[eventName].push(observer);
  }
  function unsubscribe(eventName, observer) {
    var observers = eventObserverMap[eventName];
    for (var i = 0; i < observers.length; i++) {
      if (observers[i] === observer) {
        observers.splice(i, 1);
        return;
      }
    }
  }
  function dispatch(eventName) {
    forEach(eventObserverMap[eventName], function (observer) {
      observer();
    });
  }
  var eventObserver = {
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    dispatch: dispatch
  };

  var Poller = function () {
    function Poller(interval, maxCount) {
      _classCallCheck(this, Poller);
      this._interval = interval;
      this._maxCount = maxCount;
      this._count = 0;
      this._stopped = false;
      this._timeout = null;
    }
    _createClass(Poller, [{
      key: "start",
      value: function start(pollFunc, failFunc) {
        if (this._timeout !== null) {
          this.stop();
        }
        this._count = 0;
        this._stopped = false;
        this._doPolling(pollFunc, failFunc);
      }
    }, {
      key: "_doPolling",
      value: function _doPolling(pollFunc, failFunc) {
        var _this = this;
        if (this._stopped) return;
        this._timeout = setTimeout(function () {
          if (++_this._count > _this._maxCount) {
            failFunc();
          } else {
            pollFunc();
            _this._doPolling(pollFunc, failFunc);
          }
        }, this._interval);
      }
    }, {
      key: "stop",
      value: function stop() {
        this._stopped = true;
        clearTimeout(this._timeout);
        this._timeout = null;
      }
    }]);
    return Poller;
  }();

  var shippingAddressSettings = {
    optional: {
      close: isFunction,
      returnUrl: isString,
      forceMobileLayout: isBoolean,
      enableBackButton: isBoolean
    },
    defaults: {
      close: emptyFunc,
      forceMobileLayout: false,
      enableBackButton: true
    }
  };
  var rules$7 = {
    authorize: {
      optional: {
        redirectUri: isString,
        approvalType: isOneOf(['project']),
        scope: isString,
        throughTalk: isBoolean,
        channelPublicId: isString,
        serviceTerms: isString,
        isPopup: isBoolean,
        state: isString,
        deviceType: isOneOf(['watch', 'tv']),
        prompts: isString,
        throughSyncplugin: isBoolean,
        loginHint: isString,
        nonce: isString,
        settleId: isString
      },
      defaults: {
        throughTalk: true,
        isPopup: false,
        throughSyncplugin: true
      }
    },
    selectShippingAddress: shippingAddressSettings,
    createShippingAddress: shippingAddressSettings,
    updateShippingAddress: _objectSpread2({
      required: {
        addressId: isInteger
      }
    }, shippingAddressSettings)
  };

  function isSupportEasyLogin(_ref) {
    var prompts = _ref.prompts,
      throughTalk = _ref.throughTalk;
    var isNotInAppBrowser = UA.os.ios || UA.os.android ? !isTalkWebview : false;
    var isAccountLogin = includePrompts(prompts, 'login');
    var isAutoLogin = includePrompts(prompts, 'none');
    return throughTalk && isNotInAppBrowser && !(UA.os.android && /instagram|fb_iab/g.test(UA.ua)) && !isAccountLogin && !isAutoLogin;
  }
  function isNotSupportAutoLogin(_ref2) {
    var prompts = _ref2.prompts;
    return includePrompts(prompts, 'none') && !isTalkWebview;
  }
  function isTalkChannelHome(_ref3) {
    var throughSyncplugin = _ref3.throughSyncplugin;
    return throughSyncplugin && isTalkWebview && /ch-home/i.test(UA.ua);
  }
  function isSupportSilentLogin(_ref4) {
    var throughSyncplugin = _ref4.throughSyncplugin,
      isPopup = _ref4.isPopup,
      prompts = _ref4.prompts;
    return isTalkChannelHome({
      throughSyncplugin: throughSyncplugin
    }) && isPopup === false && !includePrompts(prompts, 'cert') && window.kakaoweb && typeof window.kakaoweb.reqSignInLocation === 'function';
  }
  function includePrompts(prompts, option) {
    return !!(prompts && prompts.indexOf(option) > -1);
  }
  function openLoginPopup(url) {
    var LOGIN_POPUP_NAME = '_blank';
    return windowOpen(url, LOGIN_POPUP_NAME, getPopupFeatures());
  }
  function makeAuthUrl(params) {
    return "".concat(URL.authorize, "?").concat(buildQueryString(params));
  }
  function makeAuthParams(settings) {
    var params = {
      client_id: getAppKey$1()
    };
    if (settings.approvalType) {
      params['approval_type'] = settings.approvalType;
    }
    if (settings.scope) {
      params['scope'] = settings.scope;
    }
    if (settings.prompts) {
      params['prompt'] = settings.prompts;
    }
    if (settings.state) {
      params['state'] = settings.state;
    }
    if (settings.nonce) {
      params['nonce'] = settings.nonce;
    }
    if (settings.loginHint) {
      params['login_hint'] = settings.loginHint;
    }
    if (settings.settleId) {
      params['settle_id'] = settings.settleId;
    }
    if (settings.deviceType) {
      params['device_type'] = settings.deviceType;
    }
    if (settings.channelPublicId) {
      params['channel_public_id'] = settings.channelPublicId;
    }
    if (settings.serviceTerms) {
      params['extra.service_terms'] = settings.serviceTerms;
    }
    return params;
  }
  function makeBaseAuthParams(settings) {
    return _objectSpread2(_objectSpread2({}, makeAuthParams(settings)), {}, {
      redirect_uri: settings.redirectUri || URL.redirectUri,
      response_type: 'code',
      auth_tran_id: generateRandomValue(60)
    });
  }
  function makeWebAuthParams(settings, baseAuthParams) {
    return _objectSpread2(_objectSpread2({}, baseAuthParams), {}, {
      ka: KAKAO_AGENT,
      is_popup: settings.isPopup
    });
  }
  function makeCodeParams(authTranId) {
    return {
      client_id: getAppKey$1(),
      auth_tran_id: authTranId,
      ka: KAKAO_AGENT
    };
  }

  var _excluded$1 = ["status", "error_code"];
  var poller = new Poller(1000, 600);
  function authorize(settings) {
    settings = processRules(settings, rules$7.authorize, 'Auth.authorize');
    if (isNotSupportAutoLogin(settings)) {
      var error = _objectSpread2({
        error: 'auto_login',
        error_description: 'NOT_SUPPORTED_BROWSER'
      }, settings.state && {
        state: settings.state
      });
      redirectWithResp(settings, error);
      return es6PromiseExports.Promise.reject(error);
    }
    eventObserver.dispatch('LOGIN_START');
    if (isSupportSilentLogin(settings)) {
      silentLogin(settings).then(function (isNeedRetry) {
        if (isNeedRetry) {
          doAuthorize(settings);
        }
      });
    } else {
      return doAuthorize(settings);
    }
  }
  function doAuthorize(settings) {
    var baseAuthParams = makeBaseAuthParams(settings);
    var webAuthParams = makeWebAuthParams(settings, baseAuthParams);
    var isEasyLogin = isSupportEasyLogin(settings);
    var isSupportSyncplugin = isTalkChannelHome(settings);
    var webAuthUrl = makeAuthUrl(webAuthParams);
    var loginUrl = isEasyLogin ? makeEasyLoginUrl(settings, baseAuthParams, webAuthUrl) : webAuthUrl;
    var popup = null;
    if (isSupportSyncplugin) {
      executeSyncpluginScheme(webAuthParams);
    } else if (settings.isPopup) {
      popup = openLoginPopup(loginUrl);
    } else {
      location.href = loginUrl;
    }
    return new es6PromiseExports.Promise(function (resolve, reject) {
      if (isEasyLogin || isSupportSyncplugin || settings.isPopup) {
        var codeParams = makeCodeParams(baseAuthParams.auth_tran_id);
        poller.start(function () {
          checkAuthorized(codeParams).then(function (resp) {
            var validResp = parseCodeResponse(resp);
            if (validResp !== null) {
              poller.stop();
              popup && popup.close && popup.close();
              validResp.error ? reject(validResp) : resolve(validResp);
              redirectWithResp(settings, validResp);
            }
            if (!isEasyLogin && popup && popup.closed) {
              poller.stop();
            }
          });
        }, function () {
          var error = _objectSpread2({
            error: 'timeout',
            error_description: 'LOGIN_TIMEOUT'
          }, settings.state && {
            state: settings.state
          });
          reject(error);
          redirectWithResp(settings, error);
        });
      }
    });
  }
  function checkAuthorized(params) {
    return httpRequest({
      method: 'GET',
      url: "".concat(URL.authDomain, "/apiweb/code.json?").concat(buildQueryString(params))
    });
  }
  function parseCodeResponse(_ref) {
    var status = _ref.status,
      error_code = _ref.error_code,
      rest = _objectWithoutProperties(_ref, _excluded$1);
    if (error_code === '300') {
      return null;
    }
    if (status === 'error' && error_code === '700') {
      location.href = "".concat(URL.authDomain, "/error/network");
    }
    return rest;
  }
  function redirectWithResp(_ref2, resp) {
    var redirectUri = _ref2.redirectUri;
    if (redirectUri) {
      var delimiter = redirectUri.indexOf('?') > -1 ? '&' : '?';
      location.href = redirectUri + delimiter + buildQueryString(resp);
    }
  }
  function makeEasyLoginUrl(settings, baseAuthParams, fallbackUrl) {
    var easyLoginAuthParams = _objectSpread2(_objectSpread2({}, baseAuthParams), {}, {
      is_popup: true
    });
    var getAndroidLoginIntent = function getAndroidLoginIntent() {
      return ['intent:#Intent', 'action=com.kakao.talk.intent.action.CAPRI_LOGGED_IN_ACTIVITY', 'launchFlags=0x08880000', "S.com.kakao.sdk.talk.appKey=".concat(getAppKey$1()), "S.com.kakao.sdk.talk.redirectUri=".concat(easyLoginAuthParams.redirect_uri), "S.com.kakao.sdk.talk.kaHeader=".concat(KAKAO_AGENT), "S.com.kakao.sdk.talk.extraparams=".concat(encodeURIComponent(JSON.stringify(easyLoginAuthParams)))].concat(_toConsumableArray(settings.state ? ["S.com.kakao.sdk.talk.state=".concat(settings.state)] : []), ["S.browser_fallback_url=".concat(encodeURIComponent(fallbackUrl)), 'end;']).join(';');
    };
    var getIosLoginUniversalLink = function getIosLoginUniversalLink() {
      var iosLoginUrl = makeAuthUrl(easyLoginAuthParams);
      var iosFallbackUrl = settings.isPopup ? iosLoginUrl : fallbackUrl;
      var iosEasyLoginUrl = "".concat(iosLoginUrl, "&ka=").concat(encodeURIComponent(KAKAO_AGENT));
      var talkWebviewUrl = "".concat(URL.talkInappScheme, "?url=").concat(encodeURIComponent(iosEasyLoginUrl));
      return "".concat(URL.universalKakaoLink).concat(encodeURIComponent(talkWebviewUrl), "&web=").concat(encodeURIComponent(iosFallbackUrl));
    };
    return UA.os.android ? getAndroidLoginIntent() : getIosLoginUniversalLink();
  }
  function executeSyncpluginScheme(webAuthParams) {
    var bizpluginParams = _objectSpread2(_objectSpread2({}, webAuthParams), {}, {
      is_popup: true,
      approval_window_type: 'v4_bizplugin'
    });
    var query = encodeURIComponent(buildQueryString(bizpluginParams));
    location.href = "".concat(URL.talkSyncpluginScheme, "&query=").concat(query);
  }
  function silentLogin(settings) {
    var baseAuthParams = makeBaseAuthParams(settings);
    var webAuthParams = makeWebAuthParams(settings, baseAuthParams);
    var implicitLoginParams = buildQueryString(_objectSpread2(_objectSpread2({}, webAuthParams), {}, {
      is_popup: false,
      prompt: 'none'
    }));
    return kakaoweb.reqSignInLocation(implicitLoginParams).then(function (location) {
      var parsed = Object.fromEntries(new window.URL(location).searchParams);
      if (parsed.error === 'consent_required' && !includePrompts(settings.prompts, 'none') || parsed.error === 'interaction_required') {
        return true;
      }
      redirectWithResp(settings, parsed);
      return false;
    })["catch"](function (error) {
      return false;
    });
  }

  var authorize$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    authorize: authorize
  });

  var md5 = {exports: {}};

  var core = {exports: {}};

  var hasRequiredCore;
  function requireCore() {
    if (hasRequiredCore) return core.exports;
    hasRequiredCore = 1;
    (function (module, exports) {
      (function (root, factory) {
        {
          module.exports = factory();
        }
      })(commonjsGlobal, function () {
        var CryptoJS = CryptoJS || function (Math, undefined$1) {
          var crypto;
          if (typeof window !== 'undefined' && window.crypto) {
            crypto = window.crypto;
          }
          if (typeof self !== 'undefined' && self.crypto) {
            crypto = self.crypto;
          }
          if (typeof globalThis !== 'undefined' && globalThis.crypto) {
            crypto = globalThis.crypto;
          }
          if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
            crypto = window.msCrypto;
          }
          if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
            crypto = commonjsGlobal.crypto;
          }
          if (!crypto && typeof commonjsRequire === 'function') {
            try {
              crypto = require('crypto');
            } catch (err) {}
          }
          var cryptoSecureRandomInt = function () {
            if (crypto) {
              if (typeof crypto.getRandomValues === 'function') {
                try {
                  return crypto.getRandomValues(new Uint32Array(1))[0];
                } catch (err) {}
              }
              if (typeof crypto.randomBytes === 'function') {
                try {
                  return crypto.randomBytes(4).readInt32LE();
                } catch (err) {}
              }
            }
            throw new Error('Native crypto module could not be used to get secure random number.');
          };
          var create = Object.create || function () {
            function F() {}
            return function (obj) {
              var subtype;
              F.prototype = obj;
              subtype = new F();
              F.prototype = null;
              return subtype;
            };
          }();
          var C = {};
          var C_lib = C.lib = {};
          var Base = C_lib.Base = function () {
            return {
              extend: function (overrides) {
                var subtype = create(this);
                if (overrides) {
                  subtype.mixIn(overrides);
                }
                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
                  subtype.init = function () {
                    subtype.$super.init.apply(this, arguments);
                  };
                }
                subtype.init.prototype = subtype;
                subtype.$super = this;
                return subtype;
              },
              create: function () {
                var instance = this.extend();
                instance.init.apply(instance, arguments);
                return instance;
              },
              init: function () {},
              mixIn: function (properties) {
                for (var propertyName in properties) {
                  if (properties.hasOwnProperty(propertyName)) {
                    this[propertyName] = properties[propertyName];
                  }
                }
                if (properties.hasOwnProperty('toString')) {
                  this.toString = properties.toString;
                }
              },
              clone: function () {
                return this.init.prototype.extend(this);
              }
            };
          }();
          var WordArray = C_lib.WordArray = Base.extend({
            init: function (words, sigBytes) {
              words = this.words = words || [];
              if (sigBytes != undefined$1) {
                this.sigBytes = sigBytes;
              } else {
                this.sigBytes = words.length * 4;
              }
            },
            toString: function (encoder) {
              return (encoder || Hex).stringify(this);
            },
            concat: function (wordArray) {
              var thisWords = this.words;
              var thatWords = wordArray.words;
              var thisSigBytes = this.sigBytes;
              var thatSigBytes = wordArray.sigBytes;
              this.clamp();
              if (thisSigBytes % 4) {
                for (var i = 0; i < thatSigBytes; i++) {
                  var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                  thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
                }
              } else {
                for (var j = 0; j < thatSigBytes; j += 4) {
                  thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
                }
              }
              this.sigBytes += thatSigBytes;
              return this;
            },
            clamp: function () {
              var words = this.words;
              var sigBytes = this.sigBytes;
              words[sigBytes >>> 2] &= 0xffffffff << 32 - sigBytes % 4 * 8;
              words.length = Math.ceil(sigBytes / 4);
            },
            clone: function () {
              var clone = Base.clone.call(this);
              clone.words = this.words.slice(0);
              return clone;
            },
            random: function (nBytes) {
              var words = [];
              for (var i = 0; i < nBytes; i += 4) {
                words.push(cryptoSecureRandomInt());
              }
              return new WordArray.init(words, nBytes);
            }
          });
          var C_enc = C.enc = {};
          var Hex = C_enc.Hex = {
            stringify: function (wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var hexChars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                hexChars.push((bite >>> 4).toString(16));
                hexChars.push((bite & 0x0f).toString(16));
              }
              return hexChars.join('');
            },
            parse: function (hexStr) {
              var hexStrLength = hexStr.length;
              var words = [];
              for (var i = 0; i < hexStrLength; i += 2) {
                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
              }
              return new WordArray.init(words, hexStrLength / 2);
            }
          };
          var Latin1 = C_enc.Latin1 = {
            stringify: function (wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var latin1Chars = [];
              for (var i = 0; i < sigBytes; i++) {
                var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                latin1Chars.push(String.fromCharCode(bite));
              }
              return latin1Chars.join('');
            },
            parse: function (latin1Str) {
              var latin1StrLength = latin1Str.length;
              var words = [];
              for (var i = 0; i < latin1StrLength; i++) {
                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << 24 - i % 4 * 8;
              }
              return new WordArray.init(words, latin1StrLength);
            }
          };
          var Utf8 = C_enc.Utf8 = {
            stringify: function (wordArray) {
              try {
                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
              } catch (e) {
                throw new Error('Malformed UTF-8 data');
              }
            },
            parse: function (utf8Str) {
              return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
            }
          };
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
            reset: function () {
              this._data = new WordArray.init();
              this._nDataBytes = 0;
            },
            _append: function (data) {
              if (typeof data == 'string') {
                data = Utf8.parse(data);
              }
              this._data.concat(data);
              this._nDataBytes += data.sigBytes;
            },
            _process: function (doFlush) {
              var processedWords;
              var data = this._data;
              var dataWords = data.words;
              var dataSigBytes = data.sigBytes;
              var blockSize = this.blockSize;
              var blockSizeBytes = blockSize * 4;
              var nBlocksReady = dataSigBytes / blockSizeBytes;
              if (doFlush) {
                nBlocksReady = Math.ceil(nBlocksReady);
              } else {
                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
              }
              var nWordsReady = nBlocksReady * blockSize;
              var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
              if (nWordsReady) {
                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                  this._doProcessBlock(dataWords, offset);
                }
                processedWords = dataWords.splice(0, nWordsReady);
                data.sigBytes -= nBytesReady;
              }
              return new WordArray.init(processedWords, nBytesReady);
            },
            clone: function () {
              var clone = Base.clone.call(this);
              clone._data = this._data.clone();
              return clone;
            },
            _minBufferSize: 0
          });
          C_lib.Hasher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            init: function (cfg) {
              this.cfg = this.cfg.extend(cfg);
              this.reset();
            },
            reset: function () {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            update: function (messageUpdate) {
              this._append(messageUpdate);
              this._process();
              return this;
            },
            finalize: function (messageUpdate) {
              if (messageUpdate) {
                this._append(messageUpdate);
              }
              var hash = this._doFinalize();
              return hash;
            },
            blockSize: 512 / 32,
            _createHelper: function (hasher) {
              return function (message, cfg) {
                return new hasher.init(cfg).finalize(message);
              };
            },
            _createHmacHelper: function (hasher) {
              return function (message, key) {
                return new C_algo.HMAC.init(hasher, key).finalize(message);
              };
            }
          });
          var C_algo = C.algo = {};
          return C;
        }(Math);
        return CryptoJS;
      });
    })(core);
    return core.exports;
  }

  (function (module, exports) {
    (function (root, factory) {
      {
        module.exports = factory(requireCore());
      }
    })(commonjsGlobal, function (CryptoJS) {
      (function (Math) {
        var C = CryptoJS;
        var C_lib = C.lib;
        var WordArray = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var T = [];
        (function () {
          for (var i = 0; i < 64; i++) {
            T[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 | 0;
          }
        })();
        var MD5 = C_algo.MD5 = Hasher.extend({
          _doReset: function () {
            this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476]);
          },
          _doProcessBlock: function (M, offset) {
            for (var i = 0; i < 16; i++) {
              var offset_i = offset + i;
              var M_offset_i = M[offset_i];
              M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 0x00ff00ff | (M_offset_i << 24 | M_offset_i >>> 8) & 0xff00ff00;
            }
            var H = this._hash.words;
            var M_offset_0 = M[offset + 0];
            var M_offset_1 = M[offset + 1];
            var M_offset_2 = M[offset + 2];
            var M_offset_3 = M[offset + 3];
            var M_offset_4 = M[offset + 4];
            var M_offset_5 = M[offset + 5];
            var M_offset_6 = M[offset + 6];
            var M_offset_7 = M[offset + 7];
            var M_offset_8 = M[offset + 8];
            var M_offset_9 = M[offset + 9];
            var M_offset_10 = M[offset + 10];
            var M_offset_11 = M[offset + 11];
            var M_offset_12 = M[offset + 12];
            var M_offset_13 = M[offset + 13];
            var M_offset_14 = M[offset + 14];
            var M_offset_15 = M[offset + 15];
            var a = H[0];
            var b = H[1];
            var c = H[2];
            var d = H[3];
            a = FF(a, b, c, d, M_offset_0, 7, T[0]);
            d = FF(d, a, b, c, M_offset_1, 12, T[1]);
            c = FF(c, d, a, b, M_offset_2, 17, T[2]);
            b = FF(b, c, d, a, M_offset_3, 22, T[3]);
            a = FF(a, b, c, d, M_offset_4, 7, T[4]);
            d = FF(d, a, b, c, M_offset_5, 12, T[5]);
            c = FF(c, d, a, b, M_offset_6, 17, T[6]);
            b = FF(b, c, d, a, M_offset_7, 22, T[7]);
            a = FF(a, b, c, d, M_offset_8, 7, T[8]);
            d = FF(d, a, b, c, M_offset_9, 12, T[9]);
            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
            a = FF(a, b, c, d, M_offset_12, 7, T[12]);
            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
            b = FF(b, c, d, a, M_offset_15, 22, T[15]);
            a = GG(a, b, c, d, M_offset_1, 5, T[16]);
            d = GG(d, a, b, c, M_offset_6, 9, T[17]);
            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
            b = GG(b, c, d, a, M_offset_0, 20, T[19]);
            a = GG(a, b, c, d, M_offset_5, 5, T[20]);
            d = GG(d, a, b, c, M_offset_10, 9, T[21]);
            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
            b = GG(b, c, d, a, M_offset_4, 20, T[23]);
            a = GG(a, b, c, d, M_offset_9, 5, T[24]);
            d = GG(d, a, b, c, M_offset_14, 9, T[25]);
            c = GG(c, d, a, b, M_offset_3, 14, T[26]);
            b = GG(b, c, d, a, M_offset_8, 20, T[27]);
            a = GG(a, b, c, d, M_offset_13, 5, T[28]);
            d = GG(d, a, b, c, M_offset_2, 9, T[29]);
            c = GG(c, d, a, b, M_offset_7, 14, T[30]);
            b = GG(b, c, d, a, M_offset_12, 20, T[31]);
            a = HH(a, b, c, d, M_offset_5, 4, T[32]);
            d = HH(d, a, b, c, M_offset_8, 11, T[33]);
            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
            a = HH(a, b, c, d, M_offset_1, 4, T[36]);
            d = HH(d, a, b, c, M_offset_4, 11, T[37]);
            c = HH(c, d, a, b, M_offset_7, 16, T[38]);
            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
            a = HH(a, b, c, d, M_offset_13, 4, T[40]);
            d = HH(d, a, b, c, M_offset_0, 11, T[41]);
            c = HH(c, d, a, b, M_offset_3, 16, T[42]);
            b = HH(b, c, d, a, M_offset_6, 23, T[43]);
            a = HH(a, b, c, d, M_offset_9, 4, T[44]);
            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
            b = HH(b, c, d, a, M_offset_2, 23, T[47]);
            a = II(a, b, c, d, M_offset_0, 6, T[48]);
            d = II(d, a, b, c, M_offset_7, 10, T[49]);
            c = II(c, d, a, b, M_offset_14, 15, T[50]);
            b = II(b, c, d, a, M_offset_5, 21, T[51]);
            a = II(a, b, c, d, M_offset_12, 6, T[52]);
            d = II(d, a, b, c, M_offset_3, 10, T[53]);
            c = II(c, d, a, b, M_offset_10, 15, T[54]);
            b = II(b, c, d, a, M_offset_1, 21, T[55]);
            a = II(a, b, c, d, M_offset_8, 6, T[56]);
            d = II(d, a, b, c, M_offset_15, 10, T[57]);
            c = II(c, d, a, b, M_offset_6, 15, T[58]);
            b = II(b, c, d, a, M_offset_13, 21, T[59]);
            a = II(a, b, c, d, M_offset_4, 6, T[60]);
            d = II(d, a, b, c, M_offset_11, 10, T[61]);
            c = II(c, d, a, b, M_offset_2, 15, T[62]);
            b = II(b, c, d, a, M_offset_9, 21, T[63]);
            H[0] = H[0] + a | 0;
            H[1] = H[1] + b | 0;
            H[2] = H[2] + c | 0;
            H[3] = H[3] + d | 0;
          },
          _doFinalize: function () {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
            var nBitsTotalL = nBitsTotal;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 0x00ff00ff | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 0xff00ff00;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 0x00ff00ff | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 0xff00ff00;
            data.sigBytes = (dataWords.length + 1) * 4;
            this._process();
            var hash = this._hash;
            var H = hash.words;
            for (var i = 0; i < 4; i++) {
              var H_i = H[i];
              H[i] = (H_i << 8 | H_i >>> 24) & 0x00ff00ff | (H_i << 24 | H_i >>> 8) & 0xff00ff00;
            }
            return hash;
          },
          clone: function () {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        function FF(a, b, c, d, x, s, t) {
          var n = a + (b & c | ~b & d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function GG(a, b, c, d, x, s, t) {
          var n = a + (b & d | c & ~d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function HH(a, b, c, d, x, s, t) {
          var n = a + (b ^ c ^ d) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        function II(a, b, c, d, x, s, t) {
          var n = a + (c ^ (b | ~d)) + x + t;
          return (n << s | n >>> 32 - s) + b;
        }
        C.MD5 = Hasher._createHelper(MD5);
        C.HmacMD5 = Hasher._createHmacHelper(MD5);
      })(Math);
      return CryptoJS.MD5;
    });
  })(md5);
  var md5Exports = md5.exports;
  var MD5 = getDefaultExportFromCjs(md5Exports);

  var aes = {exports: {}};

  var encBase64 = {exports: {}};

  var hasRequiredEncBase64;
  function requireEncBase64() {
    if (hasRequiredEncBase64) return encBase64.exports;
    hasRequiredEncBase64 = 1;
    (function (module, exports) {
      (function (root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function (CryptoJS) {
        (function () {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var C_enc = C.enc;
          C_enc.Base64 = {
            stringify: function (wordArray) {
              var words = wordArray.words;
              var sigBytes = wordArray.sigBytes;
              var map = this._map;
              wordArray.clamp();
              var base64Chars = [];
              for (var i = 0; i < sigBytes; i += 3) {
                var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 0xff;
                var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 0xff;
                var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 0xff;
                var triplet = byte1 << 16 | byte2 << 8 | byte3;
                for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                  base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 0x3f));
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                while (base64Chars.length % 4) {
                  base64Chars.push(paddingChar);
                }
              }
              return base64Chars.join('');
            },
            parse: function (base64Str) {
              var base64StrLength = base64Str.length;
              var map = this._map;
              var reverseMap = this._reverseMap;
              if (!reverseMap) {
                reverseMap = this._reverseMap = [];
                for (var j = 0; j < map.length; j++) {
                  reverseMap[map.charCodeAt(j)] = j;
                }
              }
              var paddingChar = map.charAt(64);
              if (paddingChar) {
                var paddingIndex = base64Str.indexOf(paddingChar);
                if (paddingIndex !== -1) {
                  base64StrLength = paddingIndex;
                }
              }
              return parseLoop(base64Str, base64StrLength, reverseMap);
            },
            _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
          };
          function parseLoop(base64Str, base64StrLength, reverseMap) {
            var words = [];
            var nBytes = 0;
            for (var i = 0; i < base64StrLength; i++) {
              if (i % 4) {
                var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
                var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
                var bitsCombined = bits1 | bits2;
                words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
                nBytes++;
              }
            }
            return WordArray.create(words, nBytes);
          }
        })();
        return CryptoJS.enc.Base64;
      });
    })(encBase64);
    return encBase64.exports;
  }

  var evpkdf = {exports: {}};

  var sha1 = {exports: {}};

  var hasRequiredSha1;
  function requireSha1() {
    if (hasRequiredSha1) return sha1.exports;
    hasRequiredSha1 = 1;
    (function (module, exports) {
      (function (root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function (CryptoJS) {
        (function () {
          var C = CryptoJS;
          var C_lib = C.lib;
          var WordArray = C_lib.WordArray;
          var Hasher = C_lib.Hasher;
          var C_algo = C.algo;
          var W = [];
          var SHA1 = C_algo.SHA1 = Hasher.extend({
            _doReset: function () {
              this._hash = new WordArray.init([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);
            },
            _doProcessBlock: function (M, offset) {
              var H = this._hash.words;
              var a = H[0];
              var b = H[1];
              var c = H[2];
              var d = H[3];
              var e = H[4];
              for (var i = 0; i < 80; i++) {
                if (i < 16) {
                  W[i] = M[offset + i] | 0;
                } else {
                  var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
                  W[i] = n << 1 | n >>> 31;
                }
                var t = (a << 5 | a >>> 27) + e + W[i];
                if (i < 20) {
                  t += (b & c | ~b & d) + 0x5a827999;
                } else if (i < 40) {
                  t += (b ^ c ^ d) + 0x6ed9eba1;
                } else if (i < 60) {
                  t += (b & c | b & d | c & d) - 0x70e44324;
                } else {
                    t += (b ^ c ^ d) - 0x359d3e2a;
                  }
                e = d;
                d = c;
                c = b << 30 | b >>> 2;
                b = a;
                a = t;
              }
              H[0] = H[0] + a | 0;
              H[1] = H[1] + b | 0;
              H[2] = H[2] + c | 0;
              H[3] = H[3] + d | 0;
              H[4] = H[4] + e | 0;
            },
            _doFinalize: function () {
              var data = this._data;
              var dataWords = data.words;
              var nBitsTotal = this._nDataBytes * 8;
              var nBitsLeft = data.sigBytes * 8;
              dataWords[nBitsLeft >>> 5] |= 0x80 << 24 - nBitsLeft % 32;
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
              dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
              data.sigBytes = dataWords.length * 4;
              this._process();
              return this._hash;
            },
            clone: function () {
              var clone = Hasher.clone.call(this);
              clone._hash = this._hash.clone();
              return clone;
            }
          });
          C.SHA1 = Hasher._createHelper(SHA1);
          C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
        })();
        return CryptoJS.SHA1;
      });
    })(sha1);
    return sha1.exports;
  }

  var hmac = {exports: {}};

  var hasRequiredHmac;
  function requireHmac() {
    if (hasRequiredHmac) return hmac.exports;
    hasRequiredHmac = 1;
    (function (module, exports) {
      (function (root, factory) {
        {
          module.exports = factory(requireCore());
        }
      })(commonjsGlobal, function (CryptoJS) {
        (function () {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var C_enc = C.enc;
          var Utf8 = C_enc.Utf8;
          var C_algo = C.algo;
          C_algo.HMAC = Base.extend({
            init: function (hasher, key) {
              hasher = this._hasher = new hasher.init();
              if (typeof key == 'string') {
                key = Utf8.parse(key);
              }
              var hasherBlockSize = hasher.blockSize;
              var hasherBlockSizeBytes = hasherBlockSize * 4;
              if (key.sigBytes > hasherBlockSizeBytes) {
                key = hasher.finalize(key);
              }
              key.clamp();
              var oKey = this._oKey = key.clone();
              var iKey = this._iKey = key.clone();
              var oKeyWords = oKey.words;
              var iKeyWords = iKey.words;
              for (var i = 0; i < hasherBlockSize; i++) {
                oKeyWords[i] ^= 0x5c5c5c5c;
                iKeyWords[i] ^= 0x36363636;
              }
              oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
              this.reset();
            },
            reset: function () {
              var hasher = this._hasher;
              hasher.reset();
              hasher.update(this._iKey);
            },
            update: function (messageUpdate) {
              this._hasher.update(messageUpdate);
              return this;
            },
            finalize: function (messageUpdate) {
              var hasher = this._hasher;
              var innerHash = hasher.finalize(messageUpdate);
              hasher.reset();
              var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
              return hmac;
            }
          });
        })();
      });
    })(hmac);
    return hmac.exports;
  }

  var hasRequiredEvpkdf;
  function requireEvpkdf() {
    if (hasRequiredEvpkdf) return evpkdf.exports;
    hasRequiredEvpkdf = 1;
    (function (module, exports) {
      (function (root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireSha1(), requireHmac());
        }
      })(commonjsGlobal, function (CryptoJS) {
        (function () {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var C_algo = C.algo;
          var MD5 = C_algo.MD5;
          var EvpKDF = C_algo.EvpKDF = Base.extend({
            cfg: Base.extend({
              keySize: 128 / 32,
              hasher: MD5,
              iterations: 1
            }),
            init: function (cfg) {
              this.cfg = this.cfg.extend(cfg);
            },
            compute: function (password, salt) {
              var block;
              var cfg = this.cfg;
              var hasher = cfg.hasher.create();
              var derivedKey = WordArray.create();
              var derivedKeyWords = derivedKey.words;
              var keySize = cfg.keySize;
              var iterations = cfg.iterations;
              while (derivedKeyWords.length < keySize) {
                if (block) {
                  hasher.update(block);
                }
                block = hasher.update(password).finalize(salt);
                hasher.reset();
                for (var i = 1; i < iterations; i++) {
                  block = hasher.finalize(block);
                  hasher.reset();
                }
                derivedKey.concat(block);
              }
              derivedKey.sigBytes = keySize * 4;
              return derivedKey;
            }
          });
          C.EvpKDF = function (password, salt, cfg) {
            return EvpKDF.create(cfg).compute(password, salt);
          };
        })();
        return CryptoJS.EvpKDF;
      });
    })(evpkdf);
    return evpkdf.exports;
  }

  var cipherCore = {exports: {}};

  var hasRequiredCipherCore;
  function requireCipherCore() {
    if (hasRequiredCipherCore) return cipherCore.exports;
    hasRequiredCipherCore = 1;
    (function (module, exports) {
      (function (root, factory, undef) {
        {
          module.exports = factory(requireCore(), requireEvpkdf());
        }
      })(commonjsGlobal, function (CryptoJS) {
        CryptoJS.lib.Cipher || function (undefined$1) {
          var C = CryptoJS;
          var C_lib = C.lib;
          var Base = C_lib.Base;
          var WordArray = C_lib.WordArray;
          var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
          var C_enc = C.enc;
          C_enc.Utf8;
          var Base64 = C_enc.Base64;
          var C_algo = C.algo;
          var EvpKDF = C_algo.EvpKDF;
          var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
            cfg: Base.extend(),
            createEncryptor: function (key, cfg) {
              return this.create(this._ENC_XFORM_MODE, key, cfg);
            },
            createDecryptor: function (key, cfg) {
              return this.create(this._DEC_XFORM_MODE, key, cfg);
            },
            init: function (xformMode, key, cfg) {
              this.cfg = this.cfg.extend(cfg);
              this._xformMode = xformMode;
              this._key = key;
              this.reset();
            },
            reset: function () {
              BufferedBlockAlgorithm.reset.call(this);
              this._doReset();
            },
            process: function (dataUpdate) {
              this._append(dataUpdate);
              return this._process();
            },
            finalize: function (dataUpdate) {
              if (dataUpdate) {
                this._append(dataUpdate);
              }
              var finalProcessedData = this._doFinalize();
              return finalProcessedData;
            },
            keySize: 128 / 32,
            ivSize: 128 / 32,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function () {
              function selectCipherStrategy(key) {
                if (typeof key == 'string') {
                  return PasswordBasedCipher;
                } else {
                  return SerializableCipher;
                }
              }
              return function (cipher) {
                return {
                  encrypt: function (message, key, cfg) {
                    return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
                  },
                  decrypt: function (ciphertext, key, cfg) {
                    return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
                  }
                };
              };
            }()
          });
          C_lib.StreamCipher = Cipher.extend({
            _doFinalize: function () {
              var finalProcessedBlocks = this._process(!!'flush');
              return finalProcessedBlocks;
            },
            blockSize: 1
          });
          var C_mode = C.mode = {};
          var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
            createEncryptor: function (cipher, iv) {
              return this.Encryptor.create(cipher, iv);
            },
            createDecryptor: function (cipher, iv) {
              return this.Decryptor.create(cipher, iv);
            },
            init: function (cipher, iv) {
              this._cipher = cipher;
              this._iv = iv;
            }
          });
          var CBC = C_mode.CBC = function () {
            var CBC = BlockCipherMode.extend();
            CBC.Encryptor = CBC.extend({
              processBlock: function (words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                xorBlock.call(this, words, offset, blockSize);
                cipher.encryptBlock(words, offset);
                this._prevBlock = words.slice(offset, offset + blockSize);
              }
            });
            CBC.Decryptor = CBC.extend({
              processBlock: function (words, offset) {
                var cipher = this._cipher;
                var blockSize = cipher.blockSize;
                var thisBlock = words.slice(offset, offset + blockSize);
                cipher.decryptBlock(words, offset);
                xorBlock.call(this, words, offset, blockSize);
                this._prevBlock = thisBlock;
              }
            });
            function xorBlock(words, offset, blockSize) {
              var block;
              var iv = this._iv;
              if (iv) {
                block = iv;
                this._iv = undefined$1;
              } else {
                block = this._prevBlock;
              }
              for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= block[i];
              }
            }
            return CBC;
          }();
          var C_pad = C.pad = {};
          var Pkcs7 = C_pad.Pkcs7 = {
            pad: function (data, blockSize) {
              var blockSizeBytes = blockSize * 4;
              var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
              var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
              var paddingWords = [];
              for (var i = 0; i < nPaddingBytes; i += 4) {
                paddingWords.push(paddingWord);
              }
              var padding = WordArray.create(paddingWords, nPaddingBytes);
              data.concat(padding);
            },
            unpad: function (data) {
              var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 0xff;
              data.sigBytes -= nPaddingBytes;
            }
          };
          C_lib.BlockCipher = Cipher.extend({
            cfg: Cipher.cfg.extend({
              mode: CBC,
              padding: Pkcs7
            }),
            reset: function () {
              var modeCreator;
              Cipher.reset.call(this);
              var cfg = this.cfg;
              var iv = cfg.iv;
              var mode = cfg.mode;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                modeCreator = mode.createEncryptor;
              } else {
                  modeCreator = mode.createDecryptor;
                  this._minBufferSize = 1;
                }
              if (this._mode && this._mode.__creator == modeCreator) {
                this._mode.init(this, iv && iv.words);
              } else {
                this._mode = modeCreator.call(mode, this, iv && iv.words);
                this._mode.__creator = modeCreator;
              }
            },
            _doProcessBlock: function (words, offset) {
              this._mode.processBlock(words, offset);
            },
            _doFinalize: function () {
              var finalProcessedBlocks;
              var padding = this.cfg.padding;
              if (this._xformMode == this._ENC_XFORM_MODE) {
                padding.pad(this._data, this.blockSize);
                finalProcessedBlocks = this._process(!!'flush');
              } else {
                  finalProcessedBlocks = this._process(!!'flush');
                  padding.unpad(finalProcessedBlocks);
                }
              return finalProcessedBlocks;
            },
            blockSize: 128 / 32
          });
          var CipherParams = C_lib.CipherParams = Base.extend({
            init: function (cipherParams) {
              this.mixIn(cipherParams);
            },
            toString: function (formatter) {
              return (formatter || this.formatter).stringify(this);
            }
          });
          var C_format = C.format = {};
          var OpenSSLFormatter = C_format.OpenSSL = {
            stringify: function (cipherParams) {
              var wordArray;
              var ciphertext = cipherParams.ciphertext;
              var salt = cipherParams.salt;
              if (salt) {
                wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
              } else {
                wordArray = ciphertext;
              }
              return wordArray.toString(Base64);
            },
            parse: function (openSSLStr) {
              var salt;
              var ciphertext = Base64.parse(openSSLStr);
              var ciphertextWords = ciphertext.words;
              if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
                salt = WordArray.create(ciphertextWords.slice(2, 4));
                ciphertextWords.splice(0, 4);
                ciphertext.sigBytes -= 16;
              }
              return CipherParams.create({
                ciphertext: ciphertext,
                salt: salt
              });
            }
          };
          var SerializableCipher = C_lib.SerializableCipher = Base.extend({
            cfg: Base.extend({
              format: OpenSSLFormatter
            }),
            encrypt: function (cipher, message, key, cfg) {
              cfg = this.cfg.extend(cfg);
              var encryptor = cipher.createEncryptor(key, cfg);
              var ciphertext = encryptor.finalize(message);
              var cipherCfg = encryptor.cfg;
              return CipherParams.create({
                ciphertext: ciphertext,
                key: key,
                iv: cipherCfg.iv,
                algorithm: cipher,
                mode: cipherCfg.mode,
                padding: cipherCfg.padding,
                blockSize: cipher.blockSize,
                formatter: cfg.format
              });
            },
            decrypt: function (cipher, ciphertext, key, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
              return plaintext;
            },
            _parse: function (ciphertext, format) {
              if (typeof ciphertext == 'string') {
                return format.parse(ciphertext, this);
              } else {
                return ciphertext;
              }
            }
          });
          var C_kdf = C.kdf = {};
          var OpenSSLKdf = C_kdf.OpenSSL = {
            execute: function (password, keySize, ivSize, salt) {
              if (!salt) {
                salt = WordArray.random(64 / 8);
              }
              var key = EvpKDF.create({
                keySize: keySize + ivSize
              }).compute(password, salt);
              var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
              key.sigBytes = keySize * 4;
              return CipherParams.create({
                key: key,
                iv: iv,
                salt: salt
              });
            }
          };
          var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
            cfg: SerializableCipher.cfg.extend({
              kdf: OpenSSLKdf
            }),
            encrypt: function (cipher, message, password, cfg) {
              cfg = this.cfg.extend(cfg);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
              cfg.iv = derivedParams.iv;
              var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
              ciphertext.mixIn(derivedParams);
              return ciphertext;
            },
            decrypt: function (cipher, ciphertext, password, cfg) {
              cfg = this.cfg.extend(cfg);
              ciphertext = this._parse(ciphertext, cfg.format);
              var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
              cfg.iv = derivedParams.iv;
              var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
              return plaintext;
            }
          });
        }();
      });
    })(cipherCore);
    return cipherCore.exports;
  }

  (function (module, exports) {
    (function (root, factory, undef) {
      {
        module.exports = factory(requireCore(), requireEncBase64(), md5Exports, requireEvpkdf(), requireCipherCore());
      }
    })(commonjsGlobal, function (CryptoJS) {
      (function () {
        var C = CryptoJS;
        var C_lib = C.lib;
        var BlockCipher = C_lib.BlockCipher;
        var C_algo = C.algo;
        var SBOX = [];
        var INV_SBOX = [];
        var SUB_MIX_0 = [];
        var SUB_MIX_1 = [];
        var SUB_MIX_2 = [];
        var SUB_MIX_3 = [];
        var INV_SUB_MIX_0 = [];
        var INV_SUB_MIX_1 = [];
        var INV_SUB_MIX_2 = [];
        var INV_SUB_MIX_3 = [];
        (function () {
          var d = [];
          for (var i = 0; i < 256; i++) {
            if (i < 128) {
              d[i] = i << 1;
            } else {
              d[i] = i << 1 ^ 0x11b;
            }
          }
          var x = 0;
          var xi = 0;
          for (var i = 0; i < 256; i++) {
            var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
            sx = sx >>> 8 ^ sx & 0xff ^ 0x63;
            SBOX[x] = sx;
            INV_SBOX[sx] = x;
            var x2 = d[x];
            var x4 = d[x2];
            var x8 = d[x4];
            var t = d[sx] * 0x101 ^ sx * 0x1010100;
            SUB_MIX_0[x] = t << 24 | t >>> 8;
            SUB_MIX_1[x] = t << 16 | t >>> 16;
            SUB_MIX_2[x] = t << 8 | t >>> 24;
            SUB_MIX_3[x] = t;
            var t = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
            INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
            INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
            INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
            INV_SUB_MIX_3[sx] = t;
            if (!x) {
              x = xi = 1;
            } else {
              x = x2 ^ d[d[d[x8 ^ x2]]];
              xi ^= d[d[xi]];
            }
          }
        })();
        var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
        var AES = C_algo.AES = BlockCipher.extend({
          _doReset: function () {
            var t;
            if (this._nRounds && this._keyPriorReset === this._key) {
              return;
            }
            var key = this._keyPriorReset = this._key;
            var keyWords = key.words;
            var keySize = key.sigBytes / 4;
            var nRounds = this._nRounds = keySize + 6;
            var ksRows = (nRounds + 1) * 4;
            var keySchedule = this._keySchedule = [];
            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
              if (ksRow < keySize) {
                keySchedule[ksRow] = keyWords[ksRow];
              } else {
                t = keySchedule[ksRow - 1];
                if (!(ksRow % keySize)) {
                  t = t << 8 | t >>> 24;
                  t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];
                  t ^= RCON[ksRow / keySize | 0] << 24;
                } else if (keySize > 6 && ksRow % keySize == 4) {
                  t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 0xff] << 16 | SBOX[t >>> 8 & 0xff] << 8 | SBOX[t & 0xff];
                }
                keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
              }
            }
            var invKeySchedule = this._invKeySchedule = [];
            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
              var ksRow = ksRows - invKsRow;
              if (invKsRow % 4) {
                var t = keySchedule[ksRow];
              } else {
                var t = keySchedule[ksRow - 4];
              }
              if (invKsRow < 4 || ksRow <= 4) {
                invKeySchedule[invKsRow] = t;
              } else {
                invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 0xff]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
              }
            }
          },
          encryptBlock: function (M, offset) {
            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
          },
          decryptBlock: function (M, offset) {
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
            var t = M[offset + 1];
            M[offset + 1] = M[offset + 3];
            M[offset + 3] = t;
          },
          _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
            var nRounds = this._nRounds;
            var s0 = M[offset] ^ keySchedule[0];
            var s1 = M[offset + 1] ^ keySchedule[1];
            var s2 = M[offset + 2] ^ keySchedule[2];
            var s3 = M[offset + 3] ^ keySchedule[3];
            var ksRow = 4;
            for (var round = 1; round < nRounds; round++) {
              var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 0xff] ^ SUB_MIX_2[s2 >>> 8 & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
              var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 0xff] ^ SUB_MIX_2[s3 >>> 8 & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
              var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 0xff] ^ SUB_MIX_2[s0 >>> 8 & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
              var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 0xff] ^ SUB_MIX_2[s1 >>> 8 & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];
              s0 = t0;
              s1 = t1;
              s2 = t2;
              s3 = t3;
            }
            var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 0xff] << 16 | SBOX[s2 >>> 8 & 0xff] << 8 | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
            var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 0xff] << 16 | SBOX[s3 >>> 8 & 0xff] << 8 | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
            var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 0xff] << 16 | SBOX[s0 >>> 8 & 0xff] << 8 | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
            var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 0xff] << 16 | SBOX[s1 >>> 8 & 0xff] << 8 | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];
            M[offset] = t0;
            M[offset + 1] = t1;
            M[offset + 2] = t2;
            M[offset + 3] = t3;
          },
          keySize: 256 / 32
        });
        C.AES = BlockCipher._createHelper(AES);
      })();
      return CryptoJS.AES;
    });
  })(aes);
  var aesExports = aes.exports;
  var AES = getDefaultExportFromCjs(aesExports);

  var encUtf8 = {exports: {}};

  (function (module, exports) {
    (function (root, factory) {
      {
        module.exports = factory(requireCore());
      }
    })(commonjsGlobal, function (CryptoJS) {
      return CryptoJS.enc.Utf8;
    });
  })(encUtf8);
  var encUtf8Exports = encUtf8.exports;
  var Utf8 = getDefaultExportFromCjs(encUtf8Exports);

  function getAppKey() {
    return getAppKey$1();
  }
  var accessToken$1 = null;
  function getAccessToken() {
    if (accessToken$1 === null) {
      accessToken$1 = retrieveItem(getAccessTokenKey());
    }
    return accessToken$1;
  }
  function setAccessToken(token) {
    var persist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    accessToken$1 = token;
    if (token === null || persist === false) {
      removeItem(getAccessTokenKey());
    } else {
      storeItem(getAccessTokenKey(), token);
    }
  }
  function storeItem(key, value) {
    var item = encrypt(value, getAppKey());
    window.sessionStorage.setItem(key, item);
  }
  function retrieveItem(key) {
    var item = window.sessionStorage.getItem(key);
    return item ? decrypt(item, getAppKey()) : null;
  }
  function removeItem(key) {
    window.sessionStorage.removeItem(key);
  }
  var tokenStorageKeys = {};
  function getAccessTokenKey() {
    if (!tokenStorageKeys.accessTokenKey) {
      tokenStorageKeys.accessTokenKey = 'kakao_' + hash('kat' + getAppKey());
    }
    return tokenStorageKeys.accessTokenKey;
  }
  function hash(msg) {
    return MD5(msg).toString();
  }
  function encrypt(msg, passphrase) {
    return AES.encrypt(msg, passphrase).toString();
  }
  function decrypt(encrypted, passphrase) {
    return AES.decrypt(encrypted, passphrase).toString(Utf8);
  }

  var secret = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getAccessToken: getAccessToken,
    getAppKey: getAppKey,
    setAccessToken: setAccessToken
  });

  function accessToken() {
    return "Bearer ".concat(getAccessToken());
  }
  function appKey() {
    return "KakaoAK ".concat(getAppKey());
  }

  var postApiCommonParams = {
    permission: isOneOf(['A', 'F', 'M']),
    enable_share: isBoolean,
    android_exec_param: isString,
    ios_exec_param: isString,
    android_market_param: isString,
    ios_market_param: isString
  };
  var secureResource = {
    secure_resource: isBoolean
  };
  function forceSecureResource(settings) {
    if (settings.secure_resource === false) {
      if (console) {
        console.warn('KakaoWarning: The secure_resource parameter is deprecated.');
      }
      settings.secure_resource = true;
    }
  }
  function storyActivityContentValidator(obj) {
    if (!isString(obj)) {
      return false;
    }
    if (obj.length === 0 || obj.length > 2048) {
      throw new KakaoError('content length should be between 0 and 2048');
    }
    return true;
  }
  function kageImageUrlListValidator(obj) {
    if (!isArray$1(obj)) {
      return false;
    }
    return every(obj, function (path) {
      if (!isString(path)) {
        return false;
      }
      if (isURL(path)) {
        throw new KakaoError("url in image_url_list should be a kage url, obtained from '/v1/api/story/upload/multi'.");
      }
      return true;
    });
  }
  var apiRules = {
    '/v1/user/signup': {
      method: 'POST',
      data: {
        optional: {
          properties: isObjectLike
        }
      }
    },
    '/v1/user/unlink': {
      method: 'POST',
      data: {}
    },
    '/v2/user/me': {
      method: 'GET',
      data: {
        optional: _objectSpread2({
          property_keys: isArray$1
        }, secureResource)
      }
    },
    '/v1/user/logout': {
      method: 'POST',
      data: {}
    },
    '/v1/user/update_profile': {
      method: 'POST',
      data: {
        required: {
          properties: isObjectLike
        }
      }
    },
    '/v1/user/access_token_info': {
      method: 'GET',
      data: {}
    },
    '/v2/user/scopes': {
      method: 'GET',
      data: {
        optional: {
          scopes: isArray$1
        }
      }
    },
    '/v2/user/revoke/scopes': {
      method: 'POST',
      data: {
        required: {
          scopes: isArray$1
        }
      }
    },
    '/v1/user/service/terms': {
      method: 'GET',
      data: {
        optional: {
          extra: isString
        }
      }
    },
    '/v1/user/shipping_address': {
      method: 'GET',
      data: {
        optional: {
          address_id: isInteger,
          from_updated_at: isInteger,
          page_size: isInteger
        }
      }
    },
    '/v1/api/talk/profile': {
      method: 'GET',
      data: {
        optional: secureResource,
        after: forceSecureResource
      }
    },
    '/v1/api/talk/friends': {
      method: 'GET',
      data: {
        optional: _objectSpread2({
          offset: isInteger,
          limit: isInteger,
          order: isString,
          friend_order: isString
        }, secureResource),
        after: forceSecureResource
      }
    },
    '/v1/friends': {
      method: 'GET',
      data: {
        optional: _objectSpread2({
          offset: isInteger,
          limit: isInteger,
          order: isString,
          friend_order: isString
        }, secureResource),
        after: forceSecureResource
      }
    },
    '/v2/api/talk/memo/send': {
      method: 'POST',
      data: {
        required: {
          template_id: isInteger
        },
        optional: {
          template_args: isObjectLike
        }
      }
    },
    '/v2/api/talk/memo/scrap/send': {
      method: 'POST',
      data: {
        required: {
          request_url: isString
        },
        optional: {
          template_id: isInteger,
          template_args: isObjectLike
        }
      }
    },
    '/v2/api/talk/memo/default/send': {
      method: 'POST',
      data: {
        required: {
          template_object: isObjectLike
        }
      }
    },
    '/v1/api/talk/friends/message/send': {
      method: 'POST',
      data: {
        required: {
          template_id: isInteger,
          receiver_uuids: isArray$1,
          receiver_id_type: isString
        },
        optional: {
          template_args: isObjectLike
        },
        defaults: {
          receiver_id_type: 'uuid'
        }
      }
    },
    '/v1/api/talk/friends/message/scrap/send': {
      method: 'POST',
      data: {
        required: {
          request_url: isString,
          receiver_uuids: isArray$1,
          receiver_id_type: isString
        },
        optional: {
          template_id: isInteger,
          template_args: isObjectLike
        },
        defaults: {
          receiver_id_type: 'uuid'
        }
      }
    },
    '/v1/api/talk/friends/message/default/send': {
      method: 'POST',
      data: {
        required: {
          template_object: isObjectLike,
          receiver_uuids: isArray$1,
          receiver_id_type: isString
        },
        defaults: {
          receiver_id_type: 'uuid'
        }
      }
    },
    '/v2/api/kakaolink/talk/template/validate': {
      method: 'GET',
      data: {
        required: {
          link_ver: isString,
          template_id: isInteger
        },
        optional: {
          template_args: isObjectLike
        }
      },
      authType: appKey
    },
    '/v2/api/kakaolink/talk/template/scrap': {
      method: 'GET',
      data: {
        required: {
          link_ver: isString,
          request_url: isString
        },
        optional: {
          template_id: isInteger,
          template_args: isObjectLike
        }
      },
      authType: appKey
    },
    '/v2/api/kakaolink/talk/template/default': {
      method: 'GET',
      data: {
        required: {
          link_ver: isString,
          template_object: isObjectLike
        }
      },
      authType: appKey
    },
    '/v2/api/talk/message/image/upload': {
      method: 'POST',
      data: {
        required: {
          file: isObjectLike
        }
      },
      authType: appKey
    },
    '/v2/api/talk/message/image/delete': {
      method: 'DELETE',
      data: {
        required: {
          image_url: isString
        }
      },
      authType: appKey
    },
    '/v2/api/talk/message/image/scrap': {
      method: 'POST',
      data: {
        required: {
          image_url: isString
        }
      },
      authType: appKey
    },
    '/v1/api/story/profile': {
      method: 'GET',
      data: {
        optional: secureResource
      }
    },
    '/v1/api/story/isstoryuser': {
      method: 'GET',
      data: {}
    },
    '/v1/api/story/mystory': {
      method: 'GET',
      data: {
        required: {
          id: isString
        }
      }
    },
    '/v1/api/story/mystories': {
      method: 'GET',
      data: {
        optional: {
          last_id: isString
        }
      }
    },
    '/v1/api/story/linkinfo': {
      method: 'GET',
      data: {
        required: {
          url: isString
        }
      }
    },
    '/v1/api/story/post/note': {
      method: 'POST',
      data: {
        required: {
          content: storyActivityContentValidator
        },
        optional: postApiCommonParams
      }
    },
    '/v1/api/story/post/photo': {
      method: 'POST',
      data: {
        required: {
          image_url_list: kageImageUrlListValidator
        },
        optional: _objectSpread2({
          content: storyActivityContentValidator
        }, postApiCommonParams)
      }
    },
    '/v1/api/story/post/link': {
      method: 'POST',
      data: {
        required: {
          link_info: isObjectLike
        },
        optional: _objectSpread2({
          content: storyActivityContentValidator
        }, postApiCommonParams)
      }
    },
    '/v1/api/story/upload/multi': {
      method: 'POST',
      data: {}
    },
    '/v1/api/story/delete/mystory': {
      method: 'DELETE',
      data: {
        required: {
          id: isString
        }
      }
    },
    '/v1/api/talk/channels': {
      method: 'GET',
      data: {
        optional: {
          channel_public_ids: isArray$1
        }
      }
    }
  };
  var rules$6 = {
    apiRules: apiRules,
    request: {
      required: {
        url: isOneOf(keys(apiRules))
      },
      optional: {
        data: isObjectLike,
        files: function files(obj) {
          return passesOneOf([isArray$1, isFileList])(obj) && every(obj, passesOneOf([isFile, isBlob]));
        },
        file: isFile
      },
      defaults: {
        data: {}
      }
    }
  };

  function request$4(settings) {
    settings = processRules(settings, rules$6.request, 'API.request');
    var _settings = settings,
      url = _settings.url,
      data = _settings.data;
    var apiRule = rules$6.apiRules[url].data;
    settings.data = processRules(data, apiRule, "API.request - ".concat(url));
    var requestConfig = makeRequestConfig(settings);
    return httpRequest(requestConfig);
  }
  function makeRequestConfig(settings) {
    var _rules$apiRules$setti = rules$6.apiRules[settings.url],
      method = _rules$apiRules$setti.method,
      authType = _rules$apiRules$setti.authType;
    var _makeRequestData = makeRequestData(settings),
      _makeRequestData2 = _slicedToArray(_makeRequestData, 2),
      contentType = _makeRequestData2[0],
      _data = _makeRequestData2[1];
    var _ref = function () {
        var baseUrl = URL.apiDomain + settings.url;
        if (method === 'POST') {
          return [baseUrl, _data];
        } else {
          return ["".concat(baseUrl, "?").concat(_data), null];
        }
      }(),
      _ref2 = _slicedToArray(_ref, 2),
      url = _ref2[0],
      data = _ref2[1];
    return {
      url: url,
      method: method,
      headers: _objectSpread2(_objectSpread2({}, contentType && {
        'Content-Type': contentType
      }), {}, {
        KA: KAKAO_AGENT,
        Authorization: (authType || accessToken)(),
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
        Pragma: 'no-cache'
      }),
      data: data
    };
  }
  function makeRequestData(_ref3) {
    var url = _ref3.url,
      data = _ref3.data,
      files = _ref3.files;
    if (isFileRequired(url) || data.file) {
      var fileList = files || data.file;
      if (!fileList) {
        throw new KakaoError("'files' parameter should be set for ".concat(url));
      }
      var formData = new FormData();
      forEach(fileList, function (file) {
        return formData.append('file', file);
      });
      return [null, formData];
    } else {
      return ['application/x-www-form-urlencoded', buildQueryString(data)];
    }
  }
  function isFileRequired(url) {
    return url === '/v1/api/story/upload/multi' || url === '/v2/api/talk/message/image/upload';
  }

  var request$5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    request: request$4
  });

  function logout() {
    return request$4({
      url: '/v1/user/logout'
    })["finally"](function () {
      setAccessToken(null);
      eventObserver.dispatch('LOGOUT');
    });
  }
  function getStatusInfo() {
    if (!getAccessToken()) {
      return es6PromiseExports.Promise.reject({
        status: 'not_connected'
      });
    }
    return request$4({
      url: '/v2/user/me'
    }).then(function (user) {
      return {
        status: 'connected',
        user: user
      };
    })["catch"](function () {
      return {
        status: 'not_connected'
      };
    });
  }

  var status = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getStatusInfo: getStatusInfo,
    logout: logout
  });

  var MessageHelper = function () {
    function MessageHelper(domain) {
      _classCallCheck(this, MessageHelper);
      this.domain = domain;
    }
    _createClass(MessageHelper, [{
      key: "createHiddenIframe",
      value: function createHiddenIframe(id, path) {
        if (this.iframe) {
          this.destroy(true);
        }
        var iframe = document.createElement('iframe');
        iframe.id = iframe.name = id;
        iframe.src = this.domain + path;
        iframe.setAttribute('style', 'border:none; width:0; height:0; display:none; overflow:hidden;');
        document.body.appendChild(iframe);
        this.iframe = iframe;
      }
    }, {
      key: "retrieveMessage",
      value: function retrieveMessage(path, params, popupName) {
        var _this = this;
        this.popup = submitFormWithPopup(this.domain + path, params, popupName);
        return new es6PromiseExports.Promise(function (resolve, reject) {
          _this.callback = function (_ref) {
            var data = _ref.data,
              origin = _ref.origin;
            if (data && origin === _this.domain) {
              try {
                var parsed = JSON.parse(data);
                parsed.code ? reject(parsed) : resolve(parsed);
              } catch (e) {
                removeEvent(window, 'message', _this.callback);
              }
            }
          };
          addEvent(window, 'message', _this.callback);
          _this.interval = setInterval(function () {
            return _this.destroy();
          }, 1000);
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        if (force || this.popup && this.popup.closed) {
          clearInterval(this.interval);
          removeEvent(window, 'message', this.callback);
          document.body.removeChild(this.iframe);
          this.iframe = null;
        }
      }
    }]);
    return MessageHelper;
  }();

  function selectShippingAddress(settings) {
    settings = processRules(settings, rules$7.selectShippingAddress, 'Auth.selectShippingAddress');
    return requestShippingAddress(settings, '/user/address');
  }
  function createShippingAddress(settings) {
    settings = processRules(settings, rules$7.createShippingAddress, 'Auth.createShippingAddress');
    return requestShippingAddress(settings, '/user/create/address');
  }
  function updateShippingAddress(settings) {
    settings = processRules(settings, rules$7.updateShippingAddress, 'Auth.updateShippingAddress');
    return requestShippingAddress(settings, '/user/edit/address');
  }
  var helper$1 = new MessageHelper(URL.appsDomain);
  function requestShippingAddress(settings, subpath) {
    var transId = generateRandomValue(60);
    var params = _objectSpread2({
      app_key: getAppKey$1(),
      access_token: getAccessToken(),
      ka: KAKAO_AGENT,
      trans_id: transId,
      mobile_view: settings.forceMobileLayout,
      enable_back_button: settings.enableBackButton
    }, settings.addressId && {
      address_id: settings.addressId
    });
    if (settings.returnUrl) {
      params.return_url = settings.returnUrl;
      submitForm(URL.appsDomain + subpath, params);
    } else {
      addCloseEvent(settings);
      helper$1.createHiddenIframe(transId, "/proxy?trans_id=".concat(transId));
      return helper$1.retrieveMessage(subpath, params, 'shipping_address');
    }
  }
  function addCloseEvent(_ref) {
    var close = _ref.close;
    var callback = function callback(_ref2) {
      var data = _ref2.data,
        origin = _ref2.origin;
      if ((origin === URL.appsDomain || origin === URL.accountDomain) && data === 'closed') {
        close();
        removeEvent(window, 'message', callback);
      }
    };
    addEvent(window, 'message', callback);
  }

  var shippingAddress = /*#__PURE__*/Object.freeze({
    __proto__: null,
    createShippingAddress: createShippingAddress,
    selectShippingAddress: selectShippingAddress,
    updateShippingAddress: updateShippingAddress
  });

  var Auth = makeModule([authorize$1, secret, status, shippingAddress]);
  var Auth$1 = Auth;

  var API = makeModule([request$5]);
  var API$1 = API;

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function camelToSnakeCase(str) {
    return str.replace(/[A-Z]/g, function (letter) {
      return "_".concat(letter.toLowerCase());
    });
  }
  function stringifyLCBA(lcba) {
    return isObjectLike(lcba) ? JSON.stringify(lcba) : lcba;
  }
  function isSupportTalkSharing(_ref) {
    var throughTalk = _ref.throughTalk;
    var isUnsupportedBrowser = /opr\/|opt\/|huawei/g.test(UA.ua);
    var isIpad = UA.os.ios && UA.platform === 'tablet';
    var isMobile = !isUnsupportedBrowser && (UA.platform === 'mobile' || isIpad);
    return isTalkWebview || throughTalk && isMobile;
  }
  function requestAPI(url, data) {
    return request$4({
      url: url,
      data: data
    });
  }

  function partialValidator(settings, rule, propName) {
    processRules(settings, rule, "parameter \"".concat(propName, "\" in Share"));
    return true;
  }
  function formatter(settings) {
    return keys(settings).reduce(function (obj, k) {
      obj[camelToSnakeCase(k)] = settings[k];
      return obj;
    }, {});
  }
  var linkRule = {
    optional: {
      webUrl: isString,
      mobileWebUrl: isString,
      androidExecutionParams: isString,
      iosExecutionParams: isString
    },
    builder: formatter
  };
  var itemRule = {
    required: {
      item: isString,
      itemOp: isString
    }
  };
  function makeButton(settings) {
    return {
      title: settings.title,
      link: formatter(settings.link)
    };
  }
  function makeContent(settings) {
    var content = formatter(settings);
    content.link = formatter(content.link);
    return content;
  }
  function makeItemContent(settings) {
    var itemContent = formatter(settings);
    if (itemContent.items) {
      itemContent.items = map(itemContent.items, function (e) {
        return formatter(e);
      });
    }
    return itemContent;
  }
  var rules$5 = {
    headerLink: linkRule,
    link: linkRule,
    button: {
      required: {
        title: isString,
        link: function link(e) {
          partialValidator(e, linkRule, 'link');
        }
      },
      builder: makeButton
    },
    buttons: {
      optional: {
        0: function _(e) {
          partialValidator(e, rules$5.button, 'button');
        },
        1: function _(e) {
          partialValidator(e, rules$5.button, 'button');
        }
      },
      builder: function builder(arr) {
        return map(arr, makeButton);
      }
    },
    content: {
      required: {
        title: isString,
        imageUrl: isString,
        link: function link(e) {
          partialValidator(e, linkRule, 'link');
        }
      },
      optional: {
        imageWidth: isInteger,
        imageHeight: isInteger,
        description: isString
      },
      builder: makeContent
    },
    contents: {
      optional: {
        0: function _(e) {
          partialValidator(e, rules$5.content, 'content');
        },
        1: function _(e) {
          partialValidator(e, rules$5.content, 'content');
        },
        2: function _(e) {
          partialValidator(e, rules$5.content, 'content');
        }
      },
      builder: function builder(arr) {
        return map(arr, makeContent);
      }
    },
    commerce: {
      required: {
        regularPrice: isInteger
      },
      optional: {
        discountPrice: isInteger,
        discountRate: isInteger,
        fixedDiscountPrice: isInteger,
        currencyUnit: isString,
        currencyUnitPosition: isOneOf([0, 1]),
        productName: isString
      },
      builder: formatter
    },
    social: {
      optional: {
        likeCount: isInteger,
        commentCount: isInteger,
        sharedCount: isInteger,
        viewCount: isInteger,
        subscriberCount: isInteger
      },
      builder: formatter
    },
    itemContent: {
      optional: {
        profileText: isString,
        profileImageUrl: isString,
        titleImageUrl: isString,
        titleImageText: isString,
        titleImageCategory: isString,
        items: function items(arr) {
          return isArray$1(arr) && arr.length < 6 && every(arr, function (e) {
            return partialValidator(e, itemRule, 'items.item');
          });
        },
        sum: isString,
        sumOp: isString
      },
      builder: makeItemContent
    }
  };
  function create(settings, key, callerMsg) {
    var linkPropRule = rules$5[key];
    if (linkPropRule) {
      settings = processRules(settings, linkPropRule, "parameter \"".concat(key, "\" in ").concat(callerMsg || 'Share'));
      return linkPropRule.builder(settings);
    }
  }
  var propGenerator = {
    create: create
  };

  var LINK_VER = '4.0';
  var KakaoLink = _createClass(function KakaoLink(settings, validatedResp) {
    _classCallCheck(this, KakaoLink);
    this.appkey = getAppKey$1();
    this.appver = '1.0';
    this.linkver = LINK_VER;
    this.extras = _objectSpread2(_objectSpread2({
      KA: KAKAO_AGENT
    }, settings.extras), settings.serverCallbackArgs && {
      lcba: stringifyLCBA(settings.serverCallbackArgs)
    });
    this.template_json = validatedResp.template_msg;
    this.template_args = validatedResp.template_args;
    this.template_id = validatedResp.template_id;
  });
  function makeKakaoLink(settings, validatedResp) {
    var kakaoLink = new KakaoLink(settings, validatedResp);
    if (JSON.stringify(kakaoLink).length > 10000) {
      throw new KakaoError('Failed to send message because it exceeds the message size limit. Please contact the app administrator.');
    }
    return buildQueryString(kakaoLink);
  }
  var DefaultLink = _createClass(function DefaultLink(settings) {
    var _this = this;
    _classCallCheck(this, DefaultLink);
    this.link_ver = LINK_VER;
    this.template_object = _objectSpread2({
      object_type: settings.objectType
    }, settings.buttonTitle && {
      button_title: settings.buttonTitle
    });
    forEach(settings, function (setting, key) {
      var prop = propGenerator.create(setting, key, 'defaultObject');
      if (prop) {
        _this.template_object[camelToSnakeCase(key)] = prop;
      }
    });
  });
  var ListLink = function (_DefaultLink) {
    _inherits(ListLink, _DefaultLink);
    var _super = _createSuper(ListLink);
    function ListLink(settings) {
      var _this2;
      _classCallCheck(this, ListLink);
      _this2 = _super.call(this, settings);
      _this2.template_object.header_title = settings.headerTitle;
      return _this2;
    }
    return _createClass(ListLink);
  }(DefaultLink);
  var LocationLink = function (_DefaultLink2) {
    _inherits(LocationLink, _DefaultLink2);
    var _super2 = _createSuper(LocationLink);
    function LocationLink(settings) {
      var _this3;
      _classCallCheck(this, LocationLink);
      _this3 = _super2.call(this, settings);
      _this3.template_object.address = settings.address || '';
      _this3.template_object.address_title = settings.addressTitle || '';
      return _this3;
    }
    return _createClass(LocationLink);
  }(DefaultLink);
  var CalendarLink = function (_DefaultLink3) {
    _inherits(CalendarLink, _DefaultLink3);
    var _super3 = _createSuper(CalendarLink);
    function CalendarLink(settings) {
      var _this4;
      _classCallCheck(this, CalendarLink);
      _this4 = _super3.call(this, settings);
      _this4.template_object.id_type = settings.idType || '';
      _this4.template_object.id = settings.id || '';
      return _this4;
    }
    return _createClass(CalendarLink);
  }(DefaultLink);
  var TextLink = function (_DefaultLink4) {
    _inherits(TextLink, _DefaultLink4);
    var _super4 = _createSuper(TextLink);
    function TextLink(settings) {
      var _this5;
      _classCallCheck(this, TextLink);
      _this5 = _super4.call(this, settings);
      _this5.template_object.text = settings.text || '';
      return _this5;
    }
    return _createClass(TextLink);
  }(DefaultLink);
  var defaultLinks = {
    FeedLink: DefaultLink,
    CommerceLink: DefaultLink,
    ListLink: ListLink,
    LocationLink: LocationLink,
    CalendarLink: CalendarLink,
    TextLink: TextLink
  };
  var ScrapLink = _createClass(function ScrapLink(settings) {
    _classCallCheck(this, ScrapLink);
    this.link_ver = LINK_VER;
    this.request_url = settings.requestUrl;
    if (settings.templateId) {
      this.template_id = settings.templateId;
    }
    if (settings.templateArgs) {
      this.template_args = settings.templateArgs;
    }
  });
  var CustomLink = _createClass(function CustomLink(settings) {
    _classCallCheck(this, CustomLink);
    this.link_ver = LINK_VER;
    this.template_id = settings.templateId;
    this.template_args = settings.templateArgs;
  });
  function makeDefaultLink(settings) {
    var clazz = defaultLinks["".concat(capitalize(settings.objectType), "Link")];
    return new clazz(settings);
  }
  function makeScrapLink(settings) {
    return new ScrapLink(settings);
  }
  function makeCustomLink(settings) {
    return new CustomLink(settings);
  }

  function send$1(settings, linkType, linkObj) {
    var webLinkParams = _objectSpread2({
      app_key: getAppKey$1(),
      ka: KAKAO_AGENT,
      validation_action: linkType,
      validation_params: JSON.stringify(linkObj)
    }, settings.serverCallbackArgs && {
      lcba: stringifyLCBA(settings.serverCallbackArgs)
    });
    var linkPopup = submitFormWithPopup("".concat(URL.sharerDomain, "/picker/link"), webLinkParams, 'sharer');
    if (settings.callback) {
      if (console) {
        console.warn('KakaoWarning: The "callback" parameter is deprecated.');
      }
      handleCallback(linkPopup, settings.callback);
    }
  }
  function handleCallback(popup, callback) {
    if (UA.browser.msie) {
      if (console) {
        console.warn('KakaoWarning: The "callback" parameter does not support the IE browser.');
      }
      return;
    }
    var linkCallback = function linkCallback(e) {
      if (e.data === 'sent' && e.origin === URL.sharerDomain) {
        callback();
      }
    };
    addEvent(window, 'message', linkCallback);
    var interval = setInterval(function () {
      if (popup.closed) {
        clearInterval(interval);
        removeEvent(window, 'message', linkCallback);
      }
    }, 1000);
  }
  var webSender = {
    send: send$1
  };

  var web2app = function () {
    var ua_parser$1 = ua_parser;
    var TIMEOUT_IOS = 5 * 1000,
      TIMEOUT_ANDROID = 3 * 100,
      INTERVAL = 100,
      ua = ua_parser$1(),
      os = ua.os,
      intentNotSupportedBrowserList = ['opr/'],
      intentSupportCustomBrowserList = ['firefox', 'KAKAOTALK'
      ];
    function moveToStore(storeURL) {
      window.top.location.href = storeURL;
    }
    function web2app(context) {
      var willInvokeApp = typeof context.willInvokeApp === 'function' ? context.willInvokeApp : function () {},
        onAppMissing = typeof context.onAppMissing === 'function' ? context.onAppMissing : moveToStore,
        onUnsupportedEnvironment = typeof context.onUnsupportedEnvironment === 'function' ? context.onUnsupportedEnvironment : function () {};
      willInvokeApp();
      if (os.android) {
        if (isIntentSupportedBrowser() && context.intentURI && !context.useUrlScheme) {
          web2appViaIntentURI(context.intentURI);
        } else if (context.storeURL) {
          web2appViaCustomUrlSchemeForAndroid(context.urlScheme, context.storeURL, onAppMissing);
        }
      } else if (os.ios && context.storeURL) {
        web2appViaCustomUrlSchemeForIOS(context.urlScheme, context.storeURL, onAppMissing, context.universalLink);
      } else {
        setTimeout(function () {
          onUnsupportedEnvironment();
        }, 100);
      }
    }
    function isIntentSupportedBrowser() {
      var supportsIntent = ua.browser.chrome && +ua.browser.version.major >= 25;
      var blackListRegexp = new RegExp(intentNotSupportedBrowserList.join('|'), "i");
      var whiteListRegexp = new RegExp(intentSupportCustomBrowserList.join('|'), "i");
      return supportsIntent && !blackListRegexp.test(ua.ua) || whiteListRegexp.test(ua.ua);
    }
    function web2appViaCustomUrlSchemeForAndroid(urlScheme, storeURL, fallback) {
      deferFallback(TIMEOUT_ANDROID, storeURL, fallback);
      launchAppViaHiddenIframe(urlScheme);
    }
    function deferFallback(timeout, storeURL, fallback) {
      var clickedAt = new Date().getTime();
      return setTimeout(function () {
        var now = new Date().getTime();
        if (isPageVisible() && now - clickedAt < timeout + INTERVAL) {
          fallback(storeURL);
        }
      }, timeout);
    }
    function web2appViaIntentURI(launchURI) {
      if (ua.browser.chrome) {
        move();
      } else {
        setTimeout(move, 100);
      }
      function move() {
        top.location.href = launchURI;
      }
    }
    function web2appViaCustomUrlSchemeForIOS(urlScheme, storeURL, fallback, universalLink) {
      var tid = deferFallback(TIMEOUT_IOS, storeURL, fallback);
      if (parseInt(ua.os.version.major, 10) < 8) {
        bindPagehideEvent(tid);
      } else {
        bindVisibilityChangeEvent(tid);
      }
      if (isSupportUniversalLinks()) {
        if (universalLink === undefined) {
          universalLink = urlScheme;
        } else {
          clearTimeout(tid);
        }
        launchAppViaChangingLocation(universalLink);
      } else {
        launchAppViaHiddenIframe(urlScheme);
      }
    }
    function bindPagehideEvent(tid) {
      window.addEventListener('pagehide', function clear() {
        if (isPageVisible()) {
          clearTimeout(tid);
          window.removeEventListener('pagehide', clear);
        }
      });
    }
    function bindVisibilityChangeEvent(tid) {
      document.addEventListener('visibilitychange', function clear() {
        if (isPageVisible()) {
          clearTimeout(tid);
          document.removeEventListener('visibilitychange', clear);
        }
      });
    }
    function isPageVisible() {
      var attrNames = ['hidden', 'webkitHidden'];
      for (var i = 0, len = attrNames.length; i < len; i++) {
        if (typeof document[attrNames[i]] !== 'undefined') {
          return !document[attrNames[i]];
        }
      }
      return true;
    }
    function launchAppViaChangingLocation(urlScheme) {
      window.top.location.href = urlScheme;
    }
    function launchAppViaHiddenIframe(urlScheme) {
      setTimeout(function () {
        var iframe = createHiddenIframe('appLauncher');
        iframe.src = urlScheme;
      }, 100);
    }
    function createHiddenIframe(id) {
      var iframe = document.createElement('iframe');
      iframe.id = id;
      iframe.style.border = 'none';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.display = 'none';
      iframe.style.overflow = 'hidden';
      document.body.appendChild(iframe);
      return iframe;
    }
    function isSupportUniversalLinks() {
      return parseInt(ua.os.version.major, 10) > 8 && ua.os.ios;
    }
    return web2app;
  }();
  var web2app$1 = getDefaultExportFromCjs(web2app);

  function isAndroidWebView() {
    return UA.os.android && (olderAndroidWebView() || oldAndroidWebView() || newerAndroidWebView());
  }
  function olderAndroidWebView() {
    return UA.os.version.major == 2 && /Version\/\d+.\d+|/i.test(UA.ua);
  }
  function oldAndroidWebView() {
    return UA.os.version.major == 4 && UA.os.version.minor < 4 && /Version\/\d+.\d+|/i.test(UA.ua);
  }
  function newerAndroidWebView() {
    return /Version\/\d+\.\d+/i.test(UA.ua) && (/Chrome\/\d+\.\d+\.\d+\.\d+ Mobile/i.test(UA.ua) || /; wv\)/i.test(UA.ua));
  }
  function isIOSKakaoTalkWebView() {
    return UA.os.ios && isTalkWebview;
  }

  var KAKAOTALK_IOS_APP_ID = '362057947';
  function send(settings, requestUrl, linkObj) {
    return requestAPI(requestUrl, linkObj).then(function (validatedResp) {
      var linkSchemeParams = makeKakaoLink(settings, validatedResp);
      callWeb2app$1(linkSchemeParams, settings.installTalk);
    })["catch"](function (kapiError) {
      var error = JSON.stringify(_objectSpread2({
        name: 'KAPIError'
      }, kapiError));
      location.href = "".concat(URL.sharerDomain, "/picker/failed?app_key=").concat(getAppKey$1(), "&error=").concat(base64url(error));
    });
  }
  function callWeb2app$1(linkSchemeParams, shouldInstallTalk) {
    var linkScheme = "".concat(UA.os.ios ? URL.talkLinkScheme : 'kakaolink://send', "?").concat(linkSchemeParams);
    var androidIntent = ["intent://send?".concat(linkSchemeParams, "#Intent"), 'scheme=kakaolink', 'launchFlags=0x14008000'].concat(_toConsumableArray(shouldInstallTalk ? ["package=".concat(URL.talkAndroidPackage)] : []), ["end;"]).join(';');
    var web2appOptions = _objectSpread2(_objectSpread2({}, !isIOSKakaoTalkWebView() && {
      universalLink: URL.universalKakaoLink + encodeURIComponent(linkScheme)
    }), {}, {
      urlScheme: linkScheme,
      intentURI: androidIntent,
      appName: 'KakaoTalk',
      storeURL: getInstallUrl(URL.talkAndroidPackage, KAKAOTALK_IOS_APP_ID),
      onUnsupportedEnvironment: function onUnsupportedEnvironment() {
        throw new KakaoError('unsupported environment');
      }
    });
    if (!shouldInstallTalk || isIOSKakaoTalkWebView() || isAndroidWebView()) {
      web2appOptions.onAppMissing = emptyFunc;
    }
    try {
      web2app$1(web2appOptions);
    } catch (error) {
    }
  }
  var talkSender = {
    send: send
  };

  var commonLinkOptional = {
    callback: isFunction,
    installTalk: isBoolean,
    throughTalk: isBoolean,
    extras: isObjectLike,
    serverCallbackArgs: passesOneOf([isJSONString, isObjectLike])
  };
  var commonLinkDefaults = {
    installTalk: false,
    throughTalk: true
  };
  function buttonsValidator(e) {
    if (!isArray$1(e)) {
      return false;
    } else if (e.length > 2) {
      throw new KakaoError('Illegal argument for "buttons" in Share: size of buttons should be up to 2');
    }
    return true;
  }
  var sendFeed = {
    required: {
      objectType: function objectType(type) {
        return type === 'feed';
      },
      content: isObjectLike
    },
    optional: _objectSpread2(_objectSpread2({}, commonLinkOptional), {}, {
      itemContent: isObjectLike,
      social: isObjectLike,
      buttonTitle: isString,
      buttons: buttonsValidator
    }),
    defaults: commonLinkDefaults
  };
  var sendList = {
    required: {
      objectType: function objectType(type) {
        return type === 'list';
      },
      headerTitle: isString,
      headerLink: isObjectLike,
      contents: function contents(e) {
        if (!isArray$1(e)) {
          return false;
        } else if (e.length < 2 || e.length > 3) {
          throw new KakaoError('Illegal argument for "contents" in Share: size of contents should be more than 1 and up to 3');
        }
        return true;
      }
    },
    optional: _objectSpread2(_objectSpread2({}, commonLinkOptional), {}, {
      buttonTitle: isString,
      buttons: buttonsValidator
    }),
    defaults: commonLinkDefaults
  };
  var sendCommerce = {
    required: {
      objectType: function objectType(type) {
        return type === 'commerce';
      },
      content: isObjectLike,
      commerce: isObjectLike
    },
    optional: _objectSpread2(_objectSpread2({}, commonLinkOptional), {}, {
      buttonTitle: isString,
      buttons: buttonsValidator
    }),
    defaults: commonLinkDefaults
  };
  var sendLocation = {
    required: {
      objectType: function objectType(type) {
        return type === 'location';
      },
      content: isObjectLike,
      address: isString
    },
    optional: _objectSpread2(_objectSpread2({}, commonLinkOptional), {}, {
      addressTitle: isString,
      social: isObjectLike,
      buttonTitle: isString,
      buttons: buttonsValidator
    }),
    defaults: commonLinkDefaults
  };
  var sendCalendar = {
    required: {
      objectType: function objectType(type) {
        return type === 'calendar';
      },
      idType: isOneOf(['event', 'calendar']),
      id: isString,
      content: isObjectLike
    },
    optional: _objectSpread2(_objectSpread2({}, commonLinkOptional), {}, {
      buttons: buttonsValidator
    }),
    defaults: commonLinkDefaults
  };
  var sendText = {
    required: {
      objectType: function objectType(type) {
        return type === 'text';
      },
      text: isString,
      link: isObjectLike
    },
    optional: _objectSpread2(_objectSpread2({}, commonLinkOptional), {}, {
      buttonTitle: isString,
      buttons: buttonsValidator
    }),
    defaults: commonLinkDefaults
  };
  var sendScrap$1 = {
    required: {
      requestUrl: isString
    },
    optional: _objectSpread2(_objectSpread2({}, commonLinkOptional), {}, {
      templateId: isInteger,
      templateArgs: isObjectLike
    }),
    defaults: _objectSpread2(_objectSpread2({}, commonLinkDefaults), {}, {
      templateArgs: {}
    })
  };
  var sendCustom$1 = {
    required: {
      templateId: isInteger
    },
    optional: _objectSpread2(_objectSpread2({}, commonLinkOptional), {}, {
      templateArgs: isObjectLike
    }),
    defaults: _objectSpread2(_objectSpread2({}, commonLinkDefaults), {}, {
      templateArgs: {}
    })
  };
  function extendRuleForContainer(rule) {
    return defaults$1({
      required: _objectSpread2(_objectSpread2({}, rule.required), {}, {
        container: passesOneOf([isElement, isString])
      })
    }, rule);
  }
  var rules$4 = {
    objectTypes: ['feed', 'list', 'commerce', 'location', 'calendar', 'text'],
    sendFeed: sendFeed,
    createFeedButton: extendRuleForContainer(sendFeed),
    sendList: sendList,
    createListButton: extendRuleForContainer(sendList),
    sendCommerce: sendCommerce,
    createCommerceButton: extendRuleForContainer(sendCommerce),
    sendLocation: sendLocation,
    createLocationButton: extendRuleForContainer(sendLocation),
    sendCalendar: sendCalendar,
    createCalendarButton: extendRuleForContainer(sendCalendar),
    sendText: sendText,
    createTextButton: extendRuleForContainer(sendText),
    sendScrap: sendScrap$1,
    createScrapButton: extendRuleForContainer(sendScrap$1),
    sendCustom: sendCustom$1,
    createCustomButton: extendRuleForContainer(sendCustom$1),
    uploadImage: {
      required: {
        file: isObjectLike
      }
    },
    deleteImage: {
      required: {
        imageUrl: isString
      }
    },
    scrapImage: {
      required: {
        imageUrl: isString
      }
    }
  };

  function createDefaultButton(settings) {
    if (!settings.objectType || !isOneOf(rules$4.objectTypes)(settings.objectType)) {
      throw new KakaoError("objectType should be one of (".concat(rules$4.objectTypes.join(', '), ")"));
    }
    var rule = rules$4["create".concat(capitalize(settings.objectType), "Button")];
    settings = processRules(settings, rule, 'Share.createDefaultButton');
    addClickEvent(settings, 'default');
  }
  function sendDefault(settings) {
    if (!settings.objectType || !isOneOf(rules$4.objectTypes)(settings.objectType)) {
      throw new KakaoError("objectType should be one of (".concat(rules$4.objectTypes.join(', '), ")"));
    }
    var rule = rules$4["send".concat(capitalize(settings.objectType))];
    settings = processRules(settings, rule, 'Share.sendDefault');
    doSend(settings, 'default');
  }
  function createScrapButton(settings) {
    settings = processRules(settings, rules$4.createScrapButton, 'Share.createScrapButton');
    addClickEvent(settings, 'scrap');
  }
  function sendScrap(settings) {
    settings = processRules(settings, rules$4.sendScrap, 'Share.sendScrap');
    doSend(settings, 'scrap');
  }
  function createCustomButton(settings) {
    settings = processRules(settings, rules$4.createCustomButton, 'Share.createCustomButton');
    addClickEvent(settings, 'custom');
  }
  function sendCustom(settings) {
    settings = processRules(settings, rules$4.sendCustom, 'Share.sendCustom');
    doSend(settings, 'custom');
  }
  function addClickEvent(settings, linkType) {
    var container$ = getElement(settings.container);
    if (!container$) {
      throw new KakaoError('container is required for KakaoTalk sharing: pass in element or id');
    }
    var clickHandler = function clickHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      doSend(settings, linkType);
    };
    addEvent(container$, 'click', clickHandler);
    cleanups$2.push(function () {
      removeEvent(container$, 'click', clickHandler);
    });
  }
  var linkTypeMapper = {
    "default": [makeDefaultLink, '/v2/api/kakaolink/talk/template/default'],
    scrap: [makeScrapLink, '/v2/api/kakaolink/talk/template/scrap'],
    custom: [makeCustomLink, '/v2/api/kakaolink/talk/template/validate']
  };
  function doSend(settings, linkType) {
    var _linkTypeMapper$linkT = _slicedToArray(linkTypeMapper[linkType], 2),
      makeLinkFunc = _linkTypeMapper$linkT[0],
      requestUrl = _linkTypeMapper$linkT[1];
    var linkObj = makeLinkFunc(settings);
    if (isSupportTalkSharing(settings)) {
      talkSender.send(settings, requestUrl, linkObj);
    } else {
      webSender.send(settings, linkType, linkObj);
    }
  }
  var cleanups$2 = [];
  function cleanup$3() {
    emptyCleanups(cleanups$2);
  }

  var sender = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cleanup: cleanup$3,
    createCustomButton: createCustomButton,
    createDefaultButton: createDefaultButton,
    createScrapButton: createScrapButton,
    sendCustom: sendCustom,
    sendDefault: sendDefault,
    sendScrap: sendScrap
  });

  function uploadImage(settings) {
    settings = processRules(settings, rules$4.uploadImage, 'Share.uploadImage');
    return requestAPI('/v2/api/talk/message/image/upload', {
      file: settings.file
    });
  }
  function deleteImage(settings) {
    settings = processRules(settings, rules$4.deleteImage, 'Share.deleteImage');
    return requestAPI('/v2/api/talk/message/image/delete', {
      image_url: settings.imageUrl
    });
  }
  function scrapImage(settings) {
    settings = processRules(settings, rules$4.scrapImage, 'Share.scrapImage');
    return requestAPI('/v2/api/talk/message/image/scrap', {
      image_url: settings.imageUrl
    });
  }

  var imageAPI = /*#__PURE__*/Object.freeze({
    __proto__: null,
    deleteImage: deleteImage,
    scrapImage: scrapImage,
    uploadImage: uploadImage
  });

  var Share = makeModule([sender, imageAPI]);
  var Share$1 = Share;

  var sizes = ['small', 'large'];
  var colors = ['yellow', 'mono'];
  var shapes = ['pc', 'mobile'];
  var titles = ['consult', 'question'];
  var langs = ['ko', 'en', 'ja'];
  function channelIdValidator(id) {
    return isString(id) && !/(.{1,2}\/)/g.test(id);
  }
  var rules$3 = {
    createAddChannelButton: {
      required: {
        container: passesOneOf([isElement, isString]),
        channelPublicId: channelIdValidator
      },
      optional: {
        size: isOneOf(sizes),
        lang: isOneOf(langs),
        supportMultipleDensities: isBoolean
      },
      defaults: {
        size: sizes[0],
        supportMultipleDensities: false
      }
    },
    addChannel: {
      required: {
        channelPublicId: channelIdValidator
      },
      optional: {
        lang: isOneOf(langs)
      }
    },
    createChatButton: {
      required: {
        container: passesOneOf([isElement, isString]),
        channelPublicId: channelIdValidator
      },
      optional: {
        size: isOneOf(sizes),
        color: isOneOf(colors),
        shape: isOneOf(shapes),
        title: isOneOf(titles),
        lang: isOneOf(langs),
        supportMultipleDensities: isBoolean
      },
      defaults: {
        size: sizes[0],
        color: colors[0],
        shape: shapes[0],
        title: titles[0],
        supportMultipleDensities: false
      }
    },
    chat: {
      required: {
        channelPublicId: channelIdValidator
      },
      optional: {
        lang: isOneOf(langs)
      }
    }
  };

  var API_VER = '1.1';
  var ADD_CHANNEL_POPUP_NAME = 'channel_add_social_plugin';
  var CHAT_POPUP_NAME = 'channel_chat_social_plugin';
  function createAddChannelButton(settings) {
    var container$ = getElement(settings.container);
    if (!container$) {
      throw new KakaoError('container is required for Channel.createAddChannelButton: pass in element or id');
    } else {
      applyAttributes(settings, container$, {
        channelPublicId: 'data-channel-public-id',
        size: 'data-size',
        supportMultipleDensities: 'data-support-multiple-densities'
      });
    }
    settings = processRules(settings, rules$3.createAddChannelButton, 'Channel.createAddChannelButton');
    var imgSrc = getAddChannelImgSrc(settings);
    var anchor$ = createAnchorImage$1(settings, imgSrc, '카카오톡 채널 추가 버튼');
    container$.appendChild(anchor$);
    var clickHandler = function clickHandler(e) {
      e.preventDefault();
      openAddChannelPopup(settings);
    };
    addEvent(anchor$, 'click', clickHandler);
    cleanups$1.push(function () {
      removeEvent(anchor$, 'click', clickHandler);
      container$.removeChild(anchor$);
    });
  }
  function addChannel(settings) {
    settings = processRules(settings, rules$3.addChannel, 'Channel.addChannel');
    openAddChannelPopup(settings);
  }
  function getAddChannelImgSrc(settings) {
    var filename = "friendadd_".concat(settings.size, "_yellow_rect.png");
    return "".concat(URL.channelIcon, "/channel/").concat(filename);
  }
  function openAddChannelPopup(settings) {
    var addChannelUrl = "".concat(URL.channel, "/").concat(settings.channelPublicId, "/friend");
    if (getAppKey$1() !== null) {
      addChannelUrl += "?".concat(makeChannelParams(API_VER, settings.lang));
    }
    windowOpen(addChannelUrl, ADD_CHANNEL_POPUP_NAME, getPopupFeatures(350, 510));
  }
  function createChatButton(settings) {
    var container$ = getElement(settings.container);
    if (!container$) {
      throw new KakaoError('container is required for Channel.createChatButton: pass in element or id');
    } else {
      applyAttributes(settings, container$, {
        channelPublicId: 'data-channel-public-id',
        size: 'data-size',
        color: 'data-color',
        shape: 'data-shape',
        title: 'data-title',
        supportMultipleDensities: 'data-support-multiple-densities'
      });
    }
    settings = processRules(settings, rules$3.createChatButton, 'Channel.createChatButton');
    var imgSrc = getChatImgSrc(settings);
    var anchor$ = createAnchorImage$1(settings, imgSrc, '카카오톡 채널 1:1 채팅 버튼');
    container$.appendChild(anchor$);
    var clickHandler = function clickHandler(e) {
      e.preventDefault();
      openChatPopup(settings);
    };
    addEvent(anchor$, 'click', clickHandler);
    cleanups$1.push(function () {
      removeEvent(anchor$, 'click', clickHandler);
      container$.removeChild(anchor$);
    });
  }
  function chat(settings) {
    settings = processRules(settings, rules$3.chat, 'Channel.chat');
    openChatPopup(settings);
  }
  function getChatImgSrc(settings) {
    var filename = "".concat(settings.title, "_").concat(settings.size, "_").concat(settings.color, "_").concat(settings.shape, ".png");
    return "".concat(URL.channelIcon, "/channel/").concat(filename);
  }
  function openChatPopup(settings) {
    var chatUrl = "".concat(URL.channel, "/").concat(settings.channelPublicId, "/chat");
    if (getAppKey$1() !== null) {
      chatUrl += "?".concat(makeChannelParams(API_VER, settings.lang));
    }
    windowOpen(chatUrl, CHAT_POPUP_NAME, getPopupFeatures(350, 510));
  }
  function makeChannelParams(apiVer, lang) {
    return buildQueryString(_objectSpread2({
      api_ver: apiVer,
      kakao_agent: KAKAO_AGENT,
      app_key: getAppKey$1(),
      referer: origin + location.pathname + location.search
    }, lang && {
      lang: lang
    }));
  }
  function createAnchorImage$1(settings, imgSrc, imgTitle) {
    var a$ = document.createElement('a');
    a$.setAttribute('href', '#');
    var img$ = document.createElement('img');
    img$.setAttribute('src', imgSrc);
    img$.setAttribute('title', imgTitle);
    img$.setAttribute('alt', imgTitle);
    if (settings.supportMultipleDensities) {
      img$.setAttribute('srcset', [imgSrc.replace('.png', '_2X.png 2x'), imgSrc.replace('.png', '_3X.png 3x')].join(', '));
    }
    a$.appendChild(img$);
    return a$;
  }
  var cleanups$1 = [];
  function cleanup$2() {
    emptyCleanups(cleanups$1);
  }

  var request$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    addChannel: addChannel,
    chat: chat,
    cleanup: cleanup$2,
    createAddChannelButton: createAddChannelButton,
    createChatButton: createChatButton
  });

  var Channel = makeModule([request$3]);
  var Channel$1 = Channel;

  var urlInfoRule = {
    required: {
      title: isString
    },
    optional: {
      desc: isString,
      name: isString,
      images: isArray$1,
      type: isString
    },
    defaults: {
      type: 'website'
    },
    after: function after(settings) {
      if (settings.images) {
        settings.imageurl = settings.images;
        delete settings.images;
      }
    }
  };
  var rules$2 = {
    createShareButton: {
      required: {
        container: passesOneOf([isElement, isString])
      },
      optional: {
        url: isString,
        text: isString
      },
      defaults: {
        url: location.href
      }
    },
    share: {
      optional: {
        url: isString,
        text: isString
      },
      defaults: {
        url: location.href
      }
    },
    open: {
      optional: {
        url: isString,
        text: isString,
        urlInfo: function urlInfo(obj) {
          return isObjectLike(obj) && !!processRules(obj, urlInfoRule, 'Story.open');
        },
        install: isBoolean
      },
      defaults: {
        url: location.href,
        install: false
      }
    },
    createFollowButton: {
      required: {
        container: passesOneOf([isElement, isString]),
        id: isString
      },
      optional: {
        showFollowerCount: isBoolean,
        type: isOneOf(['horizontal', 'vertical'])
      },
      defaults: {
        showFollowerCount: true,
        type: 'horizontal'
      },
      after: function after(settings) {
        if (settings.id[0] !== '@') {
          settings.id = "@".concat(settings.id);
        }
      }
    }
  };

  function createShareButton(settings) {
    var container$ = getElement(settings.container);
    if (!container$) {
      throw new KakaoError('container is required for Story.createShareButton: pass in element or id');
    } else {
      applyAttributes(settings, container$, {
        url: 'data-url'
      });
    }
    settings = processRules(settings, rules$2.createShareButton, 'Story.createShareButton');
    var anchor$ = createAnchorImage(URL.storyIcon, '카카오스토리 웹 공유 버튼');
    container$.appendChild(anchor$);
    var clickHandler = function clickHandler(e) {
      e.preventDefault();
      openSharePopup(settings);
    };
    addEvent(anchor$, 'click', clickHandler);
    cleanups.push(function () {
      removeEvent(anchor$, 'click', clickHandler);
      container$.removeChild(anchor$);
    });
  }
  function createAnchorImage(imgSrc, imgTitle) {
    var a$ = document.createElement('a');
    a$.setAttribute('href', '#');
    var img$ = document.createElement('img');
    img$.setAttribute('src', imgSrc);
    img$.setAttribute('title', imgTitle);
    img$.setAttribute('alt', imgTitle);
    a$.appendChild(img$);
    return a$;
  }
  function share$1(settings) {
    settings = processRules(settings, rules$2.share, 'Story.share');
    openSharePopup(settings);
  }
  function openSharePopup(settings) {
    var params = _objectSpread2(_objectSpread2({}, makeStoryParams()), {}, {
      url: settings.url
    });
    if (settings.text) {
      params.text = settings.text;
    }
    windowOpen("".concat(URL.storyShare, "?").concat(buildQueryString(params)), 'kakaostory_social_plugin', getPopupFeatures());
  }
  function open(settings) {
    settings = processRules(settings, rules$2.open, 'Story.open');
    var storyPostScheme = makeStoryPostScheme(settings);
    var androidIntent = ["intent:".concat(storyPostScheme, "#Intent"), "".concat(settings.install ? 'package=com.kakao.story;' : '', "end;")].join(';');
    var web2appOptions = {
      urlScheme: storyPostScheme,
      intentURI: androidIntent,
      appName: 'KakaoStory',
      storeURL: getInstallUrl('com.kakao.story', '486244601'),
      onUnsupportedEnvironment: function onUnsupportedEnvironment() {
        settings.fail && settings.fail();
      }
    };
    try {
      web2app$1(web2appOptions);
    } catch (error) {
    }
  }
  function makeStoryPostScheme(settings) {
    var domain = location.hostname || '';
    var params = _objectSpread2(_objectSpread2({}, makeStoryParams()), {}, {
      apiver: '1.0',
      appver: VERSION,
      appid: domain,
      appname: domain,
      post: settings.text ? "".concat(settings.text, "\n").concat(settings.url) : settings.url
    });
    if (settings.urlInfo) {
      params.urlinfo = JSON.stringify(settings.urlInfo);
      params.appname = settings.urlInfo.name || params.appname;
    }
    return "".concat(URL.storyPostScheme, "?").concat(buildQueryString(params));
  }
  function createFollowButton(settings) {
    var container$ = getElement(settings.container);
    if (!container$) {
      throw new KakaoError('container is required for Story.createFollowButton: pass in element or id');
    } else {
      applyAttributes(settings, container$, {
        id: 'data-id',
        showFollowerCount: 'data-show-follower-count',
        type: 'data-type'
      });
    }
    settings = processRules(settings, rules$2.createFollowButton, 'Story.createFollowButton');
    var _createStoryFollowIfr = createStoryFollowIframe(settings),
      iframe$ = _createStoryFollowIfr.iframe$,
      messageHandler = _createStoryFollowIfr.messageHandler;
    container$.appendChild(iframe$);
    addEvent(window, 'message', messageHandler);
    cleanups.push(function () {
      removeEvent(window, 'message', messageHandler);
      container$.removeChild(iframe$);
    });
  }
  var _storyFollowIframeId = 0;
  function createStoryFollowIframe(settings) {
    var iframeId = _storyFollowIframeId++;
    var iframeWidth = settings.showFollowerCount && settings.type === 'horizontal' ? 85 : 59;
    var iframeHeight = settings.showFollowerCount && settings.type === 'vertical' ? 46 : 20;
    var iframe$ = document.createElement('iframe');
    iframe$.src = makeStoryFollowUrl(settings, iframeId);
    iframe$.setAttribute('frameborder', '0');
    iframe$.setAttribute('marginwidth', '0');
    iframe$.setAttribute('marginheight', '0');
    iframe$.setAttribute('scrolling', 'no');
    iframe$.setAttribute('style', "width:".concat(iframeWidth, "px; height:").concat(iframeHeight, "px;"));
    var messageHandler = function messageHandler(e) {
      if (e.data && /\.kakao\.com$/.test(e.origin) && typeof e.data === 'string') {
        var _map = map(e.data.split(','), function (e) {
            return parseInt(e, 10);
          }),
          _map2 = _slicedToArray(_map, 3),
          originIframeId = _map2[0],
          afterWidth = _map2[1],
          afterHeight = _map2[2];
        if (originIframeId === iframeId) {
          if (iframeWidth !== afterWidth) {
            iframe$.style.width = "".concat(afterWidth, "px");
          }
          if (iframeHeight !== afterHeight) {
            iframe$.style.height = "".concat(afterHeight, "px");
          }
        }
      }
    };
    return {
      iframe$: iframe$,
      messageHandler: messageHandler
    };
  }
  function makeStoryFollowUrl(settings, iframeId) {
    var params = _objectSpread2(_objectSpread2({}, makeStoryParams()), {}, {
      id: settings.id,
      type: settings.type,
      hideFollower: !settings.showFollowerCount,
      frameId: iframeId
    });
    return "".concat(URL.storyChannelFollow, "?").concat(buildQueryString(params));
  }
  function makeStoryParams() {
    var params = {
      kakao_agent: KAKAO_AGENT
    };
    if (getAppKey$1() !== null) {
      params.app_key = getAppKey$1();
    }
    return params;
  }
  var cleanups = [];
  function cleanup$1() {
    emptyCleanups(cleanups);
  }

  var request$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    cleanup: cleanup$1,
    createFollowButton: createFollowButton,
    createShareButton: createShareButton,
    open: open,
    share: share$1
  });

  var Story = makeModule([request$2]);
  var Story$1 = Story;

  var coordTypes = ['wgs84', 'katec'];
  var vehicleTypes = [1, 2, 3, 4, 5, 6, 7];
  var rpOptions = [1, 2, 3, 4, 5, 6, 8, 100];
  var viaPointRule = {
    required: {
      name: isString,
      x: isNumber,
      y: isNumber
    },
    optional: {
      rpflag: isString,
      cid: isString
    }
  };
  var rules$1 = {
    start: {
      required: {
        name: isString,
        x: isNumber,
        y: isNumber
      },
      optional: {
        coordType: isOneOf(coordTypes),
        vehicleType: isOneOf(vehicleTypes),
        rpOption: isOneOf(rpOptions),
        routeInfo: isBoolean,
        sX: isNumber,
        sY: isNumber,
        sAngle: isNumber,
        returnUri: isString,
        rpflag: isString,
        cid: isString,
        guideId: isNumber,
        viaPoints: function viaPoints(points) {
          if (!isArray$1(points)) {
            return false;
          } else if (points.length > 3) {
            throw new KakaoError('Invalid parameter keys: via points should not be exceed 3. at Navi.start');
          } else {
            forEach(points, function (point) {
              return processRules(point, viaPointRule, 'Navi.start');
            });
            return true;
          }
        }
      },
      defaults: {
        coordType: 'katec',
        vehicleType: 1,
        rpOption: 100,
        routeInfo: false
      }
    },
    share: {
      required: {
        name: isString,
        x: isNumber,
        y: isNumber
      },
      optional: {
        coordType: isOneOf(coordTypes),
        rpflag: isString,
        cid: isString,
        guideId: isNumber
      },
      defaults: {
        coordType: 'katec'
      }
    }
  };

  function start(settings) {
    settings = processRules(settings, rules$1.start, 'Navi.start');
    var naviStartParams = buildQueryString(makeNaviStartParams(settings));
    var naviScheme = "".concat(URL.naviScheme, "?").concat(naviStartParams);
    var fallbackUrl = "".concat(URL.naviFallback, "?").concat(naviStartParams);
    callWeb2app(naviScheme, fallbackUrl);
  }
  function makeNaviStartParams(settings) {
    var destination = {
      name: settings.name,
      x: settings.x,
      y: settings.y,
      rpflag: settings.rpflag,
      cid: settings.cid,
      guide_id: settings.guideId
    };
    var option = {
      coord_type: settings.coordType,
      vehicle_type: settings.vehicleType,
      rpoption: settings.rpOption,
      route_info: settings.routeInfo,
      s_x: settings.sX,
      s_y: settings.sY,
      s_angle: settings.sAngle,
      return_uri: settings.returnUri
    };
    return _objectSpread2(_objectSpread2({}, makeNaviParams()), {}, {
      param: {
        destination: destination,
        option: option,
        via_list: settings.viaPoints
      }
    });
  }
  function share(settings) {
    settings = processRules(settings, rules$1.share, 'Navi.share');
    var naviShareParams = buildQueryString(makeNaviShareParams(settings));
    var naviScheme = "".concat(URL.naviScheme, "?").concat(naviShareParams);
    var fallbackUrl = "".concat(URL.naviFallback, "?").concat(naviShareParams);
    callWeb2app(naviScheme, fallbackUrl);
  }
  function makeNaviShareParams(settings) {
    var destination = {
      name: settings.name,
      x: settings.x,
      y: settings.y,
      rpflag: settings.rpflag,
      cid: settings.cid,
      guide_id: settings.guideId
    };
    var option = {
      route_info: true,
      coord_type: settings.coordType
    };
    return _objectSpread2(_objectSpread2({}, makeNaviParams()), {}, {
      param: {
        destination: destination,
        option: option
      }
    });
  }
  function makeNaviParams() {
    return {
      appkey: getAppKey$1(),
      apiver: '1.0',
      extras: {
        KA: KAKAO_AGENT
      }
    };
  }
  function callWeb2app(naviScheme, fallbackUrl) {
    var androidIntent = ["intent:".concat(naviScheme, "#Intent"), "S.browser_fallback_url=".concat(encodeURIComponent(fallbackUrl)), 'end;'].join(';');
    var web2appOptions = {
      urlScheme: naviScheme,
      intentURI: androidIntent,
      storeURL: fallbackUrl,
      universalLink: fallbackUrl
    };
    try {
      web2app$1(web2appOptions);
    } catch (error) {
    }
  }

  var request$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    share: share,
    start: start
  });

  var Navi = makeModule([request$1]);
  var Navi$1 = Navi;

  function pickableCountValidator(n) {
    return isInteger(n) && n > 0 && n < 101;
  }
  function checkPickableCounts(settings) {
    if (settings.maxPickableCount < settings.minPickableCount) {
      throw new KakaoError('"minPickableCount" should not larger than "maxPickableCount"');
    }
  }
  function disableSelectOptionsValidator(arr) {
    var disableSelectOptionRule = {
      required: {
        reason: isOneOf(['msgBlocked', 'registered', 'unregistered', 'notFriend', 'custom'])
      },
      optional: {
        message: isString,
        uuids: isArray$1
      },
      after: function after(settings) {
        if (settings.reason === 'custom' && (!settings.message || !settings.uuids)) {
          throw new KakaoError('"message" and "uuids" must be set for "custom" option in disableSelectOption');
        }
      }
    };
    return isArray$1(arr) && every(arr, function (e) {
      return isObjectLike(e) && !!processRules(e, disableSelectOptionRule, 'disableSelectOption');
    });
  }
  function checkPickerChatFilters(settings) {
    if (settings.selectionType === 'chatMember') {
      var f = settings.chatFilters;
      if (f.indexOf('open') > -1) {
        throw new KakaoError('"open" is not allowed in "chatFilters"');
      }
      if ((f.indexOf('direct') > -1 || f.indexOf('multi') > -1) && f.indexOf('regular') === -1) {
        throw new KakaoError('"regular" should be included in "chatFilters"');
      }
    }
  }
  var friendFilters = ['none', 'invitable', 'registered'];
  var serviceTypeFilters = ['talk', 'story', 'talkstory'];
  var selectionTypes = ['chat', 'chatMember'];
  var _chatFilters = ['regular', 'direct', 'multi', 'open'];
  var osFilters = ['all', 'ios', 'android'];
  var friendPickerOptional = {
    returnUrl: isString,
    friendFilter: isOneOf(friendFilters),
    serviceTypeFilter: isOneOf(serviceTypeFilters),
    title: isString,
    enableSearch: isBoolean,
    countryCodeFilters: isArray$1,
    usingOsFilter: isOneOf(osFilters),
    showMyProfile: isBoolean,
    showFavorite: isBoolean,
    disableSelectOptions: disableSelectOptionsValidator,
    displayAllProfile: isBoolean,
    enableBackButton: isBoolean
  };
  var friendsParamsRule = {
    optional: {
      friendFilter: isOneOf(friendFilters),
      serviceTypeFilter: isOneOf(serviceTypeFilters),
      countryCodeFilters: isArray$1,
      usingOsFilter: isOneOf(osFilters),
      showMyProfile: isBoolean,
      showFavorite: isBoolean,
      showPickedFriend: isBoolean
    }
  };
  var chatParamsRule = {
    optional: {
      selectionType: isOneOf(selectionTypes),
      chatFilters: function chatFilters(arr) {
        return isArray$1(arr) && every(arr, function (e) {
          return isOneOf(_chatFilters)(e);
        });
      }
    },
    defaults: {
      selectionType: selectionTypes[0],
      chatFilters: [_chatFilters[0]]
    },
    after: checkPickerChatFilters
  };
  var rules = {
    selectFriend: {
      optional: friendPickerOptional
    },
    selectFriends: {
      optional: _objectSpread2(_objectSpread2({}, friendPickerOptional), {}, {
        showPickedFriend: isBoolean,
        maxPickableCount: pickableCountValidator,
        minPickableCount: pickableCountValidator
      }),
      after: checkPickableCounts
    },
    selectChat: {
      optional: {
        returnUrl: isString,
        selectionType: isOneOf(selectionTypes),
        chatFilters: function chatFilters(arr) {
          return isArray$1(arr) && every(arr, function (e) {
            return isOneOf(_chatFilters)(e);
          });
        },
        title: isString,
        enableSearch: isBoolean,
        disableSelectOptions: disableSelectOptionsValidator,
        displayAllProfile: isBoolean,
        maxPickableCount: pickableCountValidator,
        minPickableCount: pickableCountValidator,
        enableBackButton: isBoolean
      },
      defaults: {
        selectionType: selectionTypes[0],
        chatFilters: [_chatFilters[0]]
      },
      after: function after(settings) {
        checkPickableCounts(settings);
        checkPickerChatFilters(settings);
      }
    },
    select: {
      optional: {
        returnUrl: isString,
        title: isString,
        enableSearch: isBoolean,
        disableSelectOptions: disableSelectOptionsValidator,
        displayAllProfile: isBoolean,
        maxPickableCount: pickableCountValidator,
        minPickableCount: pickableCountValidator,
        enableBackButton: isBoolean,
        friendsParams: function friendsParams(obj) {
          return isObjectLike(obj) && !!processRules(obj, friendsParamsRule, 'Picker.select');
        },
        chatParams: function chatParams(obj) {
          return isObjectLike(obj) && !!processRules(obj, chatParamsRule, 'Picker.select');
        }
      },
      after: checkPickableCounts
    }
  };

  var _excluded = ["returnUrl", "friendsParams", "chatParams"];
  function selectFriends(settings) {
    settings = processRules(settings, rules.selectFriends, 'Picker.selectFriends');
    return requestPicker(settings, '/select/multiple');
  }
  function selectFriend(settings) {
    settings = processRules(settings, rules.selectFriend, 'Picker.selectFriend');
    return requestPicker(settings, '/select/single');
  }
  function selectChat(settings) {
    settings = processRules(settings, rules.selectChat, 'Picker.selectChat');
    return requestPicker(settings, '/chat/select');
  }
  function select(settings) {
    settings = processRules(settings, rules.select, 'Picker.select');
    return requestPicker(settings, '/tab/select');
  }
  var helper = new MessageHelper(URL.pickerDomain);
  function requestPicker(settings, subpath) {
    var transId = generateRandomValue(60);
    var params = _objectSpread2(_objectSpread2({
      transId: transId,
      appKey: getAppKey$1(),
      ka: KAKAO_AGENT
    }, getAccessToken() && {
      token: getAccessToken()
    }), flattenParams(settings));
    if (settings.returnUrl) {
      params.returnUrl = settings.returnUrl;
      submitForm(URL.pickerDomain + subpath, params);
    } else {
      helper.createHiddenIframe(transId, "/proxy?transId=".concat(transId));
      return helper.retrieveMessage(subpath, params, 'picker');
    }
  }
  function flattenParams(settings) {
    settings.returnUrl;
      var friendsParams = settings.friendsParams,
      chatParams = settings.chatParams,
      rest = _objectWithoutProperties(settings, _excluded);
    return formatParams(_objectSpread2(_objectSpread2(_objectSpread2({}, rest), friendsParams), chatParams));
  }
  function formatParams(params) {
    var keysNeedConvertToCSV = ['countryCodeFilters', 'chatFilters'];
    keysNeedConvertToCSV.forEach(function (key) {
      if (params[key] !== undefined) {
        params[key] = params[key].join(',');
      }
    });
    if (params.disableSelectOptions) {
      params.disableSelectOptions = JSON.stringify(params.disableSelectOptions);
    }
    return params;
  }

  var request = /*#__PURE__*/Object.freeze({
    __proto__: null,
    select: select,
    selectChat: selectChat,
    selectFriend: selectFriend,
    selectFriends: selectFriends
  });

  var Picker = makeModule([request]);
  var Picker$1 = Picker;

  if (typeof define === 'function' && define.amd) {
    window.Kakao = exports;
  }
  if (typeof window.kakaoAsyncInit === 'function') {
    setTimeout(function () {
      window.kakaoAsyncInit();
    }, 0);
  }
  function init(appKey) {
    if (UA.browser.msie && UA.browser.version.major < 11) {
      throw new KakaoError('Kakao.init: Unsupported browser');
    }
    if (isInitialized()) {
      throw new KakaoError('Kakao.init: Already initialized');
    }
    if (!isString(appKey)) {
      throw new KakaoError('Kakao.init: App key must be provided');
    }
    setAppKey(appKey);
    {
      this.Auth = Auth$1;
      this.API = API$1;
      this.Share = Share$1;
      this.Channel = Channel$1;
      this.Story = Story$1;
      this.Navi = Navi$1;
      this.Picker = Picker$1;
    }
  }
  function isInitialized() {
    return getAppKey$1() !== null;
  }
  function cleanup() {
    var _this = this;
    Object.keys(this).filter(function (e) {
      return isObjectLike(_this[e]);
    }).forEach(function (e) {
      return _this[e].cleanup && _this[e].cleanup();
    });
    setAppKey(null);
  }

  exports.VERSION = VERSION;
  exports.cleanup = cleanup;
  exports.init = init;
  exports.isInitialized = isInitialized;

}));
