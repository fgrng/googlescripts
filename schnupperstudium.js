function Spreadsheet2HTML(row, data, cache) {
  
  var currentFaculty = data[row][0];
  var currentSubject = data[row][1];
  var courseType = data[row][2];
  var courseTitle = data[row][3];
  var courseTime = data[row][4];
  var courseLecturer = data[row][5];
  var coursePlace = data[row][6];
  var courseLink = data[row][7];
  
  if (courseLink != "") {
    var Title = '<a href="'+courseLink+'">'+courseTitle+'</a>';
  } else {
    var Title = courseTitle;
  }
  
  var faculty = cache.get("faculty");
  var subject = cache.get("subject");
  
  var HTMLcode = "";
  
  if (currentFaculty != faculty) {
    if (faculty != "") {HTMLcode += endoftable() + '\n</div>'};
    HTMLcode += facultyhead(currentFaculty, cache) + subjecthead(currentSubject, cache);
  } else if (currentSubject != subject) {
    HTMLcode += endoftable() + subjecthead(currentSubject, cache);
  };
  
  HTMLcode += '\n\t\t\t<tr>'
    +'\n\t\t\t\t<td style="vertical-align: top;">'+ courseType +'</td>'
    +'\n\t\t\t\t<td style="vertical-align: top;">'+ Title +'</td>'
    +'\n\t\t\t\t<td style="vertical-align: top;">'+ courseTime +'</td>'
    +'\n\t\t\t\t<td style="vertical-align: top;">'+ coursePlace +'</td>'
    +'\n\t\t\t\t<td style="vertical-align: top;">'+ courseLecturer +'</td>'
    +'\n\t\t\t</tr>';
    
  return HTMLcode;
} 


function htmlhead() {
  var HTMLcode = '<h2 id="anker_AllgemeineInformationen">Allgemeine Informationen</h2>'
    +'\n\t<p>\n\t\tDas Angebot zum Schnupperstudium entstand aus dem Wunsch zahlreicher SchülerInnen, einmal »echte« Vorlesungen an der Universität besuchen zu dürfen. Wir bieten Ihnen diese Möglichkeit an, Vorlesungen des regulären Vorlesungsbetriebs einfach zu besuchen, um so einen ersten Eindruck vom Studium und Studienalltag zu bekommen. Dieses Angebot ist eine Ergänzung – kein Ersatz – des Beratungs- und Informationsangebots der Zentralen Studienberatung / Career Service. Es soll Ihnen eine weitere Hilfestellung auf dem Weg zu Ihrer Studienentscheidung sein.\n\t</p>'
    +'\n\t<p>\n\t\t<strong>Bitte beachten Sie folgende Punkte: </strong>\n\t</p>'
    +'\n\t<ul>\n\t\t<li>Sie müssen sich <strong> nicht </strong> anmelden.</li>'
    +'\n\t\t<li>Das Angebot richtet sich an Einzelpersonen. Die Veranstaltungsräume bieten in der Regel nicht ausreichend Platz für mehrere Personen oder gar größere Gruppen.</li>'
    +'\n\t\t<li>Die Vorlesungszeit beginnt am  18. April und endet am 30. Juli 2016. Die Zeit und der Ort für die jeweilige Veranstaltung sind angegeben. Für eventuell ausfallende oder verlegte Einzeltermine können wir leider keine Garantie geben.</li>'
    +'\n\t\t<li>Das Veranstaltungsangebot wird fortlaufend aktualisiert.</li>\n\t</ul>';
/*
  HTMLcode += '\n<p>\n\t<a class="show-biofak" href="#biofak-head">Fakultät für Biowissenschaften </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-biofak" href="#molek-bio"> Molekulare Biotechnologie/Biologie/Biowissenschaften </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-biofak" href="#pharmazie"> Pharmazie </a>\n</p>';
  HTMLcode += '\n<p>\n\t<a class="show-chemgeo" href="#chemgeo-head">Fakultät für Chemie und Geowissenschaften </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-chemgeo" href="#chemie"> Chemie </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-chemgeo" href="#geographie"> Geographie </a><br><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-chemgeo" href="#geo"> Geowissenschaften </a>\n</p>';
  HTMLcode += '\n<p>\n\t<a class="show-mathinf" href="#mathinf-head">Fakultät für Mathematik und Informatik </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-mathfak" href="#mathematik"> Mathematik </a><br><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-mathfak" href="#informatik"> Informatik </a>\n</p>';
  HTMLcode += '\n<p>\n\t<p>\n\t<a class="show-physfak" href="#physfak-head">Fakultät für Physik und Astronomie</a><br />'
    +'\n\t<p>\n\t<a class="show-physfak" href="#physfak-head">Physik</a>\n</p>';
  HTMLcode += '\n<p>\n\t<a class="show-verkult" href="#verkult-head">Fakultät für Verhaltens- und empirische Kulturwissenschaften</a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-verkult" href="#bildungswissenschaft"> Bildungswissenschaft</a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-verkult" href="#ethno"> Ethnologie</a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-verkult" href="#psychologie"> Psychologie</a>\n</p>';
  HTMLcode += '\n<p>\n\t<a class="show-wiso" href="#wiso-head">Fakultät für Wirtschafts- und Sozialwissenschaften </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-wiso" href="#powi"> Politische Wissenschaft </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-wiso" href="#soziologie">Soziologie </a>\n</p>';
  HTMLcode += '\n<p>\n\t&nbsp; &nbsp; <a class="show-wiso" href="#soziologie">Soziologie </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-jurafak" href="#jura"> Rechtswissenschaften (Jura) </a></p>';
  HTMLcode += '\n<p>\n\t<a class="show-medfaken" href="#medfaken-head">Medizinische Fakultäten Heidelberg und Mannheim </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-medfaken" href="#medhd"> Humanmedizin in Heidelberg </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-medfaken" href="#medma"> Humanmedizin in Mannheim </a>\n</p>';
  HTMLcode += '\n<p>\n\t<a class="show-neuphil" href="#neuphil-head">Neuphilologische Fakultät </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-neuphil" href="#compling"> Computerlinguistik </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-neuphil" href="#germanistik"> Deutsche Philologie/Germanistik </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-neuphil" href="#germanistikvgl"> Germanistik im Kulturvergleich/Deutsch als Fremdsprachenphilologie </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-neuphil" href="#dolmetschen"> Konferenzdolmetschen </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-neuphil" href="#romanistik"> Romanistik </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-neuphil" href="#slavistik"> Slavistik </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-neuphil" href="#sued"> Übersetzungswissenschaft </a>\n</p>';
  HTMLcode += '\n<p>\n\t<a class="show-philfak" href="#philfak-head">Philosophische Fakultät </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#assyriologie"> Assyriologie</a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#europ-kunstgesch"> Europäische Kunstgeschichte </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#neue-geschichte"> Geschichte</a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#klass-arch"> Klassische Archäologie</a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#musik"> Musikwissenschaft </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#japanologie"> Ostasienwissenschaften, Schwerpunkt Japanologie </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#kunst-ost"> Ostasienwissenschaften, Schwerpunkt Kunstgeschichte Ostasiens </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#sinologie"> Ostasienwissenschaften, Schwerpunkt Sinologie </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#osteuropastudien"> Osteuropa- und Ostmitteleuropastudien </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#philosophie"> Philosophie </a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-philfak" href="#vorderasien"> Vorderasiatische Archäologie </a>\n</p>';
  HTMLcode += '\n<p>\n\t<a class="show-theofak" href="#theofak-head">Theologische Fakultät</a><br />'
    +'\n\t&nbsp; &nbsp; <a class="show-theofak" href="#theo"> Theologie/Christentum und Kultur</a>\n</p>';
*/
  HTMLcode += '\n\n<div>';
  return HTMLcode;
}

