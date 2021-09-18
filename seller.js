var loggedUserEmail = localStorage.getItem("logged_user_email");
var loggedUserEmailObj = JSON.parse(loggedUserEmail);
var jsonObjAsString = localStorage.getItem("json_users");
var jsonObj = JSON.parse(jsonObjAsString);
var jsonSellerAsString = localStorage.getItem("json_seller");
var jsonSellerObj = JSON.parse(jsonSellerAsString);

const infoAccount = document.getElementById("info-account");
const title = document.getElementById("title");
const accountNav = document.getElementById("account-content");
const formAccount = document.getElementById("seller_changes");
const shop = document.getElementById("shop-name");
const sellerChanges = document.getElementById("seller_changes");
const boxFilms = document.getElementById("box_films");
var boxStatistics = document.getElementById('box-statistics');

get_info();

function get_info() {
    jsonSellerObj.forEach(user => {
        if (user.email.trim() == loggedUserEmailObj) {
            infoAccount.innerHTML = `
                    <h3>General Informations</h3>
                    <b id="name-seller">Name: </b> ${user.shopName} <br>
                    <b id="name-seller">Address: </b> ${user.address} ${user.address2} <br>
                    <b id="name-seller">City: </b> ${user.city} <br>
                     <b id="name-seller">Zip: </b> ${user.zip} <br>
            `

            title.innerHTML = `
                    <br>
                    <h2>Welcome <b>${user.name}</b></h2>
                    <br>
            `

            shop.innerHTML = `
                    <h3>Film in <b>${user.shopName}</b></h3>
            `

            var films = get_film()
            boxFilms.innerHTML = ''

            films.forEach(f => {
                const filmShop = document.createElement('div');
                filmShop.classList.add("film_shop");
                filmShop.innerHTML = `                 
                <b>Title: </b>${f}
            `
                boxFilms.appendChild(filmShop)
            });

            boxStatistics.innerHTML = ` `
            jsonObj.forEach(user => {
                if (user.email.trim() == loggedUserEmailObj) {
                    allStat = user.statistics;
                    const reversStat = reverseArray(allStat);
                    for (var i = 0; i < 4 && i < reversStat.length; i++) {
                        const boxStat = document.createElement('div');
                        boxStat.innerHTML = ` 
                        <b>Client: </b> ${reversStat[i].email}<br>
                        <b>Film: </b> ${reversStat[i].film}<br>
                        <b>Price: </b> ${reversStat[i].price}<br>
                        <b>Purchase mode: </b> ${reversStat[i].buying}
                        <br><br>
                    `
                        boxStatistics.appendChild(boxStat)
                    }
                }
            })
        }
    });

    document.getElementById("allStat_btn").addEventListener("click", () => {
        window.location.href = "all_statistics.html"
    })
}


function openNav() {
    document.getElementById("account-nav").style.width = "100%";

    jsonSellerObj.forEach(user => {
        if (user.email.trim() == loggedUserEmailObj) {
            formAccount.innerHTML = `
            <br>
                    <div class="formMsg formMsg--error"></div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleName" class="form-label">Name</label>
                        <input type="text" class="form-control account-input" id="nameSeller" name="nameSeller" value ="${user.name}">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleLastName" class="form-label">Last Name</label>
                        <input type="text" class="form-control account-input" id="lastNameSeller" name="lastNameSeller" value ="${user.lastName}">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control account-input" id="emailSeller" name="emailSeller" aria-describedby="emailHelp" value ="${user.email}" disabled>
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleShopName" class="form-label">Shop Name</label>
                        <input type="text" class="form-control account-input" id="shopSeller" name="shopSeller" value ="${user.shopName}">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleNumber" class="form-label">Cell Number</label>
                        <input type="number" class="form-control account-input" id="cellNumSeller" name="cellNumSeller" value ="${user.cellNumber}">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleNumber" class="form-label">VAT number</label>
                        <input type="number" minlength="11" maxlength="11" class="form-control account-input" id="vatNumSeller" name="vatNumSeller" value ="${user.vatNumber}">
                        <div class="formInput--errorMsg"> </div>
                    </div>

                    <div class="col-12 formInput-group form-account-changes">
                        <label for="inputAddress" class="form-label">Address</label>
                        <input type="text" class="form-control account-input" id="inputAddressSeller" value ="${user.address}">
                    </div>
                    <div class="col-12 formInput-group form-account-changes">
                        <label for="inputAddress2" class="form-label">Address 2</label>
                        <input type="text" class="form-control account-input" id="inputAddress2Seller" value ="${user.address2}">
                    </div>
                    <div class="col-md-6 formInput-group form-account-changes">
                        <label for="inputCity" class="form-label">City</label>
                        <input type="text" class="form-control account-input" id="inputCitySeller" value ="${user.city}">
                    </div>
                    <div class="col-md-4 formInput-group form-account-changes">
                        <label for="inputState" class="form-label">State</label>
                        <input type="text" class="form-control account-input" id="inputStateSeller" value ="${user.state}">
                    </div>
                    <div class="col-md-2 formInput-group form-account-changes">
                        <label for="inputZip" class="form-label">Zip</label>
                        <input type="text" class="form-control account-input" id="inputZipSeller" value ="${user.zip}">
                    </div>

                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleInputPassword1" class="form-label">Old Password</label>
                        <input type="password" class="form-control account-input" name="oldPswSeller" id="oldPswSeller">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                    <label for="exampleInputPassword1" class="form-label">New Password</label>
                    <input type="password" class="form-control account-input" name="pswSeller" id="pswSeller">
                    <div class="formInput--errorMsg"> </div>
                </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleInputPassword1" class="form-label">Confirm New Password</label>
                        <input type="password" class="form-control account-input" name="psw2Seller" id="psw2Seller">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <br>
                    <br>
                    <button type="submit" value="submit" id ="submitChanges" class="btn btn-primary">Submit</button>
`
        }
    })

}

