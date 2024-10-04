export default {
  ALLUSERS: (limit: number, skip: number) =>
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
  FILTERUSERS: (query: string) =>
    `https://dummyjson.com/users/search?q=${query}`,
};
