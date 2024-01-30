console.log("Program started.")

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

LINKEDIN_URL = "https://www.linkedin.com/"

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(LINKEDIN_URL)) {
    console.log(await chrome.action.isEnabled(tab.id))

    chrome.action.enable(tab.id)

    console.log("function 1")
    console.log(tab.id)

    let enabled = await chrome.action.isEnabled(tab.id)

    console.log(enabled)
    
    if (enabled) {
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: "ON",
        });
    } else {
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: "OFF",
        });
    }
  }
});


chrome.tabs.onActivated.addListener(
  async function(selector) {
    console.log("tabs.onActivated")
    let enabled = await chrome.action.isEnabled(selector.tabId)
    console.log(enabled)
    console.log(selector.tabId)
    if (enabled) {
      chrome.scripting.executeScript({
        target : {tabId : selector.tabId},
        files: ["content-script.js"]
        });
    }
  }
);


chrome.tabs.onUpdated.addListener(
  async (tab_id, changeInfo,  tab) => {
    console.log("tabs.onUpdated")
    if (tab.url.startsWith(LINKEDIN_URL) && changeInfo.status == "complete") {
      let enabled = await chrome.action.isEnabled(tab_id)

      console.log(changeInfo.status)
      console.log("New tab:" + tab.url)
      console.log("New tab id:" + tab.id)
      console.log("Extension enabled: " + enabled)
    
    }
});


chrome.runtime.onMessage.addListener(
  async function(request, sender, sendResponse) {
    console.log("tabs.runtime.onMessage")
    if (request.type == "network") {
      console.log("TYPE = " + request.type)
      console.log("Previous URL = " + sender.url)
    } else if (request.type == "search") {
      console.log("TYPE = " + request.type)
      console.log("Searched Value = " + request.value)
      console.log("Previous URL = " + sender.url)
    } else if (request.type == "job search") {
      console.log("TYPE = " + request.type)
    }
    sendResponse();
    return true
  }
);


async function getActionBadgeText(tab) {
  let badge_text = await chrome.action.getBadgeText({tabId:tab.id})
  return badge_text
}