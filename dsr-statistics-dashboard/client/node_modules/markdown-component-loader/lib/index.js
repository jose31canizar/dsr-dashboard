'use strict';

var _loaderUtils = require('loader-utils');

var _convert = require('./convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (source) {
  // This loader is deterministic, and will return the same thing for the same inputs!
  this.cacheable && this.cacheable();

  // Load configuration from Webpack
  var config = (0, _loaderUtils.getOptions)(this);

  // Go!
  return (0, _convert2.default)(source, config);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic291cmNlIiwiY2FjaGVhYmxlIiwiY29uZmlnIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBOzs7Ozs7QUFFQUEsT0FBT0MsT0FBUCxHQUFpQixVQUFTQyxNQUFULEVBQWlCO0FBQ2hDO0FBQ0EsT0FBS0MsU0FBTCxJQUFrQixLQUFLQSxTQUFMLEVBQWxCOztBQUVBO0FBQ0EsTUFBTUMsU0FBUyw2QkFBVyxJQUFYLENBQWY7O0FBRUE7QUFDQSxTQUFPLHVCQUFRRixNQUFSLEVBQWdCRSxNQUFoQixDQUFQO0FBQ0QsQ0FURCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldE9wdGlvbnMgfSBmcm9tICdsb2FkZXItdXRpbHMnO1xuXG5pbXBvcnQgY29udmVydCBmcm9tICcuL2NvbnZlcnQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAvLyBUaGlzIGxvYWRlciBpcyBkZXRlcm1pbmlzdGljLCBhbmQgd2lsbCByZXR1cm4gdGhlIHNhbWUgdGhpbmcgZm9yIHRoZSBzYW1lIGlucHV0cyFcbiAgdGhpcy5jYWNoZWFibGUgJiYgdGhpcy5jYWNoZWFibGUoKTtcblxuICAvLyBMb2FkIGNvbmZpZ3VyYXRpb24gZnJvbSBXZWJwYWNrXG4gIGNvbnN0IGNvbmZpZyA9IGdldE9wdGlvbnModGhpcyk7XG5cbiAgLy8gR28hXG4gIHJldHVybiBjb252ZXJ0KHNvdXJjZSwgY29uZmlnKTtcbn07XG4iXX0=