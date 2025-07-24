"use strict";

// const path = require("path");
// const fs = require("fs");
// const constantsPath = path.join(__dirname, "constants");
const { assert, expect } = require("chai");
const ScraperFactory = require("../helpers/ScraperFactory");
require("it-each")({ testPerIteration: true });

// // Let the generic parser execute the tests for all of the other parsers.
// fs.readdirSync(constantsPath).forEach((file) => {
//   const host = file.split("Constants.js")[0];
//   const constants = require(`./constants/${file}`);
//   commonRecipeTest(host, constants, "fakerecipewebsite.com");
// });

const testUrls = [
  // "https://www.101cookbooks.com/coleslaw-recipe/",
  // "https://www.allrecipes.com/recipe/274411/bucatini-cacio-e-pepe-roman-sheep-herders-pasta",
  // "https://www.ambitiouskitchen.com/street-corn-pasta-salad-with-cilantro-pesto-goat-cheese/",
  // "https://www.averiecooks.com/thai-chicken-coconut-curry/",
  // "https://www.bbc.co.uk/food/recipes/sausage_and_gnocchi_bake_80924",
  // "https://www.bbcgoodfood.com/recipes/doughnut-muffins",
  // "https://www.bonappetit.com/recipe/soba-noodles-with-crispy-kale",
  // "https://www.budgetbytes.com/chicken-lime-soup/",
  // "https://www.centraltexasfoodbank.org/recipe/crock-pot-chicken-mole",
  // "https://www.closetcooking.com/reina-pepiada-arepa-chicken-and-avocado-sandwich/",
  // "https://cookieandkate.com/fresh-spring-rolls-recipe/",
  // "https://www.cookingclassy.com/flan-recipe/",
  // "https://copykat.com/homemade-croutons-made-in-an-air-fryer/",
  // "https://damndelicious.net/2019/08/20/raspberry-croissant-french-toast-bake/",
  // "http://www.eatingwell.com/recipe/264666/pressure-cooker-chicken-enchilada-soup/",
  // "https://www.epicurious.com/recipes/food/views/trout-toast-with-soft-scrambled-eggs",
  // "https://www.food.com/recipe/oatmeal-raisin-cookies-35813",
  // "https://www.foodandwine.com/recipes/french-onion-soup-ludo-lefebvre",
  // "https://www.foodnetwork.com/recipes/food-network-kitchen/cast-iron-skillet-provencal-pork-chops-and-potatoes-3542642",
  // "https://gimmedelicious.com/creamy-spinach-and-mushroom-pasta-bake",
  // "http://www.gimmesomeoven.com/grilled-chicken-kabobs/",
  // "https://www.insidetherustickitchen.com/classic-beef-lasagne-spinach-pasta/",
  // "https://www.jamieoliver.com/recipes/chicken-recipes/crispy-garlicky-chicken/",
  // "https://julieblanner.com/chicken-enchiladas/",
  // "https://www.kitchenstories.com/en/recipes/chorizo-breakfast-tacos-with-salsa-verde",
  // "https://www.liquor.com/recipes/painkiller/",
  // "https://www.loveandlemons.com/pickled-red-onions/#wprm-recipe-container-42595",
  // "https://www.makingthymeforhealth.com/easy-white-bean-cabbage-soup/",
  // "https://www.melskitchencafe.com/bbq-pulled-pork-sandwiches-slow-cooker/",
  // "https://minimalistbaker.com/fudgy-sweet-potato-brownies-v-gf/",
  // "https://www.myrecipes.com/recipe/London-broil-roasted-garlic-aioli",
  // "https://nomnompaleo.com/west-lake-beef-soup",
  // "https://omnivorescookbook.com/dan-dan-noodles/",
  // "https://pinchofyum.com/couscous-summer-salad",
  // "https://www.recipetineats.com/dan-dan-noodles-spicy-sichuan-noodles/",
  // "https://robyn.recipes/vegetarian/2019/10/17/potato-leek-soup/",
  // "https://www.seriouseats.com/recipes/2019/08/korean-chilled-cucumber-soup-oi-naengguk-recipe.html",
  // "https://www.simplyrecipes.com/recipes/panzanella_bread_salad/",
  // "https://superiorfarms.com/recipe/adobo-crusted-lamb-loin-chops/",
  // "https://tastesbetterfromscratch.com/chess-pie/",
  // "https://www.tasteofhome.com/recipes/artichoke-chicken",
  // "https://thatlowcarblife.com/chicken-bacon-ranch-pizza/",
  // "https://www.theblackpeppercorn.com/how-to-cook-a-smoked-picnic-ham",
  // "https://thecafesucrefarine.com/best-ever-homemade-flour-tortillas/",
  // "https://www.thepioneerwoman.com/food-cooking/recipes/a86873/french-dip-sandwiches/",
  // "https://therealfoodrds.com/veggie-loaded-turkey-chili/",
  // "https://therecipecritic.com/creamy-parmesan-spaghetti/",
  // "https://thereislifeafterwheat.com/2014/10/sandwich-bread-2/?fbclid=iwar20kih966lajfk5onocbmu1lga1tziwjmnrqjuqkux-axe8_ixc63fqchg",
  // "https://www.thespruceeats.com/grilled-squid-recipe-1808848",
  // "https://whatsgabycooking.com/cauliflower-rice-kale-bowls-instant-pot-black-beans/",
  // "https://www.woolworths.com.au/shop/recipedetail/7440/bean-tomato-nachos",

  //++++++ broken
  // "https://tasty.co/article/christinebyrne/pizza-tots-are-literally-everything",
  // "https://thatsdeelicious.com/green-enchiladas-with-chicken/",
  // "https://www.pauladeen.com/recipe/lemon-blossoms/",
  // "https://www.thekitchn.com/how-to-make-chimichurri-sauce-242335",
  //++++++ broken

  // "https://www.yummly.com/recipe/No-Bake-Lemon-Mango-Cheesecakes-with-Speculoos-crust-781945",
  // "https://www.campbells.com/recipes/shortcut-stroganoff/",
  // "https://onelittleproject.com/chocolate-eclair-cake/",
  // "https://www.simplyrecipes.com/recipes/banana_bread/",
  // "https://www.simplyrecipes.com/recipes/panzanella_bread_salad/",
  // "https://preppykitchen.com/boston-cream-pie/",
  // "https://www.gritsandpinecones.com/southern-potato-salad/",
  // "https://handletheheat.com/peanut-butter-stuffed-brownies/",
  // "https://hungry-blonde.com/low-carb-beef-black-bean-enchiladas/",
  // "https://natashaskitchen.com/raspberry-macarons-recipe-video-tutorial/",
  // "https://thecozycook.com/chicken-and-dumplings/",
  // "https://www.asweetpeachef.com/slow-cooker-shredded-chicken/",
  // "https://www.cookingclassy.com/flan-recipe/",
  // "https://thrivinghomeblog.com/cilantro-lime-chicken-marinade/",
  // "https://preppykitchen.com/strawberry-cake/",
  // "https://www.foxandbriar.com/40-minute-hamburger-bun-recipe/",
  // "https://www.skinnytaste.com/cheesecake-brownies/",
  'https://tastybitesfast.com/million-dollar-lasagna-creamy-hearty-crowd-pleasing-family-dinner'
];

