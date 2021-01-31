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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/site.js":
/*!******************************!*\
  !*** ./resources/js/site.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// go back button
document.querySelector("nav > svg").addEventListener("click", goBack);

function goBack() {
  window.history.back();
} //active links
// const links = document.querySelectorAll("nav > ul > li");
// links.forEach(link => {
//     link.addEventListener("click", e => {
//         links.forEach(l => {
//             l.querySelector("a").classList = "";
//             console.log(l);
//         });
//         e.target.classList.add("active");
//     });
// });
// set the starting position of the cursor outside of the screen


var clientX = -100;
var clientY = -100;
var innerCursor = document.querySelector(".cursor--small");

var initCursor = function initCursor() {
  // add listener to track the current mouse position
  document.addEventListener("mousemove", function (e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }); // transform the innerCursor to the current mouse position
  // use requestAnimationFrame() for smooth performance

  var render = function render() {
    innerCursor.style.transform = "translate(".concat(clientX, "px, ").concat(clientY, "px)"); // if you are already using TweenMax in your project, you might as well
    // use TweenMax.set() instead
    // TweenMax.set(innerCursor, {
    //   x: clientX,
    //   y: clientY
    // });

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
};

initCursor();
var lastX = 0;
var lastY = 0;
var isStuck = false;
var showCursor = false;
var group, stuckX, stuckY, fillOuterCursor;

var initCanvas = function initCanvas() {
  var canvas = document.querySelector(".cursor--canvas");
  var shapeBounds = {
    width: 75,
    height: 75
  };
  paper.setup(canvas);
  var fillColor = "#fef151";
  var strokeWidth = 1;
  var segments = 8;
  var radius = 15; // we'll need these later for the noisy circle

  var noiseScale = 150; // speed

  var noiseRange = 4; // range of distortion

  var isNoisy = false; // state
  // the base shape for the noisy circle

  var polygon = new paper.Path.RegularPolygon(new paper.Point(0, 0), segments, radius);
  polygon.fillColor = fillColor;
  polygon.strokeWidth = strokeWidth;
  polygon.smooth();
  group = new paper.Group([polygon]);
  group.applyMatrix = false;
  var noiseObjects = polygon.segments.map(function () {
    return new SimplexNoise();
  });
  var bigCoordinates = []; // function for linear interpolation of values

  var lerp = function lerp(a, b, n) {
    return (1 - n) * a + n * b;
  }; // function to map a value from one range to another range


  var map = function map(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }; // the draw loop of Paper.js
  // (60fps with requestAnimationFrame under the hood)


  paper.view.onFrame = function (event) {
    // using linear interpolation, the circle will move 0.2 (20%)
    // of the distance between its current position and the mouse
    // coordinates per Frame
    lastX = lerp(lastX, clientX, 0.2);
    lastY = lerp(lastY, clientY, 0.2);
    group.position = new paper.Point(lastX, lastY);
  };
};

initCanvas();

var initHovers = function initHovers() {
  // find the center of the link element and set stuckX and stuckY
  // these are needed to set the position of the noisy circle
  var handleMouseEnter = function handleMouseEnter(e) {
    var navItem = e.currentTarget;
    var navItemBox = navItem.getBoundingClientRect();
    stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    isStuck = true;
  }; // reset isStuck on mouseLeave


  var handleMouseLeave = function handleMouseLeave() {
    isStuck = false;
  }; // add event listeners to all items


  var linkItems = document.querySelectorAll("a");
  linkItems.forEach(function (item) {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
  });
};

initHovers(); // the draw loop of Paper.js
// (60fps with requestAnimationFrame under the hood)

paper.view.onFrame = function (event) {
  // using linear interpolation, the circle will move 0.2 (20%)
  // of the distance between its current position and the mouse
  // coordinates per Frame
  // function for linear interpolation of values
  var lerp = function lerp(a, b, n) {
    return (1 - n) * a + n * b;
  };

  var segments = 8;
  var radius = 15;
  var shapeBounds = {
    width: 75,
    height: 75
  };
  var polygon = new paper.Path.RegularPolygon(new paper.Point(0, 0), segments, radius);

  if (!isStuck) {
    // move circle around normally
    lastX = lerp(lastX, clientX, 0.2);
    lastY = lerp(lastY, clientY, 0.2);
    group.position = new paper.Point(lastX, lastY); // document.querySelector(".cursor--canvas").style.opacity = 1;
  } else if (isStuck) {
    // fixed position on a nav item
    lastX = lerp(lastX, stuckX, 0.2);
    lastY = lerp(lastY, stuckY, 0.2);
    group.position = new paper.Point(lastX, lastY); // document.querySelector(".cursor--canvas").style.opacity = 0;
  }

  if (isStuck && polygon.bounds.width < shapeBounds.width) {
    // scale up the shape
    polygon.scale(1.08);
  } else if (!isStuck && polygon.bounds.width > 30) {
    // remove noise
    if (isNoisy) {
      polygon.segments.forEach(function (segment, i) {
        segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
      });
      isNoisy = false;
      bigCoordinates = [];
    } // scale down the shape


    var scaleDown = 0.92;
    polygon.scale(scaleDown);
  } // while stuck and big, apply simplex noise


  if (isStuck && polygon.bounds.width >= shapeBounds.width) {
    isNoisy = true; // first get coordinates of large circle

    if (bigCoordinates.length === 0) {
      polygon.segments.forEach(function (segment, i) {
        bigCoordinates[i] = [segment.point.x, segment.point.y];
      });
    } // loop over all points of the polygon


    polygon.segments.forEach(function (segment, i) {
      // get new noise value
      // we divide event.count by noiseScale to get a very smooth value
      var noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
      var noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1); // map the noise value to our defined range

      var distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
      var distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange); // apply distortion to coordinates

      var newX = bigCoordinates[i][0] + distortionX;
      var newY = bigCoordinates[i][1] + distortionY; // set new (noisy) coodrindate of point

      segment.point.set(newX, newY);
    });
  }

  polygon.smooth();
};

/***/ }),

/***/ "./resources/sass/main.scss":
/*!**********************************!*\
  !*** ./resources/sass/main.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!***************************************************************!*\
  !*** multi ./resources/js/site.js ./resources/sass/main.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/ewczi/Desktop/Portfolio/resources/js/site.js */"./resources/js/site.js");
module.exports = __webpack_require__(/*! /Users/ewczi/Desktop/Portfolio/resources/sass/main.scss */"./resources/sass/main.scss");


/***/ })

/******/ });