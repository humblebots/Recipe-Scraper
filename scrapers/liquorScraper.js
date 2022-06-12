"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping loveandlemons.com
 * @extends BaseScraper
 */
class LoveAndLemonsScraper extends BaseScraper {
  constructor(url) {
    super(url, "liquor.com/");
  }

  scrape($) {
    this.defaultSetTitle($);
    this.defaultSetDescription($);
    this.defaultSetImage($);

    const { ingredients, instructions, time } = this.recipe;

    $("li.structured-ingredients__list-item").each((i, el) => {
      ingredients.push(
        $(el)
          .text()
          .replace(/(\s\s+|▢)/g, " ")
          .trim()
      );
    });

    $("div.structured-project__steps")
      .find("li")
      .each((i, el) => {
        instructions.push(
          $(el)
            .text()
            .replace(/(\s\s+|▢)/g, " ")
            .trim()
        );
      });

    this.recipe.servings = "1";
  }
}

module.exports = LoveAndLemonsScraper;
