const loginForm = document.getElementById('login');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

const createAccountForm_customer = document.getElementById('createAccount_customer');
const nameCustomer = document.getElementById('nameCustomer');
const lastNameCustomer = document.getElementById('lastNameCustomer');
const emailCustomer = document.getElementById('emailCustomer');
const pswCustomer = document.getElementById('pswCustomer');
const psw2Customer = document.getElementById('psw2Customer');
const dateCustomer = document.getElementById('dateCustomer');

const createAccountForm_seller = document.getElementById('createAccount_seller');
const nameSeller = document.getElementById('nameSeller');
const lastNameSeller = document.getElementById('lastNameSeller');
const emailSeller = document.getElementById('emailSeller');
const pswSeller = document.getElementById('pswSeller');
const psw2Seller = document.getElementById('psw2Seller');
const shopSeller = document.getElementById('shopSeller');
const cellNumSeller = document.getElementById('cellNumSeller');
const vatNumSeller = document.getElementById('vatNumSeller');
const inputAddressSeller = document.getElementById('inputAddressSeller');
const inputAddress2Seller = document.getElementById('inputAddress2Seller');
const inputStateSeller = document.getElementById('inputStateSeller');
const inputZipSeller = document.getElementById('inputZipSeller');

//JSON DEGLI UTENTI GIA' LOGGATI
var json_users = [{
    "email": "mario.rossi@gmail.com",
    "password": "mario123",
    "role": "seller"
}, {
    "email": "sofia.verdi@libero.it",
    "password": "verdi!",
    "role": "customer",
    "favorite":[{
        "id": 436969,
        "title":"The Suicide Squad"
    }]
}]

var json_seller = [{
    "name": "Mario",
    "lastName": "Rossi",
    "email": "mario.rossi@gmail.com",
    "shopName": "milano shop",
    "cellNumber": 3472877345,
    "vatNumber": 12312312312,
    "address": "via della spiga",
    "address2": "12",
    "city": "milano",
    "state": "italy",
    "zip": 20121,
}];

var json_customer = [{
    "name": "sofia",
    "lastName": "verdi",
    "email": "sofia.rossi@libero.it",
    "age": 24,
}]

if (localStorage.getItem("json_users") == null) {
    updateLocalStorage();
}

function setInputError(inputElement, message) {
    inputElement.classList.add("formInput--error");
}

function setInputSuccess(inputElement) {
    inputElement.classList.add("formInput--success");
}

function clearInput(inputElement) {
    inputElement.classList.remove("formInput--error");
    inputElement.classList.remove("formInput--success");
}

function setFormMessage(formElement, type, message) {
    console.log("siamo in setFormMessage")

    //form element: può essere o loginForm o createAccountForm
    const messageElement = formElement.querySelector(".formMsg");
    //type: o messaggio di errore o di successo
    //message: testo 
    messageElement.textContent = message;
    if (type === "error") {
        messageElement.classList.remove("formMsg--success", "formMsg--error");
        messageElement.classList.add('formMsg--error');
    } else if (type === "success") {
        messageElement.classList.remove("formMsg--error", "formMsg--success");
        messageElement.classList.add('formMsg--success');
    } else {
        messageElement.classList.remove("formMsg--error", "formMsg--success");
        messageElement.classList.add('formMsg--submit');
    }
}

