package com.ebudgie;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.reactlibrary.RNUUIDGeneratorPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.modules.storage.ReactDatabaseSupplier;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.reactNativeMPAndroidChart.MPAndroidChartPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      long size = 100L * 1024L * 1024L; // 100 MB
      ReactDatabaseSupplier.getInstance(getApplicationContext()).setMaximumSize(size);

      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNUUIDGeneratorPackage(),
            new RNDeviceInfo(),
            new RNAccountKitPackage(),
            new SplashScreenReactPackage(),
            new VectorIconsPackage(),
            new MPAndroidChartPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
