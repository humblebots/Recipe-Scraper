"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = {
  testUrl: "https://www.halfbakedharvest.com/hawaiian-pineapple-chicken-tacos/",
  invalidUrl: "https://www.halfbakedharvest.com/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://www.halfbakedharvest.com/press/",
  expectedRecipe: {
    name: "Slow Cooker Braised Hawaiian Pineapple Chicken Tacos",
    ingredients: [
      "2 pounds boneless skinless chicken breast, thighs, or a pork shoulder/butt",
      "1/2 cup pineapple juice",
      "1/2 cup low sodium soy sauce",
      "1/3 cup honey",
      "2 tablespoons rice vinegar",
      "2 tablespoons organic ketchup",
      "6 cloves garlic, finely chopped or grated",
      "2 teaspoons ground ginger",
      "1-2 tablespoons sambal oelek",
      "2 cups fresh pineapple chunks (or 1 can pineapple chunks)",
      "3-4 tablespoons Gochujang (Korean chili paste)",
      "1/4 cup plain Greek yogurt, sour cream, or olive oil mayo",
      "juice from 1 lime",
      "3 cups shredded cabbage",
      "1/2 cup fresh cilantro, roughly chopped",
      "1 jalapeño, seeded and chopped",
      "warmed tortillas, crunchy Asian noodles and toasted sesame seeds, for serving",
    ],
    instructions: [
      "In the bowl of your slow cooker, combine the chicken, pineapple juice, soy sauce, honey, rice vinegar, ketchup, garlic, ginger, sambal oelek, and 1 cup pineapple chunks. Cover and cook on LOW for 6 hours or on HIGH for 3-4 hours. Once done cooking, switch the slow cooker to high. Cook, uncovered for 30 minutes, to thicken the sauce slightly.",
      "Preheat the broiler to high. Remove the chicken from the sauce to a baking sheet. Lightly shred, then transfer to the broiler. Broil for 1-2 minutes, until the chicken caramelizes. Watch closely!",
      "Stir the caramelized meat back into the sauce.",
      'Meanwhile, make the yum yum sauce. Combine the Gochujang sauce with the yogurt and lime juice. Season with salt. This is the "yum yum" sauce.',
      "To make the slaw, add the cabbage, remaining 1 cup pineapple chunks, cilantro, and jalapeño to a bowl with a few spoonfuls of the yum yum sauce and toss to combine. Season with salt.",
      "Stuff the chicken into the warmed tortillas. Top with slaw, additional sauce, then add the crunchy noodles and a sprinkle of sesame seeds. Enjoy!",
    ],
    tags: [],
    time: {
      prep: "15 minutes",
      cook: "4 hours",
      active: "",
      inactive: "",
      ready: "",
      total: "4 hours 15 minutes",
    },
    servings: "6",
    image:
      "https://www.halfbakedharvest.com/wp-content/uploads/2020/03/Slow-Cooker-Braised-Hawaiian-Pineapple-Chicken-Tacos-1.jpg",
  },
};

commonRecipeTest("halfbakedharvest", constants, "halfbakedharvest.com/");
