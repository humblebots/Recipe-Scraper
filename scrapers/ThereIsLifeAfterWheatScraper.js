"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping thereislifeafterwheat.com
 * @extends BaseScraper
 */
class ThereIsLifeAfterWheatScraper extends BaseScraper {
  constructor(url) {
    super(url, "thereislifeafterwheat.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;

    const recipeContainer = $("div.wp-block-mv-recipe");

    this.recipe.name = recipeContainer
      .find("h1.mv-create-title")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    recipeContainer.find("div.mv-create-ingredients ul li").each((i, el) => {
      ingredients.push(this.textTrim($(el)).replace(/\s\s+/g, " "));
    });

    recipeContainer.find("div.mv-create-instructions ol li").each((i, el) => {
      instructions.push(this.textTrim($(el)).replace(/\s\s+/g, " "));
    });

    time.prep = recipeContainer
      .find("div.mv-create-time-prep")
      .find("span.mv-time-part")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    time.cook = recipeContainer
      .find("div.mv-create-time-active")
      .find("span.mv-time-part")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    time.total = recipeContainer
      .find("div.mv-create-time-total")
      .find("span.mv-time-part")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    this.recipe.servings = recipeContainer
      .find("span.mv-create-nutrition-serving-size")
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .replace(/\s\s+/g, "")
      .trim();
  }
}

module.exports = ThereIsLifeAfterWheatScraper;
