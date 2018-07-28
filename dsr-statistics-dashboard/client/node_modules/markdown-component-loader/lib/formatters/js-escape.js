'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsesc = require('jsesc');

var _jsesc2 = _interopRequireDefault(_jsesc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JSESC_CONFIG = {
  compact: false,
  indent: '  ',
  wrap: true
};

exports.default = function (javascript) {
  return (0, _jsesc2.default)(javascript, JSESC_CONFIG);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mb3JtYXR0ZXJzL2pzLWVzY2FwZS5qcyJdLCJuYW1lcyI6WyJKU0VTQ19DT05GSUciLCJjb21wYWN0IiwiaW5kZW50Iiwid3JhcCIsImphdmFzY3JpcHQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFNQSxlQUFlO0FBQ25CQyxXQUFTLEtBRFU7QUFFbkJDLFVBQVEsSUFGVztBQUduQkMsUUFBTTtBQUhhLENBQXJCOztrQkFNZSxVQUFDQyxVQUFEO0FBQUEsU0FBZ0IscUJBQU1BLFVBQU4sRUFBa0JKLFlBQWxCLENBQWhCO0FBQUEsQyIsImZpbGUiOiJqcy1lc2NhcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNFc2MgZnJvbSAnanNlc2MnO1xuXG5jb25zdCBKU0VTQ19DT05GSUcgPSB7XG4gIGNvbXBhY3Q6IGZhbHNlLFxuICBpbmRlbnQ6ICcgICcsXG4gIHdyYXA6IHRydWVcbn07XG5cbmV4cG9ydCBkZWZhdWx0IChqYXZhc2NyaXB0KSA9PiBKU0VzYyhqYXZhc2NyaXB0LCBKU0VTQ19DT05GSUcpO1xuIl19