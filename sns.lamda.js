var AWS = require('aws-sdk');
// Set region
AWS.config.update({region: 'ap-south-1'});

exports.handler = async (event) => {
    
    var params = {
  Message: event.message, /* required */
  TopicArn: event.topicArn
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
return publishTextPromise.then(
  function(data) {
    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
};
