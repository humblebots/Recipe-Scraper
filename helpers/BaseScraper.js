"use strict";

const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { validate } = require("jsonschema");

const Recipe = require("./Recipe");
const recipeSchema = require("./RecipeSchema.json");

/**
 * Abstract Class which all scrapers inherit from
 */
class BaseScraper {
  constructor(url, subUrl = "", fetchOptions = {}) {
    this.url = url;
    this.subUrl = subUrl;
    this.fetchOptions = fetchOptions;
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
  }

  /**
   * Fetches html from url
   * @returns {object} - Cheerio instance
   */
  async fetchDOMModel() {
    try {
      const res = await fetch(this.url, this.fetchOptions);
      const html = await res.text();
      return cheerio.load(html);
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
}

module.exports = BaseScraper;
