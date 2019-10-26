/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/config/configuration.js":
/*!****************************************!*\
  !*** ./server/config/configuration.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  db: {\n    connectionString: \"postgres://postgres:localpgadmin@localhost:5432/authentification\"\n  },\n  cache: {\n    enable: true,\n    duration: 36000,\n    //milliseconds\n    checkDelay: 5000 //milliseconds\n\n  },\n  authentification: {\n    useCache: true\n  }\n});\n\n//# sourceURL=webpack:///./server/config/configuration.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_authentification_AuthentificationService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/authentification/AuthentificationService */ \"./server/modules/authentification/AuthentificationService.js\");\n/* harmony import */ var _modules_Cache_Cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Cache/Cache */ \"./server/modules/Cache/Cache.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! os */ \"os\");\n/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar http = __webpack_require__(/*! http */ \"http\");\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar session = __webpack_require__(/*! express-session */ \"express-session\");\n\nvar cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\");\n\nvar app = express();\n\nvar config = __webpack_require__(/*! ../webpack.config.js */ \"./webpack.config.js\");\n\nvar DIST_DIR = __dirname;\napp.use(express[\"static\"](DIST_DIR));\napp.use(session({\n  cookieName: \"session\",\n  secret: \"eg[isfd-8yF9-7w2315df{}+Ijsli;;to8\",\n  duration: 30 * 60 * 1000,\n  activeDuration: 5 * 60 * 1000,\n  httpOnly: true,\n  secure: true,\n  ephemeral: true\n}));\napp.use(cookieParser());\napp.use(function (req, res, next) {\n  new _modules_authentification_AuthentificationService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().CheckCookieAlive(req, res);\n  next();\n});\napp.use(cookieParser());\napp.get(\"/\", function (req, res) {\n  new _modules_authentification_AuthentificationService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().GenerateHashpassword(req, res);\n  return res.end();\n});\napp.get(\"/loginPage\", function (req, res) {\n  return res.sendFile(path.join(DIST_DIR, \"./loginExample.html\"));\n});\napp.get(\"/login\", function (req, res) {\n  new _modules_authentification_AuthentificationService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().SignIn(req, res, \"login\", \"pass\");\n  return res.end();\n});\napp.get(\"/logout\", function (req, res) {\n  new _modules_authentification_AuthentificationService__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().SignOut(req, res);\n  return res.end();\n}); // Start the server on port 3000\n\napp.listen(3000, \"127.0.0.1\");\nconsole.log(\"Node server running on port 3000\");\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./server/modules/Cache/Cache.js":
/*!***************************************!*\
  !*** ./server/modules/Cache/Cache.js ***!
  \***************************************/
/*! exports provided: default, SaveCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Instance; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"SaveCache\", function() { return SaveCache; });\n/* harmony import */ var _config_configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../config/configuration */ \"./server/config/configuration.js\");\n/* harmony import */ var _CacheObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CacheObject */ \"./server/modules/Cache/CacheObject.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar instance = null;\nvar cacheEntries = {};\n\nvar Cache =\n/*#__PURE__*/\nfunction () {\n  _createClass(Cache, [{\n    key: \"GetOrset\",\n\n    /**\r\n     * Permet de récupèrer en cache une clé\r\n     * Si elle n'existe pas, utilise la fonction de callback avec les paramètres pour la stocker dans le cache et la retourner \r\n     * @param {*} key \r\n     * @param {*} callback \r\n     * @param  {...any} args \r\n     */\n    value: function GetOrset(key, callback) {\n      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n        args[_key - 2] = arguments[_key];\n      }\n\n      if (!(key in cacheEntries)) cacheEntries[key] = new _CacheObject__WEBPACK_IMPORTED_MODULE_1__[\"default\"](key, callback.apply(void 0, args), Date.now());\n      return cacheEntries[key].Value;\n    }\n  }, {\n    key: \"Get\",\n    value: function Get(key) {\n      return cacheEntries[key].Value;\n    }\n  }, {\n    key: \"Set\",\n    value: function Set(key, value) {\n      if (!key in cacheEntries) cacheEntries[key] = value;\n    }\n  }, {\n    key: \"Remove\",\n    value: function Remove(key) {\n      delete cacheEntries[key];\n    }\n  }, {\n    key: \"WatchAll\",\n    value: function WatchAll() {\n      return cacheEntries;\n    }\n  }]);\n\n  function Cache() {\n    _classCallCheck(this, Cache);\n\n    //Efface du cache les clés si elles sont périmées\n    setInterval(function () {\n      CheckObsoleteKey();\n    }, _config_configuration__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cache.checkDelay);\n  }\n\n  return Cache;\n}();\n/**\r\n * Vérifie les clés de cache qui sont périmées et les supprime\r\n */\n\n\nfunction CheckObsoleteKey() {\n  var keyToDelete = [];\n\n  for (var key in cacheEntries) {\n    if (Date.now() - cacheEntries[key].CreationDate >= _config_configuration__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cache.duration) keyToDelete.push(cacheEntries[key].Key);\n  }\n\n  keyToDelete.forEach(function (key) {\n    delete cacheEntries[key];\n  });\n}\n/**\r\n * Récupère l'instance de cache\r\n */\n\n\nfunction Instance() {\n  if (!_config_configuration__WEBPACK_IMPORTED_MODULE_0__[\"default\"].cache.enable) throw error(\"Cache not enable\");\n\n  if (!instance) {\n    instance = new Cache();\n  }\n\n  return instance;\n}\n;\n/**\r\n * Decorateur pour sauvegarder le résultat d'une fonction dans le cache\r\n * @param {*} key - Clé qui sera sauvegarder dans le cache \r\n */\n\nfunction SaveCache(key) {\n  return function (target, propertyKey, descriptor) {\n    var originalMethod = descriptor.value; //Sauvegarde de la fonction initial\n\n    descriptor.value = function () {\n      var _Instance;\n\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      return (_Instance = Instance()).GetOrset.apply(_Instance, [key, originalMethod].concat(args));\n    };\n\n    return descriptor;\n  };\n}\n\n//# sourceURL=webpack:///./server/modules/Cache/Cache.js?");

