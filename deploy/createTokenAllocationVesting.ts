import { Address, Deployer } from "../web3webdeploy/types";
import { OpenmeshAdminContract } from "../lib/openmesh-admin/export/OpenmeshAdmin";
import { TokenAllocationVestingManagerContract } from "../export/TokenAllocationVestingManager";

export async function deploy(deployer: Deployer): Promise<void> {
  const vestings: {
    amount: bigint;
    start: number;
    duration: number;
    beneficiary: Address;
  }[] = [
    {
      amount: deployer.viem.parseEther("1000"),
      start: Math.round(Date.UTC(2024, 7 - 1, 1) / 1000),
      duration: 4 * 365 * 24 * 60 * 60,
      beneficiary: "0xaF7E68bCb2Fc7295492A00177f14F59B92814e70",
    },
  ];

  await deployer.execute({
    id: "CreateTokenAllocationVesting",
    abi: [...OpenmeshAdminContract.abi],
    to: OpenmeshAdminContract.address,
    function: "multicall",
    args: [
      vestings.map((vesting) =>
        deployer.viem.encodeFunctionData({
          abi: [...OpenmeshAdminContract.abi],
          functionName: "performCall",
          args: [
            TokenAllocationVestingManagerContract.address,
            BigInt(0),
            deployer.viem.encodeFunctionData({
              abi: TokenAllocationVestingManagerContract.abi,
              functionName: "createVesting",
              args: [
                vesting.amount,
                BigInt(vesting.start),
                BigInt(vesting.duration),
                vesting.beneficiary,
              ],
            }),
          ],
        })
      ),
    ],
    from: "0x6b221aA392146E31743E1beB5827e88284B09753",
  });
}
