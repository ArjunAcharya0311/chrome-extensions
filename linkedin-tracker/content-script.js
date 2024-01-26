const network = document.querySelector("#global-nav > div > nav > ul > li:nth-child(2) > a")

network.addEventListener('click', () => {
    const response = chrome.runtime.sendMessage(
        {
            type: "network",
            class: network.className,
            url: network.url
        }
    )
});


const search = document.querySelector("#global-nav-search > div > button")

search.addEventListener('keypress', async (e) => {
    if (e.key == 'Enter') {
        const response = chrome.runtime.sendMessage(
            {
                type: "search",
                class: network.className,
                url: network.url
            }
        )
    }
})
