var deviceuuid
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var element = document.getElementById('deviceProperties');
	deviceuuid=device.uuid;
	element.innerHTML = 'Device Name: ' + device.name + '<br />' + 'Device Cordova: ' + device.cordova + '<br />' + 'Device Platform: ' + device.platform + '<br />' + 'Device UUID: ' + device.uuid + '<br />' + 'Device Model: ' + device.model + '<br />' + 'Device Version: ' + device.version + '<br />';
}

function absenden() {
	var benutzerkennung = $('#benutzerkennung').val();
	var passwort = $('#passwort').val();
	$.post("", {
		benutzerkennung : benutzerkennung,
		passwort : passwort,
	}, function(data) {
		console.log(data);
		window.location.href="menu.html";
	});

}
