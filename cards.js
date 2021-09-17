const json_users = JSON.parse(localStorage.getItem("json_users"))
const loggedEmail = JSON.parse(localStorage.getItem("logged_user_email"))

const boxCards = document.getElementById('cards');
const zero_cards = document.getElementById('zero_cards');
const list_cards = document.getElementById('list_cards');



client_cards();

function client_cards() {

    json_users.forEach(user => {
        if (user.email == loggedEmail) {
            var clientCards = user.cards
            console.log(clientCards)
            if (clientCards.length == 0) {
                zero_cards.innerHTML =
                    `In order to purchase the film, you need to add a card
                `
            } else {
                clientCards.forEach(card => {
                    const div_card = document.createElement('div');
                    div_card.innerHTML = `
                    Card number: ${card.cardNumber} Full Name: ${card.fullName}
                    `
                });
            }
        }
    });

    document.getElementById('new_card').addEventListener("click", () => {
        console.log("click")
        openNav_client();
    })
}

function closeNav_client() {
    document.getElementById("nav_cards").style.width = "0%";
}

function openNav_client() {
    document.getElementById("nav_cards").style.width = "100%";
    const form = document.getElementById("form_new_card");
    form.innerHTML = `
    <div class="formMsg formMsg--error"></div>
        <div class="row-card">
            <div class="col-50-card">
                <label for="fname">Accepted Cards</label>
                <br><br>
                <div class="icon-container">
                    <i class="fa fa-cc-visa" style="color:navy;"></i>
                    <i class="fa fa-cc-amex" style="color:blue;"></i>
                    <i class="fa fa-cc-mastercard" style="color:red;"></i>
                    <i class="fa fa-cc-discover" style="color:orange;"></i>
                </div>
           
                <label for="cname">Name on Card</label>
                <input  type="text" id="cname" class = "label-card" name="cardname" placeholder="John More Doe">
                <label  for="ccnum">Credit card number</label>
                <input class = "label-card"  type="number" id="ccnum" name="cardnumber" placeholder="1111222233334444">
                <label for="expmonth">Exp Month</label>
                <input class = "label-card"  type="number" id="expmonth" name="expmonth" placeholder="09">

                <div class="row-card">
                    <div class="col-50-card">
                        <label for="expyear">Exp Year</label>
                        <input class = "label-card"  type="number" id="expyear" name="expyear" placeholder="2024">
                    </div>
                    <div class="col-50-card">
                        <label for="cvv">CVV</label>
                        <input class = "label-card"  type="number" id="cvv" name="cvv" placeholder="352">
                    </div>
                </div>
            </div>
         </div>   
         <button type="submit" value="submit" class="btn-submit-card" id ="btn-submit-card">Add Card</button>
`
}

document.getElementById("form_new_card").addEventListener("submit", event => {
    event.preventDefault();
    console.log("submit")
    check_new_card();
})

function check_new_card() {
    const cname = document.getElementById('cname')
    const ccnum = document.getElementById('ccnum')
    const expmonth = document.getElementById('expmonth')
    const expyear = document.getElementById('expyear')
    const cvv = document.getElementById('cvv')

    const cname_value = cname.value.trim();
    const ccnum_value = ccnum.value.trim();
    const expmonth_value = expmonth.value.trim();
    const expyear_value = expyear.value.trim();
    const cvv_value = cvv.value.trim();

    var today = new Date()
    console.log(today.getFullYear())
    console.log(today.getFullYear())

    if (cname_value === "" || ccnum_value === "" || expmonth_value === "" ||
        expyear_value === "" || cvv_value === "") {
        setFormMessage(form_new_card, "error", "Check all the fields");
        return false;
    }

    if (ccnum_value.length < 13 || ccnum_value.length > 16) {
        setFormMessage(form_new_card, "error", 'The credit card number is incorrect');
        return false;
    }

    if (expyear_value < today.getFullYear()) {
        setFormMessage(form_new_card, "error", 'The year is incorrect');
        return false;
    }

    if (expyear_value == today.getFullYear() && expmonth_value < today.getMonth()) {
        setFormMessage(form_new_card, "error", 'The month is incorrect');
        return false;
    }




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