import 'regenerator-runtime/runtime';
import axios from 'axios';
import queryString from 'query-string';
import { response } from 'express';

/** General variables */
const base_url = 'http://localhost:1337';
// var idUsuario = document.cookie.split('; user=')[1]
var idUsuario = document.cookie.split('=')[1]
// console.log(document.cookie)


/** Variables to HTML elements */
const header: any = document.querySelector('#header');
const sidebar: any = document.querySelector('#sidebar');
const topSidebar: any = document.querySelector('#topSidebar');
const lowerSidebar: any = document.querySelector('#lowerSidebar');
const sidebarButton: any = document.querySelector('#sidebarButton');
let projects: any = document.querySelector('.projects');
var projectsLine: any = document.querySelector('.projectsLine');
var projectPlaceholder: any = document.querySelectorAll('.projectPlaceholder');
const projectName: any = document.querySelector('.projectName');
const logoutButton: any = document.querySelector('#logout');
const newProject: any = document.querySelector('#newProject')

/** Fetch data from DB on login */
async function getProjects() {

    const todo = {
        id_usuario: idUsuario
    };

    console.log(idUsuario);
    try {
        const response = await axios.post(`${base_url}/get/projects`, todo);
        console.log(response.data);
        var projectsFetched = response.data.projects;
        console.log(projectsFetched);
        var count = 1;
        for (let i = 0; i < projectsFetched.length; i++, count++) {
            if (count == 3) {
                let k = document.createElement('div');
                k.className = 'projectsLine';
                projects.appendChild(k);
                projectsLine = k;
                count = 0;
            }
            let j = document.createElement('div');
            j.className = 'projectPlaceholder';
            j.id = `projectPlaceholder${projectsFetched[i].id_projeto}`;
            j.addEventListener('click', async (event:Event) => {
                getClickedProject(j.id);
            })
            projectsLine.appendChild(j);
            console.log(j);

            let l = document.createElement('div');
            l.className = 'innerProjectPlaceholder';
            let m: any = document.querySelector(`#projectPlaceholder${projectsFetched[i].id_projeto}`);
            m.appendChild(l);
            console.log(l);

            l.innerHTML = response.data.projects[i].titulo_projeto;
        }
    } catch (error) {
        alert('Erro ao carregar projetos');
        console.error(error);
    }
    projectPlaceholder = document.querySelectorAll('.projectPlaceholder')
}
getProjects();

/** Button to show/hide sidebar */
sidebarButton.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    projectPlaceholder = document.querySelector('.projectPlaceholder');

    if (sidebar.style.display == 'none') {
        sidebar.style.display = 'flex';
        projects.style.width = '75vw';
    } else {
        sidebar.style.display = 'none';
        projects.style.width = '100vw';
    }
});

/** Logout button and user leaving page */
logoutButton.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    document.cookie = 'user=;expires=' + new Date(0).toUTCString();
    document.location.href = 'login.html';
});

/** Create new project */
newProject.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    const todoCreate = {
        usuario_fk: idUsuario
    }
    const todoSelect = {
        id_usuario: idUsuario
    }

    const responseCreate = await axios.post(`${base_url}/create/project`, todoCreate); 
    const responseSelect = await axios.post(`${base_url}/get/projects`, todoSelect);
    const selectData = responseSelect.data.projects
    const project_id = selectData[selectData.length - 1].id_projeto

    document.cookie = `projectID=${project_id}`;

    document.location.href = 'edit.html'
});

/** Show project details on click */
async function getClickedProject(clicked_id: string) {
    const project_id = clicked_id.split('projectPlaceholder')[1];
    console.log(project_id)

    const todo = {
        id_projeto: project_id
    }

    const response = await axios.post(`${base_url}/get/project`, todo);
    document.cookie = `projectID=${project_id}`;
    document.cookie = 'created=false'
    document.location.href = 'edit.html'
    console.log(response.data)
}

export default { getProjects };
