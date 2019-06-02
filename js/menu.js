chrome.browserAction.onClicked.addListener(clickMenu);
chrome.webNavigation.onCompleted.addListener(function() {
    chrome.storage.local.get(['enabled'], function (result) {
       GLOBAL_ENABLE_WCB = result['enabled'];
       setIcon(GLOBAL_ENABLE_WCB);
    })
}, {url: [{urlMatches : 'https://web.whatsapp.com/'}]});

const ROOT_ICONS = "assets/icons/"

function clickMenu(tab) {
    GLOBAL_ENABLE_WCB = !GLOBAL_ENABLE_WCB;
    setIcon(GLOBAL_ENABLE_WCB);
    chrome.storage.local.set({ 'enabled': GLOBAL_ENABLE_WCB });
    chrome.tabs.query({ url: 'https://web.whatsapp.com/' }, function (tabs) {
        chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
    });
}

function setIcon(enabled) {
    var iconName = enabled ? "icon16.png" : "icon16disabled.png";
    chrome.browserAction.setIcon({path: ROOT_ICONS + iconName});
}