export interface Product {
  product_code: number;
  product_name: string;
  product_ingredients: string;
  product_nutrition_info: string;
  created_at: string;
  price: number;
  category: string;
  image?: string;
  quantity?: number;
}

export interface ProductCategory {
  category: string;
  items: Product[];
}
const dummyProducts: ProductCategory[] = [
  {
    category: 'Keto Food',
    items: [
      {
        product_code: 1,
        product_name: "Cauliflower Fried Rice",
        product_ingredients: "2BKNF4F",
        product_nutrition_info: "Fried rice is a classic and comforting recipe that everyone loves…except maybe those who are trying to eat less rice. Whether you’re skipping carbs, trying to eat more vegetables, or are just looking for a lighter side dish so you can eat more orange chicken (relatable!), this cauliflower fried rice is for you.",
        created_at: "16/12/2024",
        price: 2.99,
        category: 'Keto Food',
        image: "../../../assets/cauliflower.png"
      },
      {
        product_code: 2,
        product_name: "Philly Cheesesteak Lettuce Wraps",
        product_ingredients: "2BKNF4F",
        product_nutrition_info: "You won't miss the hoagie in these low-carb Philly Cheesesteak lettuce wraps. Yes, they're made with provolone—NOT Cheez Whiz. And before you get all riled up, no, they're not in any way authentic. We'll be the first to admit it!",
        created_at: "16/12/2024",
        price: 12.99,
        category: 'Keto Food',
        image: "../../../assets/philly-cheesesteak-lettuce-wraps.png"
      },
    ]
  },
  {
    category: 'Smoothie',
    items: [
      {
        product_code: 3,
        product_name: "Tropical Oatmeal Smoothie",
        product_ingredients: "2B7M8MJ",
        product_nutrition_info: "This tropical-inspired smoothie is packed with fiber (6 grams per serving), thanks to the fruit and the clever addition of rolled oats.",
        created_at: "16/12/2024",
        price: 5.99,
        category: 'Smoothie',
        image: "../../../assets/Tropical_OatmealSmoothie.png"
      },
      {
        product_code: 4,
        product_name: "Cherry-Almond Smoothie",
        product_ingredients: "DH3K9Y",
        product_nutrition_info: "Blitz banana, cherries and yogurt with almond milk for a filling breakfast you'll make again and again.",
        created_at: "16/12/2024",
        price: 7.99,
        category: 'Smoothie',
        image: "../../../assets/Cherry_Almond_Smoothie.png"
      }]
  },
  {
    category: 'Vegan',
    items: [
      {
        product_code: 5,
        product_name: "Creamy Broccoli Vegan Pasta",
        product_ingredients: "D75FAJ",
        product_nutrition_info: "This luscious creamy vegan pasta will give any traditional mac and cheese a run for its money. Instead of containing dairy, the smooth, tangy sauce is a protein-packed blend of white beans, nutritional yeast, and lemon juice.",
        created_at: "16/12/2024",
        price: 12.99,
        category: 'Vegan',
        image: "../../../assets/Creamy_Broccoli_Vegan_Pasta.jpg"
      },
      {
        product_code: 6,
        product_name: "Butternut Squash Stuffed Shells",
        product_ingredients: "JTC78R",
        product_nutrition_info: "This recipe is an all-time Love and Lemons fan favorite, and for good reason. Even the biggest cheese lovers will fall for its bright, creamy spinach “ricotta,” caramelized cubes of butternut squash, and rich cashew cream sauce.",
        created_at: "16/12/2024",
        price: 9.99,
        category: 'Vegan',
        image: "../../../assets/Butternut_Squash_Stuffed_Shells.jpg"
      }
    ]
  }
];



export function getDummyProducts(): ProductCategory[] {
  return dummyProducts;
}
