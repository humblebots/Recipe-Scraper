"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping foodnetwork.com
 * @extends BaseScraper
 */
class TheCafeSucrefarineScraper extends BaseScraper {
  constructor(url) {
    super(url, "thecafesucrefarine.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = this.textTrim($(".wprm-recipe-name"));

    $(".wprm-recipe-ingredients > .wprm-recipe-ingredient").each((_, el) => {
      ingredients.push($(el).text().replace(/\s\s+/g, " ").trim());
    });

    $(".wprm-recipe-instruction-text").each((_, el) => {
      instructions.push($(el).text().replace(/\s\s+/g, " ").trim());
    });

    time.prep = $('.wprm-recipe-time-container:contains("Prep Time: ")')
      .find(".wprm-recipe-time")
      .text()
      .replace(/\s\s+/g, "")
      .trim();

    time.cook = $('.wprm-recipe-time-container:contains("Cook Time: ")')
      .find(".wprm-recipe-time")
      .text()
      .replace(/\s\s+/g, "")
      .trim();

    time.total = $('.wprm-recipe-time-container:contains("Total Time: ")')
      .find(".wprm-recipe-time")
      .text()
      .replace(/\s\s+/g, "")
      .trim();

    this.recipe.servings = $(".wprm-recipe-servings").text();
    this.recipe.tags = $(".wprm-recipe-keyword")
      .text()
      .split(", ")
      .map((keyword) => {
        return keyword.replace(/\s\s+/g, " ").trim();
      });
  }
}

module.exports = TheCafeSucrefarineScraper;