//quando il doc è pronto per lavorare, viene avviata questa funzione
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const chooseUser = document.querySelector("#chooseUser");
    const createAccountForm_customer = document.querySelector("#createAccount_customer");
    const createAccountForm_seller = document.querySelector("#createAccount_seller");

    //quando clicchi sul link per creare l'account: la login si nascone e viene mostrata la finestra per scegliere il tipo di utente
    document.querySelector("#linkCreateAccount").addEventListener("click", event => {
        event.preventDefault(); //previene di tornare sulla pagina in cui siamo già
        loginForm.classList.add("form--hidden");
        createAccountForm_seller.classList.add("form--hidden");
        createAccountForm_customer.classList.add("form--hidden");
        chooseUser.classList.remove("form--hidden");
    })

    //quando clicchi sul link per login 
    document.querySelector("#linkLogin").addEventListener("click", event => {
        event.preventDefault();
        createAccountForm_seller.classList.add("form--hidden");
        createAccountForm_customer.classList.add("form--hidden");
        chooseUser.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    //quando clicchi sul link per login 
    document.querySelector("#linkLogin2").addEventListener("click", event => {
        event.preventDefault();
        createAccountForm_seller.classList.add("form--hidden");
        createAccountForm_customer.classList.add("form--hidden");
        chooseUser.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    //quando clicchi sul link per creare account seller
    document.querySelector("#linkCreateAccount_seller").addEventListener("click", event => {
        event.preventDefault();
        createAccountForm_customer.classList.add("form--hidden");
        chooseUser.classList.add("form--hidden");
        loginForm.classList.add("form--hidden");
        createAccountForm_seller.classList.remove("form--hidden");
    });

    //quando clicchi sul link per creare account customer
    document.querySelector("#linkCreateAccount_customer").addEventListener("click", event => {
        event.preventDefault();
        createAccountForm_customer.classList.remove("form--hidden");
        chooseUser.classList.add("form--hidden");
        loginForm.classList.add("form--hidden");
        createAccountForm_seller.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        if (checkInputsLogin() == true) {
           //console.log("siamo in checkInputLogin == true");
            checkUser();
        }
        // setFormMessage(createAccountForm_seller, "submit", "submit");
        // setFormMessage(createAccountForm_customer, "submit", "submit");
    })

    createAccountForm_seller.addEventListener("submit", event => {
        event.preventDefault();
        if (checkInputsCreateAccountSeller() == true) {
            addUserLogin(emailSeller.value.trim(), pswSeller.value.trim(), "seller");
            addUserSeller();
        }
        // setFormMessage(loginForm, "submit", "submit");
    })

    createAccountForm_customer.addEventListener("submit", event => {
        event.preventDefault();
        if (checkInputsCreateAccountCustomer() == true) {
            addUserLogin(emailCustomer.value.trim(), pswCustomer.value.trim(), "customer");
            addUserCustomer();
        }
        // setFormMessage(loginForm, "submit", "submit");
    })


    //selezione gli elementi della classe formInput, e per ognuno ...
    //... controlla se sono stati compilati i campi
    document.querySelectorAll(".formInput").forEach(inputElement => {

        inputElement.addEventListener("blur", e => {

            //elementi SIGN UP seller
            if (e.target.id === "nameSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "nameSeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "lastNameSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "lastNameSeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "emailSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "emailSeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "shopSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "shopSeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "cellNumSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "cellNumSeller" && e.target.value.length > 6 && e.target.value.length < 10) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "pswSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "pswSeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "psw2Seller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "psw2Seller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "vatNumSeller" && e.target.value.length != 11) {
                setInputError(inputElement);
            } else if (e.target.id === "vatNumSeller" && e.target.value.length == 11) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "inputAddressSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "inputAddressSeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "inputCitySeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "inputCitySeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "inputStateSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "inputStateSeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "inputZipSeller" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "inputZipSeller" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            //elementi SIGN UP customer
            if (e.target.id === "nameCustomer" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "nameCustomer" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "lastNameCustomer" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "lastNameCustomer" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "emailCustomer" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "emailCustomer" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "pswCustomer" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "pswCustomer" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "psw2Customer" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "psw2Customer" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "dateCustomer" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "dateCustomer" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            //elementi LOGIN
            if (e.target.id === "loginEmail" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "loginEmail" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "loginPassword" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "loginPassword" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }
        })

        inputElement.addEventListener("input", e => {
            clearInput(inputElement);
        })
    })


});

function checkInputsLogin() {

    //LOGIN
    const loginEmail_value = loginEmail.value.trim();
    const loginPassword_value = loginPassword.value.trim();

    if (loginEmail_value === '' || loginPassword_value === '') {
        setFormMessage(loginForm, "error", "Email/Password cannot be blank");
        return false;
    }

    if (!isEmail(loginEmail_value)) {
        setFormMessage(loginForm, "error", 'Not a valid email');
        return false;
    }

    setFormMessage(loginForm, "success", 'Correct');
    return true;

}

function checkInputsCreateAccountSeller() {

    //SIGN UP SELLER
    const nameSeller_value = nameSeller.value.trim();
    const lastNameSeller_value = lastNameSeller.value.trim();
    const emailSeller_value = emailSeller.value.trim();
    const pswSeller_value = pswSeller.value.trim();
    const psw2Seller_value = psw2Seller.value.trim();
    const shopSeller_value = shopSeller.value.trim();
    const cellNumSeller_value = cellNumSeller.value.trim();
    const vatNumSeller_value = vatNumSeller.value.trim();
    const inputAddressSeller_value = inputAddressSeller.value.trim();
    const inputCitySeller_value = inputCitySeller.value.trim();
    const inputStateSeller_value = inputStateSeller.value.trim();
    const inputZipSeller_value = inputZipSeller.value.trim();

    if (nameSeller_value === "" || lastNameSeller_value === "" || emailSeller_value === "" ||
        pswSeller_value === "" || psw2Seller_value === "" || shopSeller_value === "" ||
        cellNumSeller_value === "" || vatNumSeller_value === "" || inputAddressSeller_value === "" ||
        inputCitySeller_value === "" || inputStateSeller_value === "" ||
        inputZipSeller_value === "") {
        setFormMessage(createAccountForm_seller, "error", "Check all the fields");
        return false;
    }

    if (!isEmail(emailSeller_value)) {
        setFormMessage(createAccountForm_seller, "error", 'Not a valid email');
        return false;
    }

    //--
    var jsonObjAsString = localStorage.getItem("json_users");
    const jsonObj = JSON.parse(jsonObjAsString)

    for (var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].email == emailSeller_value) {
            setFormMessage(createAccountForm_seller, "error", 'The email is already used');
            return false;
        }
    }
    //--

    if (pswSeller_value != psw2Seller_value) {
        setFormMessage(createAccountForm_seller, "error", 'Passwords does not match');
        return false;
    }

    if (cellNumSeller_value.length < 7 || cellNumSeller_value.length > 11) {
        setFormMessage(createAccountForm_seller, "error", 'Cell number is incorrect');
        return false;
    }

    if (vatNumSeller_value.length != 11) {
        setFormMessage(createAccountForm_seller, "error", 'VAT number is incorrect');
        return false;
    }
    setFormMessage(createAccountForm_seller, "success", 'The registration was successful, redirect in 3 second');
    localStorage.setItem("logged_user", JSON.stringify(emailSeller_value));
    setTimeout(function() {
        window.location.href = 'page_seller.html';
    }, 3000);
    return true;

}

function checkInputsCreateAccountCustomer() {
    //SIGN UP CUSTOMER
    const nameCustomer_value = nameCustomer.value.trim();
    const lastNameCustomer_value = lastNameCustomer.value.trim();
    const emailCustomer_value = emailCustomer.value.trim();
    const pswCustomer_value = pswCustomer.value.trim();
    const psw2Customer_value = psw2Customer.value.trim();
    const dateCustomer_value = dateCustomer.value.trim();


    if (nameCustomer_value === "" || lastNameCustomer_value === "" || emailCustomer_value === "" ||
        pswCustomer_value === "" || psw2Customer_value === "" || dateCustomer_value === "") {
        setFormMessage(createAccountForm_customer, "error", "Check all the fields");
        return false;
    }

    if (!isEmail(emailCustomer_value)) {
        setFormMessage(createAccountForm_customer, "error", 'Not a valid email');
        return false;
    }

    //--
    var jsonObjAsString = localStorage.getItem("json_users");
    const jsonObj = JSON.parse(jsonObjAsString)

    for (var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].email == emailCustomer_value) {
            setFormMessage(createAccountForm_customer, "error", 'The email is already used');
            return false;
        }
    }
    //--

    if (pswCustomer_value != psw2Customer_value) {
        setFormMessage(createAccountForm_customer, "error", 'Passwords does not match');
        return false;
    }

    if (dateCustomer_value < 16) {
        setFormMessage(createAccountForm_customer, "error", 'You cannot use the service if you are under 16 y.o.');
        return false;
    }
    setFormMessage(createAccountForm_customer, "success", 'The registration was successful, redirect in 3 second');
    localStorage.setItem("logged_user", JSON.stringify(emailCustomer_value));
    setTimeout(function() {
        window.location.href = 'choose_film.html';
    }, 3000);
    return true;
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

