
const address = "0xb5CBC70Eb4CD330adB823e9687F6883EcaC3607F";

const data = {
  button_label: "CERTIFICAZIONE",
  button_url: "https://dev-digital-cv.herokuapp.com/",
  ethereum_path: chrome.runtime.getURL("icons/ethereum.svg"),
  ethereum_contract_url: "https://ropsten.etherscan.io/address/" + address,
};

const navbar = document.getElementsByClassName("rd-navbar-nav")[0];
const li = document.createElement("li");
li.classList.add("menu-position-" + navbar.childNodes.length);
const anchor_button = document.createElement("a");
anchor_button.innerText = data.button_label;
anchor_button.href = data.button_url;
//anchor_button.target = "_blank";
li.appendChild(anchor_button);
navbar.append(li);

const footer =
  document.getElementsByClassName("portletEmbed")[0].childNodes[1]
    .childNodes[0];
const anchor_icon = document.createElement("a");
anchor_icon.classList.add("fab");
const img = document.createElement("img");
img.src = data.ethereum_path;
img.style.paddingLeft = 0;
anchor_icon.href = data.ethereum_contract_url;
anchor_icon.target = "_blank";
anchor_icon.appendChild(img);
footer.appendChild(anchor_icon);