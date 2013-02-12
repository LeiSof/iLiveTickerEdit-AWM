function getSpiele() {
	var url = "http://www.ecp-liveticker.de/action/getSpiele.php";
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			jQuery.each(data, function(i) {
				id = data[i].id;
				wert = data[i].spielpaarung + ' - ' + data[i].datum + ' - ' + data[i].uhrzeit + ' Uhr';
				element = new Option(wert, id, false, true);
				document.spielAuswahl.spiel.options[document.spielAuswahl.spiel.options.length] = element;
				wert = "";

			});
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				$("#anzeigenTafel").hide();
				alert("Keine Spiele geplant!");
				window.location.href = "index.html";
			}
		}
	});
}

function getAufstellung() {
	var url = "http://www.ecp-liveticker.de/action/getAufstellung.php?mannschaftID=8";
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			jQuery.each(data, function(i) {
				id = data[i].id;
				wert = data[i].name + ' (' + data[i].nummer + ')';
				element1 = new Option(wert, id, false, true);
				document.tickerEditor.torSpieler1.options[document.tickerEditor.torSpieler1.options.length] = element1;
				wert = "";

				id = data[i].id;
				wert = data[i].name + ' (' + data[i].nummer + ')';
				element2 = new Option(wert, id, false, true);
				document.tickerEditor.torSpieler2.options[document.tickerEditor.torSpieler2.options.length] = element2;
				wert = "";

				id = data[i].id;
				wert = data[i].name + ' (' + data[i].nummer + ')';
				element3 = new Option(wert, id, false, true);
				document.tickerEditor.torSpieler3.options[document.tickerEditor.torSpieler3.options.length] = element3;
				wert = "";

			});
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				$("#anzeigenTafel").hide();
				alert("Keine Spiele geplant!");
				window.location.href = "index.html";
			}
		}
	});
}

function hideAll() {
	if (spiel.value == 0) {
		$('#spielminuteWahlBox').hide();
		$('#quickActionWahlBox').hide();
	} else {
		$('#spielminuteWahlBox').show();
		$('#quickActionWahlBox').show();
	}
	$('#actionWahlBox').hide();
	$('#mannschaftWahlBox').hide();
	$('#torWahlBox').hide();
	$('#strafeWahlBox').hide();
	$('#torwartwechselWahlBox').hide();
	$('#ergebnisWahlBox').hide();
	$('#textBox').hide();
	$('#vorschau').hide();
	$('#absenden').hide();
	getSpiele();
}

function vorschau(auswahl) {
	switch (auswahl) {
		case '21':
			$('#vorschau').html('Tor für die Heimmannschaft')
			break;
		case '11':
			$('#vorschau').html('Das Spiel beginnt in diesen Sekunden. Wir wünschen der Mannschaft viel Erfolg und Ihnen viel Vergnügen!')
			break;
		case '12':
			$('#vorschau').html('Letzte Spielminute im 1. Drittel läuft!')
			break;
		case '13':
			$('#vorschau').html('Es geht in die 1. Drittelpause!')
			break;
		case '14':
			$('#vorschau').html('Das 2. Drittel beginnt jetzt!')
			break;
		case '15':
			$('#vorschau').html('Letzte Spielminute im 2. Drittel läuft!')
			break;
		case '16':
			$('#vorschau').html('2. Drittelpause!')
			break;
		case '17':
			$('#vorschau').html('Aufgehts zum Schlussabschnitt. Das 3. Drittel läuft!')
			break;
		case '18':
			$('#vorschau').html('Die letzten beiden Spielminuten laufen!')
			break;
		case '19':
			$('#vorschau').html('Das Spiel ist aus!')
			break;

	}
}

function checkThem(caller, auswahl) {
	$('#vorschau').show();

	if (caller == "spielWahl") {
		if (auswahl > 0) {
			$('#spielminuteWahlBox').show()
			$('#quickActionWahlBox').show();
			$('#actionWahlBox').hide();
		} else {
			$('#spielminuteWahlBox').hide()
			$('#quickActionWahlBox').hide();
			$('#actionWahlBox').hide();
		}
	}

	if (caller == 'spielminuteWahl') {
		var spielminute = auswahl;
		if (auswahl > 0) {
			$('#actionWahlBox').show();
			$('#quickActionWahlBox').hide();
		} else {
			hideAll();
			$('#actionWahlBox').hide();
			$('#quickActionWahlBox').show();
		}
	}

	if (caller == 'quickActionWahl') {
		console.log(auswahl);
		if (auswahl > 0 && auswahl < 91) {
			$("#texteingabeAufforderung").html('freier Text(optional)');
			$('#textBox').show();
			$('#absenden').show();
		}
		if (auswahl > 90) {
			$('#ergebnisWahlBox').show();
			$("#texteingabeAufforderung").html('freier Text(optional)');
			$('#textBox').show();
			$('#absenden').show();
		}

		if (auswahl == 0) {
			$('#textBox').hide();
			$('#absenden').hide();
		}
		vorschau(auswahl);
	}

	if (caller == 'actionWahl') {
		var action = auswahl;
		console.log(auswahl);
		$('#mannschaftWahlBox').hide();
		$('#torWahlBox').hide();
		$('#strafeWahlBox').hide();
		$('#torwartwechselWahlBox').hide();
		$('#textBox').hide();
		$('#absenden').hide();
		switch (auswahl) {
			// Quickactions
			case '11':
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
			case '17':
			case '18':
			case '19':
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
			// Tor Heim
			case '21':
			// Tor Gast
			case '22':
				getAufstellung();
				$('#torWahlBox').show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
			// Strafen
			case '41':
			case '43':
			case '44':
			case '45':
			case '46':
			case '47':
			case '48':
				$('#mannschaftWahlBox').show();
				//getAufstellung();
				$('#strafeWahlBox').show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
			// Hinweis
			case '1':
			// 2 Minuten gegen beide Mannschaften
			case '42':
			// sonstige Strafe
			case '49':
			// Beide Mannschaften mit 4 Mann auf dem Eis.
			case '53':
			// Verletzter Spieler
			case '63' :
			// Spielzeitinfo
			case '64':
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
			// Torwartwechsel
			case '62' :
				$('#mannschaftWahlBox').show();
				//getAufstellung();
				$("#torwartwechselWahlBox").show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
			// Icing und Auszeit
			case '30':
			case '31':
			case '32':
			case '33':
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
			// ... wieder komplett
			case '51':
			// ... mit 4 Mann auf dem Eis
			case '52':
			// Auszeit für
			case '61':
				$('#mannschaftWahlBox').show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
		}
		vorschau(auswahl);
	}
}

function vorschauAktualisieren() {

}

function absenden() {

	var spielID = spiel.value;
	var spielminuteID = spielminute.value;
	var quickActionID = quickAction.value;
	var actionID = action.value;

	$.post("http://main.ecp-liveticker.de/edit/action/writeTicker.php", {
		spiel : spielID,
		spielminute : spielminuteID,
		quickAction : quickActionID,
		action : actionID
	}, function(data) {
		console.log(data);
		alert("Meldung wurde verschickt");
		document.tickerEditor.reset();
		hideAll();
	});

}

