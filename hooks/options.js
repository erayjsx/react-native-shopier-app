const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const options = {
  headers: {
    accept: "application/json",
    authorization: `Bearer ${API_KEY}`,
  },
};
