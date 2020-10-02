// main.js

import {ajaxGetXml} from "./modules/ajax.js";
import {tpDiapo} from "./modules/tp_diapo.js";


//let uri = "modules/data/data.txt";
let uri = "modules/data/galerie_images.xml";


ajaxGetXml(uri).then((data)=> {
	// data === la réponse http
	// console.log(data);
	tpDiapo(data);
	});

// Rappel !
// ajaxGetXml() retourne une Promise
// on a la certitude désormais de traiter la réponse APRES l'appel ajax
// En bref: on attend que les données xml soient chargées avant de les traiter	
