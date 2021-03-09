"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping simplyrecipes.com
 * @extends BaseScraper
 */
class SimplyRecipesScraper extends BaseScraper {
  constructor(url) {
    super(url, "simplyrecipes.com/recipes/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $("h2.recipe-block__header")
      .text()
      .replace(/\s\s+/g, " ")
      .trim();

    $(".ingredient-list")
      .find("li.ingredient")
      .each((i, el) => {
        ingredients.push(
          $(el)
            .clone()
            .children()
            .remove()
            .end()
            .text()
            .replace(/\s\s+/g, " ")
            .trim()
        );
      });

    $("section.section--instructions")
      .find("p")
      .each((i, el) => {
        let curEl = $(el).text();
        if (curEl) {
          instructions.push(curEl.replace(/^\d+\s/, "").trim());
        }
      });

    time.prep = $("div.prep-time span span.meta-text__data")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    time.cook = $("div.cook-time span span.meta-text__data")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    time.total = $("div.total-time span span.meta-text__data")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    this.recipe.servings = $("div.recipe-serving span span.meta-text__data")
      .text()
      .replace(/\s+/g, " ")
      .trim();
  }
}

module.exports = SimplyRecipesScraper;
