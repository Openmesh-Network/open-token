export const TokenAllocationVestingContract = {
  abi: [
    { type: "constructor", inputs: [], stateMutability: "nonpayable" },
    {
      type: "function",
      name: "amount",
      inputs: [],
      outputs: [{ name: "", type: "uint128", internalType: "uint128" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "beneficiary",
      inputs: [],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "duration",
      inputs: [],
      outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "initialize",
      inputs: [
        { name: "_token", type: "address", internalType: "contract IERC20" },
        { name: "_amount", type: "uint128", internalType: "uint128" },
        { name: "_start", type: "uint64", internalType: "uint64" },
        { name: "_duration", type: "uint64", internalType: "uint64" },
        { name: "_beneficiary", type: "address", internalType: "address" },
        { name: "_manager", type: "address", internalType: "address" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "manager",
      inputs: [],
      outputs: [{ name: "", type: "address", internalType: "address" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "releasable",
      inputs: [],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "release",
      inputs: [],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "released",
      inputs: [],
      outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "start",
      inputs: [],
      outputs: [{ name: "", type: "uint64", internalType: "uint64" }],
      stateMutability: "view",
    },
    {
      type: "function",
      name: "stop",
      inputs: [{ name: "newDuration", type: "uint64", internalType: "uint64" }],
      outputs: [],
      stateMutability: "nonpayable",
    },
    {
      type: "function",
      name: "token",
      inputs: [],
      outputs: [{ name: "", type: "address", internalType: "contract IERC20" }],
      stateMutability: "view",
    },
    {
      type: "event",
      name: "BeneficiaryCreated",
      inputs: [
        {
          name: "beneficiary",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ERC20Released",
      inputs: [
        {
          name: "beneficiary",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "amount",
          type: "uint256",
          indexed: false,
          internalType: "uint256",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Initialized",
      inputs: [
        {
          name: "version",
          type: "uint64",
          indexed: false,
          internalType: "uint64",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "LinearVestingCreated",
      inputs: [
        {
          name: "amount",
          type: "uint128",
          indexed: false,
          internalType: "uint128",
        },
        {
          name: "start",
          type: "uint64",
          indexed: false,
          internalType: "uint64",
        },
        {
          name: "duration",
          type: "uint64",
          indexed: false,
          internalType: "uint64",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "ManagerCreated",
      inputs: [
        {
          name: "manager",
          type: "address",
          indexed: true,
          internalType: "address",
        },
      ],
      anonymous: false,
    },
    {
      type: "event",
      name: "Stop",
      inputs: [
        {
          name: "newDuration",
          type: "uint64",
          indexed: false,
          internalType: "uint64",
        },
      ],
      anonymous: false,
    },
    {
      type: "error",
      name: "AddressEmptyCode",
      inputs: [{ name: "target", type: "address", internalType: "address" }],
    },
    {
      type: "error",
      name: "AddressInsufficientBalance",
      inputs: [{ name: "account", type: "address", internalType: "address" }],
    },
    { type: "error", name: "FailedInnerCall", inputs: [] },
    { type: "error", name: "InvalidInitialization", inputs: [] },
    { type: "error", name: "NotInitializing", inputs: [] },
    {
      type: "error",
      name: "SafeERC20FailedOperation",
      inputs: [{ name: "token", type: "address", internalType: "address" }],
    },
    {
      type: "error",
      name: "SenderNotManager",
      inputs: [
        { name: "sender", type: "address", internalType: "address" },
        { name: "manager", type: "address", internalType: "address" },
      ],
    },
    {
      type: "error",
      name: "StopMustBeInTheFuture",
      inputs: [
        { name: "stop", type: "uint64", internalType: "uint64" },
        { name: "currentTime", type: "uint64", internalType: "uint64" },
      ],
    },
    {
      type: "error",
      name: "StopMustDecreaseDuration",
      inputs: [
        { name: "newDuration", type: "uint64", internalType: "uint64" },
        { name: "oldDuration", type: "uint64", internalType: "uint64" },
      ],
    },
  ],
} as const;
