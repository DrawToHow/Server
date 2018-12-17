/**
 *
 * Warning! This function was created for testing purposes, make sure you have
 * configured your environment to `test` mode
 *
 */

const clearHistoryCollection = function () {
    const History  = require('../models/History');

    return History.deleteMany({});
}

module.exports = clearHistoryCollection;