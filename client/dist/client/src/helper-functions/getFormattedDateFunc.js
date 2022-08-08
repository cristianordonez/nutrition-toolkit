"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormattedDate = void 0;
var months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 10,
    Nov: 9,
    Dec: 11,
};
var getFormattedDate = function (date) {
    var currentDate = date + '';
    var arr = currentDate.split(' ');
    var timeComponents = arr[4];
    var currentMonth = months[arr[1]];
    var _a = timeComponents.split(':'), hour = _a[0], min = _a[1], sec = _a[2];
    var result = {
        year: parseInt(arr[3]),
        month: currentMonth,
        day: parseInt(arr[2]),
        hour: parseInt(hour),
        min: parseInt(min),
        sec: parseInt(sec),
    };
    return result;
};
exports.getFormattedDate = getFormattedDate;
//# sourceMappingURL=getFormattedDateFunc.js.map