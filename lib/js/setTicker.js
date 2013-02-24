$.support.cors = true;
$.mobile.allowCrossDomainPages = true;

var spielID = 0;
var heimspiel = 0;
var mannschaftID = 0;
var heimMannschaft = "";
var gastMannschaft = "";

function tickerRefresh() {
	url2 = "http://www.ecp-liveticker.de/action/getTickerAction.php?mannschaftID=4";
	$.ajax({
		url : url2,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {
			// Ausgabe zusammenbauen
			$("#output").text = "";
			// durch jedes Element iterieren
			html = "";
			jQuery.each(data, function(i) {
				console.log(data[i]);
				html += '<li><a href="showMessage.html?meldungID=' + data[i].id + '&limit=1" data-rel="dialog" data-ajax="false"><img src="http://www.ecp-liveticker.de/thumbs/' + data[i].actionIcon + '_new.png" class="ui-li-icon"><p><b>' + data[i].body + '</b></p><p>' + data[i].spielAbschnitt + ' - Spielstand:' + data[i].spielStand + '</p><a href="#" class="delete">Delete</a></li>';
			});
			$('#output').empty($(html));
			// DOM - Container leeren
			$('#output').append($(html));
			// Neue Nodes einhängen
			$('#output').trigger('create');
			// Contanier erzeugen
			$('#output').listview('refresh');
			// Container refreshen
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
			}
		}
	});

}

function getLetzteMeldung() {
	var url = "http://www.ecp-liveticker.de/action/getBegegnung.php" + "?spielID=" + spielID;
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {
			spielstand = data.spielstand;
			lastMeldung = data.lastMeldung;
			$('#spielDaten').html(data.spieltagMannschaften + ' - ' + data.spieltagDatumUhrzeit + '<br>' + spielstand + '<br>' + lastMeldung);
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				alert("Fehler bei der Ermittlung der letzten Meldung!");
			}
		}
	});
}

function getSpieldaten(url) {
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {
			console.log(url);
			console.log(data);
			heimMannschaft = data.heimMannschaft;
			gastMannschaft = data.gastMannschaft;
			mannschaftID = data.mannschaftID;
			element0 = new Option(heimMannschaft, '1', false, true);
			document.tickerEditor.mannschaft.options[document.tickerEditor.mannschaft.options.length] = element0;
			element1 = new Option(gastMannschaft, '2', false, true);
			document.tickerEditor.mannschaft.options[document.tickerEditor.mannschaft.options.length] = element1;
			document.tickerEditor.mannschaft.selectedIndex = -1;

			getMannschaftUrl = "http://www.ecp-liveticker.de/action/getMannschaft.php?mannschaftID=" + mannschaftID;
			getMannschaft(getMannschaftUrl);

		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				alert("Fehler bei der Ermittlung der Spieldaten!");
			}
		}
	});
}

function getMannschaft(getMannschaftUrl) {
	$.ajax({
		url : getMannschaftUrl,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			jQuery.each(data, function(i) {
				id = data[i].id;
				wert = data[i].nachname + ' ' + data[i].vorname + ' (' + data[i].trikotnummer + ')';
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
				alert("Fehler bei der Ermittlung der Spieler dieser Manschaft!");
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
	getSpieldatenUrl = "http://www.ecp-liveticker.de/action/getBegegnung.php" + "?spielID=" + spielID;
	getSpieldaten(getSpieldatenUrl);
	getLetzteMeldung();
	tickerRefresh();
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
	}

	if (caller == 'mannschaftWahl') {
		$('#absenden').show();
	}

	if (caller == 'actionWahl') {
		var action = auswahl;
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
			// Tor
			case '21':
				$('#mannschaftWahlBox').show();
				$('#torWahlBox').show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
				break;
			// Strafen
			case '41':
			case '43':
			case '44':
			case '45':
			case '46':
			case '47':
			case '48':
			case '50':
				$('#mannschaftWahlBox').show();
				$('#strafeWahlBox').show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
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
				break;
			// Icing und Auszeit
			case '31':
			case '32':
				$('#mannschaftWahlBox').show();
				$("#texteingabeAufforderung").html('freier Text(optional)');
				$('#textBox').show();
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
				break;
		}
	}
	absenden(0);
}

function absenden(final) {
	var spielminuteID = spielminute.value;
	var quickActionID = quickAction.value;
	var actionID = action.value;
	var mannschaftID = mannschaft.value;
	var torSpieler1ID = torSpieler1.value;
	var torSpieler2ID = torSpieler2.value;
	var torSpieler3ID = torSpieler3.value;
	var ueberzahlID = ueberzahl.value;
	var komplettID = komplett.value;
	var strafeSpielerID = strafeSpieler.value;
	var strafeGrundID = strafeGrund.value;
	var spielerAnzahlID = spielerAnzahl.value;
	var torwartSpieler1ID = torwartSpieler1.value;
	var torwartSpieler2ID = torwartSpieler2.value;
	var heimToreID = heimTore.value;
	var gastToreID = gastTore.value;
	var textBoxText = text.value;
	var data = '';

	data += '&final=' + final;
	data += '&spiel=' + spielID;
	data += '&spielminute=' + spielminuteID;
	data += '&quickAction=' + quickActionID;
	data += '&action=' + actionID;
	data += '&mannschaft=' + mannschaftID;
	data += '&torSpieler1=' + torSpieler1ID;
	data += '&torSpieler2=' + torSpieler2ID;
	data += '&torSpieler3=' + torSpieler3ID;
	data += '&ueberzahl=' + ueberzahlID;
	data += '&komplett=' + komplettID;
	data += '&strafeSpieler=' + strafeSpielerID;
	data += '&strafeGrund=' + strafeGrundID;
	data += '&spielerAnzahl=' + spielerAnzahlID;
	data += '&torwartSpieler1=' + torwartSpieler1ID;
	data += '&torwartSpieler2=' + torwartSpieler2ID;
	data += '&heimTore=' + heimToreID;
	data += '&gastTore=' + gastToreID;
	data += '&textBox=' + textBoxText;
	var url = 'http://app.ecp-liveticker.de/action/writeTicker.php'
	$.ajax({
		url : url,
		dataType : 'jsonp',
		data : data,
		jsonp : 'jsonp_callback',
		success : function(data) {
			console.log(data.rueckgabe);
			$('#vorschau').html(data.rueckgabe);

			if (final == 1) {
				$('#absenden').attr("disabled", "disabled");
				alert('Meldung wurde abgeschickt!');
				hideAll();
				getLetzteMeldung();
				tickerRefresh();
			}
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				alert("Fehler bei der Versendung der Meldung!");
			}
		}
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

