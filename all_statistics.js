var boxStatistics = document.getElementById('box_statistics');
var loggedUserEmail = localStorage.getItem("logged_user_email");
var loggedUserEmailObj = JSON.parse(loggedUserEmail);
var jsonObjAsString = localStorage.getItem("json_users");
var jsonObj = JSON.parse(jsonObjAsString);

boxStatistics.innerHTML = ` `
jsonObj.forEach(user => {
    if (user.email.trim() == loggedUserEmailObj) {
        allStat = user.statistics;
        console.log(user.statistics)
        const reversStat = reverseArray(allStat);
        console.log(reversStat)
        for (var i = 0; i < reversStat.length; i++) {
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

function reverseArray(arr) {
    let newArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        newArr.push(arr[i]);
    }
    return newArr;
}