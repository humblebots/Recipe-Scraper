"use strict";

const PuppeteerScraper = require("../helpers/PuppeteerScraper");

/**
 * Class for scraping SuperiorFarms.com
 * @extends BaseScraper
 */
class SuperiorFarmsScraper extends PuppeteerScraper {
  constructor(url) {
    super(url, "superiorfarms.com/");
  }

  scrape($) {
    this.defaultSetImage($);

    const { ingredients, instructions, time } = this.recipe;

    this.recipe.name = $("h1.entry-title").text().trim();

    $("p.ingredient").each((_, el) => {
      ingredients.push($(el).text().replace(/\s\s+/g, " ").trim());
    });

    $("p.instruction").each((_, el) => {
      instructions.push(
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

    time.prep = $('div.timing ul li strong:contains("Prep:")')
      .parent()
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .replace(/\s\s+/g, "")
      .trim();

    time.cook = $('div.timing ul li strong:contains("Cook:")')
      .parent()
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .replace(/\s\s+/g, "")
      .trim();

    this.recipe.servings = $('div.timing ul li strong:contains("Yields:")')
      .parent()
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .replace(/\s\s+/g, "")
      .trim()
      .split(" ")[0];

    $("p.terms-list span a").each((_, el) => {
      this.recipe.tags.push($(el).text().replace(/\s\s+/g, "").trim());
    });
  }
}

module.exports = SuperiorFarmsScraper;