/***/ }),

/***/ "./server/modules/Cache/CacheObject.js":
/*!*********************************************!*\
  !*** ./server/modules/Cache/CacheObject.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return CacheObject; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar CacheObject = function CacheObject(key, value, creationDate) {\n  _classCallCheck(this, CacheObject);\n\n  this.Key = void 0;\n  this.Value = void 0;\n  this.CreationDate = void 0;\n  this.Key = key;\n  this.Value = value;\n  this.CreationDate = creationDate;\n};\n\n\n\n//# sourceURL=webpack:///./server/modules/Cache/CacheObject.js?");

/***/ }),

/***/ "./server/modules/authentification/AuthentificationHelper.js":
/*!*******************************************************************!*\
  !*** ./server/modules/authentification/AuthentificationHelper.js ***!
  \*******************************************************************/
/*! exports provided: HashPass */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"HashPass\", function() { return HashPass; });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n\nvar algorithm = \"sha256\";\nvar encoding = \"base64\";\n/**\r\n * Retourne un mot de passe haché\r\n * @param {string} password - Mot de passe à hacher\r\n * Retourne un objet contenant le salt et le password\r\n */\n\nfunction HashPass(password) {\n  var salt = crypto__WEBPACK_IMPORTED_MODULE_0___default.a.randomBytes(16).toString('hex');\n  var encryptedPassword = crypto__WEBPACK_IMPORTED_MODULE_0___default.a.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');\n  return {\n    encryptedPassword: encryptedPassword,\n    salt: salt\n  };\n}\n\n//# sourceURL=webpack:///./server/modules/authentification/AuthentificationHelper.js?");

/***/ }),

