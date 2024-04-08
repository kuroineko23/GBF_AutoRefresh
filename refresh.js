const regex_battle_end = new RegExp("https:\/\/((game\.granbluefantasy)|(gbf\.game\.mbga))\.jp\/resultmulti\/*");
const regex_normal_attack = new RegExp("https:\/\/((game\.granbluefantasy)|(gbf\.game\.mbga))\.jp\/rest/multiraid/normal_attack_result.json")
var url = ""
chrome.storage.sync.get('redirect', (data) => {
    url = data.redirect
})

chrome.webRequest.onResponseStarted.addListener(function (details) {
    var random = Math.floor(Math.random() * 1000)
    var tabId = details.tabId;
    if (details.url.match(regex_normal_attack)) {
        setTimeout(() => {
            chrome.tabs.reload(tabId)
        }, random)
    }
    if (details.url.match(regex_battle_end)) {
        setTimeout(() => {
            chrome.tabs.update(tabId, {
                "url": url
            })
        }, random)
    }
}, { urls: ["<all_urls>"] });