import 'regenerator-runtime/runtime';
import axios from 'axios';

/** General variables */
const base_url = 'http://localhost:1337';
var id: any = 0;

/** Variables to HTML elements */
const form: any = document.querySelector('form');
const btLogin: any = document.querySelector('#btLogin');

/** Login button / direct to home page */
btLogin.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    const todo = {
        email: document.querySelector<any>('#emailInputData').value,
        senha: document.querySelector<any>('#passwordInputData').value
    };

    try {
        const response = await axios.post(`${base_url}/login`, todo);
        id = response.data.user.id_usuario;

        document.cookie = `user=${response.data.user.id_usuario}`;

        document.location.href = `home.html`;
    } catch (error) {
        alert('Usuário ou senha incorretos');
        console.error(error);
    }
});

export default { id };
