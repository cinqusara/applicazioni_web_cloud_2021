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
    "role": "customer"
}, {
    "email": "marco.verdi@libero.it",
    "password": "mverdi!",
    "role": "seller"
}]

updateLocalStorage();




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
            checkUser();
        }
        setFormMessage(createAccountForm_seller, "submit", "submit");
        setFormMessage(createAccountForm_customer, "submit", "submit");
    })

    createAccountForm_seller.addEventListener("submit", event => {
        event.preventDefault();
        checkInputsCreateAccountSeller();
        console.log(checkInputsCreateAccountSeller());
        setFormMessage(loginForm, "submit", "submit");
    })

    createAccountForm_customer.addEventListener("submit", event => {
        event.preventDefault();
        checkInputsCreateAccountCustomer();
        console.log(checkInputsCreateAccountCustomer());
        setFormMessage(loginForm, "submit", "submit");
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
    console.log("siamo in check input customer");
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
    setFormMessage(createAccountForm_seller, "success", 'Correct');
    return true;

}

function checkInputsCreateAccountCustomer() {
    console.log("siamo in check input customer");
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

    if (pswCustomer_value != psw2Customer_value) {
        setFormMessage(createAccountForm_customer, "error", 'Passwords does not match');
        return false;
    }

    if (dateCustomer_value < 16) {
        setFormMessage(createAccountForm_customer, "error", 'You cannot use the service if you are under 16 y.o.');
        return false;
    }
    setFormMessage(createAccountForm_customer, "success", 'Correct');
    return true;
}

function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

//FUNC LOGIN PASSAGGIO VALORI
function checkUser() {
    var email = document.getElementById('loginEmail');
    console.log(email.value);
    var pwd = document.getElementById('loginPassword');
    console.log(pwd.value);

    if (findEmailMatch(email.value.trim()) == true) {
        console.log("trovato match")
    } else {
        console.log("nessun match")
    }
}


//a funzione salva i dati nel local storage come una unica stringa
function updateLocalStorage() {
    localStorage.setItem("json_users", JSON.stringify(json_users))
}



function findEmailMatch(email) {
    //prende l'elemento dallo storage
    var jsonObjAsString = localStorage.getItem("json_users");

    //lo ritraduce in object --> più semplici i controlli
    const jsonObj = JSON.parse(jsonObjAsString)

    for (var i = 0; i < jsonObj.length; i++) {
        console.log(jsonObj[i].email)
        if (jsonObj[i].email == email) {
            return true;
        }
    }
    return false;
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


function addUser(email, pwd, role) {
    //var che serve per riprendere la struttura dell'array json "json_user"
    var obj = {}
    obj['email'] = email;
    obj['pwd'] = pwd;
    obj['role'] = role;

    json_users.push(obj);
    updateLocalStorage();
}