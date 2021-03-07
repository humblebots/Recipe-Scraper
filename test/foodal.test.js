"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = {
  testUrl: "https://foodal.com/recipes/fish-and-seafood/parmesan-tilapia/",
  invalidUrl: "https://foodal.com/recipes/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://foodal.com/",
  expectedRecipe: {
    name: "Quick and Easy 20-Minute Parmesan Tilapia",
    ingredients: [
      "1 slice white sandwich bread (or sub gluten free)",
      "1/4 cup grated Parmesan cheese (3/4 ounce)",
      "1/2 teaspoon salt",
      "1/4 teaspoon freshly ground black pepper",
      "2 large eggs",
      "4 boneless, skinless tilapia fillets (about 24 ounces)",
      "2 tablespoons unsalted butter (or olive oil)",
    ],
    instructions: [
      "Place the bread in a food processor and pulse until finely crumbled. You should have about 1/2 cup total breadcrumbs.",
      "Place breadcrumbs, cheese, salt, and pepper on a plate or dish with raised edges. Stir to combine.",
      "Place eggs in a large bowl and beat lightly but thoroughly.",
      "Working one at a time, dip tilapia fillets into the eggs, then place on the plate with the breadcrumbs. Turn to coat fish on both sides. Set aside on a clean plate.",
      "Repeat step 4 until all fillets are coated with breadcrumb mixture.",
      "Melt butter (or heat oil) in a large skillet over medium heat. Once hot, add tilapia to the pan.",
      "Cook for about 2-3 minutes per side, until the fish is cooked through and flakes easily with a fork. Serve immediately.",
    ],
    tags: [],
    time: {
      prep: "10 minutes",
      cook: "6 minutes",
      active: "",
      inactive: "",
      ready: "",
      total: "16 minutes",
    },
    servings: "4",
    image:
      "https://foodal.com/wp-content/uploads/2020/08/20-Minute-Tilapia-with-Cheese.jpg",
  },
};

commonRecipeTest("foodal", constants, "foodal.com/");
