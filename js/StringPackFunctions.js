/**
 * A package with some functions to work with Strigns ;
*/

/**
  example of use :
  'abc'.isBiggerThan(1); // true ;
  'abc'.isBiggerThan(5); // false ;
*/
String.prototype.isBiggerThan = function(size) {
    if (this.length > size) {
        return true ;
    }
    
    return false;
};
