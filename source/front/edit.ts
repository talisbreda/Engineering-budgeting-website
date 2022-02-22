import 'regenerator-runtime/runtime';
import axios from 'axios';
import { Field } from 'mysql2';
import { response } from 'express';

const base_url = 'http://localhost:1337';
const idUsuario:any = document.cookie.split('user=')[1].split(';')[0]
const idProjeto:any = document.cookie.split('projectID=')[1].split(';')[0]

var qtd_areia: any = document.querySelector('#qtd_areia')
var qtd_cimento: any = document.querySelector('#qtd_cimento')
var qtd_tijolo: any = document.querySelector('#qtd_tijolo')
var qtd_piso: any = document.querySelector('#qtd_piso')
var qtd_argamassa: any = document.querySelector('#qtd_argamassa')
var qtd_telha: any = document.querySelector('#qtd_telha')
var qtd_tinta: any = document.querySelector('#qtd_tinta')

var custo_areia: any = document.querySelector('#custo_areia')
var custo_tijolo: any = document.querySelector('#custo_tijolo')
var custo_piso: any = document.querySelector('#custo_piso')
var custo_cimento: any = document.querySelector('#custo_cimento')
var custo_argamassa: any = document.querySelector('#custo_argamassa')
var custo_telha: any = document.querySelector('#custo_telha')
var custo_tinta: any = document.querySelector('#custo_tinta')

const form:any = document.querySelector('form')

const todoUser = {
    id_usuario: idUsuario
}

const todoProject = {
    id_projeto: idProjeto
}

var arrows:Array<any> = [];
var input_data: any = document.querySelectorAll('.inputData')

// for (var i = 0; i < 7; i++) {
//     arrows[i] = document.querySelector(`#arrow${i}`)
//     if (arrows[i]) {
//         arrows[i].addEventListener('click', async (event:Event) => {
//             expandCollapse(arrows[i])
//         })
//     }
// }

window.onload = async function() {
    if (document.cookie.includes('new=true')) {
        const responseSelect = await axios.post(`${base_url}/get/projects`, todoUser);
        const selectData = responseSelect.data.projects
        const project_id = selectData[selectData.length - 1].id_projeto

        document.cookie = `projectID=${project_id}`;        
    } else {
        const responseProject = await axios.post(`${base_url}/get/project`, todoProject);
        const responseData = responseProject.data
        input_data.forEach(fillData(responseData))
    }
    
}

// function expandCollapse(element: any) {
//     const row: any = document.querySelector(`#input${element.id}`)
//     if (row.style.display == 'none') {
//         row.style.display = 'block';
//     } else {
//         row.style.display = 'none';
//     }
// }

function fillData(response: any) {
    try {
        for (var i = 0; i < input_data.length; i++) {
            switch (i) {
                case 0: input_data[0].value = response.projects[0].lado_a
                break;

                case 1: input_data[1].value = response.projects[0].lado_b
                break;
                
                case 2: input_data[2].value = response.projects[0].lado_c
                break;
                
                case 3: input_data[3].value = response.projects[0].lado_d
                break;
                
                case 4: input_data[4].value = response.projects[0].altura
                break;
                
                case 5: input_data[5].value = response.projects[0].material_parede
                break;
                
                case 6: input_data[6].value = response.projects[0].cimento
                break;
                
                case 7: input_data[7].value = response.projects[0].tipo_piso
                break;
                
                case 8: input_data[8].value = response.projects[0].tamanho_piso
                break;
                
                case 9: input_data[9].value = response.projects[0].argamassa
                break;
                
                case 10: input_data[10].value = response.projects[0].material_telhado
                break;
                
                case 11: input_data[11].value = response.projects[0].cor_telhado
                break;
                
                case 12: input_data[12].value = response.projects[0].ondas_telhado
                break;
                
                case 13: input_data[13].value = response.projects[0].tipo_acabamento
                break;
                
                case 14: input_data[14].value = response.projects[0].cor_tinta
                break;
                
                case 15: input_data[15].value = response.projects[0].titulo_projeto
                fillOutput()
                break;
            }
}
    } catch (e) {
        console.log(e)
        alert('Failed loading project data')
    }
}   

form.addEventListener('submit', async (event: Event) => {
    event.preventDefault
    fillOutput()
})

