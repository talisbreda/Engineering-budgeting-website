import 'regenerator-runtime/runtime';
import axios from 'axios';

const base_url = 'http://localhost:1337'

const form = document.querySelector('form')

form.addEventListener('submit', async event => {
    event.preventDefault()

    const title = document.querySelector(".inputData").value

    const todo = {
        email: document.querySelector('#emailInputData').value,
        senha: document.querySelector('#passwordInputData').value
    };

    try{
        const response = await axios.post(`${base_url}/login`, todo)
        console.log(response.data)
        alert("Authorization Sucessfull")

    } catch (error) {
        alert("Usuário ou senha incorretos")
        console.error(error)
    }
})



// async function getContent() {
//     try {
//         const response = await axios.get(`${base_url}/get/all`);
//         console.log(response.data)
//     } catch (error) {
//         console.error(error)
//     }
// }

// getContent();