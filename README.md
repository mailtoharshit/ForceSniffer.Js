# ForceSniffer.Js (Inspired by isMobile)

[<img src="https://login.salesforce.com/img/logo190.png" align="right" width="300">]()

> Simplified Library that detect Mobile Devices, Salesforce1 App and other [Saleforce Context](http://login.salesforce.com)

## When to use ForceSniffer.js ? 
When you have to detect device of end-user and you have completely separate site had already been created for mobile devices. So that you couldn't depend on media queries, feature detection, graceful degradation, progressive enhancement, or any of the cool techniques for selectively displaying things. or If couldn't do detection on the back-end, because the entire visualforce was generated as HTML with apex-tags,so easier approach is to do the detection client-side.

## How it works
isMobile runs quickly during initial page load to detect mobile devices; it then creates a JavaScript object with the results.

## Devices detected by isMobile

The following properties of the global `isMobile` object will either be `true` or `false`

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

I include the minified version of the script, inline, and at the top of the `<head>`. Cellular connections tend to suck, so it would be wasteful overhead to open another connection, just to download ~1.4kb of JS:


```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <script>
        // Minified version of isMobile included in the HTML since it's small
        !function(a){var b=/iPhone/i,c=/iPod/i,d=/iPad/i,e=/(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,f=/Android/i,g=/IEMobile/i,h=/(?=.*\bWindows\b)(?=.*\bARM\b)/i,i=/BlackBerry/i,j=/BB10/i,k=/Opera Mini/i,l=/(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,m=new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)","i"),n=function(a,b){return a.test(b)},o=function(a){var o=a||navigator.userAgent,p=o.split("[FBAN");return"undefined"!=typeof p[1]&&(o=p[0]),this.apple={phone:n(b,o),ipod:n(c,o),tablet:!n(b,o)&&n(d,o),device:n(b,o)||n(c,o)||n(d,o)},this.android={phone:n(e,o),tablet:!n(e,o)&&n(f,o),device:n(e,o)||n(f,o)},this.windows={phone:n(g,o),tablet:n(h,o),device:n(g,o)||n(h,o)},this.other={blackberry:n(i,o),blackberry10:n(j,o),opera:n(k,o),firefox:n(l,o),device:n(i,o)||n(j,o)||n(k,o)||n(l,o)},this.seven_inch=n(m,o),this.any=this.apple.device||this.android.device||this.windows.device||this.other.device||this.seven_inch,this.phone=this.apple.phone||this.android.phone||this.windows.phone,this.tablet=this.apple.tablet||this.android.tablet||this.windows.tablet,"undefined"==typeof window?this:void 0},p=function(){var a=new o;return a.Class=o,a};"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=o:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?module.exports=p():"function"==typeof define&&define.amd?define("isMobile",[],a.isMobile=p()):a.isMobile=p()}(this);


        // My own arbitrary use of isMobile, as an example
        (function () {
            var MOBILE_SITE = '/mobile/index.html', // site to redirect to
                NO_REDIRECT = 'noredirect'; // cookie to prevent redirect

            // I only want to redirect iPhones, Android phones and a handful of 7" devices
            if (isMobile.apple.phone || isMobile.android.phone || isMobile.seven_inch) {

                // Only redirect if the user didn't previously choose
                // to explicitly view the full site. This is validated
                // by checking if a "noredirect" cookie exists
                if ( document.cookie.indexOf(NO_REDIRECT) === -1 ) {
                    document.location = MOBILE_SITE;
                }
            }
        })();
    </script>
</head>
<body>
    <!-- imagine lots of html and content -->
</body>
</html>
```

### node.js usage

#####Installation
`npm install ismobilejs`

#####Usage
```
var isMobile = require('ismobilejs');
console.log(isMobile(req.headers['user-agent']).any);
```
