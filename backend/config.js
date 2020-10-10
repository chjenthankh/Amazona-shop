export default {
  MONGODB_URL:
  PORT: process.env.PORT || 5000,
    process.env.MONGODB_URL || "mongodb://localhost/react-shopping-cart-v2",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
};
