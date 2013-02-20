function getSpiele() {
	var url = "http://www.ecp-liveticker.de/action/getSpiele_new.php";
	$.ajax({
		url : url,
		dataType : 'jsonp',
		jsonp : 'jsonp_callback',

		success : function(data) {

			jQuery.each(data, function(i) {
				if (data[i].aktiv!=0) {
					id = data[i].spielID;
					wert = data[i].spieltagMannschaften + ' - ' + data[i].spieltagDatumUhrzeit;
					element = new Option(wert, id, false, true);
					document.spielAuswahl.spiel.options[document.spielAuswahl.spiel.options.length] = element;
					wert = "";
					document.spielAuswahl.spiel.selectedIndex = -1;
				}
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
