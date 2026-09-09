import Cart from "../models/cart.models.js";
import Product from "../models/product.model.js";

const cartQuery = (userId) =>
  Cart.findOne({ userId }).populate(
    "items.productId",
    "name price originalPrice images variants",
  );

export const getCart = async (req, res) => {
  try {
    const cart = await cartQuery(req.user._id);
    res.status(200).json(cart || { userId: req.user._id, items: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCartItem = async (req, res) => {
  const { productId, quantity = 1, size = "Standard" } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const selectedSize = String(size || "Standard").trim();
    const variant = product.variants?.find(
      (productVariant) => productVariant.size === selectedSize,
    );
    if (product.variants?.length && !variant) {
      return res.status(400).json({ message: "Please select a valid size" });
    }
    if (variant && variant.quantity < amount) {
      return res.status(400).json({
        message: `${selectedSize} has only ${variant.quantity} item(s) available`,
      });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

    const item = cart.items.find(
      (cartItem) =>
        cartItem.productId.toString() === productId &&
        (cartItem.size || "Standard") === selectedSize,
    );
    if (item) {
      if (variant && variant.quantity < item.quantity + amount) {
        return res.status(400).json({
          message: `${selectedSize} has only ${variant.quantity} item(s) available`,
        });
      }
      item.quantity += amount;
    } else cart.items.push({ productId, size: selectedSize, quantity: amount });

    await cart.save();
    res.status(200).json(await cartQuery(req.user._id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const selectedSize = String(req.query.size || "Standard").trim();

  try {
    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    const item = cart?.items.find(
      (cartItem) =>
        cartItem.productId.toString() === req.params.productId &&
        (cartItem.size || "Standard") === selectedSize,
    );
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    const product = await Product.findById(req.params.productId).select("variants");
    const variant = product?.variants?.find(
      (productVariant) => productVariant.size === selectedSize,
    );
    if (product?.variants?.length && (!variant || variant.quantity < amount)) {
      return res.status(400).json({
        message: `${selectedSize} does not have enough stock`,
      });
    }

    item.quantity = amount;
    await cart.save();
    res.status(200).json(await cartQuery(req.user._id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  const selectedSize = String(req.query.size || "Standard").trim();
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart item not found" });

    cart.items = cart.items.filter(
      (item) =>
        item.productId.toString() !== req.params.productId ||
        (item.size || "Standard") !== selectedSize,
    );
    await cart.save();
    res.status(200).json(await cartQuery(req.user._id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};