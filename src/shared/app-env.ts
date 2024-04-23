export const appEnv = {
  auth: {
    secret: process.env.JWT_SECRET,
  },
  node: {
    port: process.env.PORT,
  },
};
