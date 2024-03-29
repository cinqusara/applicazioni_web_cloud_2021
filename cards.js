const json_users = JSON.parse(localStorage.getItem("json_users"))
const loggedEmail = JSON.parse(localStorage.getItem("logged_user_email"))

const boxCards = document.getElementById('cards');
const zero_cards = document.getElementById('zero_cards');
const list_cards = document.getElementById('list_cards');

const cart = document.getElementById('cart');



client_cards();

function client_cards() {
    var countClick = 0;
    json_users.forEach(user => {
        if (user.email == loggedEmail) {
            var clientCards = user.cards
            if (clientCards.length == 0) {
                zero_cards.innerHTML =
                    `In order to purchase the film, you need to add a card
                `
            } else {
                clientCards.forEach(card => {
                    const div_card = document.createElement('div');
                    div_card.innerHTML = `
                        <b>Card number:</b> ${card.ccnum} &nbsp;<b>Full Name:</b> ${card.cname} &nbsp; <button class = "use-card" id ="${card.ccnum}">Use this card</button><br>
                        `
                    list_cards.appendChild(div_card);
                    document.getElementById(card.ccnum).addEventListener("click", () => {
                        countClick++;
                        create_cart(countClick, card.ccnum);
                        check_toggle_card(card.ccnum);
                    })
                });
            }
        }
    });

    document.getElementById('new_card').addEventListener("click", () => {
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
    if (check_new_card() == true) {
        commitChanges();
        setTimeout(function() {
            window.location.href = 'card_payment.html';
        }, 3000);
    }
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

    var find_card = false

    const users = JSON.parse(localStorage.getItem("json_users"))
    users.forEach(u => {
        if (u.email.trim() == loggedEmail) {
            var cards = u.cards
            cards.forEach(c => {
                if (ccnum_value == c.ccnum) {
                    find_card = true;
                }
            });
        }
    })

    if (find_card == true) {
        setFormMessage(form_new_card, "error", "This card is already registered");
        return false;
    }

    var today = new Date()

    if (cname_value === "" || ccnum_value === "" || expmonth_value === "" ||
        expyear_value === "" || cvv_value === "") {
        setFormMessage(form_new_card, "error", "Check all the fields");
        return false;
    }

    if (ccnum_value.length < 13 || ccnum_value.length > 16) {
        setFormMessage(form_new_card, "error", 'The credit card number is incorrect');
        return false;
    }

    if (expmonth_value > 12) {
        setFormMessage(form_new_card, "error", 'The month entered is incorrect');
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
    setFormMessage(form_new_card, "success", 'The update was successful, redirect in 3 seconds');
    return true;
}

function commitChanges() {
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

    var obj = {}

    obj['cname'] = cname_value;
    obj['ccnum'] = ccnum_value;
    obj['expmonth'] = expmonth_value;
    obj['expyear'] = expyear_value;
    obj['cvv'] = cvv_value;

    json_users.forEach(user => {
        if (user.email.trim() == loggedEmail) {
            user.cards.push(obj)
        }
    })
    localStorage.setItem("json_users", JSON.stringify(json_users));
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

function create_cart(count, numCard) {
    var products = document.getElementById('products')
    json_users.forEach(user => {
        if (user.email.trim() == loggedEmail) {
            if (count == 1) {
                var lastMovieBought = user.bought_movies.pop();
                localStorage.setItem("last_movie_bought", JSON.stringify(lastMovieBought))
            }
            const lastBought = JSON.parse(localStorage.getItem("last_movie_bought"))
            products.innerHTML = `
            <div>
                <b>Title:</b> ${lastBought.title} 
                <br>
                <b>Price:</b> ${lastBought.price} 
                <br><br>
                <p><b>Card:</b> ${numCard}  </p>
                <hr width = "300">
                <p><b>Total: </b>${lastBought.price}  </p>
               
            </div>
            <br>
            <button class="btn btn-heart" id="pay_with_card">Pay</button>
            <br><br>
            <div id = "payment-successfull"></div>
            `

            document.getElementById('pay_with_card').addEventListener("click", () => {
                pay_success(lastBought);
                document.getElementById('pay_with_card').classList.add('pay_with_card_true')
                var message = document.getElementById('payment-successfull');
                message.innerHTML = `
                    <span id = "message-successfull"><i>Thanks for your purchase!</i><br>If you want to continue shopping, go back to the store section</span>
                    `

            })
        }
    })
}

function check_toggle_card(num) {
    const tags = document.querySelectorAll('.use-card');
    tags.forEach(tag => {
        tag.classList.remove('useThisCard')
    })

    const toToggle = document.getElementById(num);
    toToggle.classList.add('useThisCard')
}

function pay_success(lastBought) {

    var t = new Date();

    var last_client = {}
    last_client['email'] = loggedEmail;
    last_client['film'] = lastBought.title;
    last_client['price'] = lastBought.price;
    last_client['buying'] = lastBought.buying;
    last_client['id'] = lastBought.id

    var last_film_bought = {}
    last_film_bought['title'] = lastBought.title
    last_film_bought['seller'] = lastBought.email_seller
    last_film_bought['day'] = t.getTime();
    last_film_bought['price'] = lastBought.price
    last_film_bought['buying'] = lastBought.buying;
    last_film_bought['id'] = lastBought.id

    json_users.forEach(user => {
        if (user.email.trim() == loggedEmail) {
            user.purchase_history.push(last_film_bought)


        }

        if (user.email.trim() == lastBought.email_seller) {
            user.statistics.push(last_client)
        }
    })
    localStorage.setItem("json_users", JSON.stringify(json_users))
}