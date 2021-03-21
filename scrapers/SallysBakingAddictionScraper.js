"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping SallysBakingAddictionScraper.com
 * @extends BaseScraper
 */
class SallysBakingAddictionScraper extends BaseScraper {
  constructor(url) {
    super(url, "sallysbakingaddiction.com/");
  }

  scrape($) {
    this.defaultSetImage($);

    const { ingredients, instructions, tags, time } = this.recipe;

    this.recipe.name = $("h2.tasty-recipes-title")
      .text()
      .trim()
      .replace(/\s+/g, " ");

    $("div.tasty-recipes-ingredients-body")
      .find("li")
      .each((_, el) => {
        ingredients.push($(el).text().trim().replace(/\s\s+/g, " "));
      });

    $("div.tasty-recipes-instructions")
      .find("li")
      .each((_, el) => {
        instructions.push($(el).text().trim().replace(/\s\s+/g, " "));
      });

    time.prep = $("span.tasty-recipes-prep-time")
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    time.cook = $("span.tasty-recipes-cook-time")
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    time.total = $("span.tasty-recipes-total-time")
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    this.recipe.servings = $("span.tasty-recipes-yield")
      .text()
      .trim()
      .replace(/\s\s+/g, " ");
  }
}

module.exports = SallysBakingAddictionScraper;