function htmlMedFaken() {
  var HTMLcode = '\n<h2 class="toggle-header-show-active">\n\t<img alt="Pfeil Rechts" src="/md/studium/pfeil_rechts.gif"> <a href="#medfaken-head" id="medfaken-head"> Medizinische Fakultäten Heidelberg und Mannheim </a>\n</h2>'
    +'\n<div class="panel-more" id="medfaken">'
    +'\n\t<h3>\n\t\t<a id="medhd" name="medhd"> </a> Humanmedizin in Heidelberg\n\t</h3>'
    +'\n\t<p>\n\t\tBesuch einer ausgewählten vorklinischen Vorlesung als Gast möglich, Anfragen bitte an Studiendekanat Medizin: <a href="mailto:susanne.nuetzenadel@med.uni-heidelberg.de"> susanne.nuetzenadel@med.uni-heidelberg.de </a>\n\t</p>'
    +'\n\t<h3><a id="medma" name="medma"> </a> Humanmedizin in Mannheim</h3>'
    +'\n\t<p>\n\t\t<a href="http://www.umm.uni-heidelberg.de/studium/interesse/">Hier </a> finden Sie eine Übersicht der geeigneten Schnupperstudium-Veranstaltungen für Medizin an der Medizinischen Fakultät Mannheim der Universität Heidelberg.\n\t</p>'
    +'\n</div>';
  return HTMLcode;
}


