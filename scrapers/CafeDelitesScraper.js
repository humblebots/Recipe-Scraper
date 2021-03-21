"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping CafeDelitesScraper.com
 * @extends BaseScraper
 */
class CafeDelitesScraper extends BaseScraper {
  constructor(url) {
    super(url, "cafedelites.com/");
  }

  scrape($) {
    this.defaultSetImage($);

    const { ingredients, instructions, tags, time } = this.recipe;

    const container = $("div.wprm-recipe");

    this.recipe.name = $(container)
      .find("h1.wprm-recipe-name")
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    $(container)
      .find("li.wprm-recipe-ingredient")
      .each((_, el) => {
        ingredients.push($(el).text().trim().replace(/\s\s+/g, " "));
      });

    $(container)
      .find("li.wprm-recipe-instruction")
      .each((_, el) => {
        instructions.push($(el).text().trim().replace(/\s\s+/g, " "));
      });

    time.prep = $("div.wprm-recipe-prep-time-container")
      .find("span.wprm-recipe-time")
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    time.cook = $("div.wprm-recipe-cook-time-container")
      .find("span.wprm-recipe-time")
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    time.total = $("div.wprm-recipe-total-time-container")
      .find("span.wprm-recipe-time")
      .text()
      .trim()
      .replace(/\s\s+/g, " ");
  }
}

module.exports = CafeDelitesScraper;