async function fillOutput() {
    var inputs:Array<any> = [];

    for (var i:any = 0; i < 16; i++) {
        inputs[i] = document.querySelector(`#inputData${i}`)
    }

    var lado_a = parseFloat(inputs[0].value)
    var lado_b = parseFloat(inputs[1].value)
    var lado_c = parseFloat(inputs[2].value)
    var lado_d = parseFloat(inputs[3].value)
    var altura = parseFloat(inputs[4].value)
    var material_parede = inputs[5].value
    var cimento = inputs[6].value
    var tipo_piso = inputs[7].value
    var tamanho_piso = inputs[8].value
    var argamassa = inputs[9].value
    var material_telhado = inputs[10].value
    var cor_telhado = inputs[11].value
    var ondas_telhado = inputs[12].value
    var tipo_acabamento = inputs[13].value
    var cor_tinta = inputs[14].value
    var titulo_projeto = inputs[15].value

    const todoGeral: {
        id: number,
        titulo_projeto: string,
        lado_a: number,
        lado_b: number,
        lado_c: number,
        lado_d: number,
        altura: number,
        material_telhado: string,
        cor_telhado: string,
        ondas_telhado: number,
        material_parede: string,
        cimento: string,
        tipo_piso: string,
        tamanho_piso: number,
        argamassa: string,
        tipo_acabamento: string,
        cor_tinta: string,
    } = {
        id: idProjeto,
        titulo_projeto: titulo_projeto,
        lado_a: lado_a,
        lado_b: lado_b,
        lado_c: lado_c,
        lado_d: lado_d,
        altura: altura,
        material_telhado: material_telhado,
        cor_telhado: cor_telhado,
        ondas_telhado: ondas_telhado,
        material_parede: material_parede,
        cimento: cimento,
        tipo_piso: tipo_piso,
        tamanho_piso: tamanho_piso,
        argamassa: argamassa,
        tipo_acabamento: tipo_acabamento,
        cor_tinta: cor_tinta,
    }
    const responseGeral = await axios.put(`${base_url}/update/project`, todoGeral);

    /** Preenchimento de quantidades e custos */

    /** Piso */
    var area_piso = (lado_a) * (lado_b)
    qtd_piso.value = parseFloat(Math.round(area_piso / ((tamanho_piso / 100) * (tamanho_piso / 100))) + '')

    var preco_metro_piso = 0
    if (tipo_piso == 'Cerâmica') {
        preco_metro_piso = 34.9
    } else if (tipo_piso == 'Porcelanato') {
        preco_metro_piso = 49.9
    }
    custo_piso.value = 'R$' + Math.round((area_piso * preco_metro_piso))
    qtd_piso.value += ' Peças'

    /** Telhado */
    const tamanho1 = 0.43
    var tamanho2 = 0;
    var preco_telha = 0;
    if (ondas_telhado == 1) {
        tamanho2 = 0.27
        preco_telha = 3.3
    } else if (ondas_telhado == 2) {
        tamanho2 = 0.37
        preco_telha = 4.9
    }
    var area_telhado = (area_piso * (lado_a / 2 * 0.25)) / 2
    qtd_telha.value = parseFloat(Math.round(area_telhado / (tamanho1 * tamanho2)) + '')

    custo_telha.value = 'R$' + Math.round(qtd_telha.value * preco_telha)

    qtd_telha.value += ' Telhas'



    /** Areia e cimento */

    var parede = (lado_a + lado_b + lado_c + lado_d) * altura
    var largura = 0
    var altura_bloco = 0
    var comprimento = 0

    if (material_parede == 'Bloco') {
        largura = 0.14
        altura_bloco = 19
        comprimento = 39
    } else if (material_parede == 'Tijolo') {
        largura = 0.11
        altura_bloco = 19
        comprimento = 19
    }

    qtd_areia.value = parseFloat(parede * 0.02 * largura * (altura * 100 / (altura_bloco + 2)) + '').toFixed(2)
    qtd_cimento.value = parseFloat(Math.round(parede * 5) / 40 + '')

    custo_areia.value = 'R$' + Math.round(qtd_areia.value * 120)
    custo_cimento.value = 'R$' + Math.round(qtd_cimento.value * 22)

    qtd_areia.value += ' m³'
    qtd_cimento.value += ' Sacos'

    /** Quantidade de tijolos/blocos */

    var area_tijolo = 0
    
    if (material_parede == 'Bloco') {
        area_tijolo = 0.39*0.19
    } else if (material_parede == 'Tijolo') {
        area_tijolo = 0.19 * 0.19
    }

    qtd_tijolo.value = parseFloat(Math.round(parede / area_tijolo) + '')
    custo_tijolo.value = 'R$' + Math.round(qtd_tijolo.value * 0.46)
    qtd_tijolo.value += ' ' + material_parede + 's'

    /** Argamassa */

    var argamassa_piso = 0

    if (tipo_piso == 'Cerâmica') {
        argamassa_piso = 6
    } else if (tipo_piso == 'Porcelanato') {
        argamassa_piso = 8
    }

    qtd_argamassa.value = parseFloat((area_piso * argamassa_piso) + '')
    custo_argamassa.value = 'R$' + Math.round(qtd_argamassa.value * 1.5)
    qtd_argamassa.value += ' kg'

    /** Tinta */

    qtd_tinta.value = parseFloat((parede * 2) / 10 + '')
    custo_tinta.value = 'R$' + Math.round(qtd_tinta.value * 40)
    qtd_tinta.value += ' L'

}