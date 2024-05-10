// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "../../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "../../lib/openzeppelin-contracts/contracts/access/AccessControl.sol";

import {IERC20} from "../../lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "../../lib/openzeppelin-contracts/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {IVotes} from "../../lib/openzeppelin-contracts/contracts/governance/utils/IVotes.sol";
import {IERC5267} from "../../lib/openzeppelin-contracts/contracts/interfaces/IERC5267.sol";
import {IERC6372} from "../../lib/openzeppelin-contracts/contracts/interfaces/IERC6372.sol";
import {OpenmeshENSReverseClaimable} from "../../lib/openmesh-admin/src/OpenmeshENSReverseClaimable.sol";

import {IERC20MintBurnable} from "../IERC20MintBurnable.sol";

contract sOPEN is ERC20, AccessControl, OpenmeshENSReverseClaimable, IERC20MintBurnable {
    bytes32 public constant MINT_ROLE = keccak256("MINT");
    IERC20MintBurnable public constant OPEN = IERC20MintBurnable(0x8477e2f07E6EB061027Bb15F703183453b776481);

    constructor() ERC20("Synthetic Openmesh", "sOPEN") {
        _grantRole(DEFAULT_ADMIN_ROLE, OPENMESH_ADMIN);
    }

    /// @inheritdoc AccessControl
    function supportsInterface(bytes4 _interfaceId) public view virtual override returns (bool) {
        return _interfaceId == type(IERC20).interfaceId || _interfaceId == type(IERC20Metadata).interfaceId
            || _interfaceId == type(IERC20MintBurnable).interfaceId || super.supportsInterface(_interfaceId);
    }

    /// @inheritdoc IERC20MintBurnable
    function mint(address account, uint256 amount) external onlyRole(MINT_ROLE) {
        _mint(account, amount);
    }

    /// @inheritdoc IERC20MintBurnable
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        OPEN.mint(msg.sender, amount);
    }
}
