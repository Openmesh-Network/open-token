import { Address, Deployer } from "../web3webdeploy/types";
import { DeployOPENSettings, deployOPEN } from "./erc20/OPEN";

export interface OpenTokenDeploymentSettings {
  counterSettings: DeployOPENSettings;
  forceRedeploy?: boolean;
}

export interface OpenTokenDeployment {
  openToken: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: OpenTokenDeploymentSettings
): Promise<OpenTokenDeployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    return await deployer.loadDeployment({ deploymentName: "latest.json" });
  }

  const openToken = await deployOPEN(deployer, settings?.counterSettings ?? {});

  const deployment = {
    openToken: openToken,
  };
  await deployer.saveDeployment({
    deploymentName: "latest.json",
    deployment: deployment,
  });
  return deployment;
}
