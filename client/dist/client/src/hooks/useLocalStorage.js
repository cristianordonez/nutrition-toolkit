"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorageState = void 0;
var react_1 = require("react");
function useLocalStorageState(key, defaultVal) {
    var _a = (0, react_1.useState)(function () {
        var val;
        try {
            val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
        }
        catch (e) {
            val = defaultVal;
        }
        return val;
    }), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        window.localStorage.setItem(key, JSON.stringify(state));
    }, [state]);
    return [state, setState];
}
exports.useLocalStorageState = useLocalStorageState;
//# sourceMappingURL=useLocalStorage.js.map