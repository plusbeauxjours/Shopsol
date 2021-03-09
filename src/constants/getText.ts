const https = require('https');
const http = require('http');
const request = require('request')

const slackUrl =
  // 'https://hooks.slack.com/services/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'; // TEST DM
  'https://hooks.slack.com/services/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' // CHANNEL DM

const slackBody = {
  username: 'CODEPUSH💪',
  icon_emoji: '✅',
  attachments: [
    {
      color: '#eed140',
      fields: [
        {
          title: 'Platform',
          value: process.argv[3],
          short: true,
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

function requestSlackAPI(url, messageBody) {
  try {
    messageBody = JSON.stringify(messageBody);
    request({ method: "post", url, body: messageBody });
    return 'Ok'
  } catch (e) {
    console.log(e)
    return 'Failed'
  }
}

const androidVersionUrl = `http://awsss.shop-sol.com:10001/api/auth/updateSuperCodePushVersionAndroid?version=${process.argv[2]}`;
const iosVersionUrl = `http://awsss.shop-sol.com:10001/api/auth/updateSuperCodePushVersionios?version=${process.argv[2]}`;


function requestServerAPI(url) {
  try {
    request({ method: "get", url });
    return 'Ok'
  } catch (e) {
    console.log(e)
    return 'Failed'
  }
}

(async function () {
  const slackResponse = await requestSlackAPI(
    slackUrl,
    slackBody,
  );
  const versionResponse = await requestServerAPI(
    process.argv[3] == "Android" ? androidVersionUrl : iosVersionUrl,
  );
  console.log('Message response', slackResponse);
  console.log('Version updated', versionResponse);
  return;
})();

