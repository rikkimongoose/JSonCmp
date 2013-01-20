//JSonCmp v. 1.2
//Compare JSon objects
//Copyright(c) Alexander "Rikki Mongoose" Teut, 2013
//http://github.com/rikkimongoose

function compareJSons(src1, src2) {
	//Based on the idea from Ext.JSON functions.
	var decodeJSon = function(sourceStr) {
		var isJSONSupported = (window.JSON && JSON.toString() == '[object JSON]');
			evalJSon = function(code) {
				return eval('(' + code + ')');
			}
		dc = isJSONSupported ? JSON.parse : evalJSon;
		try {
			return dc(sourceStr);
		} catch (e) {
			return sourceStr;
		}
	};
	var prepareToCompare = function(sourceStr){
		return (typeof sourceStr == "string") ? decodeJSon(sourceStr) : sourceStr;
	};
	var getObjectLength = function(sourceObj){
		return (sourceObj && isExisting(sourceObj.length)) ? sourceObj.length : 0;
	};
	var isExisting = function(obj){
		return (typeof obj != "undefined");
	};
	var isObject = function(obj){
		return (typeof obj == "object");
	};
	var isFunction = function(func){
		return (typeof func == "function");
	};
	var compareFunctions = function(func1, func2) {
		return func1.toString() == func2.toString();
	};
	var CmpStack = {
		_stackArray : [],
		_cmpStackCount : 0,
		// Array Remove - By John Resig (MIT Licensed)
		_cmpStackRemove : function(from) {
			var rest = this._stackArray.slice(from + 1 || this._stackArray.length);
			this._stackArray.length = from < 0 ? this._stackArray.length + from : from;
			return this._stackArray.push.apply(this._stackArray, rest);
		},
		objInCmpStack : function(obj) {
			var i = this._cmpStackCount;
			while(i--) {
				if(obj === this._stackArray[i]) {
					return i;
				}
			}
			return -1;
		},
		addObject : function(obj) {
			this._stackArray.push(obj);
			this._cmpStackCount++;
		},
		remObject : function(obj) {
			var pos = this.objInCmpStack(obj);
			if(pos == -1) {
				return;
			}
			this._cmpStackRemove(pos);
			this._cmpStackCount--;
		}
	};
	var doComparation = function(sourceStr1, sourceStr2) {
		if(sourceStr1 == sourceStr2) {
			return true;
		}
		if(!isExisting(sourceStr1)) {
			return !isExisting(sourceStr2);
		}
		if(isFunction(sourceStr1)) {
			if(isFunction(sourceStr1)) {
				compareFunctions(sourceStr1, sourceStr2);
			} else {
				return false;
			}
		}
		var sourceObj1 = prepareToCompare(sourceStr1),
			lengthObj1 = getObjectLength(sourceObj1),
			sourceObj2 = prepareToCompare(sourceStr2),
			lengthObj2 = getObjectLength(sourceObj2),
			result = true;
		if(lengthObj1 != lengthObj2) {
			return false;
		}
		if(isObject(sourceObj1)) {
			if(isObject(sourceObj2)) {
				CmpStack.addObject(sourceObj1);
				CmpStack.addObject(sourceObj2);
				for(var propertyObject in sourceObj1) {
					//debug output
					//console.log(propertyObject + ":" + sourceObj1[propertyObject]);
					//console.log(propertyObject + ":" + sourceObj2[propertyObject]);
					var propertyObjectField1 = sourceObj1[propertyObject];
					var propertyObjectField2 = sourceObj2[propertyObject];
					if(CmpStack.objInCmpStack(propertyObjectField1) > -1 || CmpStack.objInCmpStack(propertyObjectField2) > -1) {
						return (propertyObjectField1 === propertyObjectField1);
					}
					result = result && isExisting(propertyObjectField2) && doComparation(propertyObjectField1, propertyObjectField2);
					if(!result) {
						break;
					}
				}
				CmpStack.remObject(sourceObj1);
				CmpStack.remObject(sourceObj2);
				return result;
			} else {
				return false;
			}
		} else {
			if(!isObject(sourceObj2)) {
				return sourceObj1 === sourceObj2;
			} else {
				return false;
			}
		}
		return true;
	}
	return doComparation(src1, src2);
}