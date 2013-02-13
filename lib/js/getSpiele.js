function getSpiele() {
	var url = "http://www.ecp-liveticker.de/action/getSpiele.php";
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			jQuery.each(data, function(i) {

				id = data[i].id;
				console.log(id);
				wert = data[i].spielpaarung + ' - ' + data[i].datum + ' - ' + data[i].uhrzeit + ' Uhr';
				element = new Option(wert, id, false, true);
				document.spielAuswahl.spiel.options[document.spielAuswahl.spiel.options.length] = element;
				wert = "";
				document.spielAuswahl.spiel.selectedIndex = -1;

			});
		},
		error : function(e) {
			if (jQuery.isEmptyObject()) {
				alert("Keine Spiele geplant!");
			}
		}
	});
}

function spielAuswahlPruefen() {
	if (spiel.value > 0) {
		return true;
	} else {
		alert('Bitte wählen Sie zuerst ein Spiel!');
		return false;
	}
}
