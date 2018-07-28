'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sha = require('sha.js/sha256');

var _sha2 = _interopRequireDefault(_sha);

var _anyBase = require('any-base');

var _anyBase2 = _interopRequireDefault(_anyBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (content) {
  return (0, _anyBase2.default)(_anyBase2.default.HEX, 'abcdefghijklmnopqrstuvwxyz')(new _sha2.default().update(content, 'utf-8').digest('hex'));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9sb3dlcmNhc2UtaGFzaC5qcyJdLCJuYW1lcyI6WyJjb250ZW50IiwiSEVYIiwidXBkYXRlIiwiZGlnZXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7a0JBRWUsVUFBQ0EsT0FBRDtBQUFBLFNBQ2IsdUJBQVEsa0JBQVFDLEdBQWhCLEVBQXFCLDRCQUFyQixFQUNFLG9CQUNHQyxNQURILENBQ1VGLE9BRFYsRUFDbUIsT0FEbkIsRUFFR0csTUFGSCxDQUVVLEtBRlYsQ0FERixDQURhO0FBQUEsQyIsImZpbGUiOiJsb3dlcmNhc2UtaGFzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTSEEyNTYgZnJvbSAnc2hhLmpzL3NoYTI1Nic7XG5pbXBvcnQgYW55QmFzZSBmcm9tICdhbnktYmFzZSc7XG5cbmV4cG9ydCBkZWZhdWx0IChjb250ZW50KSA9PiAoXG4gIGFueUJhc2UoYW55QmFzZS5IRVgsICdhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5eicpKFxuICAgIG5ldyBTSEEyNTYoKVxuICAgICAgLnVwZGF0ZShjb250ZW50LCAndXRmLTgnKVxuICAgICAgLmRpZ2VzdCgnaGV4JylcbiAgKVxuKTtcbiJdfQ==