'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lowercaseHash = require('./lowercase-hash');

var _lowercaseHash2 = _interopRequireDefault(_lowercaseHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var noOpReplacer = function noOpReplacer(thing) {
  return thing;
};

var StringReplacementCache = function () {
  function StringReplacementCache(expression) {
    var outputReplacer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noOpReplacer;
    var identityReplacer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : noOpReplacer;

    _classCallCheck(this, StringReplacementCache);

    this.expression = expression;
    this.outputReplacer = outputReplacer;
    this.identityReplacer = identityReplacer;
    this._cache = {};
  }

  _createClass(StringReplacementCache, [{
    key: 'load',
    value: function load(body) {
      var _this = this;

      var processed = body.replace(this.expression, function (match) {
        for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          values[_key - 1] = arguments[_key];
        }

        var identityHash = (0, _lowercaseHash2.default)(match);

        var identity = _this.identityReplacer.apply(_this, [identityHash, match].concat(values));

        _this._cache[identity] = _this.outputReplacer.apply(_this, [match].concat(values));

        return identity;
      });

      return processed;
    }
  }, {
    key: 'unload',
    value: function unload(body) {
      var _this2 = this;

      var processed = body;

      Object.keys(this._cache).forEach(function (identity) {
        return processed = processed.replace(new RegExp(identity.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&'), 'g'), _this2._cache[identity]);
      });

      this._cache = {};
      return processed;
    }
  }]);

  return StringReplacementCache;
}();

exports.default = StringReplacementCache;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9zdHJpbmctcmVwbGFjZW1lbnQtY2FjaGUuanMiXSwibmFtZXMiOlsibm9PcFJlcGxhY2VyIiwidGhpbmciLCJTdHJpbmdSZXBsYWNlbWVudENhY2hlIiwiZXhwcmVzc2lvbiIsIm91dHB1dFJlcGxhY2VyIiwiaWRlbnRpdHlSZXBsYWNlciIsIl9jYWNoZSIsImJvZHkiLCJwcm9jZXNzZWQiLCJyZXBsYWNlIiwibWF0Y2giLCJ2YWx1ZXMiLCJpZGVudGl0eUhhc2giLCJpZGVudGl0eSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwiUmVnRXhwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztBQUVBLElBQU1BLGVBQWUsU0FBZkEsWUFBZSxDQUFDQyxLQUFEO0FBQUEsU0FBV0EsS0FBWDtBQUFBLENBQXJCOztJQUVxQkMsc0I7QUFDbkIsa0NBQVlDLFVBQVosRUFBd0Y7QUFBQSxRQUFoRUMsY0FBZ0UsdUVBQS9DSixZQUErQztBQUFBLFFBQWpDSyxnQkFBaUMsdUVBQWRMLFlBQWM7O0FBQUE7O0FBQ3RGLFNBQUtHLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QkEsZ0JBQXhCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDRDs7Ozt5QkFFSUMsSSxFQUFNO0FBQUE7O0FBQ1QsVUFBTUMsWUFBWUQsS0FDZkUsT0FEZSxDQUNQLEtBQUtOLFVBREUsRUFDVSxVQUFDTyxLQUFELEVBQXNCO0FBQUEsMENBQVhDLE1BQVc7QUFBWEEsZ0JBQVc7QUFBQTs7QUFDOUMsWUFBTUMsZUFBZSw2QkFBY0YsS0FBZCxDQUFyQjs7QUFFQSxZQUFNRyxXQUFXLE1BQUtSLGdCQUFMLGVBQ2ZPLFlBRGUsRUFFZkYsS0FGZSxTQUdaQyxNQUhZLEVBQWpCOztBQU1BLGNBQUtMLE1BQUwsQ0FBWU8sUUFBWixJQUF3QixNQUFLVCxjQUFMLGVBQW9CTSxLQUFwQixTQUE4QkMsTUFBOUIsRUFBeEI7O0FBRUEsZUFBT0UsUUFBUDtBQUNELE9BYmUsQ0FBbEI7O0FBZUEsYUFBT0wsU0FBUDtBQUNEOzs7MkJBRU1ELEksRUFBTTtBQUFBOztBQUNYLFVBQUlDLFlBQVlELElBQWhCOztBQUVBTyxhQUFPQyxJQUFQLENBQVksS0FBS1QsTUFBakIsRUFBeUJVLE9BQXpCLENBQWlDLFVBQUNILFFBQUQ7QUFBQSxlQUMvQkwsWUFBWUEsVUFDVEMsT0FEUyxDQUVSLElBQUlRLE1BQUosQ0FDRUosU0FBU0osT0FBVCxDQUNFLHVCQURGLEVBRUUsTUFGRixDQURGLEVBS0UsR0FMRixDQUZRLEVBU1IsT0FBS0gsTUFBTCxDQUFZTyxRQUFaLENBVFEsQ0FEbUI7QUFBQSxPQUFqQzs7QUFjQSxXQUFLUCxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQU9FLFNBQVA7QUFDRDs7Ozs7O2tCQTlDa0JOLHNCIiwiZmlsZSI6InN0cmluZy1yZXBsYWNlbWVudC1jYWNoZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb3dlcmNhc2VIYXNoIGZyb20gJy4vbG93ZXJjYXNlLWhhc2gnO1xuXG5jb25zdCBub09wUmVwbGFjZXIgPSAodGhpbmcpID0+IHRoaW5nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHJpbmdSZXBsYWNlbWVudENhY2hlIHtcbiAgY29uc3RydWN0b3IoZXhwcmVzc2lvbiwgb3V0cHV0UmVwbGFjZXIgPSBub09wUmVwbGFjZXIsIGlkZW50aXR5UmVwbGFjZXIgPSBub09wUmVwbGFjZXIpIHtcbiAgICB0aGlzLmV4cHJlc3Npb24gPSBleHByZXNzaW9uO1xuICAgIHRoaXMub3V0cHV0UmVwbGFjZXIgPSBvdXRwdXRSZXBsYWNlcjtcbiAgICB0aGlzLmlkZW50aXR5UmVwbGFjZXIgPSBpZGVudGl0eVJlcGxhY2VyO1xuICAgIHRoaXMuX2NhY2hlID0ge307XG4gIH1cblxuICBsb2FkKGJvZHkpIHtcbiAgICBjb25zdCBwcm9jZXNzZWQgPSBib2R5XG4gICAgICAucmVwbGFjZSh0aGlzLmV4cHJlc3Npb24sIChtYXRjaCwgLi4udmFsdWVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkZW50aXR5SGFzaCA9IGxvd2VyY2FzZUhhc2gobWF0Y2gpO1xuXG4gICAgICAgIGNvbnN0IGlkZW50aXR5ID0gdGhpcy5pZGVudGl0eVJlcGxhY2VyKFxuICAgICAgICAgIGlkZW50aXR5SGFzaCxcbiAgICAgICAgICBtYXRjaCxcbiAgICAgICAgICAuLi52YWx1ZXNcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLl9jYWNoZVtpZGVudGl0eV0gPSB0aGlzLm91dHB1dFJlcGxhY2VyKG1hdGNoLCAuLi52YWx1ZXMpO1xuXG4gICAgICAgIHJldHVybiBpZGVudGl0eTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHByb2Nlc3NlZDtcbiAgfVxuXG4gIHVubG9hZChib2R5KSB7XG4gICAgbGV0IHByb2Nlc3NlZCA9IGJvZHk7XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLl9jYWNoZSkuZm9yRWFjaCgoaWRlbnRpdHkpID0+XG4gICAgICBwcm9jZXNzZWQgPSBwcm9jZXNzZWRcbiAgICAgICAgLnJlcGxhY2UoXG4gICAgICAgICAgbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIGlkZW50aXR5LnJlcGxhY2UoXG4gICAgICAgICAgICAgIC9bLVtcXF0ve30oKSorPy5cXFxcXiR8XS9nLFxuICAgICAgICAgICAgICAnXFxcXCQmJ1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICdnJ1xuICAgICAgICAgICksXG4gICAgICAgICAgdGhpcy5fY2FjaGVbaWRlbnRpdHldXG4gICAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5fY2FjaGUgPSB7fTtcbiAgICByZXR1cm4gcHJvY2Vzc2VkO1xuICB9XG59XG4iXX0=