"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping MakingThymeForHealthScraper.com
 * @extends BaseScraper
 */
class MakingThymeForHealthScraper extends BaseScraper {
  constructor(url) {
    super(url, "makingthymeforhealth.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;

    this.recipe.name = this.textTrim($("div.recipe-title>h2"));

    $("div.ingredients ul li.ingredient").each((_, el) => {
      ingredients.push($(el).text().replace(/\s\s+/g, " ").trim());
    });

    $("div.instructions span p").each((_, el) => {
      instructions.push($(el).text().replace(/\s\s+/g, " ").trim());
    });

    time.prep =
      $('div.time p strong:contains("Prep Time:")')
        .parent()
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .replace(/\s\s+/g, "")
        .trim() + " mins";

    time.cook =
      $('div.time p strong:contains("Cook Time:")')
        .parent()
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .replace(/\s\s+/g, "")
        .trim() + " mins";

    time.total =
      $('div.time p strong:contains("Total Time:")')
        .parent()
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .replace(/\s\s+/g, "")
        .trim() + " mins";

    this.recipe.servings = $('div.time p strong:contains("Yield:")')
      .next()
      .text()
      .replace(/\s\s+/g, "")
      .trim()
      .split(" ")[0];
  }
}

module.exports = MakingThymeForHealthScraper;
