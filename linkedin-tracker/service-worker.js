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



chrome.tabs.onActivated.addListener(async (selection) => {

  let enabled = await chrome.action.isEnabled(selection.tabId)

  console.log("function 2")
  console.log(selection.tabId)
  console.log(enabled)

  if (enabled) {
    chrome.scripting.executeScript({
      target : {tabId : selection.tabId},
      files: ["content-script.js"]
      });
    
      chrome.runtime.onMessage.addListener(
        async function(request, sender, sendResponse) {
          if (request.type == "network") {
            console.log(sender.tab ?
              "from a content script:" + sender.tab.url :
              "from the extension");
          }
          sendResponse();
        }
      );
  }
  
});


async function getActionBadgeText(tab) {
  let badge_text = await chrome.action.getBadgeText({tabId:tab.id})
  return badge_text
}