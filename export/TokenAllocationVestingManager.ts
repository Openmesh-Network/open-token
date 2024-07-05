export const TokenAllocationVestingManagerContract = {
  address: "0x15C537D9CD6E8D3333774c45aE1f4e70318410c6",
  abi: [
    {
      type: "constructor",
      inputs: [
        {
          name: "_token",
          type: "address",
          internalType: "contract IERC20Mintable",
        },
        { name: "_admin", type: "address", internalType: "address" },
      ],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "createVesting",
      inputs: [
        { name: "_amount", type: "uint128", internalType: "uint128" },
        { name: "_start", type: "uint64", internalType: "uint64" },
        { name: "_duration", type: "uint64", internalType: "uint64" },
        { name: "_beneficiary", type: "address", internalType: "address" },
      ],
      outputs: [{ name: "vesting", type: "address", internalType: "address" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "getAddress",
      inputs: [
        { name: "_amount", type: "uint128", internalType: "uint128" },
        { name: "_start", type: "uint64", internalType: "uint64" },
        { name: "_duration", type: "uint64", internalType: "uint64" },
        { name: "_beneficiary", type: "address", internalType: "address" },
      ],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "implementation",
      inputs: [],
      outputs: [
        {
          name: "",
          type: "address",
          internalType:
            "contract SingleBeneficiaryLinearERC20TransferVestingStoppableProxy",
        },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "owner",
      inputs: [],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "release",
      inputs: [
        { name: "_amount", type: "uint128", internalType: "uint128" },
        { name: "_start", type: "uint64", internalType: "uint64" },
        { name: "_duration", type: "uint64", internalType: "uint64" },
        { name: "_beneficiary", type: "address", internalType: "address" },
      ],
      outputs: [{ name: "released", type: "uint256", internalType: "uint256" }],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "renounceOwnership",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "stop",
      inputs: [
        { name: "_amount", type: "uint128", internalType: "uint128" },
        { name: "_start", type: "uint64", internalType: "uint64" },
        { name: "_duration", type: "uint64", internalType: "uint64" },
        { name: "_beneficiary", type: "address", internalType: "address" },
        { name: "_newDuration", type: "uint64", internalType: "uint64" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "token",
      inputs: [],
      outputs: [
        { name: "", type: "address", internalType: "contract IERC20Mintable" },
      ],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "transferOwnership",
      inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "event",
      name: "OwnershipTransferred",
      inputs: [
        {
          name: "previousOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "newOwner",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    { type: "error", name: "ERC1167FailedCreateClone", inputs: [] },
    {
      type: "error",
      name: "OwnableInvalidOwner",
      inputs: [{ name: "owner", type: "address", internalType: "address" }],
    },
    {
      type: "error",
      name: "OwnableUnauthorizedAccount",
      inputs: [{ name: "account", type: "address", internalType: "address" }],
    },
  ],
} as const;
