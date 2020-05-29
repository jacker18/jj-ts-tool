"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
var Exec = /** @class */ (function () {
    function Exec() {
    }
    Exec.startExec = function (cmd) {
        child_process_1.exec(cmd);
    };
    return Exec;
}());
exports["default"] = Exec;
