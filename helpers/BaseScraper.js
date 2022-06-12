"use strict";

const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { parse: parseDuration } = require("tinyduration");
const { validate } = require("jsonschema");

const Recipe = require("./Recipe");
const recipeSchema = require("./RecipeSchema.json");

/**
 * Abstract Class which all scrapers inherit from
 */
class BaseScraper {
  metadataJson = undefined;

  constructor(url, subUrl = "", fetchOptions = {}) {
    this.url = url;
    this.subUrl = subUrl;
    this.fetchOptions = fetchOptions;
  }

  async checkServerResponse() {
    try {
      const res = await fetch(this.url);

      return res.ok; // res.status >= 200 && res.status < 300
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /**
   * Checks if the url has the required sub url
   */
  checkUrl() {
    if (!this.url.includes(this.subUrl)) {
      throw new Error(`url provided must include '${this.subUrl}'`);
    }
  }

  /**
   * Builds a new instance of Recipe
   */
  createRecipeObject() {
    this.recipe = new Recipe();
  }

  defaultError() {
    throw new Error("No recipe found on page");
  }

  /**
   * @param {object} $ - a cheerio object representing a DOM
   * @returns {string|null} - if found, an image url
   */
  defaultSetImage($) {
    this.recipe.image =
      $("meta[property='og:image']").attr("content") ||
      $("meta[name='og:image']").attr("content") ||
      $("meta[itemprop='image']").attr("content");

    if (!this.recipe.image && this.metadataJson) {
      const image = this.metadataJson.image;

      if (Array.isArray(image) && image.length > 0) {
        this.recipe.image = image[0];
      } else if (typeof image === "string") {
        this.recipe.image = image;
      }
    }
  }

  defaultSetTitle($) {
    this.recipe.name =
      this.metadataJson?.name ?? $("meta[property='og:title']").attr("content");
  }

  defaultSetTags($) {
    const keywords = this.metadataJson?.keywords;
    if (keywords) {
      if (typeof keywords === "string") {
        this.recipe.tags = keywords.split(",").map((tag) => {
          return tag.trim();
        });
      } else if (Array.isArray(keywords)) {
        this.recipe.tags = keywords.map((keyword) => {
          return keyword.trim();
        });
      }
    }
  }

  defaultSetNutrition($) {
    const nutrition = this.metadataJson?.nutrition;

    if (nutrition) {
      this.recipe.nutrition = {
        calories: nutrition.calories,
        carbohydrateContent: nutrition.carbohydrateContent,
        proteinContent: nutrition.proteinContent,
        fatContent: nutrition.fatContent,
        saturatedFatContent: nutrition.saturatedFatContent,
        sodiumContent: nutrition.sodiumContent,
        fiberContent: nutrition.fiberContent,
        sugarContent: nutrition.sugarContent,
        servingSize: nutrition.servingSize,
      };
    }
  }

  /**
   * @param {object} $ - a cheerio object representing a DOM
   * if found, set recipe description
   */
  defaultSetDescription($) {
    const description =
      this.metadataJson?.description ??
      $("meta[name='description']").attr("content") ??
      $("meta[property='og:description']").attr("content") ??
      $("meta[name='twitter:description']").attr("content");

    this.recipe.description = description
      ? description.replace(/\n/g, " ").trim()
      : "";
  }

  defaultSetServings($) {
    if (this.metadataJson && this.metadataJson.recipeYield) {
      let rawYield = this.metadataJson.recipeYield;

      if (rawYield) {
        if (Array.isArray(rawYield) && rawYield.length > 0) {
          rawYield = rawYield[0];
        }

        if (typeof rawYield === "number") {
          this.recipe.servings = String(rawYield);
        } else if (typeof rawYield === "string") {
          this.recipe.servings = rawYield.toLowerCase().split("serv")[0].trim();
        }
      }
    }

    if (this.recipe.servings) {
      return;
    }

    this.recipe.servings = $(".wprm-recipe-servings").text() || "";
  }

  defaultSetTime($) {
    const time = this.recipe.time;

    if (this.metadataJson) {
      // const getDuration = (duration) => {
      //   if (!duration) {
      //     return undefined;
      //   }
      //   try {
      //     parseDuration(duration);
      //   } catch {
      //     return undefined;
      //   }
      // };
      // try {
      // TODO: Parse durations into minutes/hours/etc and add them together to make active/inactive/etc make more sense.
      // parseDuration();
      // assert(durationObj, {
      //   years: 1,
      //   months: 2,
      //   days: 3,
      //   hours: 4,
      //   minutes: 5,
      //   seconds: 6,
      // });
      // } catch {}

      this.recipe.time.prep = BaseScraper.parsePTTime(
        this.metadataJson.prepTime
      );
      this.recipe.time.total = BaseScraper.parsePTTime(
        this.metadataJson.totalTime
      );
      this.recipe.time.cook = BaseScraper.parsePTTime(
        this.metadataJson.cookTime
      );
      this.recipe.time.active = BaseScraper.parsePTTime(
        this.metadataJson.performTime
      );

      if (time.prep || time.total || time.cook || time.active) {
        return;
      }
    }

    if (!time.prep) {
      time.prep = $(".wprm-recipe-prep-time-label").next().text().trim();
    }

    if (!time.prep) {
      this.recipe.time.prep =
        `${$(".wprm-recipe-prep_time").text()} ${$(
          ".wprm-recipe-prep_time-unit"
        ).text()}` || "";
    }
    // time.cook = $(".wprm-recipe-cook-time-label").next().text().trim();
    // time.total = $(".wprm-recipe-total-time-label").next().text().trim();

    // this.recipe.time.cook =
    //   `${$(".wprm-recipe-cook_time").text()} ${$(
    //     ".wprm-recipe-cook_time-unit"
    //   ).text()}` || "";
    // this.recipe.time.total =
    //   `${$(".wprm-recipe-total_time").text()} ${$(
    //     ".wprm-recipe-total_time-unit"
    //   ).text()}` || "";
  }

  defaultSetIngredients($) {
    const ingredients = this.recipe.ingredients;

    if (this.metadataJson && this.metadataJson["recipeIngredient"]) {
      const arr = this.metadataJson["recipeIngredient"];

      if (Array.isArray(arr) && arr.length > 0) {
        this.recipe.ingredients = arr.map((ingredient) => {
          return ingredient.replace(/\s\s+/g, " ").trim();
        });

        return;
      }
    }

    const wprmIngredients = $(".wprm-recipe-ingredient");
    if (wprmIngredients) {
      wprmIngredients.each((i, el) => {
        ingredients.push(this.newTrimText($(el)));
      });

      if (!ingredients.length) {
        $(".wprm-recipe-ingredients > .wprm-recipe-ingredient").each(
          (i, el) => {
            ingredients.push(this.newTrimText($(el)));
          }
        );

        if (ingredients.length) {
          return;
        }
      } else {
        return;
      }
    }

    const ingredientsList = $(".ingredients-item");
    if (ingredientsList) {
      ingredientsList.each((i, el) => {
        ingredients.push(this.newTrimText($(el)));
      });

      if (ingredients.length) {
        return;
      }
    }

    $(".recipe-ingredients__item").each((i, el) => {
      ingredients.push(this.newTrimText($(el)));
    });

    if (ingredients.length) {
      return;
    }

    $(".tasty-recipes-ingredients")
      .find("li")
      .each((i, el) => {
        ingredients.push(this.newTrimText($(el)));
      });

    if (this.recipe.ingredients.length) {
      return;
    }

    $(".o-Ingredients__a-Ingredient, .o-Ingredients__a-SubHeadline").each(
      (i, el) => {
        if (!$(el).hasClass("o-Ingredients__a-Ingredient--SelectAll")) {
          ingredients.push(this.newTrimText($(el)));
        }
      }
    );

    if (ingredients.length) {
      return;
    }

    const recipeContainer = $("div.wp-block-mv-recipe");
    if (recipeContainer) {
      recipeContainer.find("div.mv-create-ingredients ul li").each((i, el) => {
        ingredients.push(this.newTrimText($(el)));
      });

      if (ingredients.length) {
        return;
      }
    }

    $(".ingredient-item").each((i, el) => {
      ingredients.push(this.newTrimText($(el)));
    });

    if (ingredients.length) {
      return;
    }

    $("li[itemprop=ingredients]").each((i, el) => {
      this.recipe.ingredients.push(this.newTrimText($(el)));
    });

    if (this.recipe.ingredients.length) {
      return;
    }

    $("p.ingredient").each((_, el) => {
      ingredients.push($(el).text().replace(/\s\s+/g, " ").trim());
    });

    $("p.ingredient").each((_, el) => {
      ingredients.push(this.newTrimText($(el)));
    });

    if (ingredients.length) {
      return;
    }

    $(".tasty-recipe-ingredients")
      .find("h4, li")
      .each((i, el) => {
        ingredients.push(this.newTrimText($(el)));
      });

    if (ingredients.length) {
      return;
    }

    $("div.ingredients ul li").each((i, el) => {
      ingredients.push(
        this.newTrimText($(el).clone().children().remove().end())
      );
    });

    if (ingredients.length) {
      return;
    }

    $(".ingredients")
      .children("h6, li")
      .each((i, el) => {
        ingredients.push(this.newTrimText($(el)));
      });

    if (ingredients.length) {
      return;
    }
  }

  defaultSetInstructions($) {
    const instructions = this.recipe.instructions;

    if (this.metadataJson && this.metadataJson["recipeInstructions"]) {
      const rawInstrutions = this.metadataJson["recipeInstructions"];

      const processInstructionsArray = (instructionsArray) => {
        return instructionsArray.map((instruction) => {
          const text = instruction?.text ?? instruction?.itemListElement?.text;

          if (text) {
            return text;
          } else if (
            Array.isArray(instruction.itemListElement) &&
            instruction.itemListElement.length > 0
          ) {
            const el = instruction.itemListElement[0];

            return el?.text ?? el?.name ?? instruction;
          } else {
            return instruction;
          }
        });
      };

      if (Array.isArray(rawInstrutions)) {
        const sub = rawInstrutions[0];
        if (Array.isArray(sub) && sub.length > 0) {
          this.recipe.instructions = processInstructionsArray(sub);
        } else {
          this.recipe.instructions = processInstructionsArray(rawInstrutions);
        }
      } else if (
        typeof rawInstrutions === "string" &&
        rawInstrutions.startsWith("<ol")
      ) {
        try {
          const parsed = cheerio.load(testHtml);

          parsed("li").each((i, el) => {
            this.recipe.instructions.push(this.newTrimText($(el)));
          });
        } catch {}
      }
    }

    if (instructions.length > 0) {
      return;
    }

    $(".wprm-recipe-instruction-text").each((i, el) => {
      instructions.push(this.newTrimText($(el).remove("img")));
    });

    if (instructions.length > 0) {
      return;
    }

    $(".wprm-recipe-instructions").each((i, el) => {
      instructions.push(this.newTrimText($(el)));
    });

    if (instructions.length > 0) {
      return;
    }

    $(".wprm-recipe-instruction-group").each((i, el) => {
      instructions.push($(el).children(".wprm-recipe-group-name").text());
      $(el)
        .find(".wprm-recipe-instruction-text")
        .each((i, elChild) => {
          instructions.push(this.newTrimText($(elChild)));
        });
    });

    if (instructions.length > 0) {
      return;
    }

    $(".instructions")
      .find("li")
      .each((i, el) => {
        instructions.push(this.newTrimText($(el)));
      });

    if (instructions.length > 0) {
      return;
    }

    $("ol.recipeSteps li").each((i, el) => {
      instructions.push(this.newTrimText($(el)));
    });

    if (instructions.length > 0) {
      return;
    }

    $("div.tasty-recipes-instructions")
      .find("li")
      .each((i, el) => {
        instructions.push(this.newTrimText($(el)));
      });

    if (instructions.length > 0) {
      return;
    }

    $("div.tasty-recipe-instructions")
      .find("li")
      .each((i, el) => {
        instructions.push(this.newTrimText($(el)));
      });

    if (instructions.length > 0) {
      return;
    }

    $(".o-Method__m-Step").each((i, el) => {
      instructions.push(this.newTrimText($(el)));
    });

    if (instructions.length > 0) {
      return;
    }

    $(".recipe__method-steps")
      .find("p")
      .each((i, el) => {
        instructions.push(this.newTrimText($(el)));
      });

    if (instructions.length > 0) {
      return;
    }

    $(".recipe-method__list-item-text").each((i, el) => {
      instructions.push(this.newTrimText($(el)));
    });

    if (instructions.length > 0) {
      return;
    }

    $(".instructions")
      .children("h6, li")
      .each((i, el) => {
        instructions.push(this.newTrimText($(el)));
      });

    if (instructions.length > 0) {
      return;
    }

    $("div.directions ol li").each((i, el) => {
      instructions.push(
        this.newTrimText($(el).clone().children().remove().end())
      );
    });

    if (instructions.length > 0) {
      return;
    }

    $(".recipe-directions__item").each((i, el) => {
      instructions.push(this.newTrimText($(el)));
    });

    if (instructions.length > 0) {
      return;
    }

    $("div.instructions span p").each((_, el) => {
      instructions.push(this.newTrimText($(el)));
    });

    if (instructions.length > 0) {
      return;
    }
  }

  newTrimText(element) {
    return element.text().replace(/▢/g, "").replace(/\s\s+/g, " ").trim();
  }

  /**
   * Fetches html from url
   * @returns {object} - Cheerio instance
   */
  async fetchDOMModel() {
    try {
      console.log(
        `Fetching recipe for url: ${this.url} with options: ${JSON.stringify(
          this.fetchOptions
        )}`
      );
      const res = await fetch(this.url, this.fetchOptions);
      const html = await res.text();
      const result = cheerio.load(html);
      return result;
    } catch (err) {
      this.defaultError();
    }
  }

  /**
   * Handles the workflow for fetching a recipe
   * @returns {object} - an object representing the recipe
   */
  async fetchRecipe() {
    this.checkUrl();
    const $ = await this.fetchDOMModel();
    this.createRecipeObject();
    this.parseJson($);
    this.scrape($);
    return this.validateRecipe();
  }

  /**
   * Abstract method
   * @param {object} $ - cheerio instance
   * @returns {object} - an object representing the recipe
   */
  scrape($) {
    throw new Error("scrape is not defined in BaseScraper");
  }

  parseJson($) {
    const recipeFromData = (data) => {
      let type = data["@type"];
      let graph = data["@graph"];

      if (type) {
        if (Array.isArray(type) && type.length > 0) {
          return type[0] === "Recipe" ? data : undefined;
        } else if (typeof type === "string") {
          return type === "Recipe" ? data : undefined;
        } else {
          return undefined;
        }
      } else if (graph) {
        if (Array.isArray(graph)) {
          for (const graphEntry of graph) {
            const drillDown = recipeFromData(graphEntry);
            if (drillDown) {
              return drillDown;
            }
          }

          return undefined;
        } else {
          return recipeFromData(graph);
        }
      } else {
        return undefined;
      }
    };

    this.metadataJson = undefined;

    $('script[type="application/ld+json"]').each((i, el) => {
      try {
        let parsed = JSON.parse($(el).text());

        if (Array.isArray(parsed)) {
          for (const test of parsed) {
            const recipeData = recipeFromData(test);
            if (recipeData) {
              this.metadataJson = recipeData;
              return false;
            }
          }
        } else {
          const recipeData = recipeFromData(parsed);
          if (recipeData) {
            this.metadataJson = recipeData;
            return false;
          }
        }
      } catch (error) {
        console.log(`JSON parsing error: ${error}`);
      }
    });

    console.log(`Set JSON metadata: ${!!this.metadataJson}`);
  }

  textTrim(el) {
    return el.text().trim();
  }

  /**
   * Validates scraped recipes against defined recipe schema
   * @returns {object} - an object representing the recipe
   */
  validateRecipe() {
    let res = validate(this.recipe, recipeSchema);
    if (!res.valid) {
      this.defaultError();
    }
    return this.recipe;
  }

  static pluralize(str, num) {
    return num === 1 ? str : `${str}s`;
  }

  static parsePTTime(ptTime) {
    if (!ptTime) {
      return undefined;
    }

    try {
      const duration = parseDuration(ptTime);

      let output = "";

      if (duration.days) {
        output += `${duration.days} ${this.pluralize("day", duration.days)} `;
      }

      if (duration.hours) {
        output += `${duration.hours} ${this.pluralize(
          "hour",
          duration.hours
        )} `;
      }

      if (duration.minutes) {
        output += `${duration.minutes} ${this.pluralize(
          "minute",
          duration.minutes
        )} `;
      }

      return output.trim();
    } catch (error) {
      console.log(`Error parsing duration: ${error}`);
    }

    // ptTime = ptTime.replace("PT", "");
    // ptTime = ptTime.replace("H", " hours");
    // ptTime = ptTime.replace("M", " minutes");
    // ptTime = ptTime.replace("S", " seconds");

    // return ptTime;
  }
}

module.exports = BaseScraper;
