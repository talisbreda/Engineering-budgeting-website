import 'regenerator-runtime/runtime';
import axios from 'axios';

const base_url = 'http://localhost:1337';

/** Splits the cookie to get the ID number of the user */
let idUsuario = document.cookie.split('=')[1].split(';')[0]

/** Assigns variables to HTML elements */
const header: any = document.querySelector('#header');
const sidebar: any = document.querySelector('#sidebar');
const topSidebar: any = document.querySelector('#topSidebar');
const lowerSidebar: any = document.querySelector('#lowerSidebar');
const sidebarButton: any = document.querySelector('#sidebarButton');
const projects: any = document.querySelector('.projects');
let projectsLine: any = document.querySelector('.projectsLine');
let projectPlaceholder: any = document.querySelectorAll('.projectPlaceholder');
const projectName: any = document.querySelector('.projectName');
const logoutButton: any = document.querySelector('#logout');
const newProject: any = document.querySelector('#newProject')

/** This function calls the API to get all the projects related to the logged user,
 *  creates new divs for every project fetched from the database */
async function getProjects() {

    const todo = {
        id_usuario: idUsuario
    };

    try {
        /** Calls the API route to get the projects from the logged user */
        const response = await axios.post(`${base_url}/get/projects`, todo);

        /** Assigns the projects fetched from the database to an array */
        let projectsFetched = response.data.projects;

        /** Creates a counter to count the amount of projects in a line */
        let count = 1;

        for (let i = 0; i < projectsFetched.length; i++, count++) {
            /** Checks if the amount of projects in a line reached 3, and breaks the line if it did */
            if (count == 3) {
                let k = document.createElement('div');
                k.className = 'projectsLine';
                projects.appendChild(k);
                projectsLine = k;
                count = 0;
            }

            /** Creates a new div with the projectPlaceholder class, adds an event listener to clicks,
             *  and uses appendChild() to push the element into the page */
            let j = document.createElement('div');
            j.className = 'projectPlaceholder';
            j.id = `projectPlaceholder${projectsFetched[i].id_projeto}`;
            j.addEventListener('click', async (event:Event) => {
                getClickedProject(j.id);
            })
            projectsLine.appendChild(j);

            /** Creates another div with the innerProjectPlaceholder class inside the previously created
             *  projectPlaceholder div, adds to it the title of the fetched project
             */
            let l = document.createElement('div');
            l.className = 'innerProjectPlaceholder';
            let m: any = document.querySelector(`#projectPlaceholder${projectsFetched[i].id_projeto}`);
            m.appendChild(l);
            l.innerHTML = response.data.projects[i].titulo_projeto;
        }
    } catch (error) {
        alert('Error loading projects');
        console.error(error);
    }
    /** Resets the projectPlaceholder variable to include the newly created one */
    projectPlaceholder = document.querySelectorAll('.projectPlaceholder')
}
getProjects();

/** Adds an event listener to the sidebar button, which hides or shows the sidebar, depending on its 
 *  current state */
sidebarButton.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    if (sidebar.style.display == 'none') {
        sidebar.style.display = 'flex';
        projects.style.width = '75vw';
    } else {
        sidebar.style.display = 'none';
        projects.style.width = '100vw';
    }
});

/** Adds an event listener to the logout button, which deletes the user cookie and
 * returns to the login page */
logoutButton.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    document.cookie = 'user=;expires=' + new Date(0).toUTCString();
    document.location.href = 'login.html';
});

/** Adds an event listener to the newProject div, which creates a new project on the database,
 *  and directs the user the the edit page */
newProject.addEventListener('click', async (event: Event) => {
    event.preventDefault();

    const todoCreate = {
        usuario_fk: idUsuario
    }

    const responseCreate = await axios.post(`${base_url}/create/project`, todoCreate); 
    document.cookie = 'new=true'
    document.location.href = 'edit.html'
});

/** This function is called when the user clicks on a listed project, and is responsible for 
 * directing to the edit page
 */
async function getClickedProject(clicked_id: string) {
    /** Gets the ID of the clicked project */
    const project_id = clicked_id.split('projectPlaceholder')[1];

    const todo = {
        id_projeto: project_id
    }

    /** Calls the API route to fetch the project using its ID */
    const response = await axios.post(`${base_url}/get/project`, todo);

    /** Assings a false value to the 'new' cookie, creates the projectID cookie and 
     * directs to the edit page */
    document.cookie = 'new=false'
    document.cookie = `projectID=${project_id}`;
    document.location.href = 'edit.html'
}

export default { getProjects };
