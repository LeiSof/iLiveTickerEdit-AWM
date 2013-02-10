
function hideAll() {
	$('#spielminuteWahlBox').hide();
	$('#quickActionWahlBox').hide();
	$('#actionWahlBox').hide();
}

function checkThem(caller,auswahl) {
	console.log(auswahl)
if (caller=="spielWahl") {
	console.log("SpielWahl");
		if (auswahl>0) {
			$('#spielminuteWahlBox').show()
			$('#quickActionWahlBox').show();
			$('#actionWahlBox').hide();
	} else {
			$('#spielminuteWahlBox').hide()
			$('#quickActionWahlBox').hide();
			$('#actionWahlBox').hide();
	}
}

if (caller=='spielminuteWahl') {
	var spielminute = auswahl;
	if (auswahl>0) {
			$('#actionWahlBox').show();
			$('#quickActionWahlBox').hide();
	} else {
			$('#actionWahlBox').hide();
			$('#quickActionWahlBox').show();
	}
}

/*switch (auswahl) {
	case "A":
		$('#blockA').show();
		$('#blockB').hide();
		$('#blockC').hide();
	break;
	case "B":
		$('#blockA').hide();
		$('#blockB').show();
		$('#blockC').hide();
	break;
	case "C":
		$('#blockA').hide();
		$('#blockB').hide();
		$('#blockC').show();
	break;*/
	
console.log("Spiel:"+spiel)
console.log("Spielminute:"+spielminute)
}	
