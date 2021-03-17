"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping TheKitchn.com
 * @extends BaseScraper
 */
class TheKitchnScraper extends BaseScraper {
  constructor(url) {
    super(url, "thekitchn.com/");
  }

  scrape($) {
    this.defaultSetImage($);

    const { ingredients, instructions, time } = this.recipe;

    console.log($("script.json-ld-recipe").text());

    // console.log(recipeContainer.children("h2").text());

    this.recipe.name = $("h2").text().replace(/\s+/g, " ").trim();

    // $(".wprm-recipe-ingredients > .wprm-recipe-ingredient").each((_, el) => {
    //   ingredients.push($(el).text().replace(/\s+/g, " ").trim());
    // });

    // $(".wprm-recipe-instruction-text").each((_, el) => {
    //   instructions.push($(el).text().replace(/\s\s+/g, " ").trim());
    // });

    // time.prep = $('.wprm-recipe-time-container:contains("Prep Time: ")')
    //   .find(".wprm-recipe-time")
    //   .text()
    //   .replace(/\s\s+/g, "")
    //   .trim();

    // time.cook = $('.wprm-recipe-time-container:contains("Cook Time: ")')
    //   .find(".wprm-recipe-time")
    //   .text()
    //   .replace(/\s\s+/g, "")
    //   .trim();

    // time.total = $('.wprm-recipe-time-container:contains("Total Time: ")')
    //   .find(".wprm-recipe-time")
    //   .text()
    //   .replace(/\s\s+/g, "")
    //   .trim();

    // this.recipe.servings = $(".wprm-recipe-servings").text();
    // this.recipe.tags = $(".wprm-recipe-keyword")
    //   .text()
    //   .split(", ")
    //   .map((keyword) => {
    //     return keyword.replace(/\s\s+/g, " ").trim();
    //   });

    console.log(JSON.stringify(this.recipe, null, 2));
  }
}

module.exports = TheKitchnScraper;
