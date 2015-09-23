/*
 * Parse Spreadsheet Data
 * Generate HTML (XML)
 */
function orientation2HTML(row, data, cache) {
		// Read Data
		var readCourse = data[row][0];
		var readDegree = data[row][1];
		var readType = data[row][2];
		var readTitle = data[row][3];
		var readOrganizer = data[row][4];
		var readDescription = data[row][5];
		var readPlace = data[row][6];
		var readInformation = data[row][7];
		var readLink = data[row][8];
		var readStartDate1 = data[row][9];
		var readStartDate2 = data[row][10];
		var readStopDate = data[row][11];
		// Const Strings for Comparison
		var stringTypeOne = "eintägiger Termin (z.B. Vortrag, Infoabend)";
		var stringTypeMany = "mehrtägiges Angebot (z.B. Brückenkurse)";
		var stringOrgFB = "Fakultät / Institut / Seminar / …";
		var stringOrgFS = "Fachschaft / Studierende";
		// Prepare Data: Booleans
		var oneDay;
		if (readType == stringTypeOne) {
				oneDay = true;
		} else {
				oneDay = false;
		};
		// Prepare Data: Dates
		if (oneDay) {
				var startDate = new Date(readStartDate1);
		} else {
				var startDate = new Date(readStartDate2);
				var stopDate = new Date(readStopDate);
		};
		// Prepare Data: Title
		var printTitle = "TAGObTAGC" + readTitle + "TAGO/bTAGC";
		if (readLink != "") {
				var printTitle = 'TAGOa href="'+readLink+'"TAGC'+printTitle+'TAGO/aTAGC';
		};
		
		// Get HTML Document  
		var htmlDoc = XmlService.parse(cache.get("htmlDoc"));
		var rootElement = htmlDoc.getContent(1).asElement();
		var bodyElement = rootElement.getChild("body");
		htmlDoc.setRootElement(rootElement);

		// Create/Get Course Div Element
		var currentDiv = getElementById(htmlDoc, readCourse+readDegree);
		if (currentDiv == null) {
				currentDiv = XmlService.createElement("div");
				currentDiv.setAttribute("id", readCourse+readDegree);
				var headline = XmlService.createElement("h3");
				headline.setText(readCourse + " (" + readDegree + ")");
				currentDiv.addContent(headline);
				var ul = XmlService.createElement("ul");
				currentDiv.addContent(ul);
				bodyElement.addContent(currentDiv);
		};
		
		// Get UL Element
		var currentUL = currentDiv.getChild("ul");
		// Create LI Element
		var currentLI = XmlService.createElement("li");
		// Create Paragraph Element
		var currentp = XmlService.createElement("p");
		
		// Title
		currentp.setText(printTitle + "LINEBREAK\n");
		// Date
		currentp.setText(currentp.getText() + formatDateString(oneDay, startDate, stopDate) + "LINEBREAK\n");
		
		// Place
		currentp.setText(currentp.getText() + "TAGOiTAGCOrt:TAGO/iTAGC " + readPlace);
		// Description
		if (readDescription != ""){
				currentp.setText(currentp.getText() + "LINEBREAK\n" + "TAGOiTAGCBeschreibung:TAGO/iTAGC " + readDescription);
		};

		// Further Information (optional)
		if ( readInformation == "" && readOrganizer == stringOrgFB ) {
				// do nothing
		} else {
				// print stuff
				currentp.setText(currentp.getText() +  "LINEBREAK\n");
				currentp.setText(currentp.getText() +  "TAGOiTAGCWeitere Informationen:TAGO/iTAGC ");
				if (readInformation != "") {
						currentp.setText(currentp.getText() +  readInformation);
				};
				if (readOrganizer == stringOrgFS) {
						var printOrganizer = "der Fachschaft";
						currentp.setText(currentp.getText() +  "LINEBREAK\n");
						currentp.setText(currentp.getText() +  "Von " + printOrganizer + " organisiert.");
				} else if (readOrganizer == "" || readOrganizer == stringOrgFB) {
						// currentp.setText(currentp.getText() +  "LINEBREAK\n");
						// do nothing
				} else {
						var printOrganizer = readOrganizer;
						currentp.setText(currentp.getText() +  "LINEBREAK\n");
						currentp.setText(currentp.getText() +  "Von " + printOrganizer + " organisiert.");
				};    
		};
		
		// Glue!
		currentLI.addContent(currentp);
		currentUL.addContent(currentLI);

		
		// Save Document
		var output = XmlService.getRawFormat().format(htmlDoc);
		cache.put("htmlDoc", output);
};


