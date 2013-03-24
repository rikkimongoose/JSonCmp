JSonCmp
=======

Compare any JavaScript objects. The following types are supported:\

- value-typed
- generated Objects
- jQuery objects
- arrays
- arrays taking as sets (no care about order)
- JSON-serialized items

Usage
====

History
====
It started from a bug in a huge web project with UI based on [Ext.JS](http://www.sencha.com/products/extjs). The settings window asked me to save changes even if I didn't change anything.

Why did it happen? After a half of hous I've found the reason. The old and the new options objects were Ext.js-generated objects, serialized to JSon strings. There were almost the same, but the *order of params was differen*. String comparation for them returned false, that was definitely *wrong*.

The first version was released to fix this bug. But I've decide to proceed my research, because comparation in JavaScript isn't as easy as in strongly-typed languages.

What if I compare 2 objects, generated separately, but with same values in same properties? Or 2 arrays with different objects? Or...?

That's why I've started this project. It's called JSonCmp, but now it supports much more then JSon's.

Versions
====
*1.0*

initial release. Enought to solve bug in project I've worked with, but nothing more

*1.2*

+ functions comparation
+ add stack array to avoid cycling if an object links to itself somewere in properties' tree

*1.2.2*

+ code is refactored totally
+ fix some little bugs

*1.3 alpha*

+ Fix the bug with global var
+ add Options param
+ add arrays comparation
+ add arrays comparation as sets
+ add jQuery objects comparation


License
====

This software is released under the [GNU Lesser General Public License](http://www.gnu.org/copyleft/lesser.html).

Thanks
====

- JP Richardson for [idea of function compare](http://procbits.com/2012/01/19/comparing-two-javascript-objects/)
- John Resig for Array Remove function
- (Ext.JS developers for idea of string => JSON parser
