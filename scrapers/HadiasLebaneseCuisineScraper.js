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

    // this.recipe.name = $(".tasty-recipes-header-content")
    //   .children("h2")
    //   .first()
    //   .text();

    // $(".tasty-recipes-ingredients")
    //   .find("li")
    //   .each((i, el) => {
    //     ingredients.push($(el).text());
    //   });

    // $(".tasty-recipes-instructions")
    //   .find("li")
    //   .each((i, el) => {
    //     instructions.push($(el).text());
    //   });

    // time.prep = $(".tasty-recipes-prep-time").text();
    // time.cook = $(".tasty-recipes-cook-time").text();
    // time.total = $(".tasty-recipes-total-time").text();

    // $(".tasty-recipes-yield-scale").remove();
    // this.recipe.servings = $(".tasty-recipes-yield").text().trim();

    // $("a[rel='category tag']").each((i, el) => {
    //   tags.push($(el).text());
    // });

    console.log(JSON.stringify(this.recipe, null, 2));
  }
}

module.exports = HadiasLebaneseCuisineScraper;
