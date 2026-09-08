import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    const { name, price, originalPrice, category } = req.body;
    try {
        // console.log(req.body);
        // console.log(req.files);

        const images = req.files.map((file) => ({
            filename: file.filename,
            path: file.path,
        }));

        const product = new Product({
            name, price, originalPrice, category, images,
        });

        await product.save();

        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllProducts = async (req, res, next) => {
    try {
        const {
            search,
            category,
            minPrice,
            maxPrice,
            availability,
            stock,
            sort,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        // Search by product name
        if (search) {
            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by category
        if (category) {
            query.category = category;
        }

        // Filter by price range
        if (minPrice !== undefined || maxPrice !== undefined) {
            query.price = {};

            if (minPrice !== undefined && minPrice !== "") {
                query.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined && maxPrice !== "") {
                query.price.$lte = Number(maxPrice);
            }
        }

        // Filter by stock
        const rawStock = stock || availability;

        if (rawStock !== undefined && rawStock !== "") {
            const stockVal = rawStock.toString().toLowerCase().trim();

            if (
                stockVal === "in_stock" ||
                stockVal === "in-stock" ||
                stockVal === "instock" ||
                stockVal === "in stock"
            ) {
                query.quantity = { $gt: 5 };

            } else if (
                stockVal === "low_stock" ||
                stockVal === "low-stock" ||
                stockVal === "lowstock" ||
                stockVal === "low stock"
            ) {
                query.quantity = {
                    $gt: 0,
                    $lte: 5
                };

            } else if (
                stockVal === "out_of_stock" ||
                stockVal === "out-of-stock" ||
                stockVal === "outofstock" ||
                stockVal === "out of stock" ||
                stockVal === "false"
            ) {
                query.quantity = 0;

            } else if (stockVal === "true") {
                query.quantity = { $gt: 0 };
            }
        }

        // Sorting
        let sortOptions = { createdAt: -1 };

        if (sort === "price_asc") {
            sortOptions = { price: 1 };
        } else if (sort === "price_desc") {
            sortOptions = { price: -1 };
        } else if (sort === "newest") {
            sortOptions = { createdAt: -1 };
        } else if (sort === "name") {
            sortOptions = { name: 1 };
        }

        // Pagination
        const pageNum = Math.max(
            1,
            parseInt(page, 10) || 1
        );

        const limitNum = Math.max(
            1,
            parseInt(limit, 10) || 10
        );

        const skip = (pageNum - 1) * limitNum;

        // Get total products
        const totalProducts = await countProductsRepo(query);

        // Calculate total pages
        const totalPages = Math.ceil(
            totalProducts / limitNum
        );

        // Get products
        const products = await findProductsRepo(
            query,
            sortOptions,
            skip,
            limitNum
        );

        res.status(200).json({
            success: true,
            products,
            currentPage: pageNum,
            totalPages,
            totalProducts
        });

    } catch (error) {
        return next(error);
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// export const getProductsByCategory = async (req, res) => {
//     try {
//         const products = await Product.find({ category: req.params.categoryId }).populate("category");
//         if (!products) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Products not found",
//             });
//         }
//         res.status(200).json({
//             success: true,
//             products,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });
//     }
// };

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const filterProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice } = req.query;
        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        const products = await Product.find(filter).populate("category");
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const countProductsRepo = async (query) => {
    return await Product.countDocuments(query);
};
 
export const findProductsRepo = async (query, sortOptions, skip, limit) => {
    return await Product.find(query)
        .populate("category", "name")
        .sort(sortOptions)
        .skip(skip)
        .limit(limit);
};
 