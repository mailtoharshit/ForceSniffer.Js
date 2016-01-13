# ForceSniffer.Js (Inspired by isMobile)

[![Join the chat at https://gitter.im/mailtoharshit/ForceSniffer.Js](https://badges.gitter.im/mailtoharshit/ForceSniffer.Js.svg)](https://gitter.im/mailtoharshit/ForceSniffer.Js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[<img src="http://2.bp.blogspot.com/-80-2MFRFEUw/Vlvn9ZARn5I/AAAAAAAAI_g/FGJRP0RXbc0/s200/Screen%2BShot%2B2015-11-29%2Bat%2B10.08.13%2BPM.png" align="right" width="300">]()

> Simplified Library that detect Mobile Devices, Salesforce1 App and other Saleforce Context

> Read detailed blog post [here](http://www.oyecode.com/2015/11/forcesnifferjs-device-detection-in.html)

## When to use ForceSniffer.js ? 
When you have to detect device of end-user and you have completely separate site had already been created for mobile devices. So that you couldn't depend on media queries, feature detection, graceful degradation, progressive enhancement, or any of the cool techniques for selectively displaying things. or If couldn't do detection on the back-end, because the entire visualforce was generated as HTML with apex-tags,so easier approach is to do the detection client-side.

## How it works
Forcesniffer runs quickly during initial page load to detect mobile devices; it then creates a JavaScript object with the results.

## Devices detected by isMobile

The following properties of the global `isMobile` object will either be `true` or `false` and ForceUI for force.com related detection

### Salesforce devices

##### Detect Salesforce1
* `ForceUI.isSalesforce1()`

##### Detect Lightning Experience
* `ForceUI.isLightingX()`

##### Is Visualforce Inside Saleforce
* `ForceUI.isVF_In_Salesforce1()`

##### Is Visualforce inside Salesforce1 Classic
* `ForceUI.isVF_In_SalesforceClassic()`


### Apple devices

* `isMobile.apple.phone`
* `isMobile.apple.ipod`
* `isMobile.apple.tablet`
* `isMobile.apple.device` (any mobile Apple device)

### Android devices

* `isMobile.android.phone`
* `isMobile.android.tablet`
* `isMobile.android.device` (any mobile Android device)

### Amazon Silk devices (also passes Android checks)

* `isMobile.amazon.phone`
* `isMobile.amazon.tablet`
* `isMobile.amazon.device` (any mobile Amazon Silk device)

### Windows devices

* `isMobile.windows.phone`
* `isMobile.windows.tablet`
* `isMobile.windows.device` (any mobile Windows device)

### Specific seven inch devices

* `isMobile.seven_inch`
	* `true` if the device is one of the following 7" devices:
		- Nexus 7
		- Kindle Fire
		- Nook Tablet 7 inch
		- Galaxy Tab 7 inch

### "Other" devices

* `isMobile.other.blackberry_10`
* `isMobile.other.blackberry`
* `isMobile.other.opera` (Opera Mini)
* `isMobile.other.firefox`
* `isMobile.other.chrome`
* `isMobile.other.device` (any "Other" device)

### Aggregate Groupings

* `isMobile.any` - any device matched
* `isMobile.phone` - any device in the 'phone' groups above
* `isMobile.tablet` - any device in the 'tablet' groups above


## Example Usage

I added minified version of forcesniffer.js file to avoid importing 1.6kb of js file. You can always import from this cdn


```html
<apex:page standardStylesheets="false" showHeader="false" applyHtmlTag="false" docType="html-5.0">
   <html xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <head>
      <script>
       //Minified ForceSniffer.js
       !function(e){e.ForceUI=e.ForceUI||{},e.ForceUI.isSalesforce1=function(){return"undefined"!=typeof sforce&&sforce&&!!sforce.one}}(this),function(e){var i=/iPhone/i,o=/iPod/i,n=/iPad/i,t=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,d=/Android/i,r=/(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,s=/(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,b=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,a=/BlackBerry/i,l=/BB10/i,p=/Opera Mini/i,f=/(CriOS|Chrome)(?=.*\bMobile\b)/i,c=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,u=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),F=function(e,i){return e.test(i)},w=function(e){var w=e||navigator.userAgent,A=w.split("[FBAN");return"undefined"!=typeof A[1]&&(w=A[0]),this.apple={phone:F(i,w),ipod:F(o,w),tablet:!F(i,w)&&F(n,w),device:F(i,w)||F(o,w)||F(n,w)},this.amazon={phone:F(r,w),tablet:!F(r,w)&&F(s,w),device:F(r,w)||F(s,w)},this.android={phone:F(r,w)||F(t,w),tablet:!F(r,w)&&!F(t,w)&&(F(s,w)||F(d,w)),device:F(r,w)||F(s,w)||F(t,w)||F(d,w)},this.windows={phone:F(b,w),tablet:F(h,w),device:F(b,w)||F(h,w)},this.other={blackberry:F(a,w),blackberry10:F(l,w),opera:F(p,w),firefox:F(c,w),chrome:F(f,w),device:F(a,w)||F(l,w)||F(p,w)||F(c,w)||F(f,w)},this.seven_inch=F(u,w),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},A=function(){var e=new w;return e.Class=w,e};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=w:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=A():"function"==typeof define&&define.amd?define("isMobile",[],e.isMobile=A()):e.isMobile=A()}(this);
       function detect()
       {
           //Check for all Phone
           if(isMobile.phone)
           {
              alert("Opened in Phone  ---- /route/phone.page"); 
           }
           
           //Check for all Tablet
           if(isMobile.tablet)
           {
              alert("Opened in Tablet ---- /route/Tablet.page");
           }
           
           //Check if Desktop 
           if(!isMobile.any)
           {
              alert("Opened in Non-Desktop Device ---- /route/global.page"); 
           }
           
           //Check if Salesforce1
           if(ForceUI.isSalesforce1())
           {
              alert ("Opened in Salesforce1 ---- /route/salesforce1.page");
           }
       }
      </script>
     </head>
     <body onload='detect();'>
     </body>
</html>
</apex:page>

```
