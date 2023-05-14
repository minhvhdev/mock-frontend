export const mockApi = (data) => {
  return new Promise((res) =>
    setTimeout(() => {
      return res({
        status: 200,
        data
      });
    }, 200)
  );
};

export const genId = () => {
  return new Date().getTime();
};
