import Cart from "../models/cart.models.js";
import Product from "../models/product.model.js";

const cartQuery = (userId) =>
  Cart.findOne({ userId }).populate(
    "items.productId",
    "name price originalPrice images",
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
  const { productId, quantity = 1 } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) cart = new Cart({ userId: req.user._id, items: [] });

    const item = cart.items.find(
      (cartItem) => cartItem.productId.toString() === productId,
    );
    if (item) item.quantity += amount;
    else cart.items.push({ productId, quantity: amount });

    await cart.save();
    res.status(200).json(await cartQuery(req.user._id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const amount = Number(quantity);
    if (!Number.isInteger(amount) || amount < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: req.user._id });
    const item = cart?.items.find(
      (cartItem) => cartItem.productId.toString() === req.params.productId,
    );
    if (!item) return res.status(404).json({ message: "Cart item not found" });

    item.quantity = amount;
    await cart.save();
    res.status(200).json(await cartQuery(req.user._id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart item not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId,
    );
    await cart.save();
    res.status(200).json(await cartQuery(req.user._id));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};