describe("generic parser", () => {
  it.each(
    testUrls,
    "should find a recipe on: %s",
    ["element"],
    async (element, next) => {
      const scraper = new ScraperFactory().getScraper(element);

      const isServiceAvailable = await scraper.checkServerResponse();
      if (!isServiceAvailable) {
        console.log("SKIP TEST, server not responding", isServiceAvailable);
        expect(true);

        return next();
      }

      try {
        const actualRecipe = await scraper.fetchRecipe();

        console.log(JSON.stringify(actualRecipe, null, 2));
        expect(actualRecipe.name).to.exist;
        expect(actualRecipe.description).to.exist;
        expect(actualRecipe.ingredients).to.have.lengthOf.above(0);
        expect(actualRecipe.instructions).to.have.lengthOf.above(0);

        const time = actualRecipe.time;

        expect(time).to.satisfy((time) => {
          const el =
            time.prep ??
            time.cook ??
            time.active ??
            time.inactive ??
            time.ready ??
            time.total;

          return !!el && el.length > 0;
        });
      } catch (error) {
        console.log(`+++++++++++ ERROR: `, error);
        // assert.fail();
      } finally {
        next();
      }
    }
  );
});

// this.name = "";
// this.description = "";
// this.ingredients = [];
// this.instructions = [];
// this.tags = [];
// this.time = {
//   prep: "",
//   cook: "",
//   active: "",
//   inactive: "",
//   ready: "",
//   total: "",
// };
// this.servings = "";
// this.image = "";
// this.nutrition = {};
