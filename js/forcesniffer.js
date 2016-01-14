/*
 * ForceSniffer.js v1.0.0
 * Device Detect Library for Phone and Tablets and other 
 * device include (Amazon Silk, mini-opera and Windows Phone),
 * and any kind of seven inch device, via user agent sniffing.
 * @author: Harshit Pandey (mailtoharshit@gmail.com)
 */

//Forked and Inspired from isMobile.js

//Script to detect all mobile devices    
(function (global) {

    var apple_phone         = /iPhone/i,
        apple_ipod          = /iPod/i,
        apple_tablet        = /iPad/i,
        android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
        android_tablet      = /Android/i,
        amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        windows_phone       = /IEMobile/i,
        windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
        other_blackberry    = /BlackBerry/i,
        other_blackberry_10 = /BB10/i,
        other_opera         = /Opera Mini/i,
        other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
        seven_inch = new RegExp(
            '(?:' +         // Non-capturing group

            'Nexus 7' +     // Nexus 7

            '|' +           // OR

            'BNTV250' +     // B&N Nook Tablet 7 inch

            '|' +           // OR

            'Kindle Fire' + // Kindle Fire

            '|' +           // OR

            'Silk' +        // Kindle Fire, Silk Accelerated

            '|' +           // OR

            'GT-P1000' +    // Galaxy Tab 7 inch

            ')',            // End non-capturing group

            'i');           // Case-insensitive matching

    var match = function(regex, userAgent) {
        return regex.test(userAgent);
    };

    var IsMobileClass = function(userAgent) {
        var ua = userAgent || navigator.userAgent;
        // Facebook mobile app's integrated browser adds a bunch of strings that
        // match everything. Strip it out if it exists.
        var tmp = ua.split('[FBAN');
        if (typeof tmp[1] !== 'undefined') {
            ua = tmp[0];
        }

        this.apple = {
            phone:  match(apple_phone, ua),
            ipod:   match(apple_ipod, ua),
            tablet: !match(apple_phone, ua) && match(apple_tablet, ua),
            device: match(apple_phone, ua) || match(apple_ipod, ua) || match(apple_tablet, ua)
        };
        this.amazon = {
            phone:  match(amazon_phone, ua),
            tablet: !match(amazon_phone, ua) && match(amazon_tablet, ua),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua)
        };
        this.android = {
            phone:  match(amazon_phone, ua) || match(android_phone, ua),
            tablet: !match(amazon_phone, ua) && !match(android_phone, ua) && (match(amazon_tablet, ua) || match(android_tablet, ua)),
            device: match(amazon_phone, ua) || match(amazon_tablet, ua) || match(android_phone, ua) || match(android_tablet, ua)
        };
        this.windows = {
            phone:  match(windows_phone, ua),
            tablet: match(windows_tablet, ua),
            device: match(windows_phone, ua) || match(windows_tablet, ua)
        };
        this.other = {
            blackberry:   match(other_blackberry, ua),
            blackberry10: match(other_blackberry_10, ua),
            opera:        match(other_opera, ua),
            firefox:      match(other_firefox, ua),
            chrome:       match(other_chrome, ua),
            device:       match(other_blackberry, ua) || match(other_blackberry_10, ua) || match(other_opera, ua) || match(other_firefox, ua) || match(other_chrome, ua)
        };
        this.seven_inch = match(seven_inch, ua);
        this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch;
        // excludes 'other' devices and ipods, targeting touchscreen phones
        this.phone = this.apple.phone || this.android.phone || this.windows.phone;
        // excludes 7 inch devices, classifying as phone or tablet is left to the user
        this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet;

        if (typeof window === 'undefined') {
            return this;
        }
    };

    var instantiate = function() {
        var IM = new IsMobileClass();
        IM.Class = IsMobileClass;
        return IM;
    };

    if (typeof module != 'undefined' && module.exports && typeof window === 'undefined') {
        //node
        module.exports = IsMobileClass;
    } else if (typeof module != 'undefined' && module.exports && typeof window !== 'undefined') {
        //browserify
        module.exports = instantiate();
    } else if (typeof define === 'function' && define.amd) {
        //AMD
        define('isMobile', [], global.isMobile = instantiate());
    } else {
        global.isMobile = instantiate();
    }

})(this);

