import { Ether } from "../web3webdeploy/lib/etherUnits";
import { Address, DeployInfo, Deployer } from "../web3webdeploy/types";
import { zeroAddress } from "viem";

export interface OpenTokenDeploymentSettings
  extends Omit<DeployInfo, "contract" | "args"> {
  tokenName?: string;
  tokenTicker?: string;
  maxSupply?: bigint;
  admin: Address;
  ensReverseRegistrar: Address;
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
  const admin = settings?.admin ?? zeroAddress;
  const ensReverseRegistrar = settings?.ensReverseRegistrar ?? zeroAddress;

  const openToken = await deployer.deploy({
    contract: "OPEN",
    args: [tokenName, tokenTicker, maxSupply, admin, ensReverseRegistrar],
    ...settings,
  });

  return {
    openToken: openToken,
  };
}
