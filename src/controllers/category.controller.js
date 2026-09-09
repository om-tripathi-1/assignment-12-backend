import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {
        const newCategory = new Category({ name: name.trim(), description });

        await newCategory.save();

        return res.status(201).json({
            message: "Category created successfully",
            category: newCategory,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error: ", error });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            message: "Categories retrieved successfully",
            categories
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error: ", error });
    }
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        return res.status(200).json({
            message: "Category retrieved successfully",
            category
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error: ", error });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                ...(name !== undefined && { name: name.trim() }),
                ...(description !== undefined && { description }),
                ...(isActive !== undefined && { isActive })
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error: ", error })
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const delCategory = await Category.findByIdAndDelete(id);

        if (!delCategory) {
            return res.status(404).json({ message: "Category doesn't exist" })
        }

        return res.status(200).json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server error: ", error })
    }
}