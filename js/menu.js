chrome.browserAction.onClicked.addListener(clickMenu);

var enabled = true;
const ROOT_ICONS = "assets/icons/"

function clickMenu(tab) {
    enabled = !enabled;
    var iconName = enabled ? "icon16.png" : "icon16disabled.png";
    chrome.browserAction.setIcon({path: ROOT_ICONS + iconName});
}