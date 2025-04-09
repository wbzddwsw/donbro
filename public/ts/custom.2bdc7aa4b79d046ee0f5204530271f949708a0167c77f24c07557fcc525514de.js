(() => {
  // <stdin>
  var highlights = document.querySelectorAll(".article-content div.highlight");
  var copyText = `\u62F7\u8D1D`;
  highlights.forEach((highlight) => {
    const copyButton = document.createElement("button");
    copyButton.innerHTML = copyText;
    copyButton.classList.add("copyCodeButton");
    highlight.appendChild(copyButton);
  });
  new StackColorScheme(document.getElementById("dark-mode-toggle"));
})();
