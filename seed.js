import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import Category from "./src/models/category.model.js";
import Product from "./src/models/product.model.js";
import User from "./src/models/user.model.js";
import Review from "./src/models/reviews.model.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // --------------------------------------------------
        // 1. CLEAR EXISTING DATA
        // --------------------------------------------------

        await Review.deleteMany({});
        await Product.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({});

        console.log("Old data cleared");

        // --------------------------------------------------
        // 2. CREATE USERS
        // --------------------------------------------------

        const hashedPassword = await bcrypt.hash("password123", 10);

        const users = await User.insertMany([
            {
                name: "Om Tripathi",
                email: "om@example.com",
                password: hashedPassword,
                role: "user",
            },
            {
                name: "Rahul Sharma",
                email: "rahul@example.com",
                password: hashedPassword,
                role: "user",
            },
            {
                name: "Aman Verma",
                email: "aman@example.com",
                password: hashedPassword,
                role: "user",
            },
            {
                name: "Arjun Mehta",
                email: "arjun@example.com",
                password: hashedPassword,
                role: "user",
            },
            {
                name: "Rohan Singh",
                email: "rohan@example.com",
                password: hashedPassword,
                role: "user",
            },
        ]);

        console.log(`${users.length} users created`);

        // --------------------------------------------------
        // 3. CREATE CATEGORIES
        // --------------------------------------------------

        const categories = await Category.insertMany([
            {
                name: "Casual",
                description: "Comfortable and stylish clothing for everyday wear.",
                isActive: true,
            },
            {
                name: "Party",
                description:
                    "Trendy outfits designed for parties and special occasions.",
                isActive: true,
            },
            {
                name: "Gym",
                description:
                    "Comfortable and performance-focused gym and workout wear.",
                isActive: true,
            },
            {
                name: "Formal",
                description:
                    "Elegant clothing suitable for offices and formal occasions.",
                isActive: true,
            },
        ]);

        console.log(`${categories.length} categories created`);

        // --------------------------------------------------
        // CATEGORY IDS
        // --------------------------------------------------

        const casual = categories.find((cat) => cat.name === "Casual");
        const party = categories.find((cat) => cat.name === "Party");
        const gym = categories.find((cat) => cat.name === "Gym");
        const formal = categories.find((cat) => cat.name === "Formal");

        // --------------------------------------------------
        // 4. CREATE PRODUCTS
        // --------------------------------------------------

        const products = [
            // =========================
            // CASUAL
            // =========================

            {
                name: "Classic Cotton T-Shirt",
                description: "Soft cotton t-shirt perfect for everyday casual wear.",
                images: [
                    "/assets/new-arrivals-1.png",
                    "/assets/top-selling-1.png",
                ],
                variants: [
                    { size: "Small", quantity: 20 },
                    { size: "Medium", quantity: 30 },
                    { size: "Large", quantity: 25 },
                    { size: "X-large", quantity: 15 },
                ],
                price: 699,
                originalPrice: 999,
                category: casual._id,
            },

            {
                name: "Oversized Graphic T-Shirt",
                description: "Trendy oversized t-shirt with a modern graphic print.",
                images: [
                    "/assets/new-arrivals-2.png",
                    "/assets/top-selling-2.png",
                ],
                variants: [
                    { size: "Small", quantity: 15 },
                    { size: "Medium", quantity: 25 },
                    { size: "Large", quantity: 25 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 799,
                originalPrice: 1199,
                category: casual._id,
            },

            {
                name: "Slim Fit Denim Jeans",
                description: "Classic slim-fit denim jeans with a comfortable stretch.",
                images: [
                    "/assets/new-arrivals-3.png",
                    "/assets/top-selling-3.png",
                ],
                variants: [
                    { size: "Small", quantity: 10 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 1499,
                originalPrice: 1999,
                category: casual._id,
            },

            {
                name: "Casual Polo Shirt",
                description: "Classic polo shirt suitable for everyday outings.",
                images: ["/assets/new-arrivals-4.png", "/assets/top-selling-4.png"],
                variants: [
                    { size: "Small", quantity: 15 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 18 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 899,
                originalPrice: 1299,
                category: casual._id,
            },

            {
                name: "Relaxed Fit Cargo Pants",
                description: "Comfortable cargo pants with multiple utility pockets.",
                images: [
                    "/assets/new-arrivals-1.png",
                    "/assets/top-selling-1.png",
                ],
                variants: [
                    { size: "Small", quantity: 12 },
                    { size: "Medium", quantity: 22 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 1299,
                originalPrice: 1799,
                category: casual._id,
            },

            {
                name: "Everyday Hoodie",
                description: "Warm and comfortable hoodie for casual everyday use.",
                images: [
                    "/assets/new-arrivals-2.png",
                    "/assets/top-selling-2.png",
                ],
                variants: [
                    { size: "Small", quantity: 10 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 12 },
                ],
                price: 1199,
                originalPrice: 1699,
                category: casual._id,
            },

            {
                name: "Basic Full Sleeve T-Shirt",
                description: "Minimal full sleeve t-shirt for casual styling.",
                images: [
                    "/assets/new-arrivals-3.png",
                    "/assets/top-selling-3.png",
                ],
                variants: [
                    { size: "Small", quantity: 15 },
                    { size: "Medium", quantity: 25 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 749,
                originalPrice: 1099,
                category: casual._id,
            },

            {
                name: "Casual Linen Shirt",
                description: "Breathable linen shirt for relaxed summer outfits.",
                images: [
                    "/assets/new-arrivals-4.png",
                    "/assets/top-selling-4.png",
                ],
                variants: [
                    { size: "Small", quantity: 12 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 999,
                originalPrice: 1499,
                category: casual._id,
            },

            // =========================
            // PARTY
            // =========================

            {
                name: "Party Black Shirt",
                description: "Stylish black shirt designed for parties and nightlife.",
                images: [
                    "/assets/new-arrivals-1.png",
                    "/assets/top-selling-1.png",
                ],
                variants: [
                    { size: "Small", quantity: 10 },
                    { size: "Medium", quantity: 18 },
                    { size: "Large", quantity: 18 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 1199,
                originalPrice: 1699,
                category: party._id,
            },

            {
                name: "Sequin Party Shirt",
                description: "Eye-catching sequin shirt for parties and celebrations.",
                images: [
                    "/assets/new-arrivals-2.png",
                    "/assets/top-selling-2.png",
                ],
                variants: [
                    { size: "Small", quantity: 8 },
                    { size: "Medium", quantity: 15 },
                    { size: "Large", quantity: 15 },
                    { size: "X-large", quantity: 6 },
                ],
                price: 1799,
                originalPrice: 2499,
                category: party._id,
            },

            {
                name: "Party Blazer",
                description: "Contemporary blazer for evening parties and events.",
                images: [
                    "/assets/new-arrivals-3.png",
                    "/assets/top-selling-3.png",
                ],
                variants: [
                    { size: "Small", quantity: 8 },
                    { size: "Medium", quantity: 12 },
                    { size: "Large", quantity: 12 },
                    { size: "X-large", quantity: 6 },
                ],
                price: 2499,
                originalPrice: 3499,
                category: party._id,
            },

            {
                name: "Printed Party Shirt",
                description: "Bold printed shirt designed to stand out at parties.",
                images: [
                    "/assets/new-arrivals-4.png",
                    "/assets/top-selling-4.png",
                ],
                variants: [
                    { size: "Small", quantity: 10 },
                    { size: "Medium", quantity: 18 },
                    { size: "Large", quantity: 18 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 1099,
                originalPrice: 1599,
                category: party._id,
            },

            {
                name: "Party Trousers",
                description: "Smart trousers designed for evening events.",
                images: [
                    "/assets/new-arrivals-1.png",
                    "/assets/top-selling-1.png",
                ],
                variants: [
                    { size: "Small", quantity: 10 },
                    { size: "Medium", quantity: 18 },
                    { size: "Large", quantity: 15 },
                    { size: "X-large", quantity: 7 },
                ],
                price: 1399,
                originalPrice: 1999,
                category: party._id,
            },

            {
                name: "Velvet Party Jacket",
                description: "Premium velvet jacket for special occasions.",
                images: [
                    "/assets/new-arrivals-2.png",
                    "/assets/top-selling-2.png",
                ],
                variants: [
                    { size: "Small", quantity: 6 },
                    { size: "Medium", quantity: 12 },
                    { size: "Large", quantity: 10 },
                    { size: "X-large", quantity: 5 },
                ],
                price: 2299,
                originalPrice: 3199,
                category: party._id,
            },

            {
                name: "Party Printed T-Shirt",
                description: "Trendy printed t-shirt for casual parties.",
                images: [
                    "/assets/new-arrivals-3.png",
                    "/assets/top-selling-3.png",
                ],
                variants: [
                    { size: "Small", quantity: 15 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 18 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 899,
                originalPrice: 1299,
                category: party._id,
            },

            // =========================
            // GYM
            // =========================

            {
                name: "Performance Gym T-Shirt",
                description: "Breathable performance t-shirt for intense workouts.",
                images: [
                    "/assets/new-arrivals-4.png",
                    "/assets/top-selling-4.png",
                ],
                variants: [
                    { size: "Small", quantity: 20 },
                    { size: "Medium", quantity: 30 },
                    { size: "Large", quantity: 25 },
                    { size: "X-large", quantity: 15 },
                ],
                price: 799,
                originalPrice: 1099,
                category: gym._id,
            },

            {
                name: "Gym Joggers",
                description: "Flexible joggers designed for workouts and training.",
                images: [
                    "/assets/new-arrivals-1.png",
                    "/assets/top-selling-1.png",
                ],
                variants: [
                    { size: "Small", quantity: 15 },
                    { size: "Medium", quantity: 25 },
                    { size: "Large", quantity: 25 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 999,
                originalPrice: 1499,
                category: gym._id,
            },

            {
                name: "Training Shorts",
                description: "Lightweight training shorts for gym and running.",
                images: [
                    "/assets/new-arrivals-2.png",
                    "/assets/top-selling-2.png",
                ],
                variants: [
                    { size: "Small", quantity: 18 },
                    { size: "Medium", quantity: 25 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 599,
                originalPrice: 899,
                category: gym._id,
            },

            {
                name: "Gym Compression T-Shirt",
                description:
                    "Fitted compression t-shirt providing support during workouts.",
                images: [
                    "/assets/new-arrivals-3.png",
                    "/assets/top-selling-3.png",
                ],
                variants: [
                    { size: "Small", quantity: 12 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 899,
                originalPrice: 1299,
                category: gym._id,
            },

            {
                name: "Workout Tank Top",
                description:
                    "Lightweight tank top designed for high-intensity workouts.",
                images: ["/assets/new-arrivals-4.png", "/assets/top-selling-4.png"],
                variants: [
                    { size: "Small", quantity: 15 },
                    { size: "Medium", quantity: 25 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 649,
                originalPrice: 999,
                category: gym._id,
            },

            {
                name: "Athletic Track Pants",
                description:
                    "Comfortable track pants for training and outdoor workouts.",
                images: [
                    "/assets/new-arrivals-1.png",
                    "/assets/top-selling-1.png",
                ],
                variants: [
                    { size: "Small", quantity: 12 },
                    { size: "Medium", quantity: 22 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 1099,
                originalPrice: 1499,
                category: gym._id,
            },

            {
                name: "Workout Hoodie",
                description: "Lightweight hoodie for warm-ups and outdoor training.",
                images: [
                    "/assets/new-arrivals-2.png",
                    "/assets/top-selling-2.png",
                ],
                variants: [
                    { size: "Small", quantity: 10 },
                    { size: "Medium", quantity: 18 },
                    { size: "Large", quantity: 18 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 1299,
                originalPrice: 1799,
                category: gym._id,
            },

            // =========================
            // FORMAL
            // =========================

            {
                name: "Classic Formal Shirt",
                description: "Clean and elegant formal shirt for office wear.",
                images: [
                    "/assets/new-arrivals-3.png",
                    "/assets/top-selling-3.png",
                ],
                variants: [
                    { size: "Small", quantity: 15 },
                    { size: "Medium", quantity: 25 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 10 },
                ],
                price: 999,
                originalPrice: 1399,
                category: formal._id,
            },

            {
                name: "Slim Fit Formal Trousers",
                description:
                    "Modern slim-fit trousers suitable for office and formal events.",
                images: [
                    "/assets/new-arrivals-4.png",
                    "/assets/top-selling-4.png",
                ],
                variants: [
                    { size: "Small", quantity: 10 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 1299,
                originalPrice: 1799,
                category: formal._id,
            },

            {
                name: "Formal Blazer",
                description:
                    "Classic blazer designed for professional and formal occasions.",
                images: [
                    "/assets/new-arrivals-1.png",
                    "/assets/top-selling-1.png",
                ],
                variants: [
                    { size: "Small", quantity: 8 },
                    { size: "Medium", quantity: 15 },
                    { size: "Large", quantity: 15 },
                    { size: "X-large", quantity: 7 },
                ],
                price: 2799,
                originalPrice: 3999,
                category: formal._id,
            },

            {
                name: "Business Formal Shirt",
                description:
                    "Premium formal shirt designed for professional environments.",
                images: [
                    "/assets/new-arrivals-2.png",
                    "/assets/top-selling-2.png",
                ],
                variants: [
                    { size: "Small", quantity: 12 },
                    { size: "Medium", quantity: 22 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 1199,
                originalPrice: 1699,
                category: formal._id,
            },

            {
                name: "Formal Waistcoat",
                description: "Elegant waistcoat for formal and professional outfits.",
                images: [
                    "/assets/new-arrivals-3.png",
                    "/assets/top-selling-3.png",
                ],
                variants: [
                    { size: "Small", quantity: 8 },
                    { size: "Medium", quantity: 15 },
                    { size: "Large", quantity: 12 },
                    { size: "X-large", quantity: 6 },
                ],
                price: 1599,
                originalPrice: 2299,
                category: formal._id,
            },

            {
                name: "Formal Oxford Shirt",
                description: "Premium Oxford shirt for office and business occasions.",
                images: [
                    "/assets/new-arrivals-4.png",
                    "/assets/top-selling-4.png",
                ],
                variants: [
                    { size: "Small", quantity: 12 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 20 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 1099,
                originalPrice: 1599,
                category: formal._id,
            },

            {
                name: "Executive Formal Pants",
                description: "Premium formal trousers with a refined professional fit.",
                images: [
                    "/assets/new-arrivals-1.png",
                    "/assets/top-selling-1.png",
                ],
                variants: [
                    { size: "Small", quantity: 10 },
                    { size: "Medium", quantity: 20 },
                    { size: "Large", quantity: 18 },
                    { size: "X-large", quantity: 8 },
                ],
                price: 1499,
                originalPrice: 2099,
                category: formal._id,
            },

            {
                name: "Premium Formal Suit",
                description: "Complete premium formal look for important occasions.",
                images: [
                    "/assets/new-arrivals-2.png",
                    "/assets/top-selling-2.png",
                ],
                variants: [
                    { size: "Small", quantity: 5 },
                    { size: "Medium", quantity: 10 },
                    { size: "Large", quantity: 10 },
                    { size: "X-large", quantity: 5 },
                ],
                price: 4999,
                originalPrice: 6999,
                category: formal._id,
            },
        ];

        const createdProducts = await Product.insertMany(products);

        console.log(`${createdProducts.length} products created`);

        // --------------------------------------------------
        // 5. CREATE REVIEWS
        // --------------------------------------------------

        const reviewComments = [
            "Really good quality. Very happy with the purchase.",
            "The fit is perfect and the material feels great.",
            "Looks exactly like the pictures. Would recommend.",
            "Good product for the price.",
            "The quality exceeded my expectations.",
            "Very comfortable and stylish.",
            "The fitting could be slightly better, but overall good.",
            "Really liked the material and finishing.",
            "Been using it for a while and the quality is still great.",
            "Definitely worth the money.",
            "The product looks premium in person.",
            "Comfortable fit and good overall quality.",
            "Nice product. Delivery was also quick.",
            "I really liked the design and fitting.",
            "Good quality product for everyday use.",
        ];

        // --------------------------------------------------
        // PRODUCT-SPECIFIC REVIEW COMMENTS
        // --------------------------------------------------

        const productComments = {
            "Classic Cotton T-Shirt": [
                "The cotton is really soft and comfortable.",
                "Great everyday t-shirt. The fit is perfect.",
                "Very comfortable for regular use.",
                "The fabric quality is better than expected.",
                "Nice basic t-shirt at a good price.",
            ],

            "Slim Fit Denim Jeans": [
                "The jeans fit really well around the waist.",
                "Denim quality is excellent.",
                "Comfortable jeans with a great fit.",
                "The slim fit looks really good.",
                "Very happy with the quality and fitting.",
            ],

            "Performance Gym T-Shirt": [
                "Excellent for workouts. The fabric is breathable.",
                "Very lightweight and comfortable during training.",
                "The material handles sweat really well.",
                "Great gym t-shirt for the price.",
                "Perfect fit for workouts.",
            ],

            "Gym Joggers": [
                "Very comfortable for workouts.",
                "The material is lightweight and flexible.",
                "Great fitting and comfortable waistband.",
                "I use these for running and gym sessions.",
                "Good quality joggers.",
            ],

            "Classic Formal Shirt": [
                "Looks very professional and fits perfectly.",
                "Great shirt for office wear.",
                "The fabric feels premium.",
                "Very comfortable for long office hours.",
                "Good formal shirt at this price.",
            ],

            "Formal Blazer": [
                "The blazer looks very premium.",
                "Great fitting and excellent finishing.",
                "Perfect for formal occasions.",
                "The material feels really good.",
                "Very happy with this purchase.",
            ],

            "Party Black Shirt": [
                "Perfect shirt for evening parties.",
                "The black color looks really classy.",
                "Great fit and stylish design.",
                "Material feels premium.",
                "Got several compliments wearing this.",
            ],

            "Party Blazer": [
                "Looks excellent for parties and events.",
                "The fitting is really good.",
                "Very stylish blazer.",
                "Premium look at a reasonable price.",
                "Really happy with the quality.",
            ],
        };

        // --------------------------------------------------
        // GENERATE REVIEWS
        // --------------------------------------------------

        const reviews = [];

        createdProducts.forEach((product, productIndex) => {
            // 5 reviews for every product
            for (let i = 0; i < 5; i++) {
                // Rotate through the 5 users
                const user = users[(productIndex + i) % users.length];

                // Use product-specific comments if available
                let comment;

                if (productComments[product.name]) {
                    comment = productComments[product.name][i];
                } else {
                    comment =
                        reviewComments[(productIndex * 5 + i) % reviewComments.length];
                }

                // Slightly different ratings
                const ratings = [5, 4, 5, 4, 5];

                reviews.push({
                    user: user._id,
                    product: product._id,
                    rating: ratings[i],
                    comment,
                });
            }
        });

        await Review.insertMany(reviews);

        console.log(`${reviews.length} reviews created`);

        console.log("=================================");
        console.log("DATABASE SEEDED SUCCESSFULLY");
        console.log("=================================");

        console.log(`Users: ${users.length}`);
        console.log(`Categories: ${categories.length}`);
        console.log(`Products: ${createdProducts.length}`);
        console.log(`Reviews: ${reviews.length}`);

        process.exit(0);
    } catch (error) {
        console.error("SEED ERROR:", error);
        process.exit(1);
    }
};

seedDatabase();