function closeNav() {
    document.getElementById("account-nav").style.width = "0%";
}

document.getElementById("account").addEventListener("click", () => {
    openNav();
})

document.getElementById("shop").addEventListener("click", () => {
    window.location.href = "shop_seller.html";
})

function checkInputstSeller() {

    var oldPsw = '';

    jsonObj.forEach(user => {
        if (user.email == loggedUserEmailObj) {
            oldPsw = user.password
        }
    });

    const nameSeller = document.getElementById('nameSeller');
    const lastNameSeller = document.getElementById('lastNameSeller');
    const oldPswSeller = document.getElementById('oldPswSeller');
    const pswSeller = document.getElementById('pswSeller');
    const psw2Seller = document.getElementById('psw2Seller');
    const shopSeller = document.getElementById('shopSeller');
    const cellNumSeller = document.getElementById('cellNumSeller');
    const vatNumSeller = document.getElementById('vatNumSeller');
    const inputAddressSeller = document.getElementById('inputAddressSeller');
    const inputStateSeller = document.getElementById('inputStateSeller');
    const inputZipSeller = document.getElementById('inputZipSeller');

    const nameSeller_value = nameSeller.value.trim();
    const lastNameSeller_value = lastNameSeller.value.trim();
    const oldPswSeller_value = oldPswSeller.value.trim();
    const pswSeller_value = pswSeller.value.trim();
    const psw2Seller_value = psw2Seller.value.trim();
    const shopSeller_value = shopSeller.value.trim();
    const cellNumSeller_value = cellNumSeller.value.trim();
    const vatNumSeller_value = vatNumSeller.value.trim();
    const inputAddressSeller_value = inputAddressSeller.value.trim();
    const inputCitySeller_value = inputCitySeller.value.trim();
    const inputStateSeller_value = inputStateSeller.value.trim();
    const inputZipSeller_value = inputZipSeller.value.trim();

    if (nameSeller_value === "" || lastNameSeller_value === "" || oldPswSeller_value === "" ||
        pswSeller_value === "" || psw2Seller_value === "" || shopSeller_value === "" ||
        cellNumSeller_value === "" || vatNumSeller_value === "" || inputAddressSeller_value === "" ||
        inputCitySeller_value === "" || inputStateSeller_value === "" ||
        inputZipSeller_value === "") {
        setFormMessage(sellerChanges, "error", "Check all the fields");
        return false;
    }

    if (pswSeller_value == oldPsw) {
        setFormMessage(sellerChanges, "error", 'You have not entered a new valid password');
        return false;
    }

    if (pswSeller_value != psw2Seller_value) {
        setFormMessage(sellerChanges, "error", 'Passwords does not match');
        return false;
    }

    if (oldPswSeller_value != oldPsw) {
        setFormMessage(sellerChanges, "error", 'Your current password is incorrect');
        return false;
    }

    if (cellNumSeller_value.length < 7 || cellNumSeller_value.length > 11) {
        setFormMessage(sellerChanges, "error", 'Cell number is incorrect');
        return false;
    }

    if (vatNumSeller_value.length != 11) {
        setFormMessage(sellerChanges, "error", 'VAT number is incorrect');
        return false;
    }
    setFormMessage(sellerChanges, "success", 'The update was successful');

    return true;

}