function htmltail() {
  var HTMLcode = '\n</div>\n\n<br />'
    +'\n<h2><a id="abk" name="abk"> </a> Abkürzungen:</h2>'
    +'\n<p>'
    +'\n\tgHS – großer Hörsaal<br />'
    +'\n\tgSR – großer Seminarraum<br />'
    +'\n\tHfJS – Hochschule für Jüdische Studien<br />'
    +'\n\tHS – Hörsaal<br />'
    +'\n\tINF – Im Neuenheimer Feld<br />'
    +'\n\tISSW – Institut für Sport und Sportwissenschaft<br />'
    +'\n\tR – Raum<br />'
    +'\n\tSR – Seminarraum<br />'
    +'\n\tIÜD – Institut für Übersetzen und Dolmetschen<br />'
    +'\n\tÜR – Übungsraum'
    +'\n</p>\n<p>\n\tLagekarten der einzelnen Institute und Hörsaalgebäude finden Sie <a href="http://www.uni-heidelberg.de/universitaet/besucher/karten/">hier</a>.\n</p>';
  return HTMLcode;
}


function facultyhead(currentFaculty, cache) {
  if (currentFaculty == "Fakultät für Biowissenschaften") {var facultyShort = "biofak";}
  else if (currentFaculty == "Fakultät für Chemie und Geowissenschaften") {var facultyShort = "chemgeo";}
  else if (currentFaculty == "Fakultät für Mathematik und Informatik") {var facultyShort = "mathinf";}
  else if (currentFaculty == "Fakultät für Physik und Astronomie") {var facultyShort = "physfak";}
  else if (currentFaculty == "Philosophische Fakultät") {var facultyShort = "philfak";}
  else if (currentFaculty == "Neuphilologische Fakultät") {var facultyShort = "neuphil";}
  else if (currentFaculty == "Theologische Fakultät") {var facultyShort = "theofak";}
  else if (currentFaculty == "Juristische Fakultät") {var facultyShort = "jurafak";}
  else if (currentFaculty == "Fakultät für Wirtschafts- und Sozialwissenschaften") {var facultyShort = "wiso";}
  else if (currentFaculty == "Fakultät für Verhaltens- und Empirische Kulturwissenschaften") {var facultyShort = "verkult";}
  else if (currentFaculty == "Medizinische Fakultäten Heidelberg und Mannheim") {var facultyShort = "medfaken";}
    else {var facultyShort = "misc";};
  
  var HTMLcode = '\n\n<h2 class="toggle-header-show-active">'
    +'\n\t<img alt="Pfeil Rechts" src="/md/studium/pfeil_rechts.gif"> <a href="'+facultyShort+'-head" id="'+facultyShort+'-head"> '+currentFaculty+'</a>'
    +'\n</h2>\n<div class="panel-more" id="'+facultyShort+'">';
  
  cache.put("faculty", currentFaculty);
  return HTMLcode;
}


function subjecthead(currentSubject, cache) {
  var subjectShort = currentSubject.replace(' ','_').toLowerCase();
  var HTMLcode = '\n<h3><a id="'+subjectShort+'" name="'+subjectShort+'"> </a> '+currentSubject+'</h3>'
    +'\n\n\t<table align="left" border="1" cellpadding="1" cellspacing="1" style="width: 100%;">'
    +'\n\t\t<colgroup>\n\t\t\t<col width="10%">\n\t\t\t<col width="35%">\n\t\t\t<col width="20%">\n\t\t\t<col width="20%">\n\t\t\t<col width="15%">'
    +'\n\t\t</colgroup>\n\t\t<tbody>';
  cache.put("subject", currentSubject);
  return HTMLcode;
}


function endoftable() {
  return "\n\t\t</tbody>\n\t</table>\n\t<p>&nbsp;</p>";
}


function sortSheet(dataRange) {
  var data = dataRange.getValues();
  data.sort();
  return data;
};

function main() {
  // open the spreadsheet
  var spreadSheet = SpreadsheetApp.getActiveSheet();
  // get the spreadsheet-data as dataRange (without Headings and Timestamps)
  // apperantly the last row is empty ...
  var dataRange = spreadSheet.getRange(2,2,spreadSheet.getLastRow()-1,spreadSheet.getLastColumn()-1);
  // sort the spreadsheet
  var data = sortSheet(dataRange);
  var numRows = data.length;
  // create empty string for HTML-output
  var HTMLtext = htmlhead();
  // use a cache as a substitute for global variables
  var Cache = CacheService.getPrivateCache();
  Cache.put("faculty", "");
  Cache.put("subject", "");
  // cycle thru all rows in 'data' and generate the corresponding HTML-code
  for (var i = 0; i < numRows; i++) {
    HTMLtext += Spreadsheet2HTML(i, data, Cache)
  };
  HTMLtext += endoftable() + htmltail();
  // Create an HTML file in Drive root
  var targetFolder = DriveApp.getFolderById("0BzMWcbTdx4NfNVoyZzEtSXM1NkU");
  targetFolder.createFile('schnupperstudium.html', HTMLtext, MimeType.HTML);
  return;
}
