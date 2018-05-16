'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://localhost/noobz-app';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost/test-noobz-app';
//above this only runs on local and Travis
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