function setFormMessage(formElement, type, message) {

    const messageElement = formElement.querySelector(".formMsg");

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

function commitChanges() {
    const nameSeller = document.getElementById('nameSeller');
    const lastNameSeller = document.getElementById('lastNameSeller');
    const pswSeller = document.getElementById('pswSeller');
    const shopSeller = document.getElementById('shopSeller');
    const cellNumSeller = document.getElementById('cellNumSeller');
    const vatNumSeller = document.getElementById('vatNumSeller');
    const inputAddressSeller = document.getElementById('inputAddressSeller');
    const inputAddress2Seller = document.getElementById('inputAddress2Seller');
    const inputStateSeller = document.getElementById('inputStateSeller');
    const inputZipSeller = document.getElementById('inputZipSeller');

    const nameSeller_value = nameSeller.value.trim();
    const lastNameSeller_value = lastNameSeller.value.trim();
    const pswSeller_value = pswSeller.value.trim();
    const shopSeller_value = shopSeller.value.trim();
    const cellNumSeller_value = cellNumSeller.value.trim();
    const vatNumSeller_value = vatNumSeller.value.trim();
    const inputAddressSeller_value = inputAddressSeller.value.trim();
    const inputAddress2Seller_value = inputAddress2Seller.value.trim();
    const inputCitySeller_value = inputCitySeller.value.trim();
    const inputStateSeller_value = inputStateSeller.value.trim();
    const inputZipSeller_value = inputZipSeller.value.trim();

    jsonSellerObj.forEach(user => {
        if (user.email.trim() == loggedUserEmailObj) {
            user.name = nameSeller_value
            user.lastName = lastNameSeller_value
            user.shopName = shopSeller_value
            user.cellNumber = cellNumSeller_value
            user.vatNumber = vatNumSeller_value
            user.address = inputAddressSeller_value
            user.address2 = inputAddress2Seller_value
            user.city = inputCitySeller_value
            user.state = inputStateSeller_value
            user.zip = inputZipSeller_value

            updateLocalStorage();
        }
    })

    jsonObj.forEach(user => {
        if (user.email.trim() == loggedUserEmailObj) {
            user.password = pswSeller_value
        }
    });
    updateLocalStorage();
}



document.getElementById("seller_changes").addEventListener("submit", event => {
    event.preventDefault();
    if (checkInputstSeller() == true) {
        commitChanges();
    }
})

function updateLocalStorage() {
    localStorage.setItem("json_seller", JSON.stringify(jsonSellerObj));
    localStorage.setItem("json_users", JSON.stringify(jsonObj));
}

function get_film() {
    var films = []
    jsonObj.forEach(user => {
        if (user.email.trim() == loggedUserEmailObj) {
            shopFilm = user.shop;
            if (user.shop != undefined) {
                shopFilm.forEach(f => {
                    films.push(f.title)
                });
            }
        }
    })
    return films

}

function get_statistics() {
    var stat = []
    jsonObj.forEach(user => {
        if (user.email.trim() == loggedUserEmailObj) {
            allStat = user.statistics;
            if (user.statistics != undefined) {
                return allStat
            }
        }
    })
    return
}

function reverseArray(arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    return newArr;
}

document.getElementById("sumbitDeleteAccount").addEventListener("click", () => {
    setFormMessage(formAccount, "error", 'Your account is about to be deleted');
    detele_account();
    setTimeout(function() {
        window.location.href = 'home2.html';
    }, 3000);
})

document.getElementById("logOutAccount").addEventListener("click", () => {
    setFormMessage(formAccount, "error", 'You will be logged out');
    setTimeout(function() {
        window.location.href = 'home2.html';
    }, 3000);
})


function detele_account() {
    var list_users = []
    var list_seller = []
    jsonObj.forEach(user => {
        if (user.email != loggedUserEmailObj) {
            list_users.push(user);
        }
    })

    jsonSellerObj.forEach(user => {
        if (user.email != loggedUserEmailObj) {
            list_seller.push(user);
        }
    })

    localStorage.setItem("json_users", JSON.stringify(list_users));
    localStorage.setItem("json_seller", JSON.stringify(list_seller));
}