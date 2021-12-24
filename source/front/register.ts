import 'regenerator-runtime/runtime';
import axios from 'axios';

const base_url = 'http://localhost:1337';

const form: any = document.querySelector('form');

form.addEventListener('submit', async (event: Event) => {
    event.preventDefault();

    const nome = document.querySelector<any>('#nameInputData').value;
    const email = document.querySelector<any>('#emailInputData').value;
    const senha = document.querySelector<any>('#passwordInputData').value;
    const confirm = document.querySelector<any>('#confirmationInputData').value;

    const todo = {
        nome: nome,
        email: email,
        senha: senha
    };

    if (nome.length > 0) {
        if (email.includes('@', '.com')) {
            if (email.length > 6) {
                if (senha == confirm) {
                    if (senha.length > 5) {
                        if (senha.length < 19) {
                            try {
                                const response = await axios.post(`${base_url}/register`, todo);
                                console.log(response.data);
                                document.location.href = 'home.html';
                            } catch (error) {
                                alert('Email is already in use');
                                console.error(error);
                            }
                        } else {
                            alert('Password is too long (maximum of 18 characters');
                        }
                    } else {
                        alert('Password is too short (minimum of 6 characters)');
                    }
                } else {
                    alert('Passwords do not correspond');
                }
            } else {
                alert('E-mail is not valid');
            }
        } else {
            alert('E-mail is not valid');
        }
    } else {
        alert('Name is too short');
    }
});
