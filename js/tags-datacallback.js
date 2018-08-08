var Raven = require('raven');

Raven
    .config('https://<key>@sentry.io/<project>', {
        dataCallback: function (data) {
            // perform conditional on data object (need to figure out what data to look for when error stems from shared library in question)
            if (data.exception.values[0].value === "Some message/error...") {
                data.tags.isSharedLibrary = true;
            }
            return data;
        }
    })
    .install();

Raven.captureMessage('Some message/error...');

var x = {};
x.something(); // this error should be shot up to Sentry
