import express from "express";
import * as path from "path";
import { getEns } from "./resolve-ens";
import { ethers } from "ethers";

const PORT = 80;
const alchemyToken = process.env.ALCHEMY_TOKEN as string;
const webhookId = process.env.WEBHOOK_ID as string;
// start the express server with the appropriate routes for our webhook and web requests
const app = express()
  .use(express.static(path.join(__dirname, "public")))
  .use(express.json())
  .get("/health", (req, res) => {
    res.status(200).send({
      message: `Hello from AWS AppRunner service running!`,
    });
  })
  .get("/ens", async (req, res) => {
    const address = req.query.address as string;
    let result = "Success";
    if (!address) {
      result = "No address input";
      res.status(400).send({ nfts: [], result });
    }
    let checksumAddress: string = "";
    try {
      checksumAddress = ethers.utils.getAddress(address);
    } catch (error) {
      result = "Invalid address";
      res.status(400).send({ nfts: [], result });
    }

    const nfts = await getEns(checksumAddress);
    const ens = nfts.ownedNfts?.map((nft) => nft.title);
    res.status(200).send({ ens, result });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
