require('dotenv').config()

const {leerInput, pausa, inquireMenu, listarLugares}= require('./helpers/inquire');
const Busquedas = require('./Models/busquedas');


const main = async() => {

    let opt=0;

    const busqueda = new Busquedas();

    do {

        opt =await inquireMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje

                const termino = await leerInput('Ciudad:');



                //Buscar la ciudad

                const lugares =await busqueda.ciudad(termino);
                //seleccionar el lugar
                const idSeleccionado = await listarLugares(lugares);
                if (idSeleccionado ==='0') continue;

  

                const lugarSeleccionado = lugares.find(l => l.id == idSeleccionado);
                busqueda.agregarHistorial(lugarSeleccionado.nombre);  
                // clima

                const clima = await busqueda.climaPorlugar(lugarSeleccionado.lat, lugarSeleccionado.lng);


                //Mostrar resultados
                console.clear();
                console.log('\n Informacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre.green);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Minima:',clima.min);
                console.log('Maxima:',clima.max);
                console.log('Como se ve el clima:',clima.desc.green);
                
            break;
        
            case 2:
                busqueda.historialCapitalizado.forEach( (lugar,i)=>{
                    const idx = `${i+1}.`.green;
                    console.log(`${idx} ${lugar}`);

                })
            
            break;
        }

        if (opt !==0) await pausa();
        
    } while (opt !==0);

}


main();