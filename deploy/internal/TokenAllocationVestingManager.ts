import { Address, DeployInfo, Deployer } from "../../web3webdeploy/types";
import { sOPENContract } from "../../export/sOPEN";
import { OpenmeshAdminContract } from "../../lib/openmesh-admin/export/OpenmeshAdmin";

export interface DeployTokenAllocationVestingManagerSettings
  extends Omit<DeployInfo, "contract" | "args"> {}

export async function deployTokenAllocationVestingManager(
  deployer: Deployer,
  settings: DeployTokenAllocationVestingManagerSettings
): Promise<Address> {
  deployer.startContext("lib/vesting");
  const tokenAllocationVestingManager = await deployer
    .deploy({
      id: "TokenAllocationVestingManager",
      contract:
        "JITSingleBeneficiaryLinearCliffERC20TransferVestingStoppableManager",
      args: [sOPENContract.address, OpenmeshAdminContract.address],
      salt: "TokenAllocation",
      ...settings,
    })
    .then((deployment) => deployment.address);
  deployer.finishContext();
  return tokenAllocationVestingManager;
}
