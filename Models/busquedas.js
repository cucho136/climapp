const fs = require('fs');

const axios = require('axios');


class Busquedas{

    historial =[];
    daPath ='./DB/database.json';

    constructor(){
        this.leerDB();
    }

    get paramsMapBox(){
        return {
            'language':'es',
            'access_token':process.env.MAPBOX_KEY || '',
            'limit':'5'

        }
    }



    get paramsClima(){
        return{
            'appid':process.env.OPENWEATHER_KEY || '',
            'units': 'metric',
            'lang':'es'
        }
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');

            palabras = palabras.map( p => p[0].toUpperCase()+ p.substring(1));

            return palabras.join(' ');

        })
    }

    async ciudad  (lugar = ''){

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:this.paramsMapBox


            });
            const resp = await instance.get();
            return resp.data.features.map( lugar =>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]

            }));
            
        } catch (error) {
            return [];
            
        }


    }

    async climaPorlugar(lat, lon){
        try {

            //instance data create

            const instanceClima = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params:{...this.paramsClima,lat,lon}


            });

            const resp = await instanceClima.get();
            const {weather, main} = resp.data;


            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp


            };

            
        } catch (error) {
            return console.log(error);
            
        }
    }

    agregarHistorial( lugar=''){

        if(this.historial.includes(lugar.toLocaleLowerCase() ) ){
            return;
        }

        this.historial = this.historial.splice(0,4);


        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();



    }


    guardarDB(){
        const payload ={
            historial:this.historial
        };
        fs.writeFileSync(this.daPath, JSON.stringify(payload));

    }


    leerDB(){
        

        if (!fs.existsSync(this.daPath)){
            return null;
        }
    
        const info = fs.readFileSync(this.daPath, {encoding:'utf-8'});
        const data = JSON.parse(info);
        //console.log(data);
    
    
        this.historial = data.historial

    }



}


module.exports = Busquedas;