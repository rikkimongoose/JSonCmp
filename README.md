JSonCmp
=======

Compare any JavaScript objects. The following types are supported:

- value-typed
- generated Objects
- jQuery objects
- arrays
- arrays taking as sets (no care about order)
- JSON-serialized items

Interface
====

```javascript
	jSonCom(object1, object2[, options]);
```

- *object1* - 1st object
- *object2* - 2nd object
- *options* - an optional param with extra config

Returns:
- *true* - objects has same properties with same values
- *false* - they are different

Usage
====

JSonCmp can be used as a single file or as a [Ext.JS](http://www.sencha.com/products/extjs) plugin.

To use it as *single file*, include **jsoncmp.js** as an outer JS file and use jSonCmp() function.

```javascript
	jSonCom(object1, object2);
```

To use it as an [Ext.JS](http://www.sencha.com/products/extjs) plugin, include **jsoncmp.ext.js** as an outer JS file and use  Ext.ux.util.Object.jSonCmp() function.

```javascript
	Ext.ux.util.Object(object1, object2);
```

It needs Ext.js, of course.

Options
====
Options are optional. If you didn't define an option, the default value will be used.

+ *arraysAsSets* - take arrays not like ordered lists, but as sets, ignoring the order. For example, [1, 2, 3, 4] and [1, 2, 4, 3] aren't equal as ordered lists, but are as sets. By default is *false*.
  See example:

```javascript
 jSonCmp([ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 5, 4 ])); # - false

 jSonCmp([ 1, 2, 3, 4, 5 ], [ 1, 2, 3, 5, 4 ], { arraysAsSets : true })); # - true
```
History
====
It started from a bug in a huge web project with UI based on [Ext.JS](http://www.sencha.com/products/extjs). The settings window asked me to save changes even if I didn't change anything.

Why did it happen? After a half of hous I've found the reason. The old and the new options objects were Ext.js-generated objects, serialized to JSon strings. There were almost the same, but the *order of params was differen*. String comparation for them returned false, that was definitely *wrong*.

The first version was released to fix this bug. But I've decide to proceed my research, because comparation in JavaScript isn't as easy as in strongly-typed languages.

What if I compare 2 objects, generated separately, but with same values in same properties? Or 2 arrays with different objects? Or...?

That's why I've started this project. It's called JSonCmp, but now it supports much more then JSon's.

Versions
====

*1.3*

+ Fix the bug with global var
+ add Options param
+ add arrays comparation
+ add arrays comparation as sets
+ add jQuery objects comparation
+ add testing pages

*1.2.2*

+ code is refactored totally
+ fix some little bugs

*1.2*

+ functions comparation
+ add stack array to avoid cycling if an object links to itself somewere in properties' tree

*1.0*

initial release. Enought to solve bug in project I've worked with, but nothing more


License
====

This software is released under the [GNU Lesser General Public License](http://www.gnu.org/copyleft/lesser.html).

Thanks
====

- JP Richardson for [idea of function compare](http://procbits.com/2012/01/19/comparing-two-javascript-objects/)
- John Resig for Array Remove function
- [Ext.JS](http://www.sencha.com/products/extjs) developers for idea of string => JSON parser
