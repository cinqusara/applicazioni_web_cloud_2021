var loggedUserEmail = localStorage.getItem("logged_user_email");
var loggedUserEmailObj = JSON.parse(loggedUserEmail);
var jsonObjAsString = localStorage.getItem("json_users");
var jsonObj = JSON.parse(jsonObjAsString);

var jsonSellerAsString = localStorage.getItem("json_seller");
var jsonSellerObj = JSON.parse(jsonSellerAsString);

const infoAccount = document.getElementById("info-account")
const title = document.getElementById("title")
const accountNav = document.getElementById("account-content")


get_info();

function get_info() {
    jsonSellerObj.forEach(user => {
        if (user.email.trim() == loggedUserEmailObj) {
            console.log(user)
            infoAccount.innerHTML = `
                    <h3>My Account</h3>
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
        }
    });
}


function openNav() {
    document.getElementById("account-nav").style.width = "100%";
    accountNav.innerHTML = `
                    <p class = "info-account">Manage your information, privacy and security to better adapt Only Movie to your needs</p>   
                    <form class="seller_changes" action="" method="post" name="seller_changes" id="seller_changes">
                    <div class="formMsg formMsg--error"></div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleName" class="form-label">Name</label>
                        <input type="text" class="form-control account-input" id="nameSeller" name="nameSeller">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleLastName" class="form-label">Last Name</label>
                        <input type="text" class="form-control account-input" id="lastNameSeller" name="lastNameSeller">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control account-input" id="emailSeller" name="emailSeller" aria-describedby="emailHelp">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleShopName" class="form-label">Shop Name</label>
                        <input type="text" class="form-control account-input" id="shopSeller" name="shopSeller">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleNumber" class="form-label">Cell Number</label>
                        <input type="number" class="form-control account-input" id="cellNumSeller" name="cellNumSeller">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleNumber" class="form-label">VAT number</label>
                        <input type="number" minlength="11" maxlength="11" class="form-control account-input" id="vatNumSeller" name="vatNumSeller">
                        <div class="formInput--errorMsg"> </div>
                    </div>

                    <div class="col-12 formInput-group form-account-changes">
                        <label for="inputAddress" class="form-label">Address</label>
                        <input type="text" class="form-control account-input" id="inputAddressSeller" placeholder="1234 Main St">
                    </div>
                    <div class="col-12 formInput-group form-account-changes">
                        <label for="inputAddress2" class="form-label">Address 2</label>
                        <input type="text" class="form-control account-input" id="inputAddress2Seller" placeholder="Apartment, studio, or floor">
                    </div>
                    <div class="col-md-6 formInput-group form-account-changes">
                        <label for="inputCity" class="form-label">City</label>
                        <input type="text" class="form-control account-input" id="inputCitySeller">
                    </div>
                    <div class="col-md-4 formInput-group form-account-changes">
                        <label for="inputState" class="form-label">State</label>
                        <input type="text" class="form-control account-input" id="inputStateSeller">
                    </div>
                    <div class="col-md-2 formInput-group form-account-changes">
                        <label for="inputZip" class="form-label">Zip</label>
                        <input type="text" class="form-control account-input" id="inputZipSeller">
                    </div>

                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control account-input" name="pswSeller" id="pswSeller">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <div class="mb-3 formInput-group form-account-changes">
                        <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control account-input" name="psw2Seller" id="psw2Seller">
                        <div class="formInput--errorMsg"> </div>
                    </div>
                    <br>
                    <br>
                    <button type="submit" value="submit" id ="submitChanges" class="btn btn-primary">Submit</button>
                </form>

    `
}

function closeNav() {
    document.getElementById("account-nav").style.width = "0%";
}

// function checkInputstSeller() {

//     const nameSeller_value = nameSeller.value.trim();
//     const lastNameSeller_value = lastNameSeller.value.trim();
//     const emailSeller_value = emailSeller.value.trim();
//     const pswSeller_value = pswSeller.value.trim();
//     const psw2Seller_value = psw2Seller.value.trim();
//     const shopSeller_value = shopSeller.value.trim();
//     const cellNumSeller_value = cellNumSeller.value.trim();
//     const vatNumSeller_value = vatNumSeller.value.trim();
//     const inputAddressSeller_value = inputAddressSeller.value.trim();
//     const inputCitySeller_value = inputCitySeller.value.trim();
//     const inputStateSeller_value = inputStateSeller.value.trim();
//     const inputZipSeller_value = inputZipSeller.value.trim();

//     if (nameSeller_value === "" || lastNameSeller_value === "" || emailSeller_value === "" ||
//         pswSeller_value === "" || psw2Seller_value === "" || shopSeller_value === "" ||
//         cellNumSeller_value === "" || vatNumSeller_value === "" || inputAddressSeller_value === "" ||
//         inputCitySeller_value === "" || inputStateSeller_value === "" ||
//         inputZipSeller_value === "") {
//         setFormMessage(createAccountForm_seller, "error", "Check all the fields");
//         return false;
//     }

//     if (!isEmail(emailSeller_value)) {
//         setFormMessage(createAccountForm_seller, "error", 'Not a valid email');
//         return false;
//     }

//     //--
//     var jsonObjAsString = localStorage.getItem("json_users");
//     const jsonObj = JSON.parse(jsonObjAsString)

//     for (var i = 0; i < jsonObj.length; i++) {
//         if (jsonObj[i].email == emailSeller_value) {
//             setFormMessage(createAccountForm_seller, "error", 'The email is already used');
//             return false;
//         }
//     }
//     //--

//     if (pswSeller_value != psw2Seller_value) {
//         setFormMessage(createAccountForm_seller, "error", 'Passwords does not match');
//         return false;
//     }

//     if (cellNumSeller_value.length < 7 || cellNumSeller_value.length > 11) {
//         setFormMessage(createAccountForm_seller, "error", 'Cell number is incorrect');
//         return false;
//     }

//     if (vatNumSeller_value.length != 11) {
//         setFormMessage(createAccountForm_seller, "error", 'VAT number is incorrect');
//         return false;
//     }
//     setFormMessage(createAccountForm_seller, "success", 'The registration was successful, redirect in 3 second');
//     localStorage.setItem("logged_user", JSON.stringify(emailSeller_value));
//     setTimeout(function() {
//         window.location.href = 'page_seller.html';
//     }, 3000);
//     return true;

// }

document.getElementById("account").addEventListener("click", () => {
    openNav();
})