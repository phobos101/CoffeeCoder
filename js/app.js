var codeInput = document.body.children[0].children[0].children[1];
var myCodeMirror = CodeMirror(codeInput, {
  value: "function welcome(){return 'Welcome to Coffee Coder';}\n",
  mode:  "javascript"
});
