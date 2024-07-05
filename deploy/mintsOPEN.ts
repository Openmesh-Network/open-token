import { Ether } from "../web3webdeploy/lib/etherUnits";
import { Deployer } from "../web3webdeploy/types";

export async function deploy(deployer: Deployer): Promise<void> {
  const sOPENAbi = await deployer.getAbi("sOPEN");
  deployer.startContext("lib/openmesh-admin");
  await deployer.execute({
    id: "MintsOPEN1",
    abi: "OpenmeshAdmin",
    to: "0x24496D746Fd003397790E41d0d1Ce61F4F7fd61f", // Openmesh Admin
    function: "performCall",
    args: [
      "0xc7b10907033Ca6e2FC00FCbb8CDD5cD89f141384", // sOPEN
      BigInt(0),
      deployer.viem.encodeFunctionData({
        abi: sOPENAbi,
        functionName: "mint",
        args: ["0x519ce4C129a981B2CBB4C3990B1391dA24E8EbF3", Ether(100)],
      }),
    ],
  });
  deployer.finishContext();
}
