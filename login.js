// async function CheckLogIn() {
//     try {
//         const res = await fetch('./users.json'); //fetching data from users.json file
//         const usersObj = await res.json();

//         const myUsers = JSON.stringify(usersObj); //converting users object into a string
//         localStorage.setItem('keyUsers', myUsers); //storing my users data in localStorage


//         let text = localStorage.getItem('keyUsers'); // getting data from localStorage
//         let users = JSON.parse(text); //turning string data into object again to work with it


//         const emailInput = document.getElementById('email_input'); //get email input
//         const passwordInput = document.getElementById('password_input');//get password input
//         const loginBtn = document.querySelector('#loginBtn');
//         const welcome = document.getElementsByClassName('welcome');
//         const state = document.getElementById('loginState');
//         console.log(users);


//         loginBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             const user = users.find(user => user.id === emailInput.value && user.password === passwordInput.value);
//             if(!user){
//                 document.querySelector('.errorLogin').innerHTML = "Invalid email or password. Please try again."; //display error message
//                 passwordInput.value = ""; // clear password field
//             }else{
//                 user.login = "true";
//                 localStorage.setItem('currentUser', JSON.stringify(user)); //storing current loggedIn user in localStorage
//                 window.location.href = "index.html"; //redirect to index.html page
//             }
//         })


//         window.addEventListener('DOMContentLoaded', () => {
//             if(currentUser && currentUser.login == 'true'){
//                 state.textContent = "Logout";
//                 welcome.textContent = `Welcome, ${currentUser.name}!`;
//             }
//             console.log(currentUser);
//         })

//     }catch (error){
//         console.error("Error loading users",error);
//     }
// }
// CheckLogIn();

async function CheckLogIn() {
    try {
        const res = await fetch('./users.json');
        const users = await res.json();

        const emailInput = document.getElementById('email_input');
        const passwordInput = document.getElementById('password_input');
        const loginBtn = document.querySelector('#loginBtn');
        const welcome = document.querySelector('.welcome');
        const state = document.getElementById('loginState');

        // Check current user on page load
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.login === 'true') {
            if (state) state.textContent = "Logout";
            if (welcome) welcome.textContent = `Welcome, ${currentUser.name}!`;
        }

        // Login logic
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();

                const user = users.find(
                    (user) => user.id === emailInput.value && user.password === passwordInput.value
                );

                if (!user) {
                    document.querySelector('.errorLogin').innerHTML = "Invalid email or password. Please try again.";
                    passwordInput.value = "";
                } else {
                    user.login = "true";
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    window.location.href = "index.html";
                }
            });
        }
        state.addEventListener('click', (e) => {
            if (state.textContent === "Logout") {
                if(window.confirm("Are you sure you want to logout?")){
                    localStorage.removeItem('currentUser');
                    state.textContent = "Login";
                }
                else {
                    e.preventDefault();
                }
            }
               
        })
            console.log(currentUser);

        
    } catch (error) {
        console.error("Error loading users", error);
    }
}
CheckLogIn();