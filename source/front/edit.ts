import 'regenerator-runtime/runtime';
import axios from 'axios';

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
var custo_total: any = document.querySelector('#custo_total')

const form:any = document.querySelector('form')

const todoUser = {
    id_usuario: idUsuario
}

const todoProject = {
    id_projeto: idProjeto
}

var input_data: any = document.querySelectorAll('.inputData')

window.onload = async function() {
    if (document.cookie.includes('new=true')) {
        const responseSelect = await axios.post(`${base_url}/get/projects`, todoUser);
        const selectData = responseSelect.data.projects
        const project_id = selectData[selectData.length - 1].id_projeto

        document.cookie = `projectID=${project_id}`;        
    } else {
        await fillData()
        await fillOutput()
    }
}

document.querySelectorAll('.title').forEach(expandCollapse)
async function expandCollapse(title:any) {
    const element_id = title.id.split('title')[1]
    const block:any = document.querySelector(`#input${element_id}`)
    title.addEventListener('click', (event:Event) => {
        if (block.style.display == 'none') {
            block.style.display = 'block'
        } else {
            block.style.display = 'none'
        }
    })
}


async function fillData() {
    const responseProject = await axios.post(`${base_url}/get/project`, todoProject);
    const responseData = responseProject.data
    const projectData = Object.values(responseData.projects[0])

    try {
        for (var i = 0; i < input_data.length; i++) {
            input_data[i].value = projectData[i]
        }
    } catch (e) {
        console.log(e)
        alert('Failed loading project data')
    }
}   

form.addEventListener('submit', async (event: Event) => {
    event.preventDefault()
    fillOutput()
})

async function fillOutput() {
    var lado_a = parseFloat(input_data[0].value)
    var lado_b = parseFloat(input_data[1].value)
    var lado_c = parseFloat(input_data[2].value)
    var lado_d = parseFloat(input_data[3].value)
    var altura = parseFloat(input_data[4].value)
    var material_parede = input_data[5].value
    var cimento = input_data[6].value
    var tipo_piso = input_data[7].value
    var tamanho_piso = input_data[8].value
    var argamassa = input_data[9].value
    var material_telhado = input_data[10].value
    var cor_telhado = input_data[11].value
    var ondas_telhado = input_data[12].value
    var tipo_acabamento = input_data[13].value
    var cor_tinta = input_data[14].value
    var titulo_projeto = input_data[15].value
 

    const todoGeral: {
        id: number,
        lado_a: number,
        lado_b: number,
        lado_c: number,
        lado_d: number,
        altura: number,
        material_parede: string,
        cimento: string,
        tipo_piso: string,
        tamanho_piso: number,
        argamassa: string,
        material_telhado: string,
        cor_telhado: string,
        ondas_telhado: string,
        tipo_acabamento: string,
        cor_tinta: string,
        titulo_projeto: string
    } = {
        id: idProjeto,
        lado_a: lado_a,
        lado_b: lado_b,
        lado_c: lado_c,
        lado_d: lado_d,
        altura: altura,
        material_parede: material_parede,
        cimento: cimento,
        tipo_piso: tipo_piso,
        tamanho_piso: tamanho_piso,
        argamassa: argamassa,
        material_telhado: material_telhado,
        cor_telhado: cor_telhado,
        ondas_telhado: ondas_telhado, 
        tipo_acabamento: tipo_acabamento,
        cor_tinta: cor_tinta,
        titulo_projeto: titulo_projeto,
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

    /** Custo total */

    var preco_total = 
                  parseInt(custo_areia.value.split('R$')[1])
                + parseInt(custo_cimento.value.split('R$')[1])
                + parseInt(custo_tijolo.value.split('R$')[1])
                + parseInt(custo_piso.value.split('R$')[1])
                + parseInt(custo_argamassa.value.split('R$')[1])
                + parseInt(custo_telha.value.split('R$')[1])
                + parseInt(custo_tinta.value.split('R$')[1])
    custo_total.value = 'R$' + preco_total

}