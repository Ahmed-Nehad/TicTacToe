// import { AdLoadInfo, AdMob, AdOptions, AdmobConsentStatus, InterstitialAdPluginEvents } from '@capacitor-community/admob';
// import { AdMobPlus, InterstitialAd } from '@admob-plus/capacitor'
import { Toast } from '@capacitor/toast';
import { AdmobAds } from "capacitor-admob-ads";

export async function initialize(): Promise<void> {
  // await AdMob.initialize({initializeForTesting: true});
 
  // const [trackingInfo, consentInfo] = await Promise.all([
  //  AdMob.trackingAuthorizationStatus(),
  //  AdMob.requestConsentInfo(),
  // ]);
 
  // if (trackingInfo.status === 'notDetermined') {
  //  /**
  //   * If you want to explain TrackingAuthorization before showing the iOS dialog,
  //   * you can show the modal here.
  //   * ex)
  //   * const modal = await this.modalCtrl.create({
  //   *   component: RequestTrackingPage,
  //   * });
  //   * await modal.present();
  //   * await modal.onDidDismiss();  // Wait for close modal
  //   **/
 
  //  await AdMob.requestTrackingAuthorization();
  // }

  // const authorizationStatus = await AdMob.trackingAuthorizationStatus();
  // if (
  //       authorizationStatus.status === 'authorized' &&
  //       consentInfo.isConsentFormAvailable &&
  //       consentInfo.status === AdmobConsentStatus.REQUIRED
  // ) {
  //  await AdMob.showConsentForm();
  // }
  // await AdMobPlus.start()
}

export async function showInterstitial(callback: (info : any) => any ): Promise<void> {
    // AdMob.addListener(InterstitialAdPluginEvents.Loaded, callback);

    // const options: AdOptions = {
    //   adId: 'ca-app-pub-1756276137537749/8607910220',
    //   isTesting: true,
    // //   npa: true
    // };
    // await AdMob.prepareInterstitial(options);
    // await AdMob.showInterstitial();

  // const interstitial = new InterstitialAd({
  //   adUnitId: 'ca-app-pub-1756276137537749/8607910220',
  // })
  // await interstitial.load()
  // await interstitial.show()
    const tt =async (text: string) => {
      await Toast.show({ text });
    };
    // To load an interstital ad
  await AdmobAds.loadInterstitialAd({ 
    adId: "ca-app-pub-1756276137537749/8607910220",
    isTesting: false
  })//.then(() => {
    await tt('Interstitial Ad Loaded');
  // }).catch(err => {
    // await tt(err.message);
  // });

  // To show an already loaded interstitial ad
  await AdmobAds.showInterstitialAd() //.then(() => {
    await tt('Interstitial Ad Shown');
  // }).catch(err => {
    // await await tt(err.message);
  // });

  // Event listeners
  AdmobAds.addListener("interstitialAdClicked", async () => {
    await tt('Interstitial Ad Clicked');
  });

  AdmobAds.addListener("interstitialAdDismissed", async () => {
    await tt('Interstitial Ad Dismissed');
  });

  AdmobAds.addListener("interstitialAdFailedToShow", async () => {
    await tt('Interstitial Ad Failed To Show');
  });

  AdmobAds.addListener("interstitialAdImpression", async () => {
    await tt('Interstitial Ad Impression');
  });

  AdmobAds.addListener("interstitialAdShowed", async () => {
    await tt('Interstitial Ad Showed');
  });
}