import { Deployer } from "../web3webdeploy/types";

export async function deploy(deployer: Deployer): Promise<void> {
  const OPENAbi = await deployer.getAbi("OPEN");
  deployer.startContext("lib/openmesh-admin");
  await deployer.execute({
    id: "GrantsOPENOPENMinting",
    abi: "OpenmeshAdmin",
    to: "0x24496D746Fd003397790E41d0d1Ce61F4F7fd61f", // Openmesh Admin
    function: "performCall",
    args: [
      "0x8477e2f07E6EB061027Bb15F703183453b776481",
      BigInt(0),
      deployer.viem.encodeFunctionData({
        abi: OPENAbi,
        functionName: "grantRole",
        args: [
          deployer.viem.keccak256(deployer.viem.toBytes("MINT")),
          "0xc7b10907033Ca6e2FC00FCbb8CDD5cD89f141384",
        ],
      }),
    ],
  });
  deployer.finishContext();
}
