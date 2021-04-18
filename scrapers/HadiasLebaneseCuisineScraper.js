"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping HadiasLebaneseCuisine.com
 * @extends BaseScraper
 */
class HadiasLebaneseCuisineScraper extends BaseScraper {
  constructor(url) {
    super(url, "hadiaslebanesecuisine.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, tags, time } = this.recipe;

    this.recipe.name = $("h1.title").text().replace(/\s+/g, " ").trim();

    $('h2:contains("Ingredients")')
      .next("ul")
      .find("li")
      .each((_, el) => {
        ingredients.push($(el).text().replace(/\s+/g, " ").trim());
      });

    $('h2:contains("Directions")')
      .next("ol")
      .find("li")
      .each((_, el) => {
        instructions.push($(el).text().replace(/\s+/g, " ").trim());
      });
  }
}

module.exports = HadiasLebaneseCuisineScraper;
