'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STATUS = exports.STATUS = {
    DOWN: -1,
    IDLE: 0,
    UP: 1
};

var Elevator = function () {
    function Elevator(floor) {
        _classCallCheck(this, Elevator);

        this.passengers = 0;
        this.floor = floor;
        this.direction = STATUS.IDLE;
        this.tasks = [];
    }

    _createClass(Elevator, [{
        key: 'addTask',


        // 新增任務排程，字串表示乘客進入，數字表示乘客離開
        value: function addTask(p) {
            this.passengers += 1;
            if (this.direction === STATUS.IDLE) {
                if (this.floor - p.from > 0) this.direction = STATUS.DOWN;else if (this.floor - p.from < 0) this.direction = STATUS.UP;else this.direction = p.direction;
            }
            console.log('elevator.js :addTask => ', 'from: ', p.from, 'to: ', p.to);
            // 如果無任務
            if (this.tasks.length === 0) {
                if (this.direction === p.direction) {
                    this.tasks.push([p.from.toString(), p.to]);
                } else {
                    this.tasks.push([p.from.toString()], [p.to]);
                }
                // console.log('elevator.js :addTask (first)=> ', this.tasks);
                return;
            }
            // 如果已有任務，進行排程
            if (this.direction === STATUS.UP) {
                // 如果電梯往上
                if (p.direction === STATUS.UP) {
                    // 如果乘客往上
                    if (p.from > this.floor) this.tasks[0].push(p.from.toString(), p.to);else {
                        this.tasks[1] ? this.tasks[1].push(p.from.toString()) : this.tasks.push([p.from.toString()]);
                        this.tasks[2] ? this.tasks[2].push(p.to) : this.tasks.push([p.to]);
                    }
                } else {
                    // 如果乘客往下
                    if (p.from > this.floor) {
                        this.tasks[0].push(p.from.toString());
                        this.tasks[1] ? this.tasks[1].push(p.to) : this.tasks.push([p.to]);
                    }
                }
            } else {
                // 如果電梯往下
                if (p.direction === STATUS.DOWN) {
                    // 如果乘客往下
                    if (p.from < this.floor) this.tasks[0].push(p.from.toString(), p.to);else {
                        this.tasks[1] ? this.tasks[1].push(p.from.toString()) : this.tasks.push([p.from.toString()]);
                        this.tasks[2] ? this.tasks[2].push(p.to) : this.tasks.push([p.to]);
                    }
                } else {
                    // 如果乘客往上
                    if (p.from < this.floor) {
                        this.tasks[0].push(p.from.toString());
                        this.tasks[1] ? this.tasks[1].push(p.to) : this.tasks.push([p.to]);
                    }
                }
            }

            // console.log('elevator.js :addTask => ', this.tasks);
        }
    }, {
        key: '_skipCheck',
        value: function _skipCheck() {
            // 檢查電梯是否需要暫停一次
            if (this.tasks[0].length === 0) {
                this.direction = this.direction * -1;
                this.tasks.shift();
                if (this.tasks.length === 0) this.direction = STATUS.IDLE;
                if (this.direction === STATUS.IDLE) return true;
            }
            return false;
        }

        // 定義每秒要做的事

    }, {
        key: 'run',
        value: function run() {
            var _this = this;

            // 如果閒置中，不做樓層更新
            if (this.tasks.length === 0) this.direction = STATUS.IDLE;
            if (this.direction === STATUS.IDLE) return;
            if (this._skipCheck()) return;
            // 確認floor是否要停
            var temp = this.tasks[0].filter(function (task) {
                return task != _this.floor;
            });
            if (temp.length !== this.tasks[0].length) {
                // 如果要停
                var p = this.tasks[0].filter(function (f) {
                    return f == _this.floor;
                }); // 檢查乘客進出，計算人數
                p.forEach(function (element) {
                    if (typeof element == 'number') _this.passengers -= 1;
                });

                this.tasks[0] = temp; // 刪除任務
                console.log('elevator.js :run  stop at ', this.floor, 'floor');
                this._skipCheck();
                // console.log('passengers: ', this.passengers)
                return; //休息一次
            }

            // 樓層更新
            this.floor = this.direction === STATUS.UP ? this.floor += 1 : this.floor -= 1;
            console.log('elevator.js :run ', this.direction > 0 ? "up" : "down", ' => now at ', this.floor);
        }
    }, {
        key: 'full',
        get: function get() {
            return this.passengers >= 5 ? true : false;
        }
    }]);

    return Elevator;
}();

exports.default = Elevator;