import { ChainId, NATIVE_CURRENCIES } from "@brewlabs/sdk";
import { utils } from "ethers";
import { Connector } from "wagmi";

import { bridgeConfigs } from "config/constants/bridge";
import { AugmentedChainId, CHAIN_LABELS, SupportedChains } from "config/constants/networks";
import { BridgeToken } from "config/constants/types";
import { bsc } from "contexts/wagmi";

const IMPOSSIBLE_ERROR = "Unable to perform the operation. Reload the application and try again.";

const TRANSACTION_REPLACED_ERROR =
  "Transaction was replaced by another. Reload the application and find the transaction in the history page.";

export const handleWalletError = (error: any, showError: (msg: string) => void, nativeSymbol: string = "BNB") => {
  if (error?.message && error?.message.length <= 120) {
    if (error?.data?.message?.includes("insufficient")) {
      showError(`Not enough ${nativeSymbol}`);
    } else {
      showError(error?.data?.message ?? error.message);
    }
  } else if (error?.message && error?.message.toLowerCase().includes("transaction was replaced")) {
    showError(TRANSACTION_REPLACED_ERROR);
  } else if (error?.data?.message) {
    showError(error?.data?.message);
  } else if (error?.message && error?.message.length > 120) {
    if (error.reason) {
      showError(
        error.reason.split(":").splice(-1)[0].replace("sending a transaction requires a signer", "No wallet connected")
      );
    } else {
      if (error.message.indexOf("TransactionExecutionError")) {
        showError(error.message.split(":")[1]);
      } else if (error.message.indexOf("reverted with the following reason") > 0) {
        showError(error.message.split("\n")[1]);
      } else {
        showError(
          error.message.split("(")[0].replace("sending a transaction requires a signer", "No wallet connected")
        );
      }
    }
  } else {
    showError(IMPOSSIBLE_ERROR);
  }
};

export const getNetworkLabel = (chainId: ChainId) => {
  return CHAIN_LABELS[chainId] ?? "No Network Selected";
};

export const getNativeSymbol = (chainId: AugmentedChainId) => {
  return SupportedChains.find((n) => n.id === chainId) ? NATIVE_CURRENCIES[chainId].symbol : bsc.nativeCurrency.symbol;
};

export const getExplorerLink = (chainId: ChainId, type: string, addressOrHash: string) => {
  const explorerUrl = (SupportedChains.find((c) => c.id === chainId) ?? bsc).blockExplorers?.default.url;

  switch (type) {
    case "address":
      return `${explorerUrl}/address/${addressOrHash}`;
    case "token":
      return `${explorerUrl}/token/${addressOrHash}`;
    case "transaction":
      return `${explorerUrl}/tx/${addressOrHash}`;
    default:
      return explorerUrl;
  }
};

export const getMediatorAddress = (bridgeDirectionId: number, chainId: ChainId) => {
  const { homeChainId, homeMediatorAddress, foreignMediatorAddress } =
    bridgeConfigs.find((direction) => direction.bridgeDirectionId === bridgeDirectionId) ?? bridgeConfigs[0];
  return homeChainId === chainId ? homeMediatorAddress.toLowerCase() : foreignMediatorAddress.toLowerCase();
};

export const addTokenToMetamask = async (conector: Connector, { address, symbol, decimals }: BridgeToken) => {
  if (address && symbol && conector?.watchAsset) {
    await conector.watchAsset({ address, symbol, decimals });
  }
};

// eslint-disable-next-line no-promise-executor-return
export const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const withTimeout = (ms: number, promise: any) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("timed out"));
    }, ms);

    promise
      .then((value: any) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error: any) => {
        clearTimeout(timer);
        reject(error);
      });
  });

export const formatValue = (num: any, dec: any) => {
  const str = utils.formatUnits(num, dec);
  const splitStr = str.split(".");
  const beforeDecimal = splitStr[0];
  const afterDecimal = `${(splitStr[1] ?? "").slice(0, 4)}0000`;

  const finalNum = Number(`${beforeDecimal}.${afterDecimal}`);

  return finalNum.toLocaleString("en-US", {
    maximumFractionDigits: 4,
    minimumFractionDigits: 1,
  });
};
