// https://stackoverflow.com/questions/58959276/how-to-avoid-error-403-while-web-scraping-using-cheerio
// const wait = async (time) =>
//   new Promise((res, rej) => setTimeout(() => res(), time));

// async function doStuff() {
//   const results = [];
//   for(let i in churches) {
//     await wait(1000);
//     const result = await churches[i];
//     console.log(result);
//     results.push(result);
//   }
// }

const request = require("request");
const cheerio = require("cheerio");

function readChurches(cities) {
  const churches = [];
  for (let index = 0; index < cities[0].length; index++) {
    const city = cities[0][index];
    churches.push(
      new Promise((resolve, reject) => {
        const church = [];
        let options = {
          url: city,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
          },
        };

        try {
          request(options, (error, response, html) => {
            if (!error && response.statusCode == 200) {
              const $ = cheerio.load(html);
              const $$ = cheerio.load(
                $("table")
                  .find("tbody")
                  .eq(1)
                  .find("tr")
                  .eq(1)
                  .find("td")
                  .eq(1)
                  .html()
              );
              console.log(pretty($.html()));

              $$("a").each((i, el) => {
                const item = $(el).attr("href");
                if (item != undefined) {
                  if (item.includes("ViewEntity")) {
                    church.push(`http://www.adventistdirectory.org${item}`);
                  }
                }
              });
              resolve(church);
            }
          });
        } catch (error) {
          console.log("Error", error, city);
          reject(error);
        }
      })
    );
  }

  return churches;
}

readChurches();
