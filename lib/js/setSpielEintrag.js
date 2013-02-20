function getMannschaften(url) {
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {
			jQuery.each(data, function(i) {
				mannschaft = data[i].mannschaftBezeichnung + " (" + data[i].mannschaftName + ")";
				mannschaftID = data[i].id;
				element0 = new Option(mannschaft, mannschaftID, false, true);
				document.spielEditor.mannschaft.options[document.spielEditor.mannschaft.options.length] = element0;
				document.spielEditor.mannschaft.selectedIndex = -1;
			})
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				alert("Fehler bei der Ermittlung von Heimspiel / Auswärtsspiel!");
			}
		}
	});
}

function getGegner(url) {
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {
			jQuery.each(data, function(i) {

				gegner = data[i].vereinMannschaftBezeichnung;
				gegnerID = data[i].vereinID;
				element0 = new Option(gegner, gegnerID, false, true);
				document.spielEditor.gegner.options[document.spielEditor.gegner.options.length] = element0;
				document.spielEditor.gegner.selectedIndex = -1;
			})
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				alert("Fehler bei der Ermittlung von Heimspiel / Auswärtsspiel!");
			}
		}
	});
}

function init() {
	getMannschaftenUrl = "http://ecp-liveticker.de/action/getData.php?action=mannschaften";
	getMannschaften(getMannschaftenUrl);
	getGegnerUrl = "http://ecp-liveticker.de/action/getData.php?action=vereine";
	getGegner(getGegnerUrl);
}

function absenden(final) {
	console.log(mannschaft.value);
	var mannschaftID = $('#mannschaft').val();
	var spieltagID = $('#spieltag').val();
	var datum = $('#datum').val();
	var uhrzeit = $('#uhrzeit').val();
	var heimspiel = $('#heimspiel').val();
	var gegnerID = $('#gegner').val();

	$.post("http://edit.ecp-liveticker.de/action/writeSpiel.php", {
		mannschaftID : mannschaftID,
		spieltagID : spieltagID,
		datum : datum,
		uhrzeit : uhrzeit,
		heimspiel : heimspiel,
		gegnerID : gegnerID,
	}, function(data) {
		console.log(data);
		alert('Spiel wurde eingetragen!');
		window.location.href="menu.html";
	});
}
