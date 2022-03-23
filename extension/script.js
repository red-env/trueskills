const navbar = document.getElementsByClassName("rd-navbar-nav")[0];
const li = document.createElement("li");
li.classList.add("menu-position-" + navbar.childNodes.length);
const anchor = document.createElement("a");
anchor.innerText = "CERTIFICAZIONE";
anchor.href = "https://digital-curriculum-vitae.herokuapp.com/";
li.appendChild(anchor);
navbar.append(li);
