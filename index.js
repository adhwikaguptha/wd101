let element = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let user_entries = [];

function fillTable(){
    let obj = localStorage.getItem("user_entries");
    if(obj){
        user_entries = JSON.parse(obj);
    }else{
        user_entries = [];
    }
    return user_entries;
}
user_entries = fillTable();

let username = element("uname"),
  email = element("email"),
  password = element("password"),
  phone=element("phn"),
  confirmpassword=element("cpassword"),
  tc = element("tc"),
  dob = element("dateofbirth");

let errormsg = classes("errormsg");

let form = element("form");

function verify(elem,message,cnd){
    if(cnd){
        elem.style.border = "2px solid red";
        elem.setCustomValidity(message);
        elem.reportValidity();
    }else{
        elem.style.border = "2px solid green";
        elem.setCustomValidity('');

    }
}

function checkDOB(){
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if(age < 18 || age>55){
        return false;
    }else{
        return true;
    }
}
let message_name = "Username must be at least 3 characters long";
let message_email = "Email must be valid";
let message_phn="phone number must be 10 digits";
let message_agree = "You must agree to the terms and conditions";
let message_confirmpassword="password doesnt match";
let message_dob = "You age must be between 18 and 55 to continue";

username.addEventListener("input", (e) => {
    let cond_name = username.value.length < 3;
    e.preventDefault();
    verify(username,message_name,cond_name);
});

email.addEventListener("input", (e) => {
    let cond_email = !(email.value.includes("@") && email.value.includes("."));
    e.preventDefault();
    verify(email,message_email,cond_email);
});

phone.addEventListener("input", (e) => {
    let cond_phone = phone.value.length < 10;
    e.preventDefault();
    verify(phone,message_phn,cond_phone);
});

confirmpassword.addEventListener("input", (e) => {
    let cond_cpassword = password===confirmpassword;
    e.preventDefault();
    verify(confirmpassword,message_confirmpassword,cond_cpassword);
});

dob.addEventListener("input", (e) => {
    let cond_dob = !checkDOB();
    e.preventDefault();
    verify(dob,message_dob,cond_dob);
});
tc.addEventListener("input", (e) => {
    let cond_agree = !tc.checked;
    e.preventDefault();
    verify(tc,message_agree,cond_agree);
});

function makeObject(){
    let check = false;
    if(tc.checked){
        check = true;
    }
    let obj = {
        name: uname.value,
        email: email.value,
        password: password.value,
        dob: dateofbirth.value,
        checked: check
    }
    return obj;
}


function displayTable(){
    let table = element("user-table");
    let entries = user_entries;
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Phone number</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for(let i=0;i<entries.length;i++){
        str += `<tr>
                    <td>${entries[i].uame}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dateofbirth}</td>
                    <td>${entries[i].phn}
                    <td>${entries[i].checked}</td>
                </tr>\n`;
    }
    table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
    let cond_agree= !tc.checked;
    e.preventDefault();
    if (!cond_agree) {
        let obj = makeObject();
        user_entries.push(obj);
        localStorage.setItem("user_entries", JSON.stringify(user_entries));
    }
    displayTable();
});
window.onload = (event) => {
    displayTable();
}
