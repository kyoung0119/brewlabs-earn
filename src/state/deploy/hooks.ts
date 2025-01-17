import { useEffect } from "react";
import { useSelector } from "react-redux";

import contracts from "config/constants/contracts";
import { PAGE_SUPPORTED_CHAINS } from "config/constants/networks";
import { useAppDispatch } from "state";
import { State } from "state/types";

import {
  fetchFarmFactoryDataAsync,
  fetchIndexFactoryDataAsync,
  fetchPoolFactoryDataAsync,
  fetchTokenFactoryDataAsync,
} from ".";

export const usePollTokenFactoryData = () => {
  const dispatch = useAppDispatch();

  const supportedChains = PAGE_SUPPORTED_CHAINS["deploy-token"].filter((chainId) =>
    Object.keys(contracts.tokenFactory)
      .map((c) => +c)
      .includes(chainId)
  );

  useEffect(() => {
    supportedChains.forEach((chainId) => dispatch(fetchTokenFactoryDataAsync(chainId)));
  }, [dispatch, supportedChains]);
};

export const usePollFarmFactoryData = () => {
  const dispatch = useAppDispatch();

  const supportedChains = PAGE_SUPPORTED_CHAINS["deploy-farm"].filter((chainId) =>
    Object.keys(contracts.farmFactory)
      .map((c) => +c)
      .includes(chainId)
  );

  useEffect(() => {
    supportedChains.forEach((chainId) => dispatch(fetchFarmFactoryDataAsync(chainId)));
  }, [dispatch, supportedChains]);
};

export const usePollPoolFactoryData = () => {
  const dispatch = useAppDispatch();

  const supportedChains = PAGE_SUPPORTED_CHAINS["deploy-pool"].filter((chainId) =>
    Object.keys(contracts.poolFactory)
      .map((c) => +c)
      .includes(chainId)
  );

  useEffect(() => {
    supportedChains.forEach((chainId) => dispatch(fetchPoolFactoryDataAsync(chainId)));
  }, [dispatch, supportedChains]);
};

export const usePollIndexFactoryData = () => {
  const dispatch = useAppDispatch();

  const supportedChains = PAGE_SUPPORTED_CHAINS["deploy-index"].filter((chainId) =>
    Object.keys(contracts.indexFactory)
      .map((c) => +c)
      .includes(chainId)
  );

  useEffect(() => {
    supportedChains.forEach((chainId) => dispatch(fetchIndexFactoryDataAsync(chainId)));
  }, [dispatch, supportedChains]);
};

export const useFarmFactory = (chainId) =>
  useSelector((state: State) => state.deploy.farm.find((data) => data.chainId === chainId));

export const usePoolFactoryState = (chainId) =>
  useSelector((state: State) => state.deploy.poolFactory.find((data) => data.chainId === chainId));

export const useIndexFactory = (chainId) =>
  useSelector((state: State) => state.deploy.indexes.find((data) => data.chainId === chainId));

export const useTokenFactory = (chainId) =>
  useSelector((state: State) => state.deploy.token.find((data) => data.chainId === chainId));
