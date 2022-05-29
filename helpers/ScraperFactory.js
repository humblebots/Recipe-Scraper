"use strict";

const parseDomain = require("parse-domain");

const domains = {
  "101cookbooks": require("../scrapers/101CookbooksScraper"),
  allrecipes: require("../scrapers/AllRecipesScraper"),
  ambitiouskitchen: require("../scrapers/AmbitiousKitchenScraper"),
  averiecooks: require("../scrapers/AverieCooksScraper"),
  bbc: require("../scrapers/BbcScraper"),
  bbcgoodfood: require("../scrapers/BbcGoodFoodScraper"),
  bonappetit: require("../scrapers/BonAppetitScraper"),
  budgetbytes: require("../scrapers/BudgetBytesScraper"),
  cafedelites: require("../scrapers/CafeDelitesScraper"),
  centraltexasfoodbank: require("../scrapers/CentralTexasFoodBankScraper"),
  closetcooking: require("../scrapers/ClosetCookingScraper"),
  cookieandkate: require("../scrapers/CookieAndKateScraper"),
  cookingclassy: require("../scrapers/CookingClassyScraper"),
  copykat: require("../scrapers/CopyKatScraper"),
  damndelicious: require("../scrapers/DamnDeliciousScraper"),
  eatingwell: require("../scrapers/EatingWellScraper"),
  epicurious: require("../scrapers/EpicuriousScraper"),
  food: require("../scrapers/FoodScraper"),
  foodandwine: require("../scrapers/FoodAndWineScraper"),
  foodal: require("../scrapers/FoodalScaper"),
  foodnetwork: require("../scrapers/FoodNetworkScraper"),
  gimmedelicious: require("../scrapers/GimmeDeliciousScraper"),
  gimmesomeoven: require("../scrapers/GimmeSomeOvenScraper"),
  hadiaslebanesecuisine: require("../scrapers/HadiasLebaneseCuisineScraper"),
  halfbakedharvest: require("../scrapers/HalfBakedHarvestScraper"),
  insidetherustickitchen: require("../scrapers/InsideTheRusticKitchenScraper"),
  julieblanner: require("../scrapers/JulieBlannerScraper"),
  kitchenstories: require("../scrapers/KitchenStoriesScraper"),
  kingarthurbaking: require("../scrapers/KingArthurBakingScraper"),
  loveandlemons: require("../scrapers/LoveAndLemonsScaper"),
  marthastewart: require("../scrapers/MarthaStewartScraper"),
  makingthymeforhealth: require("../scrapers/MakingThymeForHealthScraper"),
  melskitchencafe: require("../scrapers/MelsKitchenCafeScraper"),
  minimalistbaker: require("../scrapers/MinimalistBakerScraper"),
  myrecipes: require("../scrapers/MyRecipesScraper"),
  nomnompaleo: require("../scrapers/NomNomPaleoScraper"),
  omnivorescookbook: require("../scrapers/OmnivoresCookbookScraper"),
  pinchofyum: require("../scrapers/PinchOfYumScraper"),
  recipetineats: require("../scrapers/RecipeTinEatsScraper"),
  robyn: require("../scrapers/RobynRecipesScraper"),
  seriouseats: require("../scrapers/SeriousEatsScraper"),
  sallysbakingaddiction: require("../scrapers/SallysBakingAddictionScraper"),
  simplyrecipes: require("../scrapers/SimplyRecipesScraper"),
  smittenkitchen: require("../scrapers/SmittenKitchenScraper"),
  superiorfarms: require("../scrapers/SuperiorFarmsScraper"),
  tastesbetterfromscratch: require("../scrapers/TastesBetterFromScratchScraper"),
  tasteofhome: require("../scrapers/TasteOfHomeScraper"),
  thatlowcarblife: require("../scrapers/ThatLowCarbLifeScraper"),
  theblackpeppercorn: require("../scrapers/TheBlackPeppercornScraper"),
  thecafesucrefarine: require("../scrapers/TheCafeSucrefarineScraper"),
  thekitchn: require("../scrapers/TheKitchnScaper"),
  thepioneerwoman: require("../scrapers/ThePioneerWomanScraper"),
  therecipecritic: require("../scrapers/TheRecipeCriticScraper"),
  thereislifeafterwheat: require("../scrapers/ThereIsLifeAfterWheatScraper"),
  therealfoodrds: require("../scrapers/TheRealFoodDrsScraper"),
  thespruceeats: require("../scrapers/TheSpruceEatsScraper"),
  whatsgabycooking: require("../scrapers/WhatsGabyCookingScraper"),
  woolworths: require("../scrapers/WoolworthsScraper"),
  yummly: require("../scrapers/YummlyScraper"),
  jamieoliver: require("../scrapers/JamieOliverScraper"),
};

/**
 * A Factory that supplies an instance of a scraper based on a given URL
 */
class ScraperFactory {
  getScraper(url) {
    let parse = parseDomain(url);
    if (parse) {
      let domain = parse.domain;
      if (domains[domain] !== undefined) {
        return new domains[domain](url);
      } else {
        console.log(`Site not yet supported. Site's domain was: ${domain}`);
        throw new Error("Site not yet supported");
      }
    } else {
      throw new Error("Failed to parse domain");
    }
  }
}

module.exports = ScraperFactory;