/***/ "./server/modules/authentification/AuthentificationService.js":
/*!********************************************************************!*\
  !*** ./server/modules/authentification/AuthentificationService.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return AuthentificationService; });\n/* harmony import */ var _AuthentificationHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AuthentificationHelper */ \"./server/modules/authentification/AuthentificationHelper.js\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);\nvar _dec, _class;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }\n\n\n\n\nvar AuthentificationService = (_dec = IsAuthorized(), (_class =\n/*#__PURE__*/\nfunction () {\n  function AuthentificationService() {\n    _classCallCheck(this, AuthentificationService);\n  }\n\n  _createClass(AuthentificationService, [{\n    key: \"GetHashPassword\",\n\n    /**\r\n     * Retourne le hash d'un password\r\n     * @param {*} req\r\n     * @param {*} res\r\n     * @param {*} password\r\n     */\n    value: function GetHashPassword(password) {\n      return this.HashPassword(password);\n    }\n    /**\r\n     * Log l'utilisateur, créer la session et le cookie\r\n     * @param {*} req\r\n     * @param {*} res\r\n     * @param {*} login\r\n     * @param {*} password\r\n     */\n\n  }, {\n    key: \"SignIn\",\n    value: function SignIn(req, res, login, password) {\n      if (this.isInternalAccount(login, password)) {\n        var secret = fs__WEBPACK_IMPORTED_MODULE_2___default.a.readFileSync(__dirname + \"/../../config/private.pem\", \"utf8\");\n        var token = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default.a.sign({\n          sub: 1\n        }, secret);\n        res.cookie(\"SESSION_ID\", token);\n        req.session.SESSION_ID = token;\n        res.redirect(\"/\");\n      }\n    }\n    /**\r\n     * Vérifie le login mot de passe.\r\n     * @param {*} login\r\n     * @param {*} password\r\n     */\n\n  }, {\n    key: \"isInternalAccount\",\n    value: function isInternalAccount(login, password) {} // return (\n    //   login == this.userId.Login &&\n    //   // HashPass(password) HashPass(this.userId.Password)\n    // );\n\n    /**\r\n     * Déconnecte la session et supprime le cookie\r\n     * @param {*} req\r\n     * @param {*} res\r\n     */\n\n  }, {\n    key: \"SignOut\",\n    value: function SignOut(req, res) {\n      req.session.destroy();\n      res.clearCookie(\"SESSION_ID\");\n      res.redirect(\"/\");\n    }\n    /**\r\n     * Supprime le cookie\r\n     * @param {*} req\r\n     * @param {*} res\r\n     */\n\n  }, {\n    key: \"ClearCookie\",\n    value: function ClearCookie(res) {\n      res.clearCookie(\"SESSION_ID\");\n    }\n    /**\r\n     * Vérifie si le cookie correspond à la session\r\n     * @param {*} req - Resquest\r\n     * @param {*} res - Response\r\n     */\n\n  }, {\n    key: \"CheckCookieAlive\",\n    value: function CheckCookieAlive(req, res) {\n      if (req.cookies.SESSION_ID && !req.session.SESSION_ID) {\n        this.ClearCookie(res);\n      }\n    } //Todo: Supprimer\n\n  }, {\n    key: \"GenerateHashpassword\",\n    value: function GenerateHashpassword(res) {\n      res.status(200).end(\"OK\");\n    }\n  }, {\n    key: \"userId\",\n    get: function get() {\n      return {\n        Login: \"maxime\",\n        Password: \"azerty\"\n      };\n    }\n  }]);\n\n  return AuthentificationService;\n}(), (_applyDecoratedDescriptor(_class.prototype, \"GenerateHashpassword\", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, \"GenerateHashpassword\"), _class.prototype)), _class));\n\n/**\r\n * Décorateur: Si l'utilisateur est connecté : redirige vers le controller sinon retourne 403\r\n */\n\nfunction IsAuthorized() {\n  return function (target, propertyKey, descriptor) {\n    var originalMethod = descriptor.value; //Sauvegarde de la fonction initial\n\n    descriptor.value = function () {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      if (args[0].session.SESSION_ID && args[0].cookies.SESSION_ID) {\n        return originalMethod.apply(this, args);\n      }\n\n      args[1].status(403).redirect(\"/loginPage\");\n    };\n\n    return descriptor;\n  };\n}\n\n//# sourceURL=webpack:///./server/modules/authentification/AuthentificationService.js?");

/***/ }),

/***/ "./webpack.config.js":
/*!***************************!*\
  !*** ./webpack.config.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar nodeExternals = __webpack_require__(/*! webpack-node-externals */ \"webpack-node-externals\");\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nvar VIEWS_PATH = path.join(__dirname, \"public\", \"views\");\nvar PUBLIC_PATH = path.join(__dirname, \"public\");\nvar PUBLIC_PATH_INDEX = path.join(PUBLIC_PATH, \"index.js\");\nvar DIST_OUTPUT = path.join(__dirname, \"dist\"); //Config des pages de pages\n\nvar HWPConfig = new HtmlWebPackPlugin({\n  template: VIEWS_PATH + \"/loginExample.html\",\n  filename: \"./loginExample.html\",\n  chunks: \"app\",\n  excludeChunks: [\"server\"]\n}); //Mettre le nom des autres pages ici\n\nvar articlesHtmlPlugin = [\"cacheExample\"]; //On concatène tout\n\nvar multiplesFiles = articlesHtmlPlugin.map(function (entryName) {\n  return new HtmlWebPackPlugin({\n    template: VIEWS_PATH + \"/\".concat(entryName, \".html\"),\n    filename: entryName + \".html\"\n  });\n});\nmodule.exports = {\n  target: \"web\",\n  mode: \"development\",\n  devtool: \"source-map\",\n  entry: {\n    app: PUBLIC_PATH_INDEX\n  },\n  output: {\n    path: DIST_OUTPUT,\n    publicPath: \"/\",\n    filename: \"[name].js\"\n  },\n  module: {\n    rules: [{\n      // Transpiles ES6-8 into ES5\n      test: /\\.js$/,\n      exclude: /node_modules/,\n      use: {\n        loader: \"babel-loader\"\n      }\n    }, {\n      // Loads the javacript into html template provided.\n      // Entry point is set below in HtmlWebPackPlugin in Plugins\n      test: /\\.html$/,\n      use: [{\n        loader: \"html-loader\"\n      }]\n    }]\n  },\n  resolve: {\n    extensions: [\".js\"],\n    modules: [\"public\", \"node_modules\"]\n  },\n  plugins: [HWPConfig].concat(multiplesFiles)\n};\n\n//# sourceURL=webpack:///./webpack.config.js?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"http\");\n\n//# sourceURL=webpack:///external_%22http%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-node-externals\");\n\n//# sourceURL=webpack:///external_%22webpack-node-externals%22?");

/***/ })

/******/ });