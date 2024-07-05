import { sOPENContract } from "../export/sOPEN";
import { Address, Deployer } from "../web3webdeploy/types";
import {
  DeployTokenAllocationVestingManagerSettings,
  deployTokenAllocationVestingManager,
} from "./internal/TokenAllocationVestingManager";
import { OpenmeshAdminContract } from "../lib/openmesh-admin/export/OpenmeshAdmin";

export interface TokenAllocationVestingManagerDeploymentSettings {
  tokenAllocationVestingManagerSettings: DeployTokenAllocationVestingManagerSettings;
  forceRedeploy?: boolean;
}

export interface TokenAllocationVestingManagerDeployment {
  tokenAllocationVestingManager: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: TokenAllocationVestingManagerDeploymentSettings
): Promise<TokenAllocationVestingManagerDeployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    const existingDeployment = await deployer.loadDeployment({
      deploymentName: "TokenAllocationVestingManager.json",
    });
    if (existingDeployment !== undefined) {
      return existingDeployment;
    }
  }

  const tokenAllocationVestingManager =
    await deployTokenAllocationVestingManager(
      deployer,
      settings?.tokenAllocationVestingManagerSettings ?? {}
    );
  await deployer.execute({
    id: "GrantTokenAllocationVestingManagerMinting",
    abi: [...OpenmeshAdminContract.abi],
    to: OpenmeshAdminContract.address,
    function: "performCall",
    args: [
      sOPENContract.address,
      BigInt(0),
      deployer.viem.encodeFunctionData({
        abi: sOPENContract.abi,
        functionName: "grantRole",
        args: [
          deployer.viem.keccak256(deployer.viem.toBytes("MINT")),
          tokenAllocationVestingManager,
        ],
      }),
    ],
    from: "0x6b221aA392146E31743E1beB5827e88284B09753",
  });

  const deployment = {
    tokenAllocationVestingManager: tokenAllocationVestingManager,
  };
  await deployer.saveDeployment({
    deploymentName: "TokenAllocationVestingManager.json",
    deployment: deployment,
  });
  return deployment;
}
