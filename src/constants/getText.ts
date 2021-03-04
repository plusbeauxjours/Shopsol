const https = require('https');

const yourWebHookURL =
  'https://hooks.slack.com/services/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'; // PUT YOUR WEBHOOK URL HERE
// 'https://hooks.slack.com/services/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'
const userAccountNotification = {
  username: 'CODEPUSH💪', // This will appear as user name who posts the message
  icon_emoji: '✅', // User icon, you can also use custom icons here
  attachments: [
    {
      // this defines the attachment block, allows for better layout usage
      color: '#eed140', // color of the attachments sidebar.
      fields: [
        // actual fields
        {
          title: 'Platform', // Custom field
          value: process.argv[3], // Custom value
          short: true, // long fields will be full width
        },
        {
          title: 'SuperUser Version',
          value: process.argv[2],
          short: true,
        },
      ],
    },
  ],
};

/**
 * Handles the actual sending request.
 * We're turning the https.request into a promise here for convenience
 * @param webhookURL
 * @param messageBody
 * @return {Promise}
 */

function sendSlackMessage(webhookURL, messageBody) {
  process.env;
  // make sure the incoming message body can be parsed into valid JSON
  try {
    messageBody = JSON.stringify(messageBody);
  } catch (e) {
    throw new Error('Failed to stringify messageBody', e);
  }

  // Promisify the https.request
  return new Promise((resolve, reject) => {
    // general request options, we defined that it's a POST request and content is JSON
    const requestOptions = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
    };

    // actual request
    const req = https.request(webhookURL, requestOptions, (res) => {
      let response = '';

      res.on('data', (d) => {
        response += d;
      });

      // response finished, resolve the promise with data
      res.on('end', () => {
        resolve(response);
      });
    });

    // there was an error, reject the promise
    req.on('error', (e) => {
      reject(e);
    });

    // send our message body (was parsed to JSON beforehand)
    req.write(messageBody);
    req.end();
  });
}

// main
(async function () {
  if (!yourWebHookURL) {
    console.error('Please fill in your Webhook URL');
  }

  console.log('Sending slack message');
  try {
    const slackResponse = await sendSlackMessage(
      yourWebHookURL,
      userAccountNotification,
    );
    console.log('Message response', slackResponse);
  } catch (e) {
    console.error('There was a error with the request', e);
  }
})();

console.log(process.argv[2]);
