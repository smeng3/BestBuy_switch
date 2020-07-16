var request = require('request');
var cheerio = require('cheerio');
const {send} = require('./mailer');


const checkInventory = () => {
    const listUrl = ["https://www.bestbuy.com/site/nintendo-switch-32gb-console-gray-joy-con/6364253.p?skuId=6364253",
    "https://www.bestbuy.com/site/nintendo-switch-32gb-console-neon-red-neon-blue-joy-con/6364255.p?skuId=6364255",
    "https://www.bestbuy.com/site/nintendo-switch-animal-crossing-new-horizons-edition-32gb-console-multi/6401728.p?skuId=6401728"
                    ];
    const cookielist = ["locDestZip=14650; locStoreId=1400",
                        "locDestZip=14650; locStoreId=433",
                        "locDestZip=14650; locStoreId=1541"
                        ];
    const typeList = ["red-blue","gray","animal-crossing"];

    for (let i in listUrl){
        for (let y in cookielist){
            const url = listUrl[i];
            const cookie = cookielist[y];
            const type = typeList[i];
            
            const req = {url: url,
                        headers: {
                "Accept": "application/json, text/plain, */*",
                "user-Agent": "axios/0.18.0",
                "Cookie": cookie
                }
            }
            request(req, (error, response, body) => {
                if (error) {
                    console.log(error);
                }
                const $ = cheerio.load(body);
                const storeName = $('.store-display-name').text();
                const status = $('.fulfillment-add-to-cart-button div button').text().trim();
                // console.log(storeName);
                // console.log("Inventory status: " + status);
                // console.log("time: " + (new Date).toUTCString() + "\n");
                var textInput = "Nintendo Switch: "+type +" is available @"+storeName;
                if (status !== "Sold Out") {
                console.log(storeName);
                console.log("Inventory status: " + status);
                console.log("time: " + (new Date).toUTCString() + "\n");
                    send(textInput);
                }
            });

        }
    }
}

console.log("Checking start...")
setInterval(checkInventory, 30000);