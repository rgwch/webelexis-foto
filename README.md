# webelexis-foto

Take a picture with a mobile device and send it to [Webelexis/Janus](https://github.com/rgwch/webelexis).

This is a very simple [Cordova/PhoneGap](https://cordova.apache.org/) app which runs on Android and iOS Devices. We use it to take pictures of moles and other skin manifestations to monitor changes over time.

## Prerequisites

* The build process is NodeJS-based. So you'll need a running NodeJS v.7.0 or later.

* To build the Android app, you need the Android [SDK](https://developer.android.com/studio/index.html), available for Linux, Mac and Windows computers. (Just for building this app, the SDK is sufficiant, but Google will push you towards downloading the whole Android Studio. It doesn't really matter, but with the SDK alone, you should really love the command line, since you must install all parts maniually.

* To build the iOS app, you need a Mac with XCode installed. 

* To build the windows phone app, you need a Windows 8.1 or 10 PC with VisualStudio installed.

* Webelexis-Foto needs a [Janus-Server](https://github.com/rgwch/webelexis/tree/develop/Janus) v 0.3.0 or later to communicate.

## Build

    git clone https://github.com/rgwch/webelexis-foto
    cd webelexis-foto
    sudo npm install -g cordova
    cordova platform add android
    cordova build android

## Install

There are quite a few possibilities to install the program to your phone. Probably the easiest way is, to run a temporary web server on your development machine and point your mobile to the newly created .apk file. The phone will ask you, if you want to install (Of course, this works only, if you have "install from unsecure sources" enabled on the phone). Say "yes" amd you're done.

## Operation

The phone must be in the same WLAN as the Janus Server. Enter settings accordingly. Then just hit "Bild aufnehmen" and the mobile lets you take a photo and transmits it immediately to the server.

![Front](webelexis-foto-1.png) 
![back](webelexis-foto-2.png)

## Limitations

Today's mobile devices have increasingly high resolution image sensors (not always with accordingly increasing quality, though). Webelexis accepts data uploads up to 10 MB size this time. Larger data result in an "413" Error (Request entity too large).
If you want increase this, change the limit of bodyParser in Webelexis' "app.js". I think, however, it's better to reduce the image size.

