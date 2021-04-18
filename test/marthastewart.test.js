"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = {
  testUrl: "https://www.marthastewart.com/1548868/grilled-pork-loin-lemongrass",
  invalidUrl: "https://www.marthastewart.com/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://www.marthastewart.com/shop/",
  expectedRecipe: {
    name: "Grilled Pork Loin with Lemongrass",
    ingredients: [
      "6 cloves garlic, smashed and peeled",
      "4 stalks lemongrass, thinly sliced",
      "1 medium shallot, chopped",
      "1/4 cup vegetable oil",
      "1 teaspoon dark soy sauce (optional)",
      "2 tablespoons Thai or Vietnamese fish sauce",
      "2 tablespoons brown sugar",
      "1 piece pork loin (about 2 3/4 pounds), fat cap attached",
      "Kosher salt",
      "Carrot-and-Daikon Pickle, for serving",
      "Thai or Vietnamese chili sauce, such as Mae Ploy sweet chili sauce, for serving",
      "Red- or green-leaf lettuce and fresh herbs, such as basil and cilantro, for serving",
    ],
    instructions: [
      "In a food processor, pulse garlic to chop, then add lemongrass and pulse until finely chopped. Add shallot and pulse to create a fine paste. Pulse in oil, soy and fish sauces, and brown sugar until smooth.",
      "Butterfly pork loin: Place pork on a cutting board vertically (with short sides at top and bottom). Using a large, sharp knife, and starting at top, cut lengthwise down the center, almost all the way through but leaving a hinge of about 1/2 inch. Unfold, as if opening a book.",
      "With knife blade parallel to cutting board, slice through left side of loin, opening meat as you go, and again leaving a hinge. Repeat with right side. If needed, pound loin to an even thickness with a meat mallet. Season with salt, then rub half of lemongrass paste all over meat. Re-form into original shape, tie with kitchen twine at 2-inch intervals, and wrap in plastic. Refrigerate at least 8 hours and up to 1 day. Bring to room temperature 1 hour before grilling.",
      "Prepare grill for direct- and indirect-heat cooking. Remove pork from plastic; place over indirect heat, cover, and cook, maintaining a temperature of about 400°F, about 20 minutes. Brush with remaining lemongrass paste and continue cooking, covered, until a thermometer inserted into thickest part of pork registers 135°F, about 15 minutes.",
      "Transfer to direct heat and cook, uncovered, turning frequently, until charred in places and thermometer registers 138 ̊F, about 5 minutes more. Let pork stand about 10 minutes, then thinly slice and serve with pickles, chili sauce, lettuce, and herbs.",
    ],
    tags: [],
    time: {
      prep: "30 mins",
      cook: "",
      active: "",
      inactive: "",
      ready: "",
      total: "10 hrs 15 mins",
    },
    servings: "6 to 8",
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=750&h=375&url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-750%2Fd53%2Fgrilled-pork-loin-with-lemongrass-45ce8352-0620-horiz%2Fgrilled-pork-loin-with-lemongrass-45ce8352-0620-horiz.jpg%3Fitok%3DbC-qJmKb",
  },
};

commonRecipeTest("marthastewart", constants, "marthastewart.com/");
