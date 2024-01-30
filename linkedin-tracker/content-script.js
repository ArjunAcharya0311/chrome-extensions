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


const search_box = document.querySelector("#global-nav-typeahead > input")
search_box.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        const response = chrome.runtime.sendMessage(
            {
                type: "search",
                class: search_box.className,
                value: search_box.value
            }
        )
    }
});