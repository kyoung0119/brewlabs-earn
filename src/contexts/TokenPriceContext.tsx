import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, GURU_API_KEY } from "config/constants";
import { useSlowRefreshEffect } from "hooks/useRefreshEffect";
import { useActiveChainId } from "hooks/useActiveChainId";

const TokenPriceContext = React.createContext({
  prices: {} as { [key: string]: number },
  cgprices: {} as { [key: number]: any },
  tokenPrices: {} as { [key: string]: number },
  lpPrices: {} as { [key: string]: number },
  ethPrice: 0,
});

const WETH_ADDR: any = {
  1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  56: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
};

const TokenPriceContextProvider = ({ children }: any) => {
  const [prices, setPrices] = useState({});
  const [cgprices, setCGPrices] = useState({});
  const [tokenPrices, setTokenPrices] = useState({});
  const [lpPrices, setLPPrices] = useState({});
  const [ethPrice, setETHPrice] = useState(0);

  const { chainId } = useActiveChainId();

  useSlowRefreshEffect(() => {
    const to = Math.floor(Date.now() / 1000);
    axios
      .get(
        `https://api.nodes-brewlabs.info/guru?symbol=0x6aac56305825f712fd44599e59f2ede51d42c3e7-bsc_USD&resolution=10&from=${
          to - 3600 * 24
        }&to=${to}`
      )
      .then((result) => setPrices({ brewlabs: { usd: result.data.c[result.data.c.length - 1] } }))
      .catch((e) => console.log(e));
  }, []);

  useSlowRefreshEffect(() => {
    axios
      .get(`${API_URL}/prices`)
      .then((res) => {
        if (res.data?.tokenPrices) setTokenPrices(res.data.tokenPrices);
        if (res.data?.lpPrices) setLPPrices(res.data.lpPrices);
      })
      .catch((e) => console.log(e));
  }, []);

  useSlowRefreshEffect(() => {
    axios
      .get(`${API_URL}/cg/prices`)
      .then((res) => {
        if (res.data) {
          let data = {};
          for (let i = 0; i < res.data.length; i++) {
            data[+res.data[i].chainId] = res.data[i].prices;
          }
          setCGPrices(data);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  useSlowRefreshEffect(() => {
    const to = Math.floor(Date.now() / 1000);
    axios
      .get(
        `https://api.nodes-brewlabs.info/guru?symbol=${WETH_ADDR[chainId]}-${
          chainId === 56 ? "bsc" : "eth"
        }_USD&resolution=10&from=${to - 3600 * 24}&to=${to}`
      )
      .then((result) => setETHPrice(result.data.c[result.data.c.length - 1]))
      .catch((e) => console.log(e));
  }, []);
  return (
    <TokenPriceContext.Provider value={{ prices, cgprices, tokenPrices, lpPrices, ethPrice }}>
      {children}
    </TokenPriceContext.Provider>
  );
};

export { TokenPriceContext, TokenPriceContextProvider };
