function detectBrowser() {
    let browser = {};
    if (navigator.userAgent.indexOf('Chrome') != -1) {
        if (navigator.userAgentData?.brands) {
            for (let b of navigator.userAgentData.brands) {
                if (b?.brand == 'Microsoft Edge') {
                    browser.name = 'Microsoft Edge';
                    browser.version = b?.version;
                } else if (b?.brand == 'Google Chrome') {
                    browser.name = 'Google Chrome';
                    browser.version = b?.version;
                }
            }
            browser.mobile = navigator.userAgentData.mobile;
            browser.platform = navigator.userAgentData.platform;
        }

    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
        browser.name = 'Mozilla Firefox';
        browser.version = navigator.userAgent ;
    } else {
        browser.name = 'Other browser';
    }

    return browser;
}
