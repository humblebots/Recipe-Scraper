"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping KingArthurBakingScraper.com
 * @extends BaseScraper
 */
class KingArthurBakingScraper extends BaseScraper {
  constructor(url) {
    super(url, "kingarthurbaking.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    this.defaultSetTitle($);

    const { ingredients, instructions, tags, time } = this.recipe;

    $("div.ingredients-list")
      .find("li")
      .each((_, el) => {
        ingredients.push($(el).text().replace(/\s+/g, " ").trim());
      });

    $("div.field--recipe-steps")
      .find("li")
      .each((_, el) => {
        instructions.push($(el).text().replace(/\s+/g, " ").trim());
      });

    $('h2:contains("Directions")')
      .next("ol")
      .find("li")
      .each((_, el) => {
        instructions.push($(el).text().replace(/\s+/g, " ").trim());
      });

    time.prep = $("div.stat__item--prep")
      .find("span")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    time.cook = $("div.stat__item--bake")
      .find("span")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    time.total = $("div.stat__item--total")
      .find("span")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    this.recipe.servings = $("div.stat__item--yield")
      .find("span")
      .text()
      .replace(/\s+/g, " ")
      .trim();
  }
}

module.exports = KingArthurBakingScraper;
