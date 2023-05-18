export const mockApi = (data) => {
  return new Promise((res) =>
    setTimeout(() => {
      return res({
        status: 200,
        data
      });
    }, 500)
  );
};

export const genId = () => {
  return new Date().getTime();
};

export const commaMoneyAmount = (amount) => {
  const result = '' + amount;
  if (result.length > 3) {
    const mod = result.length % 3;
    let output = mod > 0 ? result.substring(0, mod) : '';
    for (let i = 0; i < Math.floor(result.length / 3); i++) {
      if (mod === 0 && i === 0) output += result.substring(mod + 3 * i, mod + 3 * i + 3);
      else output += '.' + result.substring(mod + 3 * i, mod + 3 * i + 3);
    }
    return output;
  } else return result;
};
