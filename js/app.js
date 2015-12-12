var codeInput = document.getElementById('codeInput');
var codeOutput = document.getElementById('codeOutput');

var myCodeMirror = CodeMirror(codeInput, {
  lineNumbers: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  value: "(function welcome() {\n  return 'CoffeeCoder Rocks!';\n})();\n",
  mode:  "javascript"
});

function putOutput() {
  event.preventDefault();
  var input = myCodeMirror.getValue();
  result = eval(input);
  codeOutput.textContent = result;
};
