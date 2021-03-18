"use strict";

const { Headers } = require("node-fetch");
const BaseScraper = require("../helpers/BaseScraper");
const options = {
  headers: new Headers({
    "User-Agent": "testing123",
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Host": "www.thekitchn.com"
  }),
  redirect: 'follow',
  follow: 20,
};

/**
 * Class for scraping TheKitchn.com
 * @extends BaseScraper
 */
class TheKitchnScraper extends BaseScraper {
  constructor(url) {
    super(url, "thekitchn.com/", options);
  }

  scrape($) {
    this.defaultSetImage($);

    const { ingredients, instructions, time } = this.recipe;

    // console.log($("script.json-ld-recipe").text());

    this.recipe.name = $("h1.Post__headline").text().replace(/\s+/g, " ").trim();

    $("li.Recipe__ingredient").each((_, el) => {
      ingredients.push($(el).text().replace(/\s+/g, " ").trim());
    });

    $("li.Recipe__instructionStep").each((_, el) => {
      instructions.push($(el).text().replace(/\s\s+/g, " ").trim());
    });

    time.prep = $('.Recipe__timeEntry:contains("Prep time")')
      .text()
      .replace(/\s\s+/g, "")
      .replace("Prep time ", "")
      .trim();

    time.cook = $('.Recipe__timeEntry:contains("Cook time")')
      .text()
      .replace(/\s\s+/g, "")
      .replace("Cook time ", "")
      .trim();

    time.total = $('.wprm-recipe-time-container:contains("Total Time: ")')
      .find(".wprm-recipe-time")
      .text()
      .replace(/\s\s+/g, "")
      .trim();

    this.recipe.servings = $(".Recipe__yield")
      .text()
      .replace("YieldServes", "")
      .trim();
    this.recipe.tags = $(".wprm-recipe-keyword")
      .text()
      .split(", ")
      .map((keyword) => {
        return keyword.replace(/\s\s+/g, " ").trim();
      });

    console.log(JSON.stringify(this.recipe, null, 2));
  }
}

module.exports = TheKitchnScraper;