/*
 * Format Date
 */
function formatDateString(oneDay, startDate, stopDate) {
		
		// Const Strings for days
		var daynames = [
				"Sonntag",
				"Montag",
				"Dienstag",
				"Mittwoch",
				"Donnerstag",
				"Freitag",
				"Samstag"
    ];
		
		var output = "TAGOiTAGCDatum:TAGO/iTAGC ";
		day = startDate.getDay()
		output += daynames[startDate.getDay()];

		output += ", den ";
		// Date
		// (Month Index starts with zero.)
		output += ("0" + startDate.getDate()).slice(-2) + ".";
		output += ("0" + (startDate.getMonth() + 1)).slice(-2) + ".";
		output += startDate.getYear();
		// ---
		output += " um ";
		// Time
		output += ("0" + startDate.getHours()).slice(-2) + ":";
		output += ("0" + startDate.getMinutes()).slice(-2) + " Uhr";
		// ---
		if (!(oneDay)) {
				output += " bis ";
				output += ("0" + stopDate.getDate()).slice(-2) + ".";
				output += ("0" + (stopDate.getMonth() + 1)).slice(-2) + ".";
				output += stopDate.getYear();
		};

		return output
}


/*
 * Sort Data
 */
function sortSheet(dataRange) {
		var data = dataRange.getValues();
		data.sort();
		return data;
};

/*
 * Search Element by Id Attribute
 * (There is no DOM Library in Google Scripts, srsly?)
 */
function getElementById(element, idToFind) {  
		var descendants = element.getDescendants();  
		for(i in descendants) {
				var elt = descendants[i].asElement();
				if( elt != null) {
						var id = elt.getAttribute('id');
						if( id != null && id.getValue() == idToFind) return elt;    
				}
		}
		return null;
}

/*
 * Search Element by Name Attribute
 * (There is no DOM Library in Google Scripts, srsly?)
 */
function getElementByName(element, nameToFind) {  
		var descendants = element.getDescendants();  
		for(i in descendants) {
				var elt = descendants[i].asElement();
				if( elt != null) {
						var name = elt.getName;
						if( name != null && name == nameToFind) return elt;
				}
		}
		return null;
}


/*
 * MAIN function
 */
function main() {
		// Create Cache
		var cache = CacheService.getUserCache();
		
		// Open Spreadsheet
		var spreadSheet = SpreadsheetApp.getActiveSheet();
		
		// Get the spreadsheet-data as dataRange (without Headings and Timestamps)
		// Apperantly the last row is empty ...
		var dataRange = spreadSheet.getRange(2,2,spreadSheet.getLastRow()-1,spreadSheet.getLastColumn()-1);

		// Sort the spreadsheet
		var data = sortSheet(dataRange);
		var numRows = data.length;
		
		// Minimal html document
		var html = "<html>\n"
		html += "\t<head>\n"
		html += "\t\t<title>Veranstaltungen</title>\n"
		html += "\t</head>\n"
		html += "\t<body>\n"
		html += "\t</body>\n"
		html += "</html>\n"

		// Create HTML Document  
		var htmlDoc = XmlService.parse(html);
		htmlDoc.setDocType(XmlService.createDocType("html"));
		var output = XmlService.getRawFormat().format(htmlDoc);
		cache.put("htmlDoc", output);
		
		// Iterate Data
		for (var row = 0; row < numRows; row++) {
				orientation2HTML(row, data, cache)
		};
		
		// Read HTML File
		htmlDoc = XmlService.parse(cache.get("htmlDoc"));
		output = XmlService.getPrettyFormat().format(htmlDoc);
    
		// Create an HTML file in Drive root
		var targetFolder = DriveApp.getFolderById("0BzMWcbTdx4Nffk8zNFVpaVdUVWJRVDNDa2hfSUhKdlpwNDRWZmFqWjduVFkxQjgxSW9kZEk");
		targetFolder.createFile('veranstaltungen.html', output, MimeType.HTML);

		return 0;
}
