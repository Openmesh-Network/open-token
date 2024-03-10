import { Address, DeployInfo, Deployer } from "../web3webdeploy/types";

export interface OpenTokenDeploymentSettings
  extends Omit<DeployInfo, "contract" | "args"> {}

export interface OpenTokenDeployment {
  openToken: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: OpenTokenDeploymentSettings
): Promise<OpenTokenDeployment> {
  const openToken = await deployer.deploy({
    contract: "OPEN",
    ...settings,
  });

  const deployment = {
    openToken: openToken,
  };
  await deployer.saveDeployment({
    deploymentName: "latest.json",
    deployment: deployment,
  });
  return deployment;
}
