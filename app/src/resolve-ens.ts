import { Alchemy, Network } from "alchemy-sdk";
const alchemyToken = process.env.ALCHEMY_TOKEN as string;
const config = {
  apiKey: alchemyToken,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);
const ensContractAddress = "0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85";

export const getEns = async (address: string) => {
  const nfts = await alchemy.nft.getNftsForOwner(address, {
    contractAddresses: [ensContractAddress],
  });
  return nfts;
};
