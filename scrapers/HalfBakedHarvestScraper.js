"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping HalfBakedHarvest.com
 * @extends BaseScraper
 */
class HalfBakedHarvestScraper extends BaseScraper {
  constructor(url) {
    super(url, "halfbakedharvest.com/");
  }

  scrape($) {
    this.defaultSetImage($);

    const { ingredients, instructions, time } = this.recipe;

    this.recipe.name = $("h2.wprm-recipe-name")
      .text()
      .replace(/\s+/g, " ")
      .trim();

    $("li.wprm-recipe-ingredient").each((_, el) => {
      ingredients.push($(el).text().replace(/\s+/g, " ").trim());
    });

    const firstGroup = $("div.wprm-recipe-instructions-container")
      .children("div.wprm-recipe-instruction-group")
      .first();

    firstGroup
      .find("div.wprm-recipe-instruction-text")
      .find("p")
      .each((_, el) => {
        const text = $(el).text().replace(/\s\s+/g, " ").trim();
        console.log(text);
        if (text.charAt(0) === '"' && text.charAt(text.length - 1) === '"') {
          instructions.push(
            str
              .substr(1, str.length - 2)
              .replace(/\d+\./g, "")
              .trim()
          );
        } else {
          instructions.push(text.replace(/\d+\./g, "").trim());
        }
      });

    const prepElements = [];
    $("span.wprm-recipe-prep-time-name")
      .nextAll()
      .each((_, el) => {
        prepElements.push($(el).text().trim());
      });
    time.prep = prepElements.join(" ");

    const cookElements = [];
    $("span.wprm-recipe-cook-time-name")
      .nextAll()
      .each((_, el) => {
        cookElements.push($(el).text().trim());
      });
    time.cook = cookElements.join(" ");

    const totalElements = [];
    $("span.wprm-recipe-total-time-name")
      .nextAll()
      .each((_, el) => {
        totalElements.push($(el).text().trim());
      });
    time.total = totalElements.join(" ");

    const servingElements = [];
    $("span.wprm-recipe-servings-name")
      .nextAll()
      .each((_, el) => {
        servingElements.push($(el).text().trim());
      });
    this.recipe.servings = servingElements.join(" ");
  }
}

module.exports = HalfBakedHarvestScraper;
