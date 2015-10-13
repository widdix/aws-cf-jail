var AWS = require('aws-sdk');
var cloudformation = new AWS.CloudFormation();

function wrapper(fn) {
  return function(event, context) {
    console.log(fn, '(): ', event);
    cloudformation[fn](event, function(err, data) {
      if (err) {
        context.fail(err);
      } else {
        context.succeed(data);
      }
    });
  };
}

// export allowed wrapped API requests as lambda handlers
exports.createStack = wrapper('createStack');
exports.deleteStack = wrapper('deleteStack');
exports.updateStack = wrapper('updateStack');
