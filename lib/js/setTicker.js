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
	$('#textBox').hide();
	$('#vorschau').hide();
	$('#absenden').hide();
}

function vorschau(auswahl) {
	switch (auswahl) {
		case '2':
			$('#vorschau').value('Tor für die Heimmannschaft')
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
		if (auswahl > 0) {
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
		} else {
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
			case '11': // Quickactions
			case '12':
			case '13':
			case '14':
			case '15':
			case '16':
			case '17':
			case '18':
			case '19':

				break;		
			case '2':
			// Tor Heim
			case '3':
				// Tor Gast
				$('#torWahlBox').show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
			case '4':
			// Strafen
			case '6':
			case '7':
			case '8':
			case '9':
			case '10':
			case '26':
				$('#mannschaftWahlBox').show();
				$('#strafeWahlBox').show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				$('#absenden').show();
				break;
			case '1':
			// Hinweis
			//case '11':
			// Sonstige Strafe
			case '5':
				// 2 Minuten gegen beide Mannschaften
				$("#texteingabeAufforderung").html('Nachricht eingeben bitte');
				$('#textBox').show();
				$('#absenden').show();
				break;
			case '30':
			case '31':
			case '32':
			case '33':
				$('#absenden').show();
				break;
			//case '12':
			// 2 Minuten gegen beide Mannschaften
			case '27':
			// ... wieder komplett
			case '28':
				// Beide Mannschaften mit 4 Mann auf dem Eis.
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
		window.location.reload();
	});

}

