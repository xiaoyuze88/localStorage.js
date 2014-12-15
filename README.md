localStorage.js
===============

Tiny localStorage module, check and try to use native localStorage api if the browser is supported, otherwise use cookie instead.

## QUICK START

In AMD, use it like:

    require('localStorageJS',function(localStorageJS){
        localStorageJS.set('yourkey','yourvalue');

        localStorageJS.get('yourkey');    //yourvalue
    });

Otherwise:
    
`localStorageJS` just explodes to the global `window` object.  
Use it directly.

    localStorageJS.set('yourkey','yourvalue');

    localStorageJS.get('yourkey');    //yourvalue


## METHODS

### localStorageJS.set(key,value)

### localStorageJS.get(key)

### localStorageJS.remove(key)

### localStorageJS.config(options)

    options(Object) : {
        prefix : (String), you can set your own prefix when storaging in localStorage. Default to be `__localStorageJS`
        expires : (Number) expires hours, default to be 24
    }

