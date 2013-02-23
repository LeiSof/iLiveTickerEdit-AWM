document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var element = document.getElementById('deviceProperties');

	element.innerHTML = 'Device Name: ' + device.name + '<br />' + 'Device Cordova: ' + device.cordova + '<br />' + 'Device Platform: ' + device.platform + '<br />' + 'Device UUID: ' + device.uuid + '<br />' + 'Device Model: ' + device.model + '<br />' + 'Device Version: ' + device.version + '<br />';
	alert("Login!");
}

function absenden() {
	var benutzerkennung = benutzerkennung.value;
	var passwort = passwort.value;
	$.post("http://edit.ecp-liveticker.de/action/login.php", {
		benutzerkennung : benutzerkennung.value,
		passwort : passwort.value
	}, function(data) {
		console.log(data);
	});
}
