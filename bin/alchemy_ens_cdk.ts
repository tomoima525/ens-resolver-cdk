#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { AlchemyEnsCdkStack } from "../lib/alchemy_ens_cdk-stack";

dotenv.config();
const app = new cdk.App();
new AlchemyEnsCdkStack(app, "AlchemyNotifyCdkStack", {
  env: { account: "101567964829", region: "us-west-2" },
});
