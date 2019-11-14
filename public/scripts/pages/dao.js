import axios from "axios";
var input, dao, userTable, userNameInput, userFirstNameInput, userAgeInput, userMailInput;


window.onload = () => {
    //select();
    userTable = document.getElementById("tableUtilisateur");
    userNameInput = document.getElementById("userNameInput");
    userFirstNameInput = document.getElementById("userFirstNameInput");
    userAgeInput = document.getElementById("userAgeInput");
    userMailInput = document.getElementById("userMailInput");

}

export function insert() {
    axios.post("http://localhost:3000/dao_insert", { userName: userNameInput.value, userFirstName: userFirstNameInput.value, userAge: userAgeInput.value, userMail: userMailInput.value }).then(response => {
        if (response.data.status) {
            console.log(response.data);
        } else {

        }
    });
}

function select() {
    axios.post("http://localhost:3000/dao/select", { userName: userNameInput.value, userFirstName: userFirstNameInput.value, userAge: userAgeInput.value, userMail: userMailInput.value }).then(response => {
        if (response.data.status) {
            display(response.data);
           
        } else {

        }
    });
}

function select_sorted() {
    axios.post("http://localhost:3000/dao/sort", { userName: userNameInput.value, userFirstName: userFirstNameInput.value, userAge: userAgeInput.value, userMail: userMailInput.value }).then(response => {
        if (response.data.status) {
            console.log(response.data);
        } else {

        }
    });
}

function display(data){

}




