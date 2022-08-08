"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeightInputField = void 0;
var react_1 = __importDefault(require("react"));
var material_1 = require("@mui/material");
var HeightInputField = function (_a) {
    var height = _a.height, setHeight = _a.setHeight;
    var handleHeightSliderChange = function (event, newValue) {
        setHeight(newValue);
    };
    var handleHeightInputChange = function (event) {
        setHeight(event.target.value === '' ? '' : Number(event.target.value));
    };
    var handleHeightBlur = function () {
        if (height < 54) {
            setHeight(54);
        }
        else if (height > 84) {
            setHeight(84);
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Typography, { id: 'input-slider', gutterBottom: true },
            "I am ",
            height,
            " inches tall"),
        react_1.default.createElement(material_1.Grid, { container: true, spacing: 2, alignItems: 'center' },
            react_1.default.createElement(material_1.Grid, { item: true, xs: true },
                react_1.default.createElement(material_1.Slider, { value: typeof height === 'number' ? height : 0, onChange: handleHeightSliderChange, "aria-labelledby": 'height-input-slider', min: 54, max: 84 })),
            react_1.default.createElement(material_1.Grid, { item: true },
                react_1.default.createElement(material_1.Input, { value: height, size: 'small', onChange: handleHeightInputChange, onBlur: handleHeightBlur, "data-testid": 'height-input', inputProps: {
                        step: 1,
                        min: 54,
                        max: 84,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    } })))));
};
exports.HeightInputField = HeightInputField;
//# sourceMappingURL=HeightInputField.js.map