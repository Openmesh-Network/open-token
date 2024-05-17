import { Address, Deployer } from "../web3webdeploy/types";
import { DeploysOPENSettings, deploysOPEN } from "./internal/sOPEN";

export interface sOpenDeploymentSettings {
  sopenSettings: DeploysOPENSettings;
  forceRedeploy?: boolean;
}

export interface sOpenDeployment {
  sopen: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: sOpenDeploymentSettings
): Promise<sOpenDeployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    const existingDeployment = await deployer.loadDeployment({
      deploymentName: "sopen.json",
    });
    if (existingDeployment !== undefined) {
      return existingDeployment;
    }
  }

  const sopen = await deploysOPEN(deployer, settings?.sopenSettings ?? {});
  const sOPENAbi = await deployer.getAbi("sOPEN");
  deployer.startContext("lib/openmesh-admin");
  await deployer.execute({
    id: "GrantOpenmeshAdminsOPENMinting",
    abi: "OpenmeshAdmin",
    to: "0x24496D746Fd003397790E41d0d1Ce61F4F7fd61f", // Openmesh Admin
    function: "performCall",
    args: [
      sopen,
      BigInt(0),
      deployer.viem.encodeFunctionData({
        abi: sOPENAbi,
        functionName: "grantRole",
        args: [
          deployer.viem.keccak256(deployer.viem.toBytes("MINT")),
          "0xD38ACa555ED2BCcBc3a619bB22f0F6b648FbCe48", // Openmesh multisig (Ethereum)
        ],
      }),
    ],
  });
  deployer.finishContext();

  const deployment = {
    sopen: sopen,
  };
  await deployer.saveDeployment({
    deploymentName: "sopen.json",
    deployment: deployment,
  });
  return deployment;
}
