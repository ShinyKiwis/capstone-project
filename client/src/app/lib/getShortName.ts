export const getShortUserName = (username: string) => {
  return username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(-2)
    .join("");
};

