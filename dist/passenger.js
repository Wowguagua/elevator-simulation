'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _elevator = require('./elevator');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Passenger = function () {
    function Passenger() {
        _classCallCheck(this, Passenger);

        this.from = 0;
        this.to = 0;
        this.direction = _elevator.STATUS.UP;
        this.init();
    }

    _createClass(Passenger, [{
        key: 'init',
        value: function init() {
            this.from = this._getRandom();
            this.to = this._getRandom();
            while (this.from === this.to) {
                this.to = this._getRandom();
            }
            this.direction = this.to > this.from ? _elevator.STATUS.UP : _elevator.STATUS.DOWN;
        }
    }, {
        key: '_getRandom',
        value: function _getRandom() {
            return Math.floor(Math.random() * 10) + 1;
        }
    }]);

    return Passenger;
}();

exports.default = Passenger;