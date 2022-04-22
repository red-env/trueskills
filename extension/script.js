const data = {
  blockchains: [
    {
      path: chrome.runtime.getURL("icons/polygon.svg"),
      contract_url: "https://mumbai.polygonscan.com/address/0xd3fBcedEf11004cC1c0aF64e54f4ca268CA0769C",
    },
    {
      path: chrome.runtime.getURL("icons/ethereum.svg"),
      contract_url: "https://ropsten.etherscan.io/address/0xb5CBC70Eb4CD330adB823e9687F6883EcaC3607F",
    },
  ],
  button_label: "CERTIFICAZIONE",
  button_url: "http://93.186.254.199:8000/",
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

const footer = document.getElementsByClassName("portletEmbed")[0].childNodes[1].childNodes[0];
for(const blockchain of data.blockchains) {
  const anchor_icon = document.createElement("a");
  anchor_icon.classList.add("fab");
  const img = document.createElement("img");
  img.src = blockchain.path;
  img.width = 26;
  img.style.paddingLeft = 0;
  anchor_icon.href = blockchain.contract_url;
  anchor_icon.target = "_blank";
  anchor_icon.appendChild(img);
  footer.appendChild(anchor_icon);
}
