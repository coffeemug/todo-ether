// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Tasklist {
    struct Submission {
      string description;
      address payable owner;
      bool approved;
    }

    struct Task {
      string name;
      string description;
      address owner;
      uint bounty;
      uint n_submissions;
      mapping (uint => Submission) submissions;
    }

    mapping (uint => Task) public tasks;
    uint public n_tasks;

    constructor() {
      n_tasks = 0;
    }

    function submitTask(string calldata name, string calldata description) external payable {
      Task storage task = tasks[n_tasks++];
      task.name = name;
      task.description = description;
      task.owner = msg.sender;
      task.bounty = msg.value;
      task.n_submissions = 0;
    }

    function submitJob(string calldata description, uint task_idx) external {
      require(task_idx < n_tasks, "Task does not exist");

      Task storage task = tasks[task_idx];

      Submission storage sub = task.submissions[task.n_submissions++];
      sub.description = description;
      sub.owner = payable(msg.sender);
      sub.approved = false;
    }

    function approveSubmission(uint task_idx, uint submission_idx) external {
      require(task_idx < n_tasks, "Task does not exist");

      Task storage task = tasks[task_idx];
      require(task.owner == msg.sender);
      require(submission_idx < task.n_submissions, "Submission doesn't exist");

      Submission storage submission = task.submissions[submission_idx];
      submission.approved = true;

      submission.owner.transfer(task.bounty);
    }

    function getTasksCount() external view returns(uint) {
      return n_tasks;
    }

    function getSubmission(uint task_idx, uint submission_idx) external view returns(Submission memory) {
      require(task_idx < n_tasks, "Task does not exist");

      Task storage task = tasks[task_idx];
      require(submission_idx < task.n_submissions, "Submission doesn't exist");

      return task.submissions[submission_idx];
    }
}
