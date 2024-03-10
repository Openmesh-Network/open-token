import { Address, DeployInfo, Deployer } from "../../web3webdeploy/types";

export interface DeployOPENSettings
  extends Omit<DeployInfo, "contract" | "args"> {}

export async function deployOPEN(
  deployer: Deployer,
  settings: DeployOPENSettings
): Promise<Address> {
  return await deployer
    .deploy({
      id: "OPEN",
      contract: "OPEN",
      ...settings,
    })
    .then((deployment) => deployment.address);
}
