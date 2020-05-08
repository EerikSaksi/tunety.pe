const CDP = require('chrome-remote-interface');
async function example() {
    let client;
    try {
        client = await CDP();
        const {Network, Page} = client;
        Network.requestWillBeSent((params) => {
            console.log(params.request.url);
        });
        await Network.enable();
        await Page.enable();
        await Page.navigate({url: 'localhost:3000'});
        await Page.loadEventFired();
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

example();
