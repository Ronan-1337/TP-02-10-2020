// tp_diapo.js

import {MyImage} from "./models/MyImage.js";

let galleryPath = "modules/data/galeries/";
let speed = 0;
let interval = 0;

//---------------------------------------------------------
// function tpDiapo(data)
//---------------------------------------------------------
export function tpDiapo(data){	
	let imagesList = [];
	
	// liste noeuds 'image'
	let imageNodesList = data.getElementsByTagName("image");
	
	// On boucle sur la imageNodesList
	for(let i=0; i<imageNodesList.length; i++){
		let fileName = imageNodesList[i].getElementsByTagName("fichier")[0].firstChild.nodeValue;
		let legend = imageNodesList[i].getElementsByTagName("legende")[0].firstChild.nodeValue;
		let category = imageNodesList[i].getAttribute("categorie");

		let objImage = new MyImage(category, fileName, legend);

		imagesList.push(objImage);
	}
	//console.log(imagesList);
	displayFirst(imagesList);
	inputListeners(imagesList);
}

function inputListeners(imgList){
	let inputlist = document.getElementById('user-input').children;
	inputlist[0].addEventListener("click", function(){displayFirst(imgList);});
	inputlist[1].addEventListener("click", function(){displayPrev(imgList, currentImg(imgList));});
	inputlist[2].addEventListener("click", function(){togglePlay(imgList);});
	inputlist[4].addEventListener("click", function(){displayNext(imgList, currentImg(imgList));});
	inputlist[5].addEventListener("click", function(){displayLast(imgList);});
	inputlist[3].addEventListener('change', function(){play(imgList);});
}

function togglePlay(imgList){
	if(speed == 0){
		play(imgList);
	}
	else{
		speed = 0;
		clearInterval(interval);
		document.getElementById('play-button').setAttribute("value", "Play");
	}
}

function play(imgList){
	//console.log("document.getElementById('speed').value => "+ document.getElementById('speed').value);
	speed = document.getElementById('speed').value;
	if(interval != 0)
		clearInterval(interval);
	interval = setInterval(function(){displayNext(imgList, currentImg(imgList));}, speed);
	document.getElementById('play-button').setAttribute("value", "Pause");
}

function currentImg(imgList){
	//console.log("enter currentImg, src => "+ document.getElementById('show-img').getAttribute('src'));
	let shownImgSplittedSrc = document.getElementById('show-img').getAttribute('src').split("/");
	for(let i = 0; i<imgList.length; i++){
		//console.log("shownImgSplittedSrc[3] => "+ shownImgSplittedSrc[3] +", shownImgSplittedSrc[5] => "+ shownImgSplittedSrc[5]);
		//console.log("imgList[i].category => "+ imgList[i].category +", imgList[i].fileName => "+ imgList[i].fileName)
		if(shownImgSplittedSrc[3] == imgList[i].category && shownImgSplittedSrc[5] == imgList[i].fileName){
			//console.log("imgList[i] => "+ imgList[i])
			return imgList[i];
		}
	}
}

function displayFirst(imgList){
	showImg(imgList[0]);
}

function displayLast(imgList){
	showImg(imgList[imgList.length - 1]);
}

function displayPrev(imgList, shownImg){
	//console.log("enter display prev");
	for(let i = 0; i<imgList.length; i++){
		//console.log("enter display prev for");
		//console.log("imgList[i] => "+ imgList[i] +", shownImg => "+ shownImg)
		if (imgList[i] == shownImg && i == 0)
			displayLast(imgList);
		else if (imgList[i] == shownImg)
			showImg(imgList[i-1]);
	}
}

function displayNext(imgList, shownImg){
	//console.log("enter display next");
	for(let i = 0; i<imgList.length; i++){
		//console.log("enter display next for");
		//console.log("imgList[i] => "+ imgList[i] +", shownImg => "+ shownImg)
		if (imgList[i] == shownImg && i == (imgList.length - 1))
			displayFirst(imgList);
		else if (imgList[i] == shownImg)
			showImg(imgList[i+1]);
	}
}

//-----------------------------------------
// function showBig(objImage)
//-----------------------------------------
function showImg(objImage){

	let imgPath = galleryPath + "" + objImage.category + "/big/" + objImage.fileName;

	document.getElementById("show-img").src = imgPath;

	document.getElementById("show-legend").innerHTML = objImage.legend;

	document.getElementById("image").style.display = "block";
}