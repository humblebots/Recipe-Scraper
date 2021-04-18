"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping marthastewart.com
 * @extends BaseScraper
 */
class MarthaStewartScraper extends BaseScraper {
  constructor(url) {
    super(url, "marthastewart.com/");
  }

  scrape($) {
    this.defaultSetImage($);

    const { ingredients, instructions, time } = this.recipe;

    const content = $("div.recipe-content");

    this.recipe.name = content
      .find("h1.headline")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    content.find("li.ingredients-item").each((_, el) => {
      ingredients.push($(el).text().replace(/\s+/g, " ").trim());
    });

    content.find("li.instructions-section-item").each((_, el) => {
      instructions.push($(el).find("p").text().replace(/\s+/g, " ").trim());
    });

    time.prep = content
      .find('div.recipe-meta-item:contains("prep:")')
      .children()
      .last()
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    time.cook = content
      .find('div.recipe-meta-item:contains("cook:")')
      .children()
      .last()
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    time.total = content
      .find('div.recipe-meta-item:contains("total:")')
      .children()
      .last()
      .text()
      .trim()
      .replace(/\s\s+/g, " ");

    this.recipe.servings = content
      .find('div.recipe-meta-item:contains("Yield:")')
      .children()
      .last()
      .text()
      .trim()
      .replace(/\s\s+/g, " ")
      .replace("Serves ", "");
  }
}

module.exports = MarthaStewartScraper;
