// public class MyFirebaseMessagingService extends FirebaseMessagingService {

//     private static final String TAG = "MyFirebaseMsgService";

//     //푸시 알림 설정
//     private String title ="";
//     private String body ="";
//     private String color ="";


//     // [START receive_message]
//     @Override
//     public void onMessageReceived(RemoteMessage remoteMessage) {

//         Log.d(TAG, "From: " + remoteMessage.getFrom());

//         if (remoteMessage.getData().size() > 0) {
//             Log.d(TAG, "Message data payload: " + remoteMessage.getData());
//             title = remoteMessage.getData().get("title");
//             body = remoteMessage.getData().get("body");
//             color = remoteMessage.getData().get("color");

//             if (/* Check if data needs to be processed by long running job */ true) {
//                 // For long-running tasks (10 seconds or more) use Firebase Job Dispatcher.
//                 scheduleJob();
//             } else {
//                 // Handle message within 10 seconds
//                 handleNow();
//             }

//         }

//         //Notification 사용했을때 data 가져오기
//         if (remoteMessage.getNotification() != null) {
//             Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getColor());
//             Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getIcon());
//             Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getTitle());
//             Log.d(TAG, "Message Notification Body: " + remoteMessage.getNotification().getBody());
//         }
//         sendNotification();
//         // Also if you intend on generating your own notifications as a result of a received FCM
//         // message, here is where that should be initiated. See sendNotification method below.

//     }
//     // [END receive_message]


//     // [START on_new_token]

//     @Override
//     public void onNewToken(String token) {
//         Log.d(TAG, "Refreshed token: " + token);

//         // If you want to send messages to this application instance or
//         // manage this apps subscriptions on the server side, send the
//         // Instance ID token to your app server.
//         sendRegistrationToServer(token);
//     }
//     // [END on_new_token]

//     private void scheduleJob() {
//         // [START dispatch_job]
//         FirebaseJobDispatcher dispatcher = new FirebaseJobDispatcher(new GooglePlayDriver(this));
//         Job myJob = dispatcher.newJobBuilder()
//                 .setService(MyJobService.class)
//                 .setTag("my-job-tag")
//                 .build();
//         dispatcher.schedule(myJob);
//         // [END dispatch_job]
//     }

//     private void handleNow() {
//         Log.d(TAG, "Short lived task is done.");
//     }
//     private void sendRegistrationToServer(String token) {
//         // TODO: Implement this method to send token to your app server.
//     }

//     private void sendNotification() {
//         Intent intent = new Intent(this, MainActivity.class);
//         intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
//         PendingIntent pendingIntent = PendingIntent.getActivity(this, 0 /* Request code */, intent,
//                 PendingIntent.FLAG_ONE_SHOT);

//         String channelId = "SHOPSOL";
//         Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
//         NotificationCompat.Builder notificationBuilder =
//                 new NotificationCompat.Builder(this, channelId)
//                         .setSmallIcon(R.mipmap.ic_firebase)
//                         .setContentTitle(title)
//                         .setContentText(body)
//                         .setColor(Color.parseColor(color))
//                         .setAutoCancel(true)
//                         .setSound(defaultSoundUri)
//                         .setContentIntent(pendingIntent)
//                         .setPriority(Notification.PRIORITY_HIGH);

//         NotificationManager notificationManager =
//                 (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

//         // Since android Oreo notification channel is needed.
//         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//             NotificationChannel channel = new NotificationChannel(channelId,
//                     "Channel human readable title",
//                     NotificationManager.IMPORTANCE_DEFAULT);
//             notificationManager.createNotificationChannel(channel);
//         }

//         notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());

//     }
// }


