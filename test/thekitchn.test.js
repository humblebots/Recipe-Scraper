"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = {
  testUrl: "https://www.thekitchn.com/instant-pot-bbq-chicken-recipe-23136234",
  invalidUrl: "https://www.thekitchn.com/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://www.thekitchn.com/skills",
  expectedRecipe: {
    name: "Instant Pot BBQ Chicken",
    ingredients: [
      "1 cup barbecue sauce",
      "1/3 cup water",
      "3 pounds boneless, skinless chicken thighs, breasts, or a combination",
      "1 teaspoon kosher salt",
    ],
    instructions: [
      "Place 1 cup barbecue sauce and 1/3 cup water in a 6-quart or larger Instant Pot or electric pressure cooker and stir to combine. Season 3 pound boneless, skinless chicken all over with 1 teaspoon kosher salt. Place on top of the sauce in an even layer, but do not stir.",
      "Lock the lid on and make sure the pressure valve is set to seal. Set to cook under HIGH pressure for 15 minutes. It will take about 15 minutes to come up to pressure.",
      "When the cook time is up, let the pressure naturally release for 5 minutes. Quick release any remaining pressure. Use 2 forks to shred the meat in the pressure cooker, then stir into the sauce.",
    ],
    tags: [""],
    time: {
      prep: "5 minutes",
      cook: "35 minutes",
      active: "",
      inactive: "",
      ready: "",
      total: "",
    },
    servings: "6 to 8",
    image:
      "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FSeries%2F2021-02-snapshot-cooking-five-ingredient-instant-pot-meals%2FInstant-pot-BBQ-Chicken%2FKitchn_InstantPot_BBQChicken_267",
  },
};

commonRecipeTest("thekitchn", constants, "thekitchn.com/");
