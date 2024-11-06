import fetch from "node-fetch";
import {getAccessToken} from "./tokenController.js"

export const getTodayStatistic = async (req,res) => {
    
    // Recupérer la date du jour sous format (yyyy-MM-dd)
    const today = new Date().toISOString().split('T')[0];

    // Format yyyy-MM-dd'T'hh:mm:ss'Z'
    const start = today + "T00:00:00Z";
    const end = today + "T23:59:59Z";
    try{
        // Appeler l'API Rest pour recupérer les offres
        const data = await getStatistic(start, end);
        
        // Retourner les données au format json
        res.json(data);
    }catch(err){
        console.error("Erreur lors de la récupération des données d'aujourd'hui : ", err);
        res.status(500).json({erreur:"Erreur lors de la récupération des données d'aujourd'hui"});
    }
}

export const getStatistic = async(start, end) => {

    // Url de l'API Rest pour chercher les offres d'emploi
    const url = `https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search?minCreationDate=${start}&maxCreationDate=${end}&sort=1`;
    
    // Récupérer le token
    const {access_token, token_type} = await getAccessToken();

    // Configuration
    const request = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `${token_type} ${access_token}`
        }
    };

    try{
        const response = await fetch(url,request);
        if(!response.ok){
            throw new Error(`Erreur de requête : ${response.status}`);
        }
        
        // Retourner les données au format JSON
        const data = await response.json();
        return data;

    }catch(err){
        console.error('Erreur lors de la récupération des données :', err );
    };
}