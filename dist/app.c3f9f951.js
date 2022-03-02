// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/app.js":[function(require,module,exports) {
document.querySelector('#link').hidden = true;

if (!sessionStorage.getItem('Token')) {
  document.querySelector('#link').click();
} else {
  document.querySelector('#pos-table').innerHTML = "\n    <table class=\"table-pos\">\n        <tr>\n            <td>\u0424\u0418\u041E</td>\n            <td>\u0414\u0430\u0442\u0430</td>\n            <td>\u0412\u0440\u0435\u043C\u044F</td>\n        </tr>\n    </table>\n    ";
  document.querySelector('#abon-table').innerHTML = "\n    <table class=\"table-abon\">\n        <tr>\n            <td>\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435</td>\n            <td>\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F</td>\n            <td>\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430</td>\n            <td>\u0426\u0435\u043D\u0430</td>\n        </tr>\n    </table>\n    ";
  document.querySelector('#cli-table').innerHTML = "\n    <table class=\"table-cli\">\n        <tr>\n            <td>\u0424\u0418\u041E</td>\n            <td>\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430</td>\n            <td>\u041A\u043B\u0443\u0431\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430</td>\n            <td>\u0414\u0430\u0442\u0430 \u043F\u043E\u043A\u0443\u043F\u043A\u0438</td>\n            <td>\u0421\u0440\u043E\u043A \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F</td>\n        </tr>\n    </table>\n    ";
  getAbonData();
  getSmenData();
  getPosData();
  getClientsData();
  document.querySelector('#btn-addPos').addEventListener('click', function () {
    var dt = new Date();
    var date = null,
        time = null;
    console.log(dt.getDate());
    console.log(dt.getMonth());

    if (dt.getDate() < 10 && dt.getMonth() + 1 < 10) {
      date = "0".concat(dt.getDate(), ".") + "0".concat(dt.getMonth() + 1, ".") + "".concat(dt.getFullYear());
    } else if (dt.getDate() > 10 && dt.getMonth() + 1 < 10) {
      date = "".concat(dt.getDate(), ".") + "0".concat(dt.getMonth() + 1, ".") + "".concat(dt.getFullYear());
    } else if (dt.getDate() < 10 && dt.getMonth() + 1 > 10) {
      date = "0".concat(dt.getDate(), ".") + "".concat(dt.getMonth() + 1, ".") + "".concat(dt.getFullYear());
    } else {
      date = "".concat(dt.getDate(), ".") + "".concat(dt.getMonth() + 1, ".") + "".concat(dt.getFullYear());
    }

    if (dt.getHours() < 10 || dt.getMinutes() < 10) {
      if (dt.getMinutes() < 10) {
        time = "0".concat(dt.getHours(), ":") + "0".concat(dt.getMinutes());
      } else {
        time = "0".concat(dt.getHours(), ":") + "".concat(dt.getMinutes());
      }
    } else {
      time = "".concat(dt.getHours(), ":") + "".concat(dt.getMinutes());
    }

    posWriteInDB('pos', document.querySelector('#FIO').value, date, time);
  });
  document.querySelector('#btn-addAbon').addEventListener('click', function () {
    abonWriteInDB('abon', document.querySelector('#abon-name').value, document.querySelector('#abon-sda').value, document.querySelector('#abon-prem').value, document.querySelector('#price').value + 'BYN');
  });
  document.querySelector('#btn-addCli').addEventListener('click', function () {
    cliWriteInDB('clients', document.querySelector('#pFIO').value, document.querySelector('#phone').value, document.querySelector('#pAbon').value, document.querySelector('#dsale').value, document.querySelector('#sda').value);
  });
  document.querySelector('.btn-exit').addEventListener('click', function () {
    sessionStorage.clear();
    document.querySelector('#link').click();
  });
  var btnclck = document.querySelector('.learn');
  btnclck.addEventListener('click', removeHandler);
  btnclck.addEventListener('click', editHandler);
}

