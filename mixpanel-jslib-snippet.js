// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name fap-jslib-2.2-snippet.min.js
// ==/ClosureCompiler==

/** @define {string} */
var FAP_LIB_URL = 'fap.min.js';

(function(document, fap){
    // Only stub out if this is the first time running the snippet.
    if (!fap['__SV']) {
        var win = window;

        // grab the hash params for ce editor immediately in case
        // host website changes hash after init
        try {
          var getHashParam, matches, state, loc = win.location, hash = loc.hash;
          getHashParam = function(hash, param) {
              matches = hash.match(new RegExp(param + '=([^&]*)'));
              return matches ? matches[1] : null;
          };
          if (hash && getHashParam(hash, 'state')) {
              state = JSON.parse(decodeURIComponent(getHashParam(hash, 'state')));
              if (state['action'] === 'mpeditor') {
                win.sessionStorage.setItem('_mpcehash', hash);
                history.replaceState(state['desiredHash'] || '', document.title, loc.pathname + loc.search); // remove ce editor hash
              }
          }
        } catch (e) {}

        var script, first_script, gen_fn, functions, i, lib_name = "fap";
        window[lib_name] = fap;

        fap['_i'] = [];

        fap['init'] = function (token, config, name) {
            // support multiple fap instances
            var target = fap;
            if (typeof(name) !== 'undefined') {
                target = fap[name] = [];
            } else {
                name = lib_name;
            }

            // Pass in current people object if it exists
            target['people'] = target['people'] || [];
            target['toString'] = function(no_stub) {
                var str = lib_name;
                if (name !== lib_name) {
                    str += "." + name;
                }
                if (!no_stub) {
                    str += " (stub)";
                }
                return str;
            };
            target['people']['toString'] = function() {
                // 1 instead of true for minifying
                return target.toString(1) + ".people (stub)";
            };

            function _set_and_defer(target, fn) {
                var split = fn.split(".");
                if (split.length == 2) {
                    target = target[split[0]];
                    fn = split[1];
                }
                target[fn] = function(){
                    target.push([fn].concat(Array.prototype.slice.call(arguments, 0)));
                };
            }

            // create shallow clone of the public fap interface
            // Note: only supports 1 additional level atm, e.g. fap.people.set, not fap.people.set.do_something_else.
            functions = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(' ');
            for (i = 0; i < functions.length; i++) {
                _set_and_defer(target, functions[i]);
            }

            // register fap instance
            fap['_i'].push([token, config, name]);
        };

        // Snippet version, used to fail on new features w/ old snippet
        fap['__SV'] = 1.2;

        script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = FAP_LIB_URL;

        //if (typeof fap_CUSTOM_LIB_URL !== 'undefined') {
        //    script.src = fap_CUSTOM_LIB_URL;
        //} else if (document.location.protocol === 'file:' && FAP_LIB_URL.match(/^\/\//)) {
        //    script.src = 'https:' + FAP_LIB_URL;
        //} else {
        //    script.src = FAP_LIB_URL;
        //}

        first_script = document.getElementsByTagName("script")[0];
        first_script.parentNode.insertBefore(script, first_script);
    }
// Pass in current fap object if it exists (for ppl like Optimizely)
})(document, window['fap'] || []);
