"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping foodal.com
 * @extends BaseScraper
 */
class FoodalScraper extends BaseScraper {
  constructor(url) {
    super(url, "foodal.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $("h2.tasty-recipes-title").text().trim();

    $("div.tasty-recipes-ingredients")
      .find("li")
      .each((i, el) => {
        ingredients.push(
          $(el)
            .text()
            .replace(/(\s\s+|▢)/g, " ")
            .trim()
        );
      });

    $("div.tasty-recipes-instructions")
      .find("li")
      .each((i, el) => {
        instructions.push($(el).text().trim());
      });

    time.prep = $("span.tasty-recipes-prep-time").text();
    time.cook = $("span.tasty-recipes-cook-time").text();
    time.total = $("span.tasty-recipes-total-time").text();

    this.recipe.servings = $("span.tasty-recipes-yield")
      .find("span")
      .first()
      .text();
  }
}

module.exports = FoodalScraper;
