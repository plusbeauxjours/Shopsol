#import "AppDelegate.h"

#import <CodePush/CodePush.h>

#import <React/RCTBridge.h>
#import <Firebase.h>
#import "RNFirebaseNotifications.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
@import Firebase;
@import GoogleMaps;
@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  if (@available(iOS 14, *)) {
    UIDatePicker *picker = [UIDatePicker appearance];
    picker.preferredDatePickerStyle = UIDatePickerStyleWheels;
  }
  [GMSServices provideAPIKey:@"AIzaSyADKGFHRVwkoFG-OXKlqovutibiqVIeN3E"];

  [FIRApp configure];
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
    [RNFirebaseNotifications configure];
  }
    
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"ShopsolWesop"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  return [CodePush bundleURL];
#endif
}

@end