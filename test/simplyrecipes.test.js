"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");

commonRecipeTest(
  "simplyRecipes",
  {
    testUrl: "https://www.simplyrecipes.com/recipes/panzanella_bread_salad/",
    invalidUrl: "https://www.simplyrecipes.com/recipes/notrealurl",
    invalidDomainUrl: "www.invalid.com",
    nonRecipeUrl: "https://www.simplyrecipes.com/recipes/type/quick/",
    expectedRecipe: {
      name: "Panzanella Bread Salad",
      ingredients: [
        "4 cups tomatoes, cut into large chunks",
        "4 cups day old (somewhat dry and hard) crusty bread (Italian or French loaf), cut into chunks the same size as the tomatoes (see Recipe Note)",
        "1 cucumber, skinned and seeded, cut into large chunks",
        "1/2 red onion, chopped",
        "1 bunch fresh basil, torn into little pieces",
        "1/4 to 1/2 cup high quality extra virgin olive oil",
        "Salt and pepper to taste",
      ],
      tags: [],
      instructions: [
        "Mix everything together and let marinate, covered, at room temperature for at least 30 minutes.",
        "If refrigerating, let come to room temperature before serving.",
      ],
      time: {
        prep: "15 mins",
        cook: "0 mins",
        active: "",
        inactive: "",
        ready: "",
        total: "45 mins",
      },
      servings: "6 to 8 servings",
      image:
        "https://www.simplyrecipes.com/thmb/uItRtn2b5mGAnHWj5g2Wfb43YOo=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2013__07__panzanella-bread-salad-horiz-a-1600-694a76c8b391430c8012f5c916aa8caa.jpg",
    },
  },
  "simplyrecipes.com/recipes/"
);

commonRecipeTest(
  "simplyRecipes",
  {
    testUrl: "https://www.simplyrecipes.com/recipes/prime_rib/",
    invalidUrl: "https://www.simplyrecipes.com/recipes/notrealurl",
    invalidDomainUrl: "www.invalid.com",
    nonRecipeUrl: "https://www.simplyrecipes.com/recipes/type/quick/",
    expectedRecipe: {
      name: "Prime Rib",
      ingredients: [
        "One standing rib roast, 3 to 7 ribs (estimate serving 2-3 people per rib), bones cut away from the roast and tied back to the roast with kitchen string (ask your butcher to prepare the roast this way)",
        "Salt",
        "Freshly ground black pepper",
      ],
      tags: [],
      instructions: [
        "Remove the beef roast from the refrigerator 3 hours before you start to cook it. Sprinkle it with salt all over and let it sit, loosely wrapped in the butcher paper. Roasts should be brought close to room temperature before they go into the oven, to ensure more even cooking.",
        "If your butcher hasn't already done so, cut the bones away from the roast and tie them back on to the roast with kitchen string. This will make it much easier to carve the roast, while still allowing you to stand the roast on the rib bones while cooking.",
        "Preheat your oven to 500°F (or the highest temp your oven reaches less than 500°F). Pat the roast dry with paper towels (pre-salting should have made the roast release some moisture), and sprinkle the roast all over with salt and pepper.",
        "Insert a meat thermometer (oven proof) into the thickest part of the roast, making sure that the thermometer isn't touching a bone.",
        "Brown the roast at a 500°F temperature in the oven for 15 minutes.",
        "Reduce the oven temperature to 325°F. To figure out the total cooking time, allow about 11-12 minutes per pound for rare and 13-15 minutes per pound for medium rare.\n\nThe actual cooking time will depend on the shape of the roast, how chilled your roast still is when it goes into the oven, and your particular oven. A flatter roast will cook more quickly than a thicker one. A chilled roast will take more time than one closer to room temp.\n\nThere are so many variables involved that affect cooking time, this is why you should use a meat thermometer. A prime rib roast is too expensive to \"wing it\". Error on the rare side, you can always put the roast back in the oven to cook it more if it is too rare for your taste.\n\nRoast in oven until thermometer registers 115°F for rare or 120°-130°F for medium. (The internal temperature of the roast will continue to rise after you take the roast out of the oven.)\n\nCheck the temperature of the roast using a meat thermometer an hour before you expect the roast to be done. For example, with a 10 pound roast, you would expect 2 hours of total cooking time for rare (15 minutes at 500° and 1 3/4 hours at 325°). In this case, check after 1 hour 15 minutes of total cooking time, or 1 hour after you lowered the oven temp to 325°. (A benefit of using a remote thermometer is that you don't have to keep checking the roast, you'll be able to see exactly what the temperature is by looking at the thermometer outside of the oven.)\n\nIf the roast is cooking too quickly at this point, lower the oven temperature to 200°F.",
        "Once the roast has reached the temperature you want, remove it from the oven and place it on a carving board. Cover it with foil and let it rest for 15 to 30 minutes before carving. The internal temperature of the roast will continue to rise while the roast is resting.",
        "Cut away the strings that were used to hold the roast to the rack of rib bones. Remove the bones (you can save them to make stock for soup if you want.)",
        "Then, using a sharp carving knife, slice meat across the grain for serving, making the slices about 1/2-inch to 3/4-inch thick.",
        "To make the gravy, remove the roast from the pan. Remove excess fat, leaving 1/4 cup of fat plus the browned drippings and meat juices in the roasting pan.\n\nPlace the roasting pan on the stove top on medium high heat. Use a metal spatula to scrape up drippings that might be sticking to the pan.\n\nWhen the fat is bubbly, sprinkle 1/4 cup of flour over the fat and drippings in the pan.\n\nStir with a wire whisk to incorporate the flour into the fat. Let the flour brown (more flavor that way and you don't have the taste of raw flour in your gravy.)\n\nSlowly add 3 to 4 cups of water, milk, stock, or beer to the gravy. Continue to cook slowly and whisk constantly, breaking up any flour lumps.\n\nThe gravy will simmer and thicken, resulting in about 2 cups of gravy. (If you want less gravy, start with less fat and flour, and add less liquid.)\n\nSeason the gravy with salt and pepper and herbs to taste. (See also How to Make Gravy.)",
      ],
      time: {
        prep: "5 mins",
        cook: "0 mins",
        active: "",
        inactive: "",
        ready: "",
        total: "17 mins",
      },
      servings: "8 to 12",
      image:
        "https://www.simplyrecipes.com/thmb/uItRtn2b5mGAnHWj5g2Wfb43YOo=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2013__07__panzanella-bread-salad-horiz-a-1600-694a76c8b391430c8012f5c916aa8caa.jpg",
    },
  },
  "simplyrecipes.com/recipes/"
);
