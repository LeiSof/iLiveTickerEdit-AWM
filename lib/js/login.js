function freischalten() {
	var element = document.getElementById('deviceProperties');

	console.log('Device Name: ' + device.name + '<br />' + 'Device Cordova: ' + device.cordova + '<br />' + 'Device Platform: ' + device.platform + '<br />' + 'Device UUID: ' + device.uuid + '<br />' + 'Device Version: ' + device.version + '<br />');
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
