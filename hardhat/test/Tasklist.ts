import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { task } from "hardhat/config";

describe("Tasklist", function () {
  async function deployTasklist() {

    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const Tasklist = await ethers.getContractFactory("Tasklist");
    const tasklist = await Tasklist.deploy();

    return { owner, tasklist };
  }

  it("Should do the whole shebang", async () => {
    const { tasklist } = await loadFixture(deployTasklist);

    // Submit the first task
    await tasklist.submitTask("Task 1", "Some task that must be performed", {
      value: 100_000,
    });
    expect(await tasklist.n_tasks()).to.be.equal(1);
    expect((await tasklist.tasks(0)).bounty).to.be.equal(100_000);

    // Submit the second task
    await tasklist.submitTask("Task 2", "Some other that must be performed", {
      value: 150_000,
    });
    expect(await tasklist.n_tasks()).to.be.equal(2);
    expect((await tasklist.tasks(1)).bounty).to.be.equal(150_000);

    // Reconnect from another account
    const [_, account1] = await ethers.getSigners();
    const otherTasklistConn = tasklist.connect(account1);

    // Make a submission
    await otherTasklistConn.submitJob("Hey, I completed Task 2, please pay me.", 1);
    expect((await tasklist.tasks(1)).n_submissions).to.be.equal(1);

    let submission = await tasklist.getSubmission(1, 0);
    expect(submission.approved).to.be.equal(false);
    expect(submission.owner).to.be.equal(account1.address);

    // Test approval
    const balanceStart = await account1.getBalance();

    await tasklist.approveSubmission(1, 0);

    submission = await tasklist.getSubmission(1, 0);
    expect(submission.approved).to.be.equal(true);

    const balanceEnd = await account1.getBalance();
    expect(balanceEnd.sub(balanceStart)).to.be.equal(150_000);
  });
});
