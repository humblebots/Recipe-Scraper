"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = {
  testUrl: "https://www.kingarthurbaking.com/recipes/cuban-sandwich-recipe",
  invalidUrl: "https://kingarthurbaking.com/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://www.kingarthurbaking.com/blog",
  expectedRecipe: {
    name: "Cuban Sandwich",
    ingredients: [
      "4 cups (482g) King Arthur Unbleached All-Purpose Flour",
      "4 teaspoons (14g) sugar",
      "2 teaspoons (12g) salt",
      "2 1/4 teaspoons instant yeast or active dry yeast",
      "4 tablespoons (57g) butter or 3 tablespoons (42g) lard, cut into small pieces",
      "1 1/4 cups (283g) lukewarm water",
      "1 1/4 pounds (567g) boneless pork: roast, ribs, chops, or pork tenderloin",
      "3 tablespoons (43g) minced garlic",
      "3 tablespoons (14g) minced parsley",
      "1 tablespoon (7g) paprika (preferably hot)",
      "2 teaspoons cumin",
      "1 teaspoon black pepper",
      "1 teaspoon (6g) salt",
      "2 tablespoons (28g) lime juice",
      "2 tablespoons (25g) vegetable or olive oil",
      "sliced roast pork (from above)",
      "1/4 to 1/3 pound (114g) thinly sliced smoked ham",
      "3/4 pound (340g) thinly sliced Swiss cheese",
      '1 1/2 (312g) large "pickle barrel" pickles',
      "4 tablespoons (57g) butter, melted or 1/4 cup (49g) olive oil",
    ],
    instructions: [
      "To make the rolls: Mix, then knead together all of the dough ingredients — by hand, or using a stand mixer or bread machine set on the dough cycle — to make a smooth, supple dough.",
      "Transfer the dough to a lightly greased bowl or dough-rising bucket, cover the bowl or bucket, and allow the dough to rise until it's puffy, though not necessarily doubled in bulk — about 1 hour, depending on the warmth of your kitchen. Gently fold the dough in upon itself and turn it upside-down after 30 minutes; this \"turn\" helps eliminate some of the excess carbon dioxide and redistributes the yeast's food, both imperative for optimum yeast growth.",
      'Deflate the dough, and divide it into six pieces. Shape each piece into a rough log. Let the logs rest for 15 minutes, covered, then shape each piece into a smooth roll about 8" long, slightly tapered at each end. Place the rolls on a parchment-lined or lightly greased baking sheet.',
      "Let the rolls rise, covered, for 1 hour. Towards the end of the rising time, preheat the oven to 375°F. Perfect your technique Blog The Cuban Sandwich By PJ Hamel",
      "Brush or spray the rolls with water, and slash one long lengthwise slit down the middle of each. Bake for about 30 minutes, or until golden brown. Remove the rolls from the oven, and cool on a rack. The rolls may be made one day in advance and stored at room temperature, or several weeks in advance and frozen.",
      "To prepare the pork: Mix all of the marinade ingredients together (all of the ingredients except the pork), and rub this mixture over all surfaces of the meat. Cover well, and refrigerate for 6 to 24 hours.",
      "Preheat the oven to 425°F.",
      "Place the pork in a roasting pan or ovenproof dish, and roast for 30 to 40 minutes, basting occasionally with the pan juices, until cooked through. Remove the pork from the oven, and cool it completely before slicing thinly.",
      "To assemble the sandwiches: Slice the rolls in half horizontally. Brush the cut surfaces of the rolls with olive oil or melted butter.",
      "Layer the sandwiches as follows: Swiss cheese, sliced pickle, ham, sliced roast pork, then additional cheese.",
      "Now comes the somewhat challenging part. You want to grill these sandwiches, top and bottom, while at the same time flattening them slightly. This helps meld all of the filling ingredients. If you have a panini iron, this is the perfect place to use it; don't tighten down the cover too much, as you don't want the sandwiches completely flattened.",
      "If you don't have a panini iron, heat two large skillets, or a griddle, to medium, about 325°F. Lightly grease the griddle and/or skillets. Brush the bottoms of the sandwiches lightly with olive oil or melted butter.",
      "Grill for 5 to 7 minutes over medium heat, checking often to make sure the bottoms aren't burning. Adjust the heat downward if the bottoms are becoming brown after only a couple of minutes. Turn the sandwiches over and grill for several more minutes, until lightly crisp on both sides, and the cheese is melting. Remove from the heat, and serve warm.",
    ],
    tags: [],
    time: {
      prep: "1 hr 9 mins",
      cook: "30 mins",
      active: "",
      inactive: "",
      ready: "",
      total: "10 hrs 40 mins",
    },
    servings: "6 sandwiches, 12 servings",
    image:
      "https://www.kingarthurbaking.com/sites/default/files/2020-05/cuban-sandwich.jpg",
  },
};

commonRecipeTest("kingarthurbaking", constants, "kingarthurbaking.com/");
