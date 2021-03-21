"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping thatlowcarblife.com
 * @extends BaseScraper
 */
class ThatLowCarbLifeScraper extends BaseScraper {
  constructor(url) {
    super(url, "thatlowcarblife.com/");
  }

  scrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".mv-create-title-primary")
      .text()
      .trim()
      .replace(/\s\s+/g, "");

    $(".mv-create-ingredients")
      .children("ul")
      .children("li")
      .each((i, el) => {
        // They added a '\n' character for some reason, gotta remove it!
        ingredients.push($(el).text().trim().replace(/\s\s+/g, ""));
      });

    var inst = $(".mv-create-instructions");
    inst
      .children("ol")
      .children("li")
      .each((i, el) => {
        instructions.push($(el).text().trim().replace(/\s\s+/g, ""));
      });

    time.prep = this.textTrim($(".mv-create-time-prep .mv-create-time-format"));
    time.cook = this.textTrim(
      $(".mv-create-time-active .mv-create-time-format")
    );
    time.total = this.textTrim(
      $(".mv-create-time-total .mv-create-time-format")
    );
    this.recipe.servings = this.textTrim(
      $(".mv-create-time-yield .mv-create-time-format")
    );
  }
}

module.exports = ThatLowCarbLifeScraper;
