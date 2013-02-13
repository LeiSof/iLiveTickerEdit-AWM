var spielID=0;
var heimspiel=9;

function getHeimspiel() {
	var url = "http://www.ecp-liveticker.de/action/getSpiele.php";
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			jQuery.each(data, function(i) {

					id = data[i].id;
					if (id==spielID) {
						heimspiel = data[i].heimspiel;
						console.log(heimspiel);
					}

			});
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				alert("Fehler bei der Ermittlung von Heimspiel / Auswärtsspiel!");
			}
		}
	});
}

function getAufstellung(getAufstellungsUrl) {
	$.ajax({
		url : getAufstellungUrl,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			jQuery.each(data, function(i) {
				id = data[i].id;
				wert = data[i].name + ' (' + data[i].nummer + ')';
				console.log(id+wert);
				element1 = new Option(wert, id, false, true);
				element2 = new Option(wert, id, false, true);
				element3 = new Option(wert, id, false, true);
				element4 = new Option(wert, id, false, true);
				element5 = new Option(wert, id, false, true);
				element6 = new Option(wert, id, false, true);
				document.tickerEditor.torSpieler1.options[document.tickerEditor.torSpieler1.options.length] = element1;
				document.tickerEditor.torSpieler2.options[document.tickerEditor.torSpieler2.options.length] = element2;
				document.tickerEditor.torSpieler3.options[document.tickerEditor.torSpieler3.options.length] = element3;
				document.tickerEditor.strafeSpieler.options[document.tickerEditor.strafeSpieler.options.length] = element4;
				document.tickerEditor.torwartSpieler1.options[document.tickerEditor.torwartSpieler1.options.length] = element5;
				document.tickerEditor.torwartSpieler2.options[document.tickerEditor.torwartSpieler2.options.length] = element6;
				wert = "";
				document.tickerEditor.torSpieler1.selectedIndex = -1;
				document.tickerEditor.torSpieler2.selectedIndex = -1;
				document.tickerEditor.torSpieler3.selectedIndex = -1;
				document.tickerEditor.strafeSpieler.selectedIndex = -1;
				document.tickerEditor.torwartSpieler1.selectedIndex = -1;
				document.tickerEditor.torwartSpieler2.selectedIndex = -1;

			});
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				alert("Keine Spiele geplant!");
			}
		}
	});
}

function init() {
	var para = location.search;
	// Variable für Parameter
	// Parameter extrahieren
	para = para.replace(/^\?/, "").split("&");
	$_GET = new Object();
	for (var i = 0; i < para.length; i++) {
		var split = para[i].split("=");
		var name = split[0];
		split.splice(0, 1);
		var wert = split.join("=");
		try {
			$_GET[name] = decodeURIComponent(wert);
		} catch(e) {
			alert(wert);
		}
	}
	spielID = $_GET['spielID'];
	getAufstellungUrl = "http://www.ecp-liveticker.de/action/getAufstellung.php?spielID=" + spielID;
	getAufstellung(getAufstellungUrl);
	getHeimspiel();
	hideAll();
}

function hideAll() {
	clearForm();
	$('#spielminuteWahlBox').show();
	$('#quickActionWahlBox').show();
	$('#actionWahlBox').hide();
	$('#mannschaftWahlBox').hide();
	$('#torWahlBox').hide();
	$('#strafeWahlBox').hide();
	$('#torwartwechselWahlBox').hide();
	$('#ergebnisWahlBox').hide();
	$('#textBox').hide();
	$('#vorschau').hide();
	$('#absenden').hide();
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
		hideAll();
	});

}

function clearForm() {

	tickerEditor.reset();
	var elements = tickerEditor.elements;

	for ( i = 0; i < elements.length; i++) {

		field_type = elements[i].type.toLowerCase();
		switch(field_type) {

			case "text":
			case "password":
			case "textarea":
			case "hidden":

				elements[i].value = "";
				break;

			case "radio":
			case "checkbox":
				if (elements[i].checked) {
					elements[i].checked = false;
				}
				break;

			case "select-one":
			case "select-multi":
				elements[i].selectedIndex = -1;
				break;

			default:
				break;
		}
	}
}

