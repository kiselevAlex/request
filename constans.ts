/* global _RUNTIME_ENV_ */
import getConfig from 'next/config';

const isServer = () => typeof window === 'undefined';

// @ts-ignore
const defaultEnv = isServer() ? {} : _RUNTIME_ENV_; 

const { publicRuntimeConfig = defaultEnv } = getConfig() || {};

export const TEST = publicRuntimeConfig.TEST;
