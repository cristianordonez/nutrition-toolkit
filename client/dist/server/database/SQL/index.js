"use strict";
var QueryFile = require('pg-promise').QueryFile;
var joinPath = require('path').join;
function sql(file) {
    var fullPath = joinPath(__dirname, file);
    return new QueryFile(fullPath, { minify: true });
}
module.exports = {
    schemas: {
        users: sql('./users.schema.sql'),
        daily_goals: sql('./daily_goals.schema.sql'),
        session: sql('./session.schema.sql'),
    },
};
//# sourceMappingURL=index.js.map