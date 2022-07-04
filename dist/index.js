'use strict';

var _passenger = require('./passenger');

var _passenger2 = _interopRequireDefault(_passenger);

var _elevator = require('./elevator');

var _elevator2 = _interopRequireDefault(_elevator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var elevators = [new _elevator2.default(1), new _elevator2.default(10)];
var peopleNum = 40;
var passenger = 0;
var isFinish = false;
var time = 0;

var pList = [];

while (!isFinish) {
    // 每次增加一位使用者在佇列
    if (passenger < peopleNum) {
        pList.push(new _passenger2.default());
        passenger++;
    }

    pList.forEach(function (p, i) {
        var eIndex = findElevator(p);
        if (!elevators[eIndex].full) {
            elevators[eIndex].addTask(p);
            pList.splice(i, 1);
        }
    });

    elevators[0].run();
    elevators[1].run();

    // 當電梯都結束
    if (elevators[0].direction === _elevator.STATUS.IDLE && elevators[1].direction === _elevator.STATUS.IDLE) isFinish = true;
    time++;
}

console.log('finish time:', time);

// 電梯分配，順向上下車優，順向上車反向下車為備案，其餘隨機分配
function findElevator(passenger) {
    var bestFit = null;
    var planB = Math.floor(Math.random() * elevators.length);

    elevators.forEach(function (elevator, index) {
        var sameDirection = passenger.direction === elevator.direction || elevator.direction === _elevator.STATUS.IDLE;

        if (sameDirection) {
            //如果方向相同
            if (passenger.direction === _elevator.STATUS.UP && passenger.from > elevator.floor && bestFit === null) {
                bestFit = index;
            }
            if (passenger.direction === _elevator.STATUS.DOWN && passenger.from < elevator.floor && bestFit === null) {
                bestFit = index;
            }
        } else {
            //如果方向不同，備案
            if (passenger.direction === _elevator.STATUS.UP && passenger.from < elevator.floor) {
                planB = index;
            }
            if (passenger.direction === _elevator.STATUS.DOWN && passenger.from > elevator.floor) {
                planB = index;
            }
        }
    });

    return bestFit !== null ? bestFit : planB;
}

// 74 88 92 98 79 87 84 84 87 93
// best 74 worst 98 avg 86.6