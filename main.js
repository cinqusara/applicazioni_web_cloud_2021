const loginForm = document.getElementById('login');
const createAccountForm = document.getElementById('createAccount');

const signUpName = document.getElementById('signUpName');
const signUpLastName = document.getElementById('signUpLastName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const signUpConfirmPassword = document.getElementById('signUpConfirmPassword');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

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
    const createAccountForm = document.querySelector("#createAccount");

    //quando clicchi sul link per creare l'account: la login si nascone e viene mostrata la sign up
    document.querySelector("#linkCreateAccount").addEventListener("click", event => {
        event.preventDefault(); //previene di tornare sulla pagina in cui siamo già
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    })

    //quando clicchi sul link per login
    document.querySelector("#linkLogin").addEventListener("click", event => {
        event.preventDefault();
        createAccountForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    loginForm.addEventListener("submit", event => {
        event.preventDefault();
        checkInputs();
        setFormMessage(createAccountForm, "submit", "submit");
    })

    createAccountForm.addEventListener("submit", event => {
        event.preventDefault();
        checkInputs();
        setFormMessage(loginForm, "submit", "submit");
    })


    //selezione gli elementi della classe formInput, e per ognuno ...
    //... controlla se sono stati compilati i campi
    document.querySelectorAll(".formInput").forEach(inputElement => {

        inputElement.addEventListener("blur", e => {

            //elementi SIGN UP
            if (e.target.id === "signUpName" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "signUpName" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "signUpLastName" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "signUpLastName" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "signUpEmail" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "signUpEmail" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "signUpPassword" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "signUpPassword" && e.target.value.length > 0) {
                setInputSuccess(inputElement);
            }

            if (e.target.id === "signUpConfirmPassword" && e.target.value.length == 0) {
                setInputError(inputElement);
            } else if (e.target.id === "signUpConfirmPassword" && e.target.value.length > 0) {
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

function checkInputs() {

    // trim to remove the whitespaces

    const loginEmail_value = loginEmail.value.trim();
    const loginPassword_value = loginPassword.value.trim();

    if (loginEmail_value === '' || loginPassword_value === '') {
        setFormMessage(loginForm, "error", "Email/Password cannot be blank");

    } else if (!isEmailLogin(loginEmail_value)) {
        setFormMessage(loginForm, "error", 'Not a valid email');
    } else {
        setFormMessage(loginForm, "success", 'Correct');
    }

    const signUpName_value = signUpName.value.trim();
    const signUpLastName_value = signUpLastName.value.trim();
    const signUpEmail_value = signUpEmail.value.trim();
    const signUpPassword_value = signUpPassword.value.trim();
    const signUpConfirmPassword_value = signUpConfirmPassword.value.trim();

    if (signUpEmail_value === "" || signUpLastName_value === "" || signUpName_value === "" || signUpPassword_value === "" || signUpConfirmPassword_value === "") {
        setFormMessage(createAccountForm, "error", "Check all the fields");
    } else if (!isEmailSignUp(signUpEmail_value)) {
        console.log("siamo nella email");
        setFormMessage(createAccountForm, "error", 'Not a valid email');
    } else if (signUpConfirmPassword_value != signUpPassword_value) {
        setFormMessage(createAccountForm, "error", 'Passwords does not match');
    } else {
        setFormMessage(createAccountForm, "success", 'Correct');
    }

}

function isEmailLogin(loginEmail) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(loginEmail);
}

function isEmailSignUp(signUpEmail) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signUpEmail);
}