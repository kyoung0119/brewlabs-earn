// eslint-disable-next-line camelcase
import { ChainId } from "@brewlabs/sdk";
import useSWR, { useSWRConfig, unstable_serialize } from "swr";
import useSWRImmutable from "swr/immutable";

import { FAST_INTERVAL, SECOND_INTERVAL, SLOW_INTERVAL } from "config/constants";
import { useActiveChainId } from "hooks/useActiveChainId";
import { useProvider } from "utils/wagmi";

const REFRESH_BLOCK_INTERVAL = 6000;

export const usePollBlockNumber = () => {
  const { cache, mutate } = useSWRConfig();
  const { chainId } = useActiveChainId();
  const provider = useProvider({ chainId });

  const { data } = useSWR(
    ["blockNumberFetcher", chainId],
    async () => {
      const blockNumber = await provider.getBlockNumber();
      mutate(["blockNumber", chainId], blockNumber);
      if (!cache.get(unstable_serialize(["initialBlockNumber", chainId]))) {
        mutate(["initialBlockNumber", chainId], blockNumber);
      }
      return blockNumber;
    },
    {
      refreshInterval: REFRESH_BLOCK_INTERVAL,
    }
  );

  useSWR(
    [FAST_INTERVAL, "blockNumber", chainId],
    async () => {
      return data;
    },
    {
      refreshInterval: FAST_INTERVAL,
    }
  );

  useSWR(
    [SECOND_INTERVAL, "blockNumber", chainId],
    async () => {
      return data;
    },
    {
      refreshInterval: SECOND_INTERVAL,
    }
  );

  useSWR(
    [SLOW_INTERVAL, "blockNumber", chainId],
    async () => {
      return data;
    },
    {
      refreshInterval: SLOW_INTERVAL,
    }
  );
};

export const useCurrentBlock = (): number => {
  const { chainId } = useActiveChainId();
  const { data: currentBlock = 0 } = useSWRImmutable(["blockNumber", chainId]);
  return currentBlock;
};

export const useChainCurrentBlock = (chainId: number): number => {
  const { chainId: activeChainId } = useActiveChainId();
  const provider = useProvider({ chainId });
  const { data: currentBlock = 0 } = useSWR(
    activeChainId === chainId ? ["blockNumber", chainId] : ["chainBlockNumber", chainId],
    async () => {
      const blockNumber = await provider.getBlockNumber();
      return blockNumber;
    },
    activeChainId !== chainId
      ? {
          refreshInterval: REFRESH_BLOCK_INTERVAL,
        }
      : undefined
  );
  return currentBlock;
};

export const useChainCurrentBlocks = () => {
  let blocks = {};
  blocks[ChainId.ETHEREUM] = useChainCurrentBlock(ChainId.ETHEREUM);
  blocks[ChainId.BSC_MAINNET] = useChainCurrentBlock(ChainId.BSC_MAINNET);
  blocks[ChainId.POLYGON] = useChainCurrentBlock(ChainId.POLYGON);
  blocks[ChainId.AVALANCHE] = useChainCurrentBlock(ChainId.AVALANCHE);
  blocks[ChainId.ARBITRUM] = useChainCurrentBlock(ChainId.ARBITRUM);
  return blocks;
};

export const useInitialBlock = (): number => {
  const { chainId } = useActiveChainId();
  const { data: initialBlock = 0 } = useSWRImmutable(["initialBlockNumber", chainId]);
  return initialBlock;
};
