"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping thespruceeats.com
 * @extends BaseScraper
 */
class TheSpruceEatsScraper extends BaseScraper {
  constructor(url) {
    super(url, "thespruceeats.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, tags, time } = this.recipe;
    this.recipe.name = $(".heading__title").text();

    $("section[class*=ingredients]")
      .find("li")
      .each((i, el) => {
        ingredients.push(this.textTrim($(el)));
      });

    $("section[class*=instructions]")
      .find("li")
      .find("p.comp")
      .each((i, el) => {
        instructions.push(this.textTrim($(el)));
      });

    $(".recipe-search-suggestions__chip").each((i, el) => {
      tags.push($(el).find("a").text());
    });

    let metaText = $(".meta-text").each((i, el) => {
      let text = $(el).text().replace(/\s\s+/g, " ").trim();
      if (text.includes("Prep:")) {
        time.prep = text.replace("Prep: ", "").trim();
      } else if (text.includes("Cook: ")) {
        time.cook = text.replace("Cook:", "").trim();
      } else if (text.includes("Total: ")) {
        time.total = text.replace("Total:", "").trim();
      } else if (text.includes("Servings: ")) {
        this.recipe.servings = text.replace("Servings: ", "").trim();
      }
    });
  }
}

module.exports = TheSpruceEatsScraper;
