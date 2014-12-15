/**
 *      localStorage.js
 *
 *      Tiny localStorage module for mobile, check and try to use native localStorage api first,
 *      if localStorage is not available(e.g : IOS safari security mode or localStorage is disabled), use cookie instead.
 *
 *      Author: xiaoyuze88@gmail.com (https://github.com/xiaoyuze88/localStorage.js)
 *
 *
 */

;(function(factory) {
  if (typeof define == "function" && define.amd)
    return define(factory);
  else
    this.localStorageJS = factory();
})(function(){

    'use strict';

    var localStorageJS = (function() {

        var isLocalstorageEnable = (function() {
                try {
                    localStorage.setItem("__test", '123');
                    localStorage.removeItem("__test");
                    return true;
                } catch (e) {
                    return false;
                }
            })(),
            options = {
                prefix: '__localStorageJS',
                // hours
                expires: 24
            };
            


        function config(opts) {

            if (!opts) return;

            for (var i in options) {
                if (opts.hasOwnProperty(i)) {
                    options[i] = opts[i];
                }
            }
        }

        var _cookie = {
            get: function(key) {
                var arr = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
                if (arr)
                    return unescape(arr[2]);
                else
                    return null;
            },
            set: function(key, value) {
                var exp = new Date();
                exp.setTime(exp.getTime() + options.expires * 60 * 60 * 1000);
                document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
            },
            remove: function(key) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                documentcookie = key + "=;expires=" + exp.toUTCString();
            }
        }

        var _localstorage = {
            get: function(key) {
                var name = options.prefix + key,
                    data = window.localStorage.getItem(name);

                if (data) {
                    try {
                        data = JSON.parse(data);

                        if(data.expires - Date.now() > 0) {
                            return data.data;
                        }
                        // expired
                        else {
                            window.localStorage.removeItem(name);
                            return null;
                        }
                    }
                    catch(e) {
                        return null;
                    }
                }
                else {
                    return null;
                }
            },
            set: function(key, value) {
                var name = options.prefix + key,
                    storage = {
                        data: value,
                        expires: Date.now() + options.expires * 60 * 60 * 1000
                    };

                window.localStorage.setItem(name, JSON.stringify(storage));
            },
            remove: function(key) {
                var name = options.prefix + key;
                window.localStorage.removeItem(name);
            }
        }

        var func = isLocalstorageEnable ? _localstorage: _cookie;

        function set(key, value) {
            if (!key || !value) return false;
            return func['set'](key, value);
        }

        function get(key) {
            if (!key) return null;
            return func['get'](key);
        }

        function remove(key) {
            if (!key) return false;
            return func['remove'](key);
        }

        return {
            config: config,
            set: set,
            get: get,
            remove: remove
        }

    })();

    return localStorageJS;
});
