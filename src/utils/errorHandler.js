const errorHandler = (error) => {
  return new Promise((resolve) => {
    if (error.response) {
      resolve(error.response.data.message);
    } else {
      resolve(error.message);
    }
  });
};

export default errorHandler;
