
import axios from "axios"
export function template(){
    console.log("coucou");
    let name = document.getElementById("name").value;
    let forname = document.getElementById("forname").value;
    let age = document.getElementById("age").value;
    let profession = document.getElementById("profession").value;
    let data = {
        name, forname, age, profession
    };
    axios.post("/template", data).then((response) => {
        console.log(response.data);
        console.log("test");
        document.getElementsByTagName("body")[0].innerHTML = response.data;
    })
}