import { getStatistic } from './searchController.js';

export const getMonthsStatistic = async (req,res) => {

    // Recupérer la date du jour sous format (yyyy-MM-dd)
    const today = new Date();
    const start = new Date();
    start.setMonth(today.getMonth() - 3);
    
    // Format yyyy-MM-dd'T'hh:mm:ss'Z'
    const startFormat = start.toISOString().split('T')[0] + "T00:00:00Z";
    const endFormat = today.toISOString().split('T')[0] + "T23:59:59Z";

    try{
        // Appeler l'API Rest pour recupérer les offres
        const json = await getStatistic(startFormat,endFormat);
        const statistic = analyseOffresTravail(json.resultats);

        // Retourner les statistique au format json
        res.json(statistic);
        
    }catch(err){
        console.error("Erreur lors de l'analyse des données : ", err);
        res.status(500).json({error : "Erreur lors de l'analyse des données"});
    }
    
}

const analyseOffresTravail = (offers) => {

    // Format JSON
    const stastisticJson = {
        total : offers.length,
        mois : 3,
        offersByCommune: {},
        offersByDepartement: {}
    }

    // Parcourir les offres d'emploi
    offers.forEach((offer) => {
        const {lieuTravail} = offer
        const {libelle, commune} = lieuTravail

        let libelleNumber, libelleName;

        // Verifier s'il existe un numéro libelle
        const isNumber = libelle.split(' ')[0];
        if(!isNaN(Number(isNumber))){
            libelleNumber = isNumber;
            libelleName = libelle.split(' ').slice(2).join(' ');
        }else {
            libelleNumber = "None";
            libelleName = libelle
        }

        // Initialiser le compteur par commune
        if(!stastisticJson.offersByCommune[libelle]){
            stastisticJson.offersByCommune[libelle] = {
                total: 0,
                noDepartement : libelleNumber,
                nameDepartement : libelleName,
                commune : commune
            }
        }
        stastisticJson.offersByCommune[libelle].total++;

        // Initialiser le compteur par département
        if(!stastisticJson.offersByDepartement[libelle]){
            stastisticJson.offersByDepartement[libelle] = 0;
        }
        stastisticJson.offersByDepartement[libelle]++
    })

    return stastisticJson;
}