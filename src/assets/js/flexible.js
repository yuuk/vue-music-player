(function(window, document) {
  const init = () => {
    const BASE_WIDTH = 750;
    const html = document.querySelector('html');
    html.style.fontSize = `${(html.offsetWidth / BASE_WIDTH) * 100}px`;
  };
  init();
  window.onresize = init;
})(window, document);
