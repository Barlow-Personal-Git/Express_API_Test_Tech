import fetch from "node-fetch";
import dotenv from 'dotenv';

dotenv.config();

export const getAccessToken = async() => {

    // Url de l'API Rest pour Access token
    const url = `https://entreprise.francetravail.fr/connexion/oauth2/access_token`;

    // Configuration
    const body = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: 'api_offresdemploiv2 o2dsoffre',
    });

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString()
    };

    try{
        const response = await fetch(`${url}?realm=%2Fpartenaire`,request);
        if(!response.ok){
            throw new Error(`Erreur de requête : ${response.status}`);
        }
        
        // Retourner les données au format JSON
        const data = await response.json();
        return data;

    }catch(err){
        console.error('Erreur lors de la récupération du token :', err );
    };
}