//Detect if Salesforce1
(function(myContext){
    myContext.ForceUI = myContext.ForceUI || {};
    myContext.ForceUI.isSalesforce1 = function() {
        return((typeof sforce != 'undefined') && sforce && (!!sforce.one));
    }
    })(this);
//Detect if LightingX
(function(myContext){
    myContext.ForceUI = myContext.ForceUI || {};
    myContext.ForceUI.isLightingX = function() {
        return(isLightning() && (!isMobile.any()));
    }
    })(this);
    
//Detect if Visualforce Inside Saleforce1
(function(myContext){
    myContext.ForceUI = myContext.ForceUI || {};
    myContext.ForceUI.isVF_In_Salesforce1 = function() {
        return((!isLightning()) && ForceUI.isSalesforce1());
    }
    })(this);
    
//Detect if Visualforce inside Salesforce Classic
(function(myContext){
    myContext.ForceUI = myContext.ForceUI || {};
    myContext.ForceUI.isVF_In_SalesforceClassic = function() {
        return((!isLightning()) && (!ForceUI.isSalesforce1());
    }
    })(this);
	
//Detect browser type
(function(myContext) {
    myContext.ForceUI = myContext.ForceUI || {};
    myContext.ForceUI.browserType = function() {
        if (navigator.userAgent.indexOf("OPR") != -1) { // if browser type is Opera
            return 'Opera';
        } else if (navigator.userAgent.indexOf("Chrome") != -1) { // if browser type is Chrome
            return 'Chrome';
        } else if (navigator.userAgent.indexOf("Safari") != -1) { // if browser type is Safari
            return 'Safari';
        } else if (navigator.userAgent.indexOf("Firefox") != -1) { // if browser type is Firefox
            return 'Firefox';
        } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) { // if browser is IE
            return 'IE';
        } else {
            return 'unknown'; // if browser is something else
        }
    }
})(this);

//Detects browser version
(function(myContext) {
    myContext.ForceUI = myContext.ForceUI || {};
    myContext.ForceUI.browserVersion = function() {
        var ua = window.navigator.userAgent;
        var browserStartPoint = ua.indexOf(ForceUI.browserType());

        // If browser type is found, return it's version number
        if (ForceUI.browserType() == 'Chrome') // get Chrome browser version
            return ua.substring(browserStartPoint + 7, ua.indexOf(" ", browserStartPoint));
        else if (ForceUI.browserType() == 'IE') { // get IE browser version
            browserStartPoint = navigator.userAgent.indexOf("MSIE");
            return ua.substring(browserStartPoint + 5, ua.indexOf(";", browserStartPoint));
        } else if (ForceUI.browserType() == 'Firefox') // get Firefox browser version
            return ua.substring(browserStartPoint + 8, ua.length);
        else if (ForceUI.browserType() == 'Safari') // get Safari browser version
            return ua.substring(browserStartPoint + 7, ua.length);
        else if (ForceUI.browserType() == 'Opera') { // get Opera browser version
            browserStartPoint = navigator.userAgent.indexOf("OPR");
            return ua.substring(browserStartPoint + 4, ua.length);
        } else // If another browser, return 0
            return 0

    }
})(this);

//Detect browser type with Browser Version
(function(myContext) {
    myContext.ForceUI = myContext.ForceUI || {};
    myContext.ForceUI.browserTypeWithVersion = function() { // get browser Type along with version
        var result = ForceUI.browserType() + ' ' + ForceUI.browserVersion();
        return result;
    }
})(this);
