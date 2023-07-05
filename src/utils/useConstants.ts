const useConstants = (id?: string) => {
  const isDev = import.meta.env.MODE === "development";

  const URL = {
    DUMMY_DEV: "http://localhost:5173/coins.json",
    GET_ALL: "https://api.coinpaprika.com/v1/coins",
    GET_DETAIL: `https://api.coinpaprika.com/v1/coins/${id}`,
  };

  return {
    isDev,
    URL,
  };
};

export default useConstants;
