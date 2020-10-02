// modules/ajax.js

export function ajaxGetXml(uri){
	return new Promise(function (resolve, reject) {
		let xhr = new XMLHttpRequest();
		xhr.open("GET", uri);
		xhr.send();
	
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				let data = xhr.responseXML;
				//console.log("module- "+data);
				resolve(data);
			}
			else {
				console.log(xhr.status);
				//reject(xhr.status)
        	}
		};
	}); // END Promise	
}