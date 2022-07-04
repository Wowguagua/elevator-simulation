import Passenger from './passenger';
import Elevator, { STATUS } from './elevator';

const elevators = [
    new Elevator(1),
    new Elevator(10),
];
const peopleNum = 40;
let passenger = 0;
let isFinish = false;
let time = 0;

const pList = [];

while (!isFinish) {
    // 每次增加一位使用者在佇列
    if (passenger < peopleNum) {
        pList.push(new Passenger());
        passenger++;
    }

    pList.forEach((p, i) => {
        const eIndex = findElevator(p);
        if (!elevators[eIndex].full) {
            elevators[eIndex].addTask(p);
            pList.splice(i, 1);
        }
    })

    elevators[0].run();
    elevators[1].run();

    // 當電梯都結束
    if (elevators[0].direction === STATUS.IDLE && elevators[1].direction === STATUS.IDLE) isFinish = true;
    time++;
}

console.log('finish time:', time);

// 電梯分配，順向上下車優，順向上車反向下車為備案，其餘隨機分配
function findElevator(passenger) {
    let bestFit = null;
    let planB = Math.floor(Math.random() * elevators.length);

    elevators.forEach((elevator, index) => {
        const sameDirection = passenger.direction === elevator.direction || elevator.direction === STATUS.IDLE;

        if (sameDirection) {//如果方向相同
            if (passenger.direction === STATUS.UP && passenger.from > elevator.floor &&
                (bestFit === null)) {
                bestFit = index;
            }
            if (passenger.direction === STATUS.DOWN && passenger.from < elevator.floor &&
                (bestFit === null)) {
                bestFit = index;
            }
        } else {//如果方向不同，備案
            if (passenger.direction === STATUS.UP && passenger.from < elevator.floor) {
                planB = index;
            }
            if (passenger.direction === STATUS.DOWN && passenger.from > elevator.floor) {
                planB = index;
            }
        }

    })

    return bestFit !== null ? bestFit : planB;
}

// 74 88 92 98 79 87 84 84 87 93
// best 74 worst 98 avg 86.6