//FUNC LOGIN PASSAGGIO VALORI
function checkUser() {

    var email = document.getElementById('loginEmail');

    var pwd = document.getElementById('loginPassword');

    results = findEmailMatch(email.value.trim());
    if (results != false) {
        findPwdMatch(pwd.value.trim(), results);
    } else {
        setFormMessage(loginForm, "error", 'The email is not registered');
    }
}


//a funzione salva i dati nel local storage come una unica stringa
function updateLocalStorage() {
    localStorage.setItem("json_users", JSON.stringify(json_users));
    localStorage.setItem("json_seller", JSON.stringify(json_seller));
    localStorage.setItem("json_customer", JSON.stringify(json_customer));
}

function findEmailMatch(email) {
    //prende l'elemento dallo storage
    var jsonObjAsString = localStorage.getItem("json_users");

    //lo ritraduce in object --> più semplici i controlli
    const jsonObj = JSON.parse(jsonObjAsString)

    for (var i = 0; i < jsonObj.length; i++) {

        if (jsonObj[i].email == email) {
            result = JSON.stringify(jsonObj[i]);

            return jsonObj[i];
        }
    }
    return false;
}

function findPwdMatch(pwd, obj) {
    console.log(pwd);
    console.log(obj);
    console.log(obj.pwd);
    if (obj.password == pwd) {
        setFormMessage(loginForm, "success", 'The login was successful, redirect in 3 second');
        localStorage.setItem("logged_user_email", JSON.stringify(obj.email));
        setTimeout(function() {
            if (obj.role.trim() == "customer") {
                window.location.href = 'choose_film.html';
            } else {
                window.location.href = 'page_seller.html';
            }
        }, 3000);
    } else {
        setFormMessage(loginForm, "error", 'The password is incorrect');
    }

}

