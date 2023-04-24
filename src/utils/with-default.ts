type DefaultableObject<T extends Record<string, any>> = T & {
  DEFAULT?: string;
};

function withDefault<T extends Record<string, any>>(
  obj: T,
  defaultValue: string
): DefaultableObject<T> {
  return {
    ...obj,
    DEFAULT: defaultValue,
  };
}

export { withDefault, DefaultableObject };
