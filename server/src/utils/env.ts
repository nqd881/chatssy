export const getEnvFilePath = () => {
  const ENV = process.env.NODE_ENV;
  return `src/env/.${ENV}.env`;
};

export const isInProd = () => process.env.NODE_ENV === 'prod';

export const isInDev = () => process.env.NODE_ENV === 'dev';
