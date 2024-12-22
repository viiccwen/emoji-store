import { expect } from "chai";
import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import { EmojiStore } from "../typechain/EmojiStore"; 

describe("EmojiStore", function () {
  let emojiStore: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    // pre-setting for each test
    [owner, addr1, addr2] = await hre.ethers.getSigners();
    const platformAddress = owner.address; // platform address is the owner

    const EmojiStoreFactory = await hre.ethers.getContractFactory("EmojiStore");
    emojiStore = await EmojiStoreFactory.deploy(platformAddress);
    await emojiStore.deployed();
  });

  it("should deploy with the correct platform address", async function () {
    expect(await emojiStore.platformAddress()).to.equal(owner.address);
  });

  it("should allow adding a new emoji", async function () {
    const tx = await emojiStore
      .connect(addr1)
      .addEmoji("0x1F600", "Smiley Emoji", hre.ethers.utils.parseEther("1"));
    await tx.wait();

    const emoji = await emojiStore.getEmoji(1);

    expect(emoji.hexCode).to.equal("0x1F600");
    expect(emoji.description).to.equal("Smiley Emoji");
    expect(emoji.price).to.equal(hre.ethers.utils.parseEther("1"));
    expect(emoji.owner).to.equal(addr1.address);
    expect(emoji.creator).to.equal(addr1.address);
  });

  it("should prevent adding duplicate emojis", async function () {
    await emojiStore
      .connect(addr1)
      .addEmoji("0x1F600", "Smiley Emoji", hre.ethers.utils.parseEther("1"));

    await expect(
      emojiStore
        .connect(addr1)
        .addEmoji("0x1F600", "Duplicate Emoji", hre.ethers.utils.parseEther("1"))
    ).to.be.revertedWith("Emoji already exists");
  });

  it("should allow purchasing an emoji", async function () {
    await emojiStore
      .connect(addr1)
      .addEmoji("0x1F600", "Smiley Emoji", hre.ethers.utils.parseEther("1"));

    // addr2 購買 emoji
    const tx = await emojiStore
      .connect(addr2)
      .purchaseEmoji(1, { value: hre.ethers.utils.parseEther("1") });
    await tx.wait();

    const emoji = await emojiStore.getEmoji(1);
    expect(emoji.owner).to.equal(addr2.address);
  });

  it("should revert if insufficient Ether is sent during purchase", async function () {
    await emojiStore
      .connect(addr1)
      .addEmoji("0x1F600", "Smiley Emoji", hre.ethers.utils.parseEther("1"));

    await expect(
      emojiStore
        .connect(addr2)
        .purchaseEmoji(1, { value: hre.ethers.utils.parseEther("0.5") })
    ).to.be.revertedWith("Insufficient Ether sent");
  });

  it("should allow updating emoji price", async function () {
    await emojiStore
      .connect(addr1)
      .addEmoji("0x1F600", "Smiley Emoji", hre.ethers.utils.parseEther("1"));

    const tx = await emojiStore
      .connect(addr1)
      .updatePrice(1, hre.ethers.utils.parseEther("2"));
    await tx.wait();

    const emoji = await emojiStore.getEmoji(1);
    expect(emoji.price).to.equal(hre.ethers.utils.parseEther("2"));
  });

  it("should revert if non-owner tries to update price", async function () {
    await emojiStore
      .connect(addr1)
      .addEmoji("0x1F600", "Smiley Emoji", hre.ethers.utils.parseEther("1"));

    await expect(
      emojiStore
        .connect(addr2)
        .updatePrice(1, hre.ethers.utils.parseEther("2"))
    ).to.be.revertedWith("Only the owner can update the price");
  });

  it("should calculate platform fee correctly during purchase", async function () {
    await emojiStore
      .connect(addr1)
      .addEmoji("0x1F600", "Smiley Emoji", hre.ethers.utils.parseEther("1"));

    const platformInitialBalance = await hre.ethers.provider.getBalance(
      owner.address
    );

    // addr2 購買 emoji
    const tx = await emojiStore
      .connect(addr2)
      .purchaseEmoji(1, { value: hre.ethers.utils.parseEther("1") });
    await tx.wait();

    const platformFinalBalance = await hre.ethers.provider.getBalance(owner.address);
    const platformFee = hre.ethers.utils.parseEther("0.05"); // 平台分成 5%

    expect(platformFinalBalance.sub(platformInitialBalance)).to.equal(platformFee);
  });
});
