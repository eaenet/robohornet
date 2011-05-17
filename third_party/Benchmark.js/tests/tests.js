module("Benchmark.platform");

test("user agent detection", function() {

  var getPlatform = (function() {
    var compiled,
        xhr,
        isClassOf = Benchmark.isClassOf,
        isHostType = Benchmark.isHostType,
        reduce = Benchmark.reduce,
        toString = {}.toString,
        trim = function(string) { return string.replace(/^\s+/, '').replace(/\s+$/, ''); }

    if (isHostType(window, 'ActiveXObject')) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    } else if (isHostType(window, 'XMLHttpRequest')) {
      xhr = new XMLHttpRequest;
    }

    Benchmark.each(document.getElementsByTagName('script'), function(element) {
      var src = element.src;
      if (/benchmark\.js$/.test(src)) {
        xhr.open('get', src, false);
        xhr.send();
        compiled = Function('isClassOf,isHostType,reduce,toString,trim,options',
          'return ' +
          (/(\s*)Benchmark.platform\s*=((?:.|\n|\r)*?)\1}/.exec(xhr.responseText)[2] + '}())')
            .replace(/\bme\s*=[^,;]+([,;])/, 'me=options$1')
            .replace(/\bua\s*=[^,;]+([,;])/, 'ua=me.ua$1')
            .replace(/\bopera\.version\(\)/, 'opera')
            .replace(/\bIN_AIR\b/g, 'me.runtime')
            .replace(/\bIN_JAVA\b/g, 'false')
            .replace(/\bwindow\b/g, 'me')
            .replace(/([^.\x22\x27])\bglobal\b/g, '$1me.global')
            .replace(/([^.])\bsystem\b/g, '$1me.system')
            .replace(/\b(?:Environment|RuntimeObject)\b/g, 'Object')
            .replace(/\bnav\.appMinorVersion/g, 'me.appMinorVersion')
            .replace(/\bnav\.cpuClass/g, 'me.cpuClass')
            .replace(/\bnav\.platform/g, 'me.platform')
            .replace(/\bexports\b/g, 'me.exports')
            .replace(/\bexternal/g, 'me.external')
            .replace(/\bprocess\b/g, 'me.process')
            .replace(/\b(?:me\.)?runtime/g, 'me.runtime')
            .replace(/\b(?:me\.)?phantom/g, 'me.phantom')
            .replace(/\bdoc\.documentMode/g, 'me.mode'));
      }
    });

    return function(options) {
      // http://www.howtocreate.co.uk/operaStuff/operaObject.html
      if (options.opera < 7.6) {
        delete options.opera;
      }
      return compiled(isClassOf, isHostType, reduce, toString, trim, options);
    };
  }());

  var Tests = {
    'Adobe AIR 2.5 (like Safari 4.x) on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; en-US) AppleWebKit/531.9 (KHTML, like Gecko) AdobeAIR/2.5',
      'runtime': { 'flash': { 'system': { 'Capabilities': { 'os': 'Windows XP' }}}}
    },

    'Avant Browser on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Avant Browser)',
      'mode': 8
    },

    'Avant Browser (running in IE 7 mode) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; Avant Browser)',
      'mode': 7
    },

    'Android Browser (like Chrome 2.x) on Android 2.1': {
      'ua': 'Mozilla/5.0 (Linux; U; Android 2.1-update1; en-us; Sprint APA9292KT Build/ERE27) AppleWebKit/530.17 (KHTML, like Gecko)'
    },

    'Android Browser 3.0.4 (like Chrome 1.x) on Xoom (Android 3.0)': {
      'ua': 'Mozilla/5.0 (Linux; U; Android 3.0; xx-xx; Xoom Build/HRI39) AppleWebKit/525.10+ (KHTML, like Gecko) Version/3.0.4 Mobile Safari/523.12.2'
    },

    'Android Browser 3.1.2 (like Chrome 1.x) on Android 1.6': {
      'ua': 'Mozilla/5.0 (Linux; U; Android 1.6; en-us; HTC_TATTOO_A3288 Build/DRC79) AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1'
    },

    'Android Browser 4.0 (like Chrome 5.x) on Android 2.2': {
      'ua': 'Mozilla/5.0 (Linux; U; Android 2.2; zh-cn;) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
    },

    'Android Browser 4.0 (like Chrome 5.x) on Android 2.2.1': {
      'ua': 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
    },

    'Android Browser 4.1#{alpha} (platform preview; like Chrome 5.x) on Android 2.2.1': {
      'ua': 'Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; Nexus One Build/FRG83) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.1a Mobile Safari/533.1',
      'external': null
    },

    'BlackBerry Browser 4.0.0 on BlackBerry 7250': {
      'ua': 'BlackBerry7250/4.0.0 Profile/MIDP-2.0 Configuration/CLDC-1.1'
    },

    'BlackBerry Browser 4.5.1.231 on BlackBerry 8900': {
      'ua': 'BlackBerry8900/4.5.1.231 Profile/MIDP-2.0 Configuration/CLDC-1.1 VendorID/100'
    },

    'BlackBerry Browser 6.0.0.91 (like Safari 4+) on BlackBerry 9800': {
      'ua': 'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en-US) AppleWebKit/534.1  (KHTML, like Gecko) Version/6.0.0.91 Mobile Safari/534.1 ,gzip(gfe),gzip(gfe)'
    },

    'Camino 0.7 on Mac OS X': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.0.1) Gecko/20030306 Camino/0.7'
    },

    'Camino 1.0#{beta}2+ on Mac OS X': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.8.0.1) Gecko/20060119 Camino/1.0b2+'
    },

    'Camino 1.0+ on Mac OS X': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.8.1) Gecko/20061013 Camino/1.0+ (Firefox compatible)'
    },

    'Camino 1.1#{alpha}1+ on Mac OS X': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X; en; rv:1.8.1.1pre) Gecko/20061126 Camino/1.1a1+'
    },

    'Camino 1.6#{alpha} on Mac OS X': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en; rv:1.8.1.4pre) Gecko/20070511 Camino/1.6pre'
    },

    'Camino 2.0#{beta}3 on Mac OS X 10.5': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en; rv:1.9.0.10pre) Gecko/2009041800 Camino/2.0b3pre (like Firefox/3.0.10pre)'
    },

    'Camino 2.0.3 on Mac OS X 10.6': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; nl; rv:1.9.0.19) Gecko/2010051911 Camino/2.0.3 (MultiLang) (like Firefox/3.0.19)'
    },

    'Chrome 0.2.149.27 on Windows 2000': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.0; en-US) AppleWebKit/525.13 (KHTML, like Gecko) Chrome/0.2.149.27 Safari/525.13'
    },

    'Chrome 5.0.375.99 on Windows Server 2003 / XP x64': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.99 Safari/533.4'
    },

    'Chrome 8.1.0.0 on Linux x86_64': {
      'ua': 'Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/540.0 (KHTML, like Gecko) Ubuntu/10.10 Chrome/8.1.0.0 Safari/540.0'
    },

    'Chrome 10.0.648.133 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.133 Safari/534.16'
    },

    'Epiphany 0.9.2 on Linux i686': {
      'ua': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.4) Gecko/20030908 Epiphany/0.9.2'
    },

    'Epiphany 2.22 on Linux x86_64': {
      'ua': 'Mozilla/5.0 (X11; U; Linux x86_64; en; rv:1.9.0.8) Gecko/20080528 Fedora/2.24.3-4.fc10 Epiphany/2.22 Firefox/3.0'
    },

    'Epiphany 2.30.6 on Linux x86_64': {
      'ua': 'Mozilla/5.0 (X11; U; Linux x86_64; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7'
    },

    'Firefox 3.0#{alpha}1 on Mac OS X': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; en-US; rv:1.9a1) Gecko/20061204 Firefox/3.0a1'
    },

    'Firefox 3.0.1#{alpha} on Linux armv7l': {
      'ua': 'Mozilla/5.0 (X11; U; Linux armv7l; en-US; rv:1.9.0.1) Gecko/2009010915 Minefield/3.0.1'
    },

    'Firefox 3.6.11 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.11) Gecko/20101012 Firefox/3.6.11 (.NET CLR 3.5.30729)'
    },

    'Firefox 3.7#{alpha}5 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.3a5pre) Gecko/20100418 Minefield/3.7a5pre'
    },

    'Firefox 4.0#{beta}8 on Windows Server 2008 / Vista x64': {
      'ua': 'Mozilla/5.0 (Windows NT 6.0; Win64; IA64; rv:2.0b8pre) Gecko/20101213 Firefox/4.0b8pre',
      'platform': 'Win64'
    },

    'Firefox 4.0#{beta}8 x86 on Windows Server 2008 R2 / 7 x64': {
      'ua': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.0b8pre) Gecko/20101114 Firefox/4.0b8pre',
      'platform': 'Win32'
    },

    'Firefox 4.0#{beta}9 on Linux x86_64': {
      'ua': 'Mozilla/5.0 (X11; Linux x86_64; rv:2.0b9pre) Gecko/20110105 Firefox/4.0b9pre'
    },

    'Firefox 4.0#{beta}11 on Mac OS X 10.6': {
      'ua': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0b11pre) Gecko/20110126 Firefox/4.0b11pre'
    },

    'Fennec 2.0#{beta}1 on Android': {
      'ua': 'Mozilla/5.0 (Android; Linux armv7l; rv:2.0b6pre) Gecko/20100907 Firefox/4.0b6pre Fennec/2.0b1pre'
    },

    'Fennec 2.0.1 on Linux i686': {
      'ua': 'Mozilla/5.0 (X11; Linux i686 on x86_64; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Fennec/2.0.1'
    },

    'Flock 2.0#{alpha}1 on Linux i686': {
      'ua': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9pre) Gecko/2008051917 Firefox/3.0pre Flock/2.0a1pre'
    },

    'Flock 2.0#{beta}3 on Linux x86_64': {
      'ua': 'Mozilla/5.0 (X11; U; Linux x86_64; es-AR; rv:1.9.0.2) Gecko/2008091920 Firefox/3.0.2 Flock/2.0b3'
    },

    'Flock 2.0.3 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.5) Gecko/2008121620 Firefox/3.0.5 Flock/2.0.3'
    },

    'Flock 2.6.0 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.19) Gecko/2010061201 Firefox/3.0.19 Flock/2.6.0'
    },

    'Galeon 1.2.5 on Linux i686': {
      'ua': 'Mozilla/5.0 Galeon/1.2.5 (X11; Linux i686; U;) Gecko/20020809'
    },

    'Galeon 2.0.7 on Linux i686': {
      'ua': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko/20090327 Galeon/2.0.7'
    },

    'GreenBrowser (running in IE 7 mode) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; GreenBrowser)',
      'mode': 7
    },

    'GreenBrowser (running in IE 5 mode) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; GreenBrowser)',
      'mode': 5
    },

    'iCab 2.8.1 on Mac OS': {
      'ua': 'Mozilla/4.5 (compatible; iCab 2.8.1; Macintosh; I; PPC)'
    },

    'iCab 3.0.2 on Mac OS': {
      'ua': 'iCab/3.0.2 (Macintosh; U; PPC Mac OS)'
    },

    'iCab 4.5 on Mac OS X Leopard 10.5.8': {
      'ua': 'iCab/4.5 (Macintosh; U; Mac OS X Leopard 10.5.8)'
    },

    'iCab 4.7 on Mac OS X': {
      'ua': 'iCab/4.7 (Macintosh; U; Intel Mac OS X)'
    },

    'IE 4.0 on Windows 95': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 4.0; Windows 95)'
    },

    'IE 5.5 on Windows 98': {
      'ua': 'Mozilla/4.0 (compatible;MSIE 5.5; Windows 98)'
    },

    'IE 5.05 on Windows NT': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 5.05; Windows NT 4.0)'
    },

    'IE 6.0#{beta} on Windows ME': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 6.0b; Windows 98; Win 9x 4.90)'
    },

    'IE 6.0 on Windows 2000': {
      'ua': 'Mozilla/4.0 (Windows; MSIE 6.0; Windows NT 5.0)'
    },

    'IE 7.0#{beta} on Windows Server 2003 / XP x64': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 5.2)'
    },

    'IE 7.0 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 5.1; en-US)'
    },

    'IE 8.0#{beta}2 on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
      'appMinorVersion': 'beta 2',
      'mode': 8
    },

    'IE 8.0 on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; chromeframe/10.0.648.133; chromeframe)',
      'mode': 8
    },

    'IE 8.0 (running in IE 5 mode) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
      'mode': 5
    },

    'IE 8.0 (running in IE 7 mode) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; chromeframe)',
      'mode': 7
    },

    'IE 8.0 x86 on Windows Server 2008 / Vista x64': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; Trident/4.0)',
      'cpuClass': 'x86',
      'mode': 8,
      'platform': 'Win32'
    },

    'IE 8.0 on Windows Server 2008 R2 / 7 x64': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0)',
      'cpuClass': 'x64',
      'mode': 8,
      'platform': 'Win64'
    },

    'IE 9.0#{beta} (platform preview) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'appMinorVersion': 'beta',
      'external': null,
      'mode': 9
    },

    'IE 9.0#{beta} (platform preview; running in IE 5 mode) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'appMinorVersion': 'beta',
      'external': null,
      'mode': 5
    },

    'IE 9.0#{beta} (platform preview; running in IE 7 mode) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'appMinorVersion': 'beta',
      'external': null,
      'mode': 7
    },

    'IE 9.0#{beta} (platform preview; running in IE 8 mode) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'appMinorVersion': 'beta',
      'external': null,
      'mode': 8
    },

    'IE 9.0#{beta} on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',
      'appMinorVersion': 'beta'
    },

    'IE 9.0#{beta} (running in IE 5 mode) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'appMinorVersion': 'beta',
      'mode': 5
    },

    'IE 9.0#{beta} (running in IE 7 mode) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'appMinorVersion': 'beta',
      'mode': 7
    },

    'IE 9.0#{beta} (running in IE 8 mode) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'appMinorVersion': 'beta',
      'mode': 8
    },

    'IE 9.0 on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)',
      'mode': 9
    },

    'IE 10.0 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.0; Trident/6.0)',
      'mode': 10
    },

    'IE 10.0 (running in IE 9 mode) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)',
      'mode': 9
    },

    'IE Mobile 7.0 on Samsung (Windows Phone OS 7.0)': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows Phone OS 7.0; Trident/3.1; IEMobile/7.0; SAMSUNG; OMNIA7)'
    },

    'Iron 0.2.152.0 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Iron/0.2.152.0 Safari/41562480.525'
    },

    'Iron 7.0.520.1 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.7 (KHTML, like Gecko) Iron/7.0.520.1 Chrome/7.0.520.1 Safari/534.7'
    },

    'Kindle Browser 3.3 on Kindle 1.0 (Linux 2.6.10)': {
      'ua': 'Mozilla/4.0 (compatible; Linux 2.6.10) NetFront/3.3 Kindle/1.0 (screen 600x800)'
    },

    'Kindle Browser 3.4 on Kindle 2.0 (Linux 2.6.22)': {
      'ua': 'Mozilla/4.0 (compatible; Linux 2.6.22) NetFront/3.4 Kindle/2.0 (screen 600x800)'
    },

    'Kindle Browser 4.0 (like Safari 4.x) on Kindle 3.0 (Linux)': {
      'ua': 'Mozilla/5.0 (Linux; U; en-US) AppleWebKit/528.5+ (KHTML, like Gecko, Safari/528.5+) Version/4.0 Kindle/3.0 (screen 600x800; rotate)'
    },

    'K-Meleon 1.5.0#{beta}2 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.14) Gecko/20080406 K-Meleon/1.5.0b2'
    },

    'K-Meleon 1.5.4 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.24pre) Gecko/20100228 K-Meleon/1.5.4'
    },

    'Konqueror 4.4 on Linux 2.6.32': {
      'ua': 'Mozilla/5.0 (compatible; Konqueror/4.4; Linux 2.6.32-22-generic; X11; en_US) KHTML/4.4.3 (like Gecko) Kubuntu'
    },

    'Lunascape 5.0#{alpha}3 on Windows Server 2003 / XP x64': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.2; Lunascape 5.0 alpha3)'
    },

    'Lunascape 6.1.7.21880 (Trident) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; Lunascape 6.1.7.21880)',
      'mode': 8
    },

    'Lunascape 6.2.1.22445 (Gecko) on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.13) Gecko/20100917 Firefox/3.5.13 Lunascape/6.2.1.22445'
    },

    'Lunascape 6.3.1.22729#{beta} (platform preview; rendered by Trident) on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0; Lunascape/6.3.1.22729)',
      'appMinorVersion': 'beta',
      'external': null,
      'mode': 9
    },

    'Lunascape 6.3.2.22803 (like Safari 4+) on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.3 (KHTML, like Gecko) Lunascape/6.3.2.22803 Safari/533.3'
    },

    'Maxthon 2.x (Trident) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; Maxthon 2.0)',
      'mode': 8
    },

    'Maxthon 2.x (running in IE 7 mode) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; Maxthon 2.0)',
      'mode': 7
    },

    'Maxthon 3.x (like Safari 4+) on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.9 (KHTML, like Gecko) Maxthon/3.0 Safari/533.9'
    },

    'Maxthon 3.x (running in IE 7 mode) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; Maxthon/3.0)',
      'external': null,
      'mode': 7
    },

    'Maxthon 3.x#{alpha} (platform preview; rendered by Trident) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; Maxthon/3.0)',
      'appMinorVersion': 'alpha',
      'external': null,
      'mode': 8
    },

    'Narwhal on Cygwin': (function() {
      var object = {
        'exports': { },
        'system':  { 'os': 'cygwin' }
      };
      object.global = object.system.global = object;
      return object;
    }()),

    'Node.js 0.3.1 on Cygwin': {
      'exports': { },
      'global': { },
      'process': { 'version': 'v0.3.1', 'platform': 'cygwin' }
    },

    'Nokia Browser (like Safari 3.x) on Nokia 5530c (SymbianOS)': {
      'ua': 'Mozilla/5.0 (SymbianOS/9.4; U; Series60/5.0 Nokia5530c-2/10.0.050; Profile MIDP-2.1 Configuration/CLDC-1.1) AppleWebKit/525 (KHTML, like Gecko) Safari/525'
    },

    'Nook Browser 1.0': {
      'ua': 'nook browser/1.0'
    },

    'Opera Mini 4.1.11355': {
      'ua': 'Opera/9.50 (J2ME/MIDP; Opera Mini/4.1.11355/542; U; en)'
    },

    'Opera Mobile 10.00 on Linux i686': {
      'ua': 'Opera/9.80 (Linux i686; Opera Mobi/1038; U; en) Presto/2.5.24 Version/10.00'
    },

    'Opera 11.00 on Windows XP': {
      'ua': 'Opera/9.80 (Windows NT 5.1; U; en) Presto/2.6.37 Version/11.00',
      'opera': '11.00'
    },

    'PhantomJS 1.0.0 (like Safari 4.x) on Cygwin': {
      'ua': 'Mozilla/5.0 (X11; U; Cygwin; C -) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3)  PhantomJS/1.0.0',
      'phantom': {
        'version': {
          'major': 1,
          'minor': 0,
          'patch': 0
        }
      }
    },

    'PlayBook Browser 0.0.1 (like Safari 4+)': {
      'ua': 'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+'
    },

    'Rhino': {
      'global': { },
      'environment': { }
    },

    'RingoJS': (function() {
      var object = {
        'exports': { },
        'system':  { }
      };
      object.global = object;
      return object;
    }()),

    'RockMelt 0.8.34.820 on Mac OS X 10.5.8': {
      'ua': 'Mozilla/5.0(Macintosh; U; Intel Mac OS X 10_5_8; en-US)AppleWebKit/534.3(KHTML,like Gecko)RockMelt/0.8.34.820 Chrome/6.0.472.63 Safari/534.3'
    },

    'Safari 1.x on Mac OS X': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.5'
    },

    'Safari 2.x on Mac OS': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS; en-en) AppleWebKit/412 (KHTML, like Gecko) Safari/412'
    },

    'Safari 3.x on iPod (iOS 2.2.1)': {
      'ua': 'Mozilla/5.0 (iPod; U; CPU iPhone OS 2_2_1 like Mac OS X; en-us) AppleWebKit/525.18.1 (KHTML, like Gecko) Mobile/5H11a'
    },

    'Safari 3.0 on iPod (iOS)': {
      'ua': 'Mozila/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3'
    },

    'Safari 3.1.1 on iPhone (iOS 2.0.1)': {
      'ua': 'Mozilla/5.0 (Mozilla/5.0 (iPhone; U; CPU iPhone OS 2_0_1 like Mac OS X; fr-fr) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5G77 Safari/525.20'
    },

    'Safari 3.1.1 on Mac OS X 10.5.7': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; de-de) AppleWebKit/525.18 (KHTML, like Gecko) Version/3.1.1 Safari/525.20'
    },

    'Safari 3.1.1 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/525.18 (KHTML, like Gecko) Version/3.1.1 Safari/525.17'
    },

    'Safari 3.1.2 on Mac OS X 10.5.6': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_6; en-us) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.2 Safari/525.20.1'
    },

    'Safari 3.1.2 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; pl-PL) AppleWebKit/525.19 (KHTML, like Gecko) Version/3.1.2 Safari/525.21'
    },

    'Safari 3.2 on Mac OS X 10.5.5': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_5; en-us) AppleWebKit/525.26.2 (KHTML, like Gecko) Version/3.2 Safari/525.26.12'
    },

    'Safari 3.2 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; hu-HU) AppleWebKit/525.26.2 (KHTML, like Gecko) Version/3.2 Safari/525.26.13'
    },

    'Safari 3.2.1 on Mac OS X 10.4.11': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; pl-pl) AppleWebKit/525.27.1 (KHTML, like Gecko) Version/3.2.1 Safari/525.27.1'
    },

    'Safari 3.2.1 on Mac OS X 10.5.6': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6; it-it) AppleWebKit/528.8+ (KHTML, like Gecko) Version/3.2.1 Safari/525.27.1'
    },

    'Safari 3.2.1 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; sv-SE) AppleWebKit/525.27.1 (KHTML, like Gecko) Version/3.2.1 Safari/525.27.1'
    },

    'Safari 3.2.2 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru-RU) AppleWebKit/525.28 (KHTML, like Gecko) Version/3.2.2 Safari/525.28.1'
    },

    'Safari 3.2.2 on Windows Server 2003 / XP x64': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/525.28 (KHTML, like Gecko) Version/3.2.2 Safari/525.28.1'
    },

    'Safari 3.2.2 on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; de-DE) AppleWebKit/525.28 (KHTML, like Gecko) Version/3.2.2 Safari/525.28.1'
    },

    'Safari 3.2.3 on Mac OS X 10.5.7': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; de-de) AppleWebKit/525.28.3 (KHTML, like Gecko) Version/3.2.3 Safari/525.28.3'
    },

    'Safari 3.2.3 on Mac OS X 10.5.8': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/530.19.2 (KHTML, like Gecko) Version/3.2.3 Safari/525.28.3'
    },

    'Safari 3.2.3 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; cs-CZ) AppleWebKit/525.28.3 (KHTML, like Gecko) Version/3.2.3 Safari/525.29'
    },

    'Safari 4.x on iPhone (iOS 3.1)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Mobile/7E18,gzip(gfe),gzip(gfe)'
    },

    'Safari 4.x on iPhone Simulator (iOS 4.0)': {
      'ua': 'Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_0 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Mobile/8A293'
    },

    'Safari 4.x on iPhone (iOS 4.1)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_1 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Mobile/8B117'
    },

    'Safari 4.0#{alpha}1 on Mac OS X 10.4.11': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; tr) AppleWebKit/528.4+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2'
    },

    'Safari 4.0#{alpha}1 on Mac OS X 10.5.4': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_4; en-us) AppleWebKit/528.4+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2'
    },

    'Safari 4.0#{alpha}1 on Mac OS X 10.5.6': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_6; en-gb) AppleWebKit/528.10+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2'
    },

    'Safari 4.0#{alpha}1 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/526.9 (KHTML, like Gecko) Version/4.0dp1 Safari/526.8'
    },

    'Safari 4.0 on iPhone (iOS 3.0)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; ko-kr) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16'
    },

    'Safari 4.0 on iPod (iOS 3.0)': {
      'ua': 'Mozilla/5.0 (iPod; U; CPU iPhone OS 3_0 like Mac OS X; ja-jp) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7A341 Safari/528.16'
    },

    'Safari 4.0 on iPhone (iOS 3.1)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7C97d Safari/528.16'
    },

    'Safari 4.0 on iPhone (iOS 3.1.3)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_1_3 like Mac OS X; en-us) AppleWebKit/528.18 (KHTML, like Gecko) Version/4.0 Mobile/7E18 Safari/528.16 Cydia/1.0.3201-71'
    },

    'Safari 4.0 on iPhone (iOS 4.1.1)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_1_1 like Mac OS X; en-en) AppleWebKit/548.18 (KHTML, like Gecko) Version/4.0 Mobile/8F12 Safari/548.16'
    },

    'Safari 4.0 on Mac OS X 10.4.11': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_4_11; en) AppleWebKit/530.1+ (KHTML, like Gecko) Version/4.0 Safari/528.16'
    },

    'Safari 4.0 on Mac OS X 10.5.4': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_4; nl-nl) AppleWebKit/528.4+ (KHTML, like Gecko) Version/4.0 Safari/528.1'
    },

    'Safari 4.0 on Mac OS X 10.5.6': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_6; tr-TR) AppleWebKit/528.16 (KHTML, like Gecko) Version/4.0 Safari/528.1'
    },

    'Safari 4.0 on Mac OS X 10.6': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6; en-us) AppleWebKit/530.6+ (KHTML, like Gecko) Version/4.0 Safari/530.6'
    },

    'Safari 4.0 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-TW) AppleWebKit/528.16 (KHTML, like Gecko) Version/4.0 Safari/528.16'
    },

    'Safari 4.0 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; ru-RU) AppleWebKit/528.16 (KHTML, like Gecko) Version/4.0 Safari/528.16'
    },

    'Safari 4.0.1 on Mac OS X 10.5.7': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/4.0.1 Safari/530.18'
    },

    'Safari 4.0.2 on Mac OS X 10.5.7': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_7; en-us) AppleWebKit/530.19.2 (KHTML, like Gecko) Version/4.0.2 Safari/530.19'
    },

    'Safari 4.0.2 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN) AppleWebKit/530.19.2 (KHTML, like Gecko) Version/4.0.2 Safari/530.19.1'
    },

    'Safari 4.0.2 on Windows Server 2003 / XP x64': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.2; de-DE) AppleWebKit/530.19.2 (KHTML, like Gecko) Version/4.0.2 Safari/530.19.1'
    },

    'Safari 4.0.2 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; zh-TW) AppleWebKit/530.19.2 (KHTML, like Gecko) Version/4.0.2 Safari/530.19.1'
    },

    'Safari 4.0.2 on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US) AppleWebKit/532+ (KHTML, like Gecko) Version/4.0.2 Safari/530.19.1'
    },

    'Safari 4.0.3 on Mac OS X 10.5.8': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; en-us) AppleWebKit/532.0+ (KHTML, like Gecko) Version/4.0.3 Safari/531.9.2009'
    },

    'Safari 4.0.3 on Mac OS X 10.6.1': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_1; nl-nl) AppleWebKit/532.3+ (KHTML, like Gecko) Version/4.0.3 Safari/531.9'
    },

    'Safari 4.0.3 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-us) AppleWebKit/531.9 (KHTML, like Gecko) Version/4.0.3 Safari/531.9'
    },

    'Safari 4.0.4 on iPad (iOS 3.2)': {
      'ua': 'Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10'
    },

    'Safari 4.0.4 on iPhone (iOS 3.2)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10'
    },

    'Safari 4.0.4 on iPhone Simulator (iOS 3.2)': {
      'ua': 'Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7D11 Safari/531.21.10'
    },

    'Safari 4.0.4 on Mac OS X 10.4.11': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; hu-hu) AppleWebKit/531.21.8 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10'
    },

    'Safari 4.0.4 on Mac OS X 10.6.2': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_2; ru-ru) AppleWebKit/533.2+ (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10'
    },

    'Safari 4.0.4 on Mac OS X 10.6.3': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us) AppleWebKit/531.21.11 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10'
    },

    'Safari 4.0.4 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; de-DE) AppleWebKit/532+ (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10'
    },

    'Safari 4.0.4 on Windows Server 2003 / XP x64': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/531.21.8 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10'
    },

    'Safari 4.0.4 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10'
    },

    'Safari 4.0.4 on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; ko-KR) AppleWebKit/531.21.8 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10'
    },

    'Safari 4.0.5 on iPhone (iOS 4.1)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_1 like Mac OS X; en-us) AppleWebKit/532.9 (KHTML, like Gecko) Version/4.0.5 Mobile/8B5097d Safari/6531.22.7'
    },

    'Safari 4.0.5 on Mac OS X 10.4.11': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; da-dk) AppleWebKit/531.22.7 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7'
    },

    'Safari 4.0.5 on Mac OS X 10.5.8': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; en-us) AppleWebKit/531.22.7 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7'
    },

    'Safari 4.0.5 on Mac OS X 10.6.2': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_2; ja-jp) AppleWebKit/531.22.7 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7'
    },

    'Safari 4.0.5 on Mac OS X 10.6.3': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; ja-jp) AppleWebKit/531.22.7 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7'
    },

    'Safari 4.0.5 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; cs-CZ) AppleWebKit/531.22.7 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7'
    },

    'Safari 4.0.5 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7'
    },

    'Safari 4.0.5 on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; es-ES) AppleWebKit/531.22.7 (KHTML, like Gecko) Version/4.0.5 Safari/531.22.7'
    },

    'Safari 4.1 on Mac OS X 10.4.11': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; nl-nl) AppleWebKit/533.16 (KHTML, like Gecko) Version/4.1 Safari/533.16'
    },

    'Safari 4.1 on Mac OS X 10.7': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_7; en-us) AppleWebKit/533.4 (KHTML, like Gecko) Version/4.1 Safari/533.4'
    },

    'Safari 5.0 on Linux x86_64': {
      'ua': 'Mozilla/5.0 (X11; U; Linux x86_64; en-ca) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2+'
    },

    'Safari 5.0 on Mac OS X 10.5.8': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_5_8; ja-jp) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16'
    },

    'Safari 5.0 on Mac OS X 10.4.11': {
      'ua': 'Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; fr) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16'
    },

    'Safari 5.0 on Mac OS X 10.6.3': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; zh-cn) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16'
    },

    'Safari 5.0 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; ja-JP) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16'
    },

    'Safari 5.0 on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; ja-JP) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16'
    },

    'Safari 5.0.1 on Windows Server 2003 / XP x64': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.2; en-US) AppleWebKit/533.17.8 (KHTML, like Gecko) Version/5.0.1 Safari/533.17.8'
    },

    'Safari 5.0.2 on iPad (iOS 4.3)': {
      'ua': '(iPad; U; CPU OS 4_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F190 Safari/6533.18.5'
    },

    'Safari 5.0.2 on iPhone (iOS 4.3)': {
      'ua': 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8F190 Safari/6533.18.5'
    },

    'Safari 5.0.2 on Mac OS X 10.5.8': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; zh-cn) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5'
    },

    'Safari 5.0.2 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru-RU) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5'
    },

    'Safari 5.0.2 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; tr-TR) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5'
    },

    'Safari 5.0.2 on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-HK) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5'
    },

    'SeaMonkey 1.1.7#{alpha}': {
      'ua': 'Mozilla/5.0 (BeOS; U; Haiku BePC; en-US; rv:1.8.1.10pre) Gecko/20080112 SeaMonkey/1.1.7pre'
    },

    'SeaMonkey 1.1.13': {
      'ua': 'Seamonkey-1.1.13-1(X11; U; GNU Fedora fc 10) Gecko/20081112'
    },

    'SeaMonkey 2.0#{beta}1 on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.1.1pre) Gecko/20090717 SeaMonkey/2.0b1'
    },

    'SeaMonkey 2.0.3 on Linux x86_64': {
      'ua': 'Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.8) Gecko/20100205 SeaMonkey/2.0.3'
    },

    'SeaMonkey 2.0.8 on Windows XP': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.1.13) Gecko/20100914 Mnenhy/0.8.3 SeaMonkey/2.0.8'
    },

    'Sleipnir 2.8.4 on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; Sleipnir 2.8.4)'
    },

    'Sleipnir 2.9.2#{beta} (platform preview; rendered by Trident) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; Sleipnir/2.9.2)',
      'appMinorVersion': 'beta',
      'external': null,
      'mode': 8
    },

    'Sleipnir 2.9.4 (running in IE 7 mode) on Windows Server 2008 / Vista': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/4.0; Sleipnir/2.9.4)',
      'mode': 7
    },

    'Sleipnir 2.9.6 (Trident) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; Sleipnir/2.9.6)',
      'mode': 8
    },

    'SlimBrowser (running in IE 7 mode) on Windows XP': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SlimBrowser)',
      'mode': 7
    },

    'SlimBrowser (running in IE 5 mode) on Windows Server 2008 R2 / 7': {
      'ua': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/4.0; SlimBrowser)',
      'mode': 5
    },

    'Sunrise 1.7.5 on Mac OS X 10.5.5': {
      'ua': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_5; ja-jp) AppleWebKit/525.18 (KHTML, like Gecko) Sunrise/1.7.5 like Safari/5525.20.1'
    },

    'Sunrise 4.0.1 on Linux x86_64': {
      'ua': 'Mozilla/6.0 (X11; U; Linux x86_64; en-US; rv:2.9.0.3) Gecko/2009022510 FreeBSD/ Sunrise/4.0.1/like Safari'
    },

    'Swiftfox 2.0.0.6 on Linux i686': {
      'ua': 'Mozilla/5.0 (X11; U; Linux i686 (x86_64); en-US; rv:1.8.1.6) Gecko/20070803 Firefox/2.0.0.6 (Swiftfox)'
    },

    'Swiftfox 3.0.10#{alpha} on Linux i686': {
      'ua': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.10pre) Gecko/2009041814 Firefox/3.0.10pre (Swiftfox)'
     },

    'webOS Browser 1.0 (like Safari 3.x) on webOS 1.2.9': {
      'ua': 'Mozilla/5.0 (webOS/Palm webOS 1.2.9; U; en-US) AppleWebKit/525.27.1 (KHTML, like Gecko) Version/1.0 Safari/525.27.1 Pixi/1.0'
    },

    'webOS Browser 1.0 (like Safari 4.x) on webOS 1.4.0': {
      'ua': 'Mozilla/5.0 (webOS/1.4.0; U; en-US) AppleWebKit/532.2 (KHTML, like Gecko) Version/1.0 Safari/532.2 Pre/1.0'
    },

    'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.8) Gecko/20100728 Firefox/3.6.8 CometBird/3.6.8,gzip(gfe),gzip(gfe)': {
      'ua': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.8) Gecko/20100728 Firefox/3.6.8 CometBird/3.6.8,gzip(gfe),gzip(gfe)'
    },

    'Mozilla/5.0 (PLAYSTATION 3; 2.00)': {
      'ua': 'Mozilla/5.0 (PLAYSTATION 3; 2.00)'
    },

    'Mozilla/5.0 (X11; U; Linux; de-DE) AppleWebKit/532.4 (KHTML, like Gecko) rekonq Safari/532.4,gzip(gfe),gzip(gfe)': {
      'ua': 'Mozilla/5.0 (X11; U; Linux; de-DE) AppleWebKit/532.4 (KHTML, like Gecko) rekonq Safari/532.4,gzip(gfe),gzip(gfe)'
    }
  };

  Benchmark.each(Tests, function(value, key) {
    var platform = getPlatform(value);
    key = Benchmark.interpolate(key, { 'alpha': '\u03b1', 'beta': '\u03b2' });

    // test toString()
    equals(String(platform), key, key);

    // test null values
    Benchmark.each(platform, function(value, key) {
      if (!value) {
        strictEqual(value, null, 'Benchmark.platform.' + key);
      }
    });
  });
});