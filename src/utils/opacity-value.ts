type OpacityConfig = {
  opacityValue?: number;
};

function withOpacityValue(variable: string): (config: OpacityConfig) => string {
  return ({ opacityValue }: OpacityConfig) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

export { OpacityConfig, withOpacityValue };
