'use strict';

var config = require('../config.js');

var sendgrid = require('sendgrid')(config.sendgridKey);              


exports.send = async (to,subject,body) => {
    sendgrid.send({
            to: to,
            from:'joaorcrulhas@live.com',
            subject:subject,
            html:body
    });
}