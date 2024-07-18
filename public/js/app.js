const exitBtn = document.getElementById("exitIcon");
const menuBtn = document.getElementById("menuIcon");
const leftSection = document.querySelector(".left-section");
const addSection = document.getElementById("add");
const exitBtn2 = document.getElementById("exitIcon2");
const addBtn = document.getElementById("addIcon");
const search = document.querySelector(".search input");
const searchNB = document.getElementById("searchNB");
const addForm = document.querySelector(".addContact");
const list = document.querySelector(".contactBoxes");
const sidebarList = document.querySelector(".searchList");
const content = document.querySelector(".main");
const contactBox = document.querySelector(".box");
const BTNajouter = document.getElementById("btnAjouter");
const editIcon = document.querySelector(".ri-edit-box-line");
const detailBox = document.querySelector(".detailBox");
const numberList = document.querySelector(".searchNB-ul");

//ouvrir et fermer le menu
menuBtn.addEventListener("click", () => {
  leftSection.style.left = "0";
});

exitBtn.addEventListener("click", () => {
  leftSection.style.left = "-200px";
});

addBtn.addEventListener("click", () => {
  addForm.style.display = "block";
});

exitBtn2.addEventListener("click", () => {
  addForm.style.display = "none";
});

function exit() {
  window.location.href = "/";
}

//Recherche des contacts
const filterContacts = (term) => {
  Array.from(sidebarList.children)
    .filter((contact) => !contact.textContent.toLowerCase().includes(term))
    .forEach((contact) => contact.classList.add("filtered"));

  Array.from(sidebarList.children)
    .filter((contact) => contact.textContent.toLowerCase().includes(term))
    .forEach((contact) => contact.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterContacts(term);
});

//add contacts (CREATE)
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let valNom = $("#nom").val();
  let valPrenom = $("#prenom").val();
  let valNumero = $("#numero").val();
  let valEmail = $("#email").val();
  let valEntreprise = $("#entreprise").val();
  let valMobile = $("#mobile").val();
  let valAdresse = $("#adresse").val();
  let valRelation = $("#relation").val();
  if (
    valNom &&
    valPrenom &&
    valNumero &&
    valEmail &&
    valEntreprise &&
    valMobile &&
    valAdresse &&
    valRelation
  ) {
    $.ajax({
      type: "POST",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      url: "/contact",
      data: JSON.stringify({
        nom: valNom,
        prenom: valPrenom,
        entreprise: valEntreprise,
        telephone: valNumero,
        email: valEmail,
        mobile: valMobile,
        adresse: valAdresse,
        relation: valRelation,
      }),
      success: function (contact) {
        generateTemplate(contact);
      },
    });
    addForm.reset();
  } else {
    console.error("Input values are empty.");
  }
});

//generer la liste des contact du sidebar et du main content (READ)
window.onload = () => {
  $.ajax({
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    url: "/contacts",
    success: (contacts) => {
      contacts.forEach((contact) => generateTemplate(contact));
    },
  });
};

const generateTemplate = (contact) => {
  const li1 = `
        <li class="box ${contact._id}" id='${contact._id}'>
            <div class="infoBox"  id='${contact._id}' onclick="getDetails('${contact._id}')" >
              <img src="/img/Default_pfp.svg.png" alt="icon" class="center-image" />
              <h2>${contact.prenom} ${contact.nom}</h2>
              <h4>${contact.entreprise}</h4>
            </div>
            <div class="icons">
              <i class="ri-delete-bin-line" onclick="deleteContact('${contact._id}')"></i>
              <i class="ri-edit-box-line"  onclick="editContact('${contact._id}')"></i>
          </div>
        </li>
        `;
  const li2 = `
        <li class="contactList ${contact._id}" onclick="getDetails('${contact._id}')">${contact.nom} ${contact.prenom}</li>
        `;
  const li3 = `
        <li class="contactList ${contact._id} ${contact.telephone}" onclick="getDetails('${contact._id}')"> ${contact.telephone}</li>
        `;
  list.innerHTML += li1;
  sidebarList.innerHTML += li2;
  numberList.innerHTML += li3;
};

//montrer les informations du contact (READ)
function getDetails(id) {
  $.ajax({
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    url: "/contact/" + id,
    success: function (contact) {
      let detail = `
        <i class="ri-close-line" onclick="exit()"></i>
        <div class="detailBox" id="detailBox">
        <img src="/img/Default_pfp.svg.png" alt="icon" />
              <h2>${contact.prenom} ${contact.nom}</h2>
              <h4><i class="ri-suitcase-line"></i> : ${contact.entreprise}</h4>
              <h4><i class="ri-phone-line"></i> : ${contact.telephone}</h4>
              <h4><i class="ri-cellphone-line"></i></i> : ${contact.mobile}</h4>
              <h4><i class="ri-mail-line"></i> : ${contact.email}</h4>
              <h4><i class="ri-home-2-line"></i> : ${contact.adresse}</h4>
              <h4>Relation  : ${contact.relation}</h4>
        </div>
        `;
      content.innerHTML = detail;
    },
  });
}

