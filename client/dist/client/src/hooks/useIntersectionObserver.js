"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useIntersectionObserver = function (reference) {
    var _a = (0, react_1.useState)(false), isVisible = _a[0], setIsVisible = _a[1];
    (0, react_1.useEffect)(function () {
        var handleIntersect = function (entries, observer) {
            if (entries[0].isIntersecting) {
                setTimeout(function () {
                    setIsVisible(true);
                    observer.unobserve(entries[0].target);
                    observer.disconnect();
                }, '100');
            }
        };
        var observer = new IntersectionObserver(handleIntersect);
        if (reference) {
            observer.observe(reference.current);
        }
        return function () { return observer.disconnect(); };
    }, [reference]);
    return isVisible;
};
exports.default = useIntersectionObserver;
//# sourceMappingURL=useIntersectionObserver.js.map