const lessons = [
  {
    id: 1,
    instruction: "Print 'Hello, world!'",
    luaGoal: "print('Hello, world!')",
    check: (userCode) => userCode.trim() === "print('Hello, world!')"
  },
  {
    id: 2,
    instruction: "Assign the number 5 to a variable called x",
    luaGoal: "local x = 5",
    check: (userCode) => /x\s*=\s*5/.test(userCode)
  }
];
