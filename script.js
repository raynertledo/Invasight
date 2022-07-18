document.getElementById('hamburguer__menu').addEventListener('click', () => {
        document.getElementById('header__nav__list--mobile').classList.toggle('visible');
      });
document.addEventListener("mouseup", function(event){
    var hamb = document.getElementById("hamburguer__menu");
    var menu = document.getElementById("header__nav__list--mobile");
    if(!hamb.contains(event.target) && !menu.contains(event.target)){
      document.getElementById('header__nav__list--mobile').classList.remove('visible');
    } 
});