function editClient(link, name, FIO, phone, abon, dsale, sda) {
  return fetch("https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/".concat(link, "/").concat(name, ".json"), {
    method: 'PATCH',
    body: JSON.stringify({
      FIO: FIO,
      phone: phone,
      abon: abon,
      dsale: dsale,
      sda: sda
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    return location.reload();
  });
}

function editHandler(event) {
  if (!event.target.dataset.edit || !event.target.dataset.name) {
    return;
  }

  var name = event.target.dataset.name; //console.log(name)

  return fetch("https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/clients/".concat(name, ".json")).then(function (response) {
    return response.json();
  }).then(function (response) {
    //console.log(response)
    document.querySelector('#EpFIO').value = response.FIO;
    document.querySelector('#Ephone').value = response.phone;
    document.querySelector('#EpAbon').value = response.abon;
    document.querySelector('#Edsale').value = response.dsale;
    document.querySelector('#Esda').value = response.sda;
    document.querySelector('#btn-edtCli').addEventListener('click', function () {
      editClient('clients', name, document.querySelector('#EpFIO').value, document.querySelector('#Ephone').value, document.querySelector('#EpAbon').value, document.querySelector('#Edsale').value, document.querySelector('#Esda').value);
    });
  });
}

function removeHandler(event) {
  if (!event.target.dataset.name || !event.target.dataset.link) {
    return;
  }

  var name = event.target.dataset.name;
  var link = event.target.dataset.link;
  delData(link, name);
}

function cliWriteInDB(link, FIO, phone, abon, dsale, sda) {
  return fetch("https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/".concat(link, ".json"), {
    method: 'POST',
    body: JSON.stringify({
      FIO: FIO,
      phone: phone,
      abon: abon,
      dsale: dsale,
      sda: sda
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    //console.log(response)
    document.querySelector('#pFIO').value = null;
    document.querySelector('#phone').value = null;
    document.querySelector('#pAbon').value = null;
    document.querySelector('#dsale').value = null;
    document.querySelector('#sda').value = null;
    location.reload();
  });
}

function abonWriteInDB(link, name, sda, prem, price) {
  return fetch("https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/".concat(link, ".json"), {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      sda: sda,
      prem: prem,
      price: price
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    //console.log(response)
    document.querySelector('#abon-name').value = null;
    document.querySelector('#price').value = null;
    location.reload();
  });
}

function posWriteInDB(link, FIO, date, time) {
  return fetch("https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/".concat(link, ".json"), {
    method: 'POST',
    body: JSON.stringify({
      FIO: FIO,
      date: date,
      time: time
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    //console.log(response)
    document.querySelector('#FIO').value = null;
    location.reload();
  });
}

function getAbonData() {
  return fetch('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/abon.json').then(function (response) {
    return response.json();
  }).then(function (response) {
    Object.keys(response).map(function (key) {
      document.querySelector('.table-abon').innerHTML += "\n                <tr>\n                    <td>".concat(response[key].name, "</td>\n                    <td>").concat(response[key].sda, "</td>\n                    <td>").concat(response[key].prem, "</td>\n                    <td>").concat(response[key].price, "</td>\n                    <td><button class=\"btn-del\" data-name=\"").concat(key, "\" data-link=\"abon\">&#10060;</button></td>\n                </tr>\n            ");
    });
  });
}

function getSmenData() {
  return fetch('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/smen.json').then(function (response) {
    return response.json();
  }).then(function (response) {
    Object.keys(response).map(function (key) {
      console.log(key);
    });
  });
}

function getPosData() {
  return fetch('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/pos.json').then(function (response) {
    return response.json();
  }).then(function (response) {
    Object.keys(response).map(function (key) {
      document.querySelector('.table-pos').innerHTML += "\n                <tr>\n                    <td>".concat(response[key].FIO, "</td>\n                    <td>").concat(response[key].date, "</td>\n                    <td>").concat(response[key].time, "</td>\n                    <td><button class=\"btn-del\" data-name=\"").concat(key, "\" data-link=\"pos\">&#10060;</button></td>\n                </tr>\n            ");
    });
  });
}

function getClientsData() {
  return fetch('https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/clients.json').then(function (response) {
    return response.json();
  }).then(function (response) {
    Object.keys(response).map(function (key) {
      document.querySelector('.table-cli').innerHTML += "\n                <tr>\n                    <td>".concat(response[key].FIO, "</td>\n                    <td>").concat(response[key].phone, "</td>\n                    <td>").concat(response[key].abon, "</td>\n                    <td>").concat(response[key].dsale, "</td>\n                    <td>").concat(response[key].sda, "</td>\n                    <td><button class=\"btn-del\" data-edit=\"true\" type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#exampleModalEdt-cli\" data-name=\"").concat(key, "\">&#9998;</button></td>\n                    <td><button class=\"btn-del\" data-name=\"").concat(key, "\" data-link=\"clients\">&#10060;</button></td>\n                </tr>\n            ");
    });
  });
}

function delData(link, name) {
  return fetch("https://arm-fit-cent-default-rtdb.europe-west1.firebasedatabase.app/".concat(link, "/").concat(name, ".json"), {
    method: 'DELETE'
  }).then(function (response) {
    return response.json();
  }).then(function (response) {
    return location.reload();
  });
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60641" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map