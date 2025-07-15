const fengari = window.fengari;
const { lua, lauxlib, lualib, to_luastring, to_jsstring } = fengari;

const editor = document.getElementById("editor");
const status = document.getElementById("status");
const output = document.getElementById("output");
const runBtn = document.getElementById("runBtn");
const themeBtn = document.getElementById("toggleTheme");

function consolePrint(str) {
  output.textContent += str + "\n";
}

runBtn.addEventListener("click", () => {
  status.textContent = "";
  status.className = "";
  output.textContent = "";

  const L = lauxlib.luaL_newstate();
  lualib.luaL_openlibs(L);

  lua.lua_pushjsfunction(L, (L) => {
    let n = lua.lua_gettop(L);
    let res = [];
    for (let i = 1; i <= n; i++) {
      res.push(to_jsstring(lauxlib.luaL_tolstring(L, i)));
      lua.lua_pop(L, 1);
    }
    consolePrint(res.join("\t"));
    return 0;
  });

  lua.lua_setglobal(L, to_luastring("consolePrint"));

  const overridePrint = `
    function print(...)
      local args = {...}
      local str = ""
      for i = 1, #args do
        str = str .. tostring(args[i]) .. "\t"
      end
      str = str:sub(1, -2)
      _G.consolePrint(str)
    end
  `;

  try {
    lauxlib.luaL_loadstring(L, to_luastring(overridePrint));
    lua.lua_pcall(L, 0, 0, 0);
    lauxlib.luaL_loadstring(L, to_luastring(editor.value));
    lua.lua_pcall(L, 0, 0, 0);
    status.textContent = "Code ran successfully!";
    status.classList.add("success");
  } catch (e) {
    status.textContent = "Error: " + e.message;
    status.classList.add("error");
  }
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});