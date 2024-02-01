import { Ether } from "../web3webdeploy/lib/etherUnits";
import { Address, DeployInfo, Deployer } from "../web3webdeploy/types";
import { deploy as openmeshAdminDeploy } from "../lib/openmesh-admin/deploy/deploy";
import { deploy as ensReverseRegistrarDeploy } from "../lib/ens-reverse-registrar/deploy/deploy";

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
  deployer.startContext("lib/openmesh-admin");
  const admin = (await openmeshAdminDeploy(deployer)).admin;
  deployer.finishContext();
  deployer.startContext("lib/ens-reverse-registrar");
  const ensReverseRegistrar = (await ensReverseRegistrarDeploy(deployer))
    .reverseRegistrar;
  deployer.finishContext();

  const openToken = await deployer.deploy({
    contract: "OPEN",
    args: [tokenName, tokenTicker, maxSupply, admin, ensReverseRegistrar],
    ...settings,
  });

  return {
    openToken: openToken,
  };
}