//modifier un contact (UPDATE)
function editContact(id) {
  $.ajax({
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    url: "/contact/" + id,
    success: function (contact) {
      showEditForm(contact);
    },
  });
}
function showEditForm(contact) {
  console.log(contact.relation);
  let form = `
   <form id="editForm" class="editForm">
          <i class="ri-close-line" id="exitIcon3" onclick="exit()"></i>
          <div class="name">
            <i class="ri-user-3-line"></i>
            <label for="name">Profile :</label>
            <input type="text" id="prenom2" value="${contact.prenom}" placeholder="Prenom" required />
            <input type="text" id="nom2"  value="${contact.nom}" placeholder="Nom" required />
            <input type="text" id="entreprise2"  value="${contact.entreprise}" placeholder="Entreprise" required/>
          </div>
          <div class="phone">
            <i class="ri-phone-line"></i>
            <label for="tel">Numero de télephone :</label>
            <input
              type="tel"
              id="numero2"
              placeholder="514-222-2222"
              value="${contact.telephone}"
              required
            />
            <i class="ri-cellphone-line"></i>
            <label for="mobile">Cellulaire :</label>
            <input
              type="tel"
              id="mobile2"
              value="${contact.mobile}"
              placeholder="514-222-2222"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
             />
          </div>
          <div class="mail">
            <i class="ri-mail-line"></i>
            <label for="mail">Email :</label>
            <input
              type="email"
              id="email2"
              value="${contact.email}"
              placeholder="Nom@email.com"
              required
            />
          </div>
          <div class="adresse">
            <i class="ri-home-2-line"></i>
            <label for="adresse">Adresse :</label>
            <input 
            type="text" 
            id="adresse2" 
            value="${contact.adresse}"
            placeholder="123 rue Boris" 
            required />
          </div>
          <div class="relation">
          <label for="relation">Relation :</label>
          <select name="relation2" id="relation2" required>
          <option value="${contact.relation}" selected hidden>${contact.relation}</option> 
            <option value="Famille">Famille</option>
            <option value="Ami">Ami</option>
            <option value="Travail">Travail</option>
            <option value="Etude">Etude</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
          <input type="submit" value="Enregistrer" />
        </form>
   `;
  content.innerHTML = form;
  let editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let valNom = $("#nom2").val();
    let valPrenom = $("#prenom2").val();
    let valNumero = $("#numero2").val();
    let valEmail = $("#email2").val();
    let valEntreprise = $("#entreprise2").val();
    let valMobile = $("#mobile2").val();
    let valAdresse = $("#adresse2").val();
    let valRelation = $("#relation2").val();
    console.log(valRelation);
    if (
      valNom &&
      valPrenom &&
      valNumero &&
      valEmail &&
      valEntreprise &&
      valMobile &&
      valAdresse &&
      valRelation
    ) {
      $.ajax({
        type: "PUT",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: "/contact/" + contact._id,
        data: JSON.stringify({
          nom: valNom,
          prenom: valPrenom,
          entreprise: valEntreprise,
          telephone: valNumero,
          email: valEmail,
          mobile: valMobile,
          adresse: valAdresse,
          relation: valRelation,
        }),
        success: function (contact) {
          generateTemplate(contact);
        },
      });
      window.location.href = "/";
      editForm.reset();
    } else {
      console.error("Input values are empty.");
    }
  });
}

//supprimer un contact dans la bd (DELETE)
function deleteContact(id) {
  $.ajax({
    type: "DELETE",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    url: "/contact/" + id,
    success: function () {
      $("#" + id).remove();
      $("." + id).remove();
    },
  });
}
//recherche avec numero de tel
searchNB.addEventListener("keyup", () => {
  const term = searchNB.value.trim();
  filterNumbers(term);
});
const filterNumbers = (term) => {
  Array.from(numberList.children)
    .filter((contact) => !contact.textContent.replace("-", "").includes(term))
    .forEach((contact) => contact.classList.add("filtered"));

  Array.from(numberList.children)
    .filter((contact) => contact.textContent.replace("-", "").includes(term))
    .forEach((contact) => contact.classList.remove("filtered"));
};
