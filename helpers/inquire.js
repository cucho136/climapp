const { white } = require('colors');
const inquire = require('inquirer');
require('colors');

const preguntas = [
    {
        type:'list',
        name:'opcion',
        message:'Que desea Hacer?',
        choices : [
            {
                value: 1,
                name:`${'1'.green}. Buscar ciudad`
            },


            {
                value: 2,
                name:`${'2'.green}. Historial`
            },
            {
                value: 0,
                name:`${'0'.green}. Salir`
            }
        ]
    }
]

const espera =[
    {
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.green} para continuar`
    }
]


const inquireMenu = async () =>{

    console.clear();

    console.log('============================'.green);
    console.log('   Seleccione una opcion   '.white);
    console.log('============================\n'.green);

    const {opcion} = await inquire.prompt(preguntas)

    return opcion;



}

const pausa = async () =>{
    console.log('\n');

    await inquire.prompt(espera);

}


const leerInput = async (mensaje) => {
    const question =[

        {
            type:'input',
            name:'desc',
            message: mensaje,
            validate(value){
                if(value.length==0){
                    return 'Por favor ingrese un valor.';
                }
                return true;
            }
        }

    ];

    const {desc} = await inquire.prompt(question);
    return desc;
}




const listarLugares= async (lugares = []) =>{

    const choices = lugares.map( (lugar, idx)=>{
        const i = `${idx+1}.`.green

        return{
            value: lugar.id,
            name: `${i} ${lugar.nombre}`

        }

    });

    choices.unshift({
        value:'0',
        name:'0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Seleccione lugar:',
            choices:choices
        }
    ]

    const {id} = await inquire.prompt(preguntas);

    return id;

}


const confirmar = async(message) =>{

    const pregunta = [
        {
            type:'confirm',
            name:'ok',
            message:message
        }
    ]

    const {ok} = await inquire.prompt(pregunta);
    return ok;
}



const listadoTareasCompletar= async (tareas = []) =>{

    const choices = tareas.map( (tarea, idx)=>{
        const i = `${idx+1}.`.green

        return{
            value: tarea.id,
            name: `${i} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false

        }

    });


    const pregunta = [
        {
            type:'checkbox',
            name:'ids',
            message:'Seleccione',
            choices:choices
        }
    ]

    const {ids} = await inquire.prompt(pregunta);

    return ids;

}




module. exports = {
    inquireMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    listadoTareasCompletar
}