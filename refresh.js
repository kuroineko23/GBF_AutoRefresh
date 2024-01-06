const regex_battle_end = new RegExp("https:\/\/((game\.granbluefantasy)|(gbf\.game\.mbga))\.jp\/resultmulti\/content\/index\/*");
const regex_normal_attack = new RegExp("https:\/\/((game\.granbluefantasy)|(gbf\.game\.mbga))\.jp\/rest/multiraid/normal_attack_result.json")
var url = ""
chrome.storage.sync.get('redirect', (data) => {
    url = data.redirect
})

//redirect to specified url after reaching result screen
chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
        if (request.request && request.request.url) {
            if (request.request.url.match(regex_battle_end)) {
                var tabId = chrome.devtools.inspectedWindow.tabId;
                chrome.tabs.update(tabId, {
                    "url": url
                })
            }
        }
    });
});

//if normal attack kills the monster
chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
        if (request.request && request.request.url) {
            if (request.request.url.match(regex_normal_attack)) {
                const obj = JSON.parse(body)
                obj.scenario.forEach(item => {
                    if(item.cmd == "die" && item.to == "boss")
                    {
                        chrome.devtools.inspectedWindow.reload()
                    }
                })
            }
        }
    });
});