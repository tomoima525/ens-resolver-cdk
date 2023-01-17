import * as path from "path";
import { Construct } from "constructs";
import * as apprunner from "@aws-cdk/aws-apprunner-alpha";
import * as assets from "aws-cdk-lib/aws-ecr-assets";
import { CfnOutput } from "aws-cdk-lib";

export class AppRunner extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // create a Service from local docker image asset directory built and pushed to Amazon ECR:
    const asset = new assets.DockerImageAsset(this, "ImageAssets", {
      directory: path.join(__dirname, "../app"),
      platform: assets.Platform.LINUX_AMD64,
    });

    const ALCHEMY_TOKEN = process.env.ALCHEMY_TOKEN as string;
    console.log({ ALCHEMY_TOKEN });
    const appRunnerService = new apprunner.Service(this, "Service", {
      serviceName: "ens",
      source: apprunner.Source.fromAsset({
        imageConfiguration: {
          port: 80,
          environment: {
            ALCHEMY_TOKEN,
          },
        },
        asset,
      }),
    });

    new CfnOutput(this, "AppRunnerServiceARN", {
      value: appRunnerService.serviceArn,
    });
    new CfnOutput(this, "AppRunnerServiceURL", {
      value: `https://${appRunnerService.serviceUrl}`,
    });
  }
}
