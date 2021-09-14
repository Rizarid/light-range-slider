(function(){"use strict";var __webpack_modules__={1406:function(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__){eval("\n// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js\nvar jquery = __webpack_require__(9755);\n;// CONCATENATED MODULE: ./src/demo/components/toggle/toggle.ts\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nvar Toggle = function Toggle(target) {\n  var _this = this;\n\n  _classCallCheck(this, Toggle);\n\n  _defineProperty(this, \"body\", void 0);\n\n  _defineProperty(this, \"checkbox\", void 0);\n\n  _defineProperty(this, \"getCheckbox\", function () {\n    return _this.checkbox;\n  });\n\n  _defineProperty(this, \"changeChecked\", function (checked) {\n    if (checked) _this.body.classList.add('toggle_active');else _this.body.classList.remove('toggle_active');\n    _this.checkbox.checked = checked;\n  });\n\n  _defineProperty(this, \"createCheckbox\", function () {\n    return _this.body.querySelector('.js-toggle__checkbox');\n  });\n\n  _defineProperty(this, \"addListener\", function () {\n    _this.checkbox.addEventListener('change', _this.handleToggleClick);\n  });\n\n  _defineProperty(this, \"handleToggleClick\", function () {\n    _this.body.classList.toggle('toggle_active');\n  });\n\n  this.body = target;\n  this.checkbox = this.createCheckbox();\n  this.addListener();\n};\n\n\n;// CONCATENATED MODULE: ./src/demo/components/control-panel/control-panel.ts\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nfunction control_panel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction control_panel_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* eslint-disable @typescript-eslint/dot-notation */\n\n\n\n\nvar ControlPanel = function ControlPanel(target, slider) {\n  var _this = this;\n\n  control_panel_classCallCheck(this, ControlPanel);\n\n  control_panel_defineProperty(this, \"body\", void 0);\n\n  control_panel_defineProperty(this, \"slider\", void 0);\n\n  control_panel_defineProperty(this, \"min\", void 0);\n\n  control_panel_defineProperty(this, \"max\", void 0);\n\n  control_panel_defineProperty(this, \"currentMin\", void 0);\n\n  control_panel_defineProperty(this, \"currentMax\", void 0);\n\n  control_panel_defineProperty(this, \"step\", void 0);\n\n  control_panel_defineProperty(this, \"scaleStep\", void 0);\n\n  control_panel_defineProperty(this, \"collection\", void 0);\n\n  control_panel_defineProperty(this, \"isVertical\", void 0);\n\n  control_panel_defineProperty(this, \"isInterval\", void 0);\n\n  control_panel_defineProperty(this, \"isCollection\", void 0);\n\n  control_panel_defineProperty(this, \"haveProgressBar\", void 0);\n\n  control_panel_defineProperty(this, \"haveLabel\", void 0);\n\n  control_panel_defineProperty(this, \"haveScale\", void 0);\n\n  control_panel_defineProperty(this, \"fields\", void 0);\n\n  control_panel_defineProperty(this, \"toggles\", void 0);\n\n  control_panel_defineProperty(this, \"fieldsHandlers\", void 0);\n\n  control_panel_defineProperty(this, \"togglesHandlers\", void 0);\n\n  control_panel_defineProperty(this, \"createGroups\", function () {\n    _this.fields = ['min', 'max', 'currentMin', 'currentMax', 'step', 'scaleStep', 'collection'];\n    _this.toggles = ['isVertical', 'isInterval', 'isCollection', 'haveProgressBar', 'haveLabel', 'haveScale'];\n  });\n\n  control_panel_defineProperty(this, \"getFields\", function () {\n    var fieldsClasses = ['min', 'max', 'current-min', 'current-max', 'step', 'scale-step', 'collection'];\n\n    _this.fields.map(function (item, index) {\n      _this[item] = _this.body.querySelector(\".js-text-field.\".concat(fieldsClasses[index], \" .text-field__field\"));\n      return null;\n    });\n  });\n\n  control_panel_defineProperty(this, \"getToggles\", function () {\n    var togglesClasses = ['vertical', 'interval', 'is-collection', 'progress-bar', 'label', 'scale'];\n\n    _this.toggles.map(function (item, index) {\n      _this[item] = new Toggle(_this.body.querySelector(\".js-toggle.\".concat(togglesClasses[index])));\n      return null;\n    });\n  });\n\n  control_panel_defineProperty(this, \"createHandlersLists\", function () {\n    _this.fieldsHandlers = ['handleMinInput', 'handleMaxInput', 'handleCurrentMinInput', 'handleCurrentMaxInput', 'handleStepInput', 'handleScaleStepInput', 'handleCollectionChange'];\n    _this.togglesHandlers = ['handleIsVerticalChange', 'handleIsIntervalChange', 'handleIsCollectionChange', 'handleHaveProgressBarChange', 'handleHaveLabelChange', 'handleHaveScaleChange'];\n  });\n\n  control_panel_defineProperty(this, \"addListeners\", function () {\n    _this.fields.map(function (item, index) {\n      return _this[item].addEventListener('change', _this[_this.fieldsHandlers[index]]);\n    });\n\n    _this.toggles.map(function (item, index) {\n      return _this[item].getCheckbox().addEventListener('change', _this[_this.togglesHandlers[index]]);\n    });\n  });\n\n  control_panel_defineProperty(this, \"handleMinInput\", function () {\n    _this.slider['changeMinValue'](Number(_this.min.value));\n  });\n\n  control_panel_defineProperty(this, \"handleMaxInput\", function () {\n    _this.slider['changeMaxValue'](Number(_this.max.value));\n  });\n\n  control_panel_defineProperty(this, \"handleCurrentMinInput\", function () {\n    _this.slider['changeMinCurrentValue'](Number(_this.currentMin.value));\n  });\n\n  control_panel_defineProperty(this, \"handleCurrentMaxInput\", function () {\n    _this.slider['changeMaxCurrentValue'](Number(_this.currentMax.value));\n  });\n\n  control_panel_defineProperty(this, \"handleStepInput\", function () {\n    _this.slider['changeStep'](Number(_this.step.value));\n  });\n\n  control_panel_defineProperty(this, \"handleScaleStepInput\", function () {\n    _this.slider['changeScaleStep'](Number(_this.scaleStep.value));\n  });\n\n  control_panel_defineProperty(this, \"handleIsVerticalChange\", function () {\n    _this.slider['changeIsVertical'](_this.isVertical.getCheckbox().checked);\n  });\n\n  control_panel_defineProperty(this, \"handleIsIntervalChange\", function () {\n    _this.slider['changeIsInterval'](_this.isInterval.getCheckbox().checked);\n  });\n\n  control_panel_defineProperty(this, \"handleIsCollectionChange\", function () {\n    _this.slider['changeIsCollection'](_this.isCollection.getCheckbox().checked);\n  });\n\n  control_panel_defineProperty(this, \"handleHaveLabelChange\", function () {\n    _this.slider['changeHaveLabel'](_this.haveLabel.getCheckbox().checked);\n  });\n\n  control_panel_defineProperty(this, \"handleHaveScaleChange\", function () {\n    _this.slider['changeHaveScale'](_this.haveScale.getCheckbox().checked);\n  });\n\n  control_panel_defineProperty(this, \"handleHaveProgressBarChange\", function () {\n    _this.slider['changeHaveProgressBar'](_this.haveProgressBar.getCheckbox().checked);\n  });\n\n  control_panel_defineProperty(this, \"handleCollectionChange\", function () {\n    _this.slider['changeCollection'](_this.collection.value.split(', '));\n  });\n\n  control_panel_defineProperty(this, \"handleSliderUpdate\", function (event) {\n    var extremeValues = event.extremeValues,\n        currentValues = event.currentValues,\n        step = event.step,\n        scaleStep = event.scaleStep,\n        isVertical = event.isVertical,\n        isInterval = event.isInterval,\n        haveProgressBar = event.haveProgressBar,\n        haveLabel = event.haveLabel,\n        haveScale = event.haveScale,\n        collection = event.collection,\n        isCollection = event.isCollection;\n\n    var _extremeValues = _slicedToArray(extremeValues, 2),\n        min = _extremeValues[0],\n        max = _extremeValues[1];\n\n    var _currentValues = _slicedToArray(currentValues, 2),\n        currentMin = _currentValues[0],\n        currentMax = _currentValues[1];\n\n    var fieldsValues = [min, max, currentMin, currentMax, step, scaleStep];\n    var togglesValues = [isVertical, isInterval, isCollection, haveProgressBar, haveLabel, haveScale];\n    fieldsValues.map(function (item, index) {\n      if (item) _this[_this.fields[index]].value = item.toString();\n      return null;\n    });\n    _this.collection.value = collection.join(', ');\n    togglesValues.map(function (item, index) {\n      if (item) _this[_this.toggles[index]].changeChecked(item);\n      return null;\n    });\n  });\n\n  this.body = target;\n  this.slider = slider;\n  this.createGroups();\n  this.getFields();\n  this.getToggles();\n  this.createHandlersLists();\n  this.addListeners(); // eslint-disable-next-line @typescript-eslint/no-unsafe-call\n\n  this.slider['changeCallbacks']([this.handleSliderUpdate]);\n};\n\n\n;// CONCATENATED MODULE: ./src/demo/components/sliders-demo/sliders-demo.ts\nfunction sliders_demo_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction sliders_demo_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/* eslint-disable @typescript-eslint/dot-notation */\n\n\n\n\nvar SlidersDemo = function SlidersDemo(target) {\n  var _this = this;\n\n  var _slidersOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  sliders_demo_classCallCheck(this, SlidersDemo);\n\n  sliders_demo_defineProperty(this, \"body\", void 0);\n\n  sliders_demo_defineProperty(this, \"$slider\", void 0);\n\n  sliders_demo_defineProperty(this, \"controlPanel\", void 0);\n\n  sliders_demo_defineProperty(this, \"createSlider\", function (slidersOptions) {\n    _this.$slider = jquery(_this.body).find('.slider');\n\n    _this.$slider['rangeSlider'](slidersOptions);\n  });\n\n  sliders_demo_defineProperty(this, \"createControlPanel\", function () {\n    var controlPanel = _this.body.querySelector('.js-control-panel');\n\n    _this.controlPanel = new ControlPanel(controlPanel, _this.$slider);\n  });\n\n  this.body = target;\n  this.createSlider(_slidersOptions);\n  this.createControlPanel();\n};\n\n\n// EXTERNAL MODULE: ./src/lite-range-slider/lite-range-slider.ts + 14 modules\nvar lite_range_slider = __webpack_require__(4790);\n;// CONCATENATED MODULE: ./src/demo/demo.ts\n\n\n\nvar demos = document.querySelectorAll('.js-sliders-demo');\nvar firstDemo = new SlidersDemo(demos[0]);\nvar secondDemo = new SlidersDemo(demos[1], {\n  extremeValues: [-5, 5],\n  step: 0.1,\n  scaleStep: 1,\n  isInterval: true,\n  currentValues: [-2, 2],\n  isVertical: true\n});\nvar thirdDemo = new SlidersDemo(demos[2], {\n  collection: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],\n  isCollection: true,\n  currentValues: [6]\n});\n\n//# sourceURL=webpack://range-slider/./src/demo/demo.ts_+_3_modules?")}},__webpack_module_cache__={},deferred;function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(r.exports,r,r.exports,__webpack_require__),r.exports}__webpack_require__.m=__webpack_modules__,deferred=[],__webpack_require__.O=function(e,n,r,t){if(!n){var i=1/0;for(s=0;s<deferred.length;s++){n=deferred[s][0],r=deferred[s][1],t=deferred[s][2];for(var o=!0,a=0;a<n.length;a++)(!1&t||i>=t)&&Object.keys(__webpack_require__.O).every((function(e){return __webpack_require__.O[e](n[a])}))?n.splice(a--,1):(o=!1,t<i&&(i=t));if(o){deferred.splice(s--,1);var l=r();void 0!==l&&(e=l)}}return e}t=t||0;for(var s=deferred.length;s>0&&deferred[s-1][2]>t;s--)deferred[s]=deferred[s-1];deferred[s]=[n,r,t]},__webpack_require__.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){var e={577:0,908:0};__webpack_require__.O.j=function(n){return 0===e[n]};var n=function(n,r){var t,i,o=r[0],a=r[1],l=r[2],s=0;for(t in a)__webpack_require__.o(a,t)&&(__webpack_require__.m[t]=a[t]);if(l)var c=l(__webpack_require__);for(n&&n(r);s<o.length;s++)i=o[s],__webpack_require__.o(e,i)&&e[i]&&e[i][0](),e[o[s]]=0;return __webpack_require__.O(c)},r=self.webpackChunkrange_slider=self.webpackChunkrange_slider||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}(),__webpack_require__.O(void 0,[708,790],(function(){return __webpack_require__(6981)}));var __webpack_exports__=__webpack_require__.O(void 0,[708,790],(function(){return __webpack_require__(1406)}));__webpack_exports__=__webpack_require__.O(__webpack_exports__)})();