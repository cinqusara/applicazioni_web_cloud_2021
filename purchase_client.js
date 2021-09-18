var boxStatistics = document.getElementById('box_statistics');
var loggedUserEmail = localStorage.getItem("logged_user_email");
var loggedUserEmailObj = JSON.parse(loggedUserEmail);
var jsonObjAsString = localStorage.getItem("json_users");
var jsonObj = JSON.parse(jsonObjAsString);

boxStatistics.innerHTML = ` `
jsonObj.forEach(user => {
    if (user.email.trim() == loggedUserEmailObj) {
        allStat = user.purchase_history;
        const reversStat = reverseArray(allStat);
        for (var i = 0; i < reversStat.length; i++) {
            const boxStat = document.createElement('div');
            boxStat.innerHTML = ` 
                        <b>Shop: </b> ${reversStat[i].seller}<br>
                        <b>Film: </b> ${reversStat[i].title}<br>
                        <b>Price: </b> ${reversStat[i].price}<br>
                        <b>Purchase mode: </b> ${reversStat[i].buying}
                        <br>
                        <button class = "btn btn-heart" id = "btn-watch-now">
                        <i class="bi bi-play-btn-fill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
                        <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                        </svg></i>
                        </button>&nbsp;&nbsp;
                        <br><br>
                    `

            boxStatistics.appendChild(boxStat);
            get_button_video(reversStat[i].day, reversStat[i].buying)
        }
    }
})

function reverseArray(arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    return newArr;
}

function get_button_video(dayPurchase, methods) {

    var threeDays = 259200000;
    var data = new Date();
    var today = data.getTime();

    var films_deadline = dayPurchase + threeDays

    if (methods == 'rental') {
        if (today > films_deadline) {
            var btn = document.getElementById("btn-watch-now");
            btn.disabled = true;
        }
    }
}