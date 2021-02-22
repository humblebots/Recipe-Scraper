"use strict";

const BaseScraper = require("../helpers/BaseScraper");

/**
 * Class for scraping robyn.recipes
 * @extends BaseScraper
 */
class RobynRecipesScraper extends BaseScraper {
  constructor(url) {
    super(url, "robyn.recipes/");
  }

  scrape($) {
    const { ingredients, instructions, time } = this.recipe;
    this.recipe.name = $("meta[property='og:title']").attr("content");
    this.recipe.image =
      "https://robyn.recipes" +
      $("article.post div.image").find("img").attr("src");

    $("div.ingredients ul li").each((i, el) => {
      ingredients.push(
        $(el)
          .clone()
          .children()
          .remove()
          .end()
          .text()
          .replace(/\s+/g, " ")
          .trim()
      );
    });

    $("div.directions ol li").each((i, el) => {
      instructions.push(
        $(el)
          .clone()
          .children()
          .remove()
          .end()
          .text()
          .replace(/\s+/g, " ")
          .trim()
      );
    });

    $("ul.recipe-overview")
      .children("li")
      .each((i, el) => {
        const elObj = $(el);

        if (elObj.attr("title") === "Servings") {
          this.recipe.servings = elObj
            .find("span")
            .text()
            .replace(/\s+/g, " ")
            .trim();
        } else if (elObj.attr("title") === "Prep Time") {
          time.prep = elObj.find("span").text().replace(/\s+/g, " ").trim();
        } else if (elObj.attr("title") === "Cook Time") {
          time.cook = elObj.find("span").text().replace(/\s+/g, " ").trim();
        }
      });
  }
}

module.exports = RobynRecipesScraper;
