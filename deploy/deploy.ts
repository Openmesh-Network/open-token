import { Ether } from "../web3webdeploy/lib/etherUnits";
import { Address, DeployInfo, Deployer } from "../web3webdeploy/types";

export interface OpenTokenDeploymentSettings
  extends Omit<DeployInfo, "contract" | "args"> {
  tokenName?: string;
  tokenTicker?: string;
  maxSupply?: bigint;
  admin: Address;
}

export interface OpenTokenDeployment {
  openToken: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: OpenTokenDeploymentSettings
): Promise<OpenTokenDeployment> {
  const tokenName = settings?.tokenName ?? "Openmesh";
  const tokenTicker = settings?.tokenTicker ?? "OPEN";
  const maxSupply = settings?.maxSupply ?? Ether(1_000_000_000);
  const admin = settings?.admin ?? "0x2309762aAcA0a8F689463a42c0A6A84BE3A7ea51";

  const openToken = await deployer.deploy({
    contract: "OPEN",
    args: [tokenName, tokenTicker, maxSupply, admin],
    ...settings,
  });

  return {
    openToken: openToken,
  };
}
