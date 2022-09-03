// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const pretty = require("pretty");

//URL of the page we want to scrape
const url = "https://www.alltrails.com/lists/100-best-hikes--3";
async function scrapeData() {
  let options = {
    url: url,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
    },
  };
  try {
    const result = await request.get(
      "https://www.alltrails.com/lists/100-best-hikes--3"
    );
    const $ = cheerio.load(result);

    // Fetch HTML of the page we want to scrape
    // const { data } = await axios.get(url, options);
    // // Load HTML we fetched in the previous line
    // const $ = cheerio.load(data);
    console.log(pretty($.html()));
  } catch (e) {
    //log(e);
    console.dir(e);
  }
}
// Invoke the above function
scrapeData();
