"use strict";
const commonRecipeTest = require("./helpers/commonRecipeTest");
const constants = {
  testUrl: "https://sallysbakingaddiction.com/bourbon-sweet-potato-pie/",
  invalidUrl: "https://sallysbakingaddiction.com/notarealurl",
  invalidDomainUrl: "www.invalid.com",
  nonRecipeUrl: "https://sallysbakingaddiction.com/about/",
  expectedRecipe: {
    name: "Bourbon Sweet Potato Pie with Marshmallow Topping",
    ingredients: [
      "1 unbaked Flaky Pie Crust (what I used) or All Butter Pie Crust*",
      "egg wash: 1 large egg beaten with 1 Tablespoon (15ml) milk or heavy cream",
      "1.5 lbs sweet potatoes (2 medium/large)",
      "6 Tablespoons (85g) unsalted butter, super soft (see note)",
      "2/3 cup (135g) packed light or dark brown sugar (I recommend dark)",
      "1/2 cup (120ml) heavy cream",
      "1/4 cup (60ml) bourbon*",
      "1 large egg + 2 large egg yolks* (see note)",
      "1 Tablespoon (8g) all-purpose flour",
      "1 teaspoon pure vanilla extract",
      "1 teaspoon ground cinnamon",
      "1/2 teaspoon ground nutmeg",
      "1/2 teaspoon ground ginger",
      "1/4 teaspoon ground cloves",
      "1/8 teaspoon salt",
      "2 large egg whites",
      "1/2 cup (100g) granulated sugar",
      "1/4 teaspoon cream of tartar",
      "1/2 teaspoon pure vanilla extract",
    ],
    instructions: [
      "Pie crust: I like to make sure my pie dough is prepared before I begin making this pie. Make pie dough the night before because it needs to chill in the refrigerator for at least 2 hours before rolling out (step 3).",
      "As the pie dough chills, start the sweet potatoes: Place sweet potatoes in a large saucepan. Cover them with water, then bring to a boil on the stovetop. Boil for 45-50 minutes, or until super soft. During this time, begin step 3.",
      "Roll out the chilled pie dough: On a floured work surface, roll out one of the disks of chilled dough (use the 2nd pie crust for another recipe or freeze). Turn the dough about a quarter turn after every few rolls until you have a circle 12 inches in diameter. Carefully place the dough into a 9-inch pie dish. Tuck it in with your fingers, making sure it is completely smooth. To make a lovely thick edge, I do not trim excess dough around the edges. Instead, fold the excess dough back over the edge and use your hands to mold the edge into a nice thick rim around the pie. Crimp the edges with a fork or use your fingers to flute the edges. Brush edges with egg wash. Chill the dough in the refrigerator or freezer for at least 15 minutes as you work on the filling– this helps prevent the crust from shrinking.",
      "Preheat oven to 350°F (177°C).",
      "Drain the boiling water and run the potatoes under very cold water. The skin should peel off easily at this point. Cool for a few minutes until easy to handle. Slice the potatoes into a couple large chunks, then place into a mixing bowl.",
      "For the filling: Using a handheld or stand mixer fitted with a paddle or whisk attachment (or you can use a blender for this), beat/blend the potatoes on medium-high speed until smooth. Add the remaining filling ingredients and beat/blend on high speed until smooth and combined. Spread filling into prepared pie crust.",
      "Bake for 55-60 minutes or until the center of the pie is only slightly jiggly. A toothpick inserted into the center of the pie should come out *mostly* clean. During bake time, if you find the edges of the pie crust are browning too quickly, apply a pie crust shield or a ring of aluminum foil to protect it.",
      "Remove finished pie from the oven. Place on a wire rack to cool completely or for at least 2 hours. The pie filling will sink and set as it cools.",
      "For the marshmallow meringue: Place egg whites, sugar, and cream of tartar in a heatproof bowl. Set bowl over a saucepan filled with two inches of simmering water. Do not let it touch the water. (You can use a double boiler if you have one.) Whisk constantly until sugar is dissolved and mixture has thinned out, about 4 minutes. Remove from heat. Add the vanilla extract, then using a handheld or stand mixer fitted with a whisk attachment, beat on high speed for 5 minutes until stiff glossy peaks form. You can read more about and watch me make this in my separate Marshmallow Meringue post.",
      "Spread marshmallow cream on top of cooled pie. Serve immediately or store in the refrigerator uncovered up to 8 hours before serving. If desired, toast the marshmallow topping with a kitchen torch just before serving.",
      "Cover and store leftovers at room temperature for 1 day or in the refrigerator for up to 5 days.",
    ],
    tags: [],
    time: {
      prep: "3 hours, 30 minutes (includes pie dough chilling)",
      cook: "1 hour",
      active: "",
      inactive: "",
      ready: "",
      total: "7 hours (includes cooling)",
    },
    servings: "one 9-inch pie",
    image:
      "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2020/11/bourbon-sweet-potato-pie-with-marshmallow-topping.jpg",
  },
};

commonRecipeTest(
  "sallysbakingaddiction",
  constants,
  "sallysbakingaddiction.com/"
);
