import 'regenerator-runtime/runtime';
import axios from 'axios';

const base_url = 'http://localhost:1337';

const form: any = document.querySelector('form');
const btLogin: any = document.querySelector('#btLogin');

// async function redirectLogin() {
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.querySelector<any>('body').innerHTML = this.responseText;
//         }
//     };
//     xhttp.open('GET', 'login.html', true);
//     xhttp.send();
// }

// function redirectRegister() {
//     let xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             document.querySelector<any>('body').innerHTML = this.responseText;
//         }
//     };
//     xhttp.open('GET', 'register.html', true);
//     xhttp.send();
// }

var id;

btLogin.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    const title = document.querySelector<any>('.inputData').value;

    const todo = {
        email: document.querySelector<any>('#emailInputData').value,
        senha: document.querySelector<any>('#passwordInputData').value
    };

    try {
        const response = await axios.post(`${base_url}/login/back`, todo);
        console.log(response.data);
        id = response.data.user.id_usuario;
        document.location.href = 'register.html';

        // alert(id)
    } catch (error) {
        alert('Usuário ou senha incorretos');
        console.error(error);
    }
});

// async function getContent() {
//     try {
//         const response = await axios.get(`${base_url}/get/all`);
//         console.log(response.data)
//     } catch (error) {
//         console.error(error)
//     }
// }

// getContent();