function findRole(role) {
    //prende l'elemento dallo storage
    var jsonObjAsString = localStorage.getItem("json_users");
    //lo ritraduce in object --> più semplici i controlli
    const jsonObj = JSON.parse(jsonObjAsString)

    for (var i = 0; i < jsonObj.length; i++) {
        if (jsonObj[i].role == role) {
            return jsonObj[i].role;
        }
    }
    return "Not Found";
}

function addUserLogin(email, pwd, role) {
    //var che serve per riprendere la struttura dell'array json "json_user"
    var obj = {}
    obj['email'] = email;
    obj['password'] = pwd;
    obj['role'] = role;

    json_users.push(obj);
    updateLocalStorage();
}

function addUserSeller() {
    const nameSeller_value = nameSeller.value.trim();
    const lastNameSeller_value = lastNameSeller.value.trim();
    const emailSeller_value = emailSeller.value.trim();
    const pswSeller_value = pswSeller.value.trim();
    const shopSeller_value = shopSeller.value;
    const cellNumSeller_value = cellNumSeller.value.trim();
    const vatNumSeller_value = vatNumSeller.value.trim();
    const inputAddressSeller_value = inputAddressSeller.value;
    const inputAddress2Seller_value = inputAddress2Seller.value.trim();
    const inputCitySeller_value = inputCitySeller.value.trim();
    const inputStateSeller_value = inputStateSeller.value.trim();
    const inputZipSeller_value = inputZipSeller.value.trim();

    var obj = {}
    obj['name'] = nameSeller_value;
    obj['lastName'] = lastNameSeller_value;
    obj['email'] = emailSeller_value;
    obj['shopName'] = shopSeller_value
    obj['cellNumber'] = cellNumSeller_value;
    obj['vatNumber'] = vatNumSeller_value;
    obj['address'] = inputAddressSeller_value;
    obj['address2'] = inputAddress2Seller_value;
    obj['city'] = inputCitySeller_value;
    obj['state'] = inputStateSeller_value;
    obj['zip'] = inputZipSeller_value;
    obj['password'] = pswSeller_value;

    json_seller.push(obj);
    updateLocalStorage();
}

function addUserCustomer() {
    const nameCustomer_value = nameCustomer.value.trim();
    const lastNameCustomer_value = lastNameCustomer.value.trim();
    const emailCustomer_value = emailCustomer.value.trim();
    const pswCustomer_value = pswCustomer.value.trim();
    const dateCustomer_value = dateCustomer.value.trim();

    var obj = {}
    obj['name'] = nameCustomer_value;
    obj['lastName'] = lastNameCustomer_value;
    obj['email'] = emailCustomer_value;
    obj['age'] = dateCustomer_value;
    obj['password'] = pswCustomer_value;

    json_customer.push(obj);
    updateLocalStorage();
}