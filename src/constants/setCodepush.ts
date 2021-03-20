const https = require('https');
const http = require('http');
const request = require('request')

const slackUrl =
  // 'https://hooks.slack.com/services/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'; // SLACK의 @이민재 TEST URL
  'https://hooks.slack.com/services/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' // SLACK의 #샵솔-코드푸시 URL

// 코드푸시를 하였을 때 SLACK알림의 스타일과 옵션
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

// SLACK의 #샵솔-코드푸시로 DM을 보내는 APi
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

// 코드푸시를 하였을 때 에 뜨는 SLACK의 #샵솔-코드푸시에 뜨는 버전과
// 앱에서 마스터 패스워드로 로그인 => 마이페이지 => 버전확인에 뜨는 버전의 동기화를 위한 API
// https://wesop.slack.com/archives/C01HQV8UU5B/p1614768252020800 (feat.허군)

const androidVersionUrl = `http://awsss.shop-sol.com:10001/api/auth/updateSuperCodePushVersionAndroid?version=${process.argv[2]}`;
const iosVersionUrl = `http://awsss.shop-sol.com:10001/api/auth/updateSuperCodePushVersionios?version=${process.argv[2]}`;

// 앱의 마스터 패스워드로 확인하는 코드푸시 버전 업데이트 API
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
  return true;
})();

