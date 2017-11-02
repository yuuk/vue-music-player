(function(window){
var html = document.querySelector("html");
html.style.fontSize = html.offsetWidth/7.5 + "px",
window.onresize = function(){
var a = document.querySelector("html");
a.style.fontSize = a.offsetWidth/7.5 + "px"
};
})(window)