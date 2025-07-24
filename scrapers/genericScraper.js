"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Generic Scraper
 * @extends BaseScraper
 */
class GenericScraper extends BaseScraper {
  constructor(url) {
    super(url, "");
  }

  // Overriding to prevent super class from throwing.
  checkUrl() { }
  validateRecipe() {
    return this.recipe;
  }

  scrape($) {
    try {
      this.defaultSetTitle($);
      this.defaultSetDescription($);
      this.defaultSetImage($);
      this.defaultSetIngredients($);
      this.defaultSetInstructions($);
      this.defaultSetServings($);
      this.defaultSetTime($);
      this.defaultSetTags($);
      this.defaultSetNutrition($);

      if (!this.recipe.name) {
        throw new Error("generic parser missed name");
      }

      // description is optional.


      if (!this.recipe.image) {
        throw new Error("generic parser missed image");
      }

      if (!this.recipe.ingredients.length) {
        throw new Error("generic parser missed ingredients");
      }

      if (!this.recipe.instructions.length) {
        throw new Error("generic parser missed instructions");
      }
    } catch (error) {
      console.error(error);
      console.log(
        `Resulting malformed recipe:\n${JSON.stringify(this.recipe, null, 2)}`
      );
      throw error;
    }
  }
}

module.exports = GenericScraper;
