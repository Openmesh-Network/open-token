import { Address, DeployInfo, Deployer } from "../../web3webdeploy/types";

export interface DeploysOPENSettings
  extends Omit<DeployInfo, "contract" | "args"> {}

export async function deploysOPEN(
  deployer: Deployer,
  settings: DeploysOPENSettings
): Promise<Address> {
  return await deployer
    .deploy({
      id: "sOPEN",
      contract: "sOPEN",
      ...settings,
    })
    .then((deployment) => deployment.address);
}
