import React from 'react'
import Button from 'react-bootstrap/Button';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const parseData = (data_to_parse) => {
	const newData = [];
	for(var i = 0; i < data_to_parse.length; i++)
	{
		// console.log(data_to_parse[i]);
		newData[i] = {};
		newData[i].id = i;
		newData[i].email = data_to_parse[i].email;
		newData[i].dilemme = data_to_parse[i].dilemme;

		newData[i].sexe = data_to_parse[i].infos_perso.sexe;
		newData[i].age = data_to_parse[i].infos_perso.age;
		newData[i].etude = data_to_parse[i].infos_perso.etude;
		newData[i].pro = data_to_parse[i].infos_perso.pro;
		newData[i].langue = data_to_parse[i].infos_perso.langue;
		newData[i].langue_sec = data_to_parse[i].infos_perso.langue_sec;
		
		if (data_to_parse[i].dilemme_reponses) {
			newData[i].emotion_prog_a = data_to_parse[i].dilemme_reponses.emotion_prog_a;
			newData[i].emotion_prog_b = data_to_parse[i].dilemme_reponses.emotion_prog_b;
			newData[i].programme = data_to_parse[i].dilemme_reponses.programme;
		}
		else {
			newData[i].emotion_prog_a = "";
			newData[i].emotion_prog_b = "";
			newData[i].programme = "";
		}
		
		if (data_to_parse[i].annexes){
			newData[i].connais_dilemme = data_to_parse[i].annexes.connais_dilemme;
			newData[i].preoccupation_epidemie = data_to_parse[i].annexes.preoccupation_epidemie;
			newData[i].frequence_infos = data_to_parse[i].annexes.frequence_infos;
			newData[i].frequence_science = data_to_parse[i].annexes.frequence_science;
			newData[i].exactitude_connaissance = data_to_parse[i].annexes.exactitude_connaissance;
			newData[i].respect_directives_sanitaires = data_to_parse[i].annexes.respect_directives_sanitaires;
			newData[i].raisons_respect = data_to_parse[i].annexes.raisons_respect;
		}
		else {
			newData[i].connais_dilemme = "";
			newData[i].preoccupation_epidemie = "";
			newData[i].frequence_infos = "";
			newData[i].frequence_science = "";
			newData[i].exactitude_connaissance = "";
			newData[i].respect_directives_sanitaires = "";
			newData[i].raisons_respect = "";
		}

		if (data_to_parse[i].mbti) {
			newData[i].mbti = data_to_parse[i].mbti.type;
			newData[i].mbti_t = data_to_parse[i].mbti.t;
			newData[i].mbti_f = data_to_parse[i].mbti.f;
			newData[i].mbti_reponses = data_to_parse[i].mbti.reponses;
		}
		else {
			newData[i].mbti = "";
			newData[i].mbti_t = "";
			newData[i].mbti_f = "";
			newData[i].mbti_reponses = "";
		}
	}
	// data_to_parse.forEach(entry => {
	// 	newData.push({
	// 		email: entry.email, 
	// 		dilemme: entry.dilemme, 
	// 		sexe: entry.infos_perso.sexe
	// 	});
	// });
	return (newData);
};

export const ExportCSV = ({csvData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();
		var hh = String(today.getHours()).padStart(2, '0');
		var min = String(today.getMinutes()).padStart(2, '0');
		var ss = String(today.getSeconds()).padStart(2, '0');
		today = '-' + dd + '-' + mm + '-' + yyyy + '-' + hh + '-' + min + '-' + ss;
		const exportData = parseData(csvData);
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + today + fileExtension);
    }

    return (
        <Button variant="warning" onClick={(e) => exportToCSV(csvData,fileName)}>Export</Button>
    )
}