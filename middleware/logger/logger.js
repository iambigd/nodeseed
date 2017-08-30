
var winston = require('winston');
winston.level = 'debug';
winston.log('info', 'hello winston info');
winston.log('error', 'hello winston error');

var logger = {};

logger.create = function(){
    var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)({
            timestamp: function() {
                return Date.now();
            },
            formatter: function(options) {
                // Return string will be passed to logger.
                var timeFormat = new Date(options.timestamp());

                return '[' + timeFormat +'] [' + options.level.toUpperCase() + '] ' + (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
            }
        })
        // new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});
    return logger;
}

module.exports = logger;

