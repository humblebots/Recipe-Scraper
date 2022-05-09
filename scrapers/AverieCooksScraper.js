"use strict";

const BaseScraper = require("../helpers/BaseScraper");

class AverieCooksScraper extends BaseScraper {
  constructor(url) {
    super(url, "averiecooks.com/");
  }

  oldScrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $(".innerrecipe").children("h2").first().text();

    const jsonLD = $("script[type='application/ld+json']:not(.yoast-schema-graph)")[0];
    if (jsonLD && jsonLD.children && jsonLD.children[0].data) {
      const jsonRaw = jsonLD.children[0].data;
      const result = JSON.parse(jsonRaw);
      this.recipe.description = result.description;
    } else {
      this.defaultSetDescription($);
    }

    $(".cookbook-ingredients-list")
      .children("li")
      .each((i, el) => {
        ingredients.push($(el).text().trim().replace(/\s\s+/g, " "));
      });

    $(".instructions")
      .find("li")
      .each((i, el) => {
        instructions.push($(el).text());
      });

    $(".recipe-meta")
      .children("p")
      .each((i, el) => {
        const title = $(el)
          .children("strong")
          .text()
          .replace(/\s*:|\s+(?=\s*)/g, "");
        const value = $(el)
          .text()
          .replace(/[^:]*:/, "")
          .trim();
        switch (title) {
          case "PrepTime":
            time.prep = value;
            break;
          case "CookTime":
            time.cook = value;
            break;
          case "TotalTime":
            time.total = value;
            break;
          case "Yield":
            this.recipe.servings = value;
            break;
          default:
            break;
        }
      });
  }

  newScrape($) {
    this.defaultSetImage($);
    const { ingredients, instructions, time } = this.recipe;

    this.recipe.name = $(".mv-create-title-primary")
      .text()
      .trim()
      .replace(/\s\s+/g, "");

    $("div.mv-create-ingredients ul li").each((i, el) => {
      ingredients.push(this.textTrim($(el)));
    });

    $("div.mv-create-instructions ol li").each((i, el) => {
      instructions.push(this.textTrim($(el)));
    });

    time.prep = this.textTrim($(".mv-create-time-prep .mv-create-time-format"));
    time.cook = this.textTrim(
      $(".mv-create-time-active .mv-create-time-format")
    );
    time.inactive = this.textTrim(
      $(".mv-create-time-additional .mv-create-time-format")
    );
    time.total = this.textTrim(
      $(".mv-create-time-total .mv-create-time-format")
    );
    this.recipe.servings = $("span.mv-create-yield")
      .text()
      .replace("Yield:", "")
      .trim();
  }

  scrape($) {
    this.recipe.name = $(".innerrecipe").children("h2").first().text();

    if (this.recipe.name) {
      this.oldScrape($);
    } else {
      this.newScrape($);
    }
  }
}

module.exports = AverieCooksScraper;
