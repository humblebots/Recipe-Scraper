"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");
const { Headers } = require("node-fetch");
const BaseScraper = require("../helpers/BaseScraper");

const options = {
  headers: new Headers({
    // "User-Agent": "Safari",
    // Accept: "*/*",
    // "Accept-Encoding": "gzip, deflate, br",
    Host: "www.cookingclassy.com",
    "Cache-Control": "no-cache",
  }),
};

class CookingClassyScraper extends BaseScraper {
  constructor(url) {
    console.log("init cooking classy");
    super(url, "cookingclassy.com/", options);
  }

  scrape($) {
    this.defaultSetImage($);

    const { ingredients, instructions, time } = this.recipe;

    this.recipe.name = $("h2.wprm-recipe-name")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    this.recipe.description = $(".wprm-recipe-summary")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    $("li.wprm-recipe-ingredient").each((_, el) => {
      ingredients.push($(el).text().replace(/\s+/g, " ").trim());
    });

    $(".wprm-recipe-instruction").each((i, el) => {
      instructions.push(this.textTrim($(el)));
    });

    time.prep = $(".wprm-recipe-prep_time").parent().text().trim();
    time.cook = $(".wprm-recipe-cook_time").parent().text().trim();
    time.total = $(".wprm-recipe-total_time").first().parent().text().trim();

    this.recipe.servings = $(".wprm-recipe-servings").text();
  }
}

module.exports = CookingClassyScraper;
