//Обрезать строку до limit кол-ва символов (без учёта пробелов)
export const useTrimLine = (str, limit) => str.length - 1 > limit ? `${str.slice(0, limit - 1).trim()}...`: str;

