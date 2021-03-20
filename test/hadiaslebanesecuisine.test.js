"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = {
  testUrl:
    "https://hadiaslebanesecuisine.com/newsite/recipe-items/labneh-with-garlicky-cherry-tomatoes-and-dukkah/",
  invalidUrl: "https://hadiaslebanesecuisine.com/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://hadiaslebanesecuisine.com/newsite/contact-page/",
  expectedRecipe: {
    name: "Labneh with Garlicky Cherry Tomatoes and Dukkah",
    ingredients: [
      "2 cups cherry tomatoes, halved",
      "A pinch of salt",
      "2 cups labneh",
      "A handful of fresh mint leaves",
      "¼ cup olive oil",
      "2 garlic cloves",
      "2 tablespoons dukkah",
      "A small drizzle of olive oil upon serving",
      "1 large Arabic bread or two pita breads, cut into squares and toasted to a golden color.",
      "More mint leaves to garnish",
    ],
    instructions: [
      "Start by toasting the Arabic or pita bread: with a sharp knife, cut the bread into equal cracker portions. Place them in a single layer on a sheet pan. Toast in a preheated oven to 200°C/400°F about 7 minutes until crisp.",
      "With a mortar and pestle crush well together the fresh mint leaves and the garlic cloves to a paste. Set aside.",
      "In a medium skillet over medium heat add the garlic-mint paste, cherry tomatoes, pinch of salt and drizzle the olive oil.",
      "sauté together until the tomatoes soften a bit and start to burst. Remove from heat and set aside.",
      "Spoon the labneh onto a plate and spread it with the back of a spoon, scatter the tomatoes and the juices all over the labneh.",
      "Add a small drizzle of olive oil and scatter the dukkah evenly on top. Garnish with mint leaves and serve with the toasted pita bread or with our zaatar and sumac crackers. Happy eating!",
    ],
    tags: [],
    time: {
      prep: "",
      cook: "",
      active: "",
      inactive: "",
      ready: "",
      total: "",
    },
    servings: "",
    image:
      "https://hadiaslebanesecuisine.com/newsite/wp-content/uploads/2020/11/med-29-5.jpg",
  },
};

commonRecipeTest(
  "hadiaslebanesecuisine",
  constants,
  "hadiaslebanesecuisine.com/"
);
