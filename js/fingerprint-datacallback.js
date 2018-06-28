var Raven = require('raven');

Raven
    .config('https://<key>@sentry.io/<project>', {
        dataCallback: function (data) {
            // perform conditional on data object
            if (data.exception.values[0].value === "Some message/error...") {
                // override fingerprint
                data.fingerprint = ['Some-message-error', 'etc'];

                // or, add specivity (append fingerprint)
                // data.fingerprint = ['{{ default }}', 'Some-message-error'];
            }
            return data;
        }
    })
    .install();

Raven.captureMessage('Some message/error...');

var x = {};
x.something(); // this error should be shot up to Sentry
