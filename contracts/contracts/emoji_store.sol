// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmojiStore {
    struct Emoji {
        uint256 id;
        string hexCode; // emoji
        string description;
        uint256 price;
        address owner;
        address creator;
    }

    uint256 private nextId = 1; // Unique ID for each Emoji
    address public platformAddress; // Platform address
    uint256 public platformFeePercent = 5; // Platform fee percentage

    mapping(uint256 => Emoji) public emojis; 
    mapping(string => bool) private addedEmojis;
    uint256[] public emojiIds;

    event EmojiAdded(
        uint256 id,
        string hexCode,
        uint256 price,
        address creator
    );
    event EmojiPurchased(uint256 id, address buyer, address previousOwner);
    event PriceUpdated(uint256 id, uint256 oldPrice, uint256 newPrice);

    constructor(address _platformAddress) {
        require(_platformAddress != address(0), "Invalid platform address");
        platformAddress = _platformAddress;
    }

    function addEmoji(
        string memory hexCode,
        string memory description,
        uint256 price
    ) public {
        require(bytes(hexCode).length > 0, "Hex code cannot be empty");
        require(!addedEmojis[hexCode], "Emoji already exists");
        require(price > 0, "Price must be greater than 0");

        emojis[nextId] = Emoji({
            id: nextId,
            hexCode: hexCode,
            description: description,
            price: price,
            owner: msg.sender,
            creator: msg.sender 
        });
        addedEmojis[hexCode] = true;
        emojiIds.push(nextId);

        emit EmojiAdded(nextId, hexCode, price, msg.sender);
        nextId++;
    }

    function purchaseEmoji(uint256 emojiId) public payable {
        Emoji storage emoji = emojis[emojiId];
        require(emoji.id != 0, "Emoji does not exist");
        require(emoji.owner != msg.sender, "You cannot buy your own Emoji");
        require(emoji.owner != address(0), "Emoji has no owner");
        require(msg.value >= emoji.price, "Insufficient Ether sent");

        address previousOwner = emoji.owner;

        // calculate payments
        uint256 platformFee = (msg.value * platformFeePercent) / 100;
        uint256 ownerPayment = msg.value - platformFee;
        uint256 excessPayment = msg.value - emoji.price;

        // update owner
        emoji.owner = msg.sender;

        // transfer payments
        (bool successPlatform, ) = platformAddress.call{value: platformFee}("");
        require(successPlatform, "Transfer to platform failed");
        (bool successOwner, ) = previousOwner.call{value: ownerPayment}("");
        require(successOwner, "Transfer to previous owner failed");

        if (excessPayment > 0) {
            payable(msg.sender).transfer(excessPayment);
        }

        emit EmojiPurchased(emojiId, msg.sender, previousOwner);
    }

    function updatePrice(uint256 emojiId, uint256 newPrice) public {
        Emoji storage emoji = emojis[emojiId];
        require(emoji.id != 0, "Emoji does not exist");
        require(
            emoji.owner == msg.sender,
            "Only the owner can update the price"
        );
        require(newPrice > 0, "Price must be greater than 0");

        uint256 oldPrice = emoji.price;
        emoji.price = newPrice;

        emit PriceUpdated(emojiId, oldPrice, newPrice);
    }

    function getEmojiCount() public view returns (uint256) {
        return emojiIds.length;
    }

    function getEmoji(uint256 emojiId) public view returns (Emoji memory) {
        Emoji memory emoji = emojis[emojiId];
        require(emoji.id != 0, "Emoji does not exist");
        return emoji;
    }
}
