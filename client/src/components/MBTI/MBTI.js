import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API";
import "./MBTI.css";
import { QuestionMBTI } from "./QuestionMBTI.js";
import { questions } from "./DataMBTI.js";
import Login from "../Login/Login.js";

export class MBTI extends React.Component {
	state = {
		email: sessionStorage.getItem("email"),
		reponses: Array.apply(null, Array(questions.length)).map(function () {return null}),
		currentPage: 1,
		questionsPerPage: 10
	};
	getMBTIResults = () => {
		var [i, e, n, s, t, f, j, p] = [0, 0, 0, 0, 0, 0, 0, 0];
		const { reponses } = this.state;
		for (let index = 0; index < reponses.length; index++)
		{
			if (reponses[index] > 0)
			{
				switch (questions[index].type) {
					case "I":
						i++;
						break;
					case "E":
						e++;
						break;
					case "N":
						n++;
						break;
					case "S":
						s++;
						break;
					case "T":
						t++;
						break;
					case "F":
						f++;
						break;
					case "J":
						j++;
						break;
					case "P":
						p++;
						break;
					default:
						break;
				}
			}
			else if (reponses[index] < 0)
			{
				switch (questions[index].type) {
					case "I":
						e++;
						break;
					case "E":
						i++;
						break;
					case "N":
						s++;
						break;
					case "S":
						n++;
						break;
					case "T":
						f++;
						break;
					case "F":
						t++;
						break;
					case "J":
						p++;
						break;
					case "P":
						j++;
						break;
					default:
						break;
				}
			}
		}
		var ret = { i: i, e:e, n:n, s:s, t:t, f:f, j:j, p:p };
		return (ret);
	};
	getMBTIFinalType = (results) => {
		const { i, e, n, s, t, f, j, p } = results;
		var type = "";
		if (i > e)
			type += "I";
		else
			type += "E";
		if (n > s)
			type += "N";
		else
			type += "S";
		if (t > f)
			type += "T";
		else
			type += "F";
		if (j > p)
			type += "J";
		else
			type += "P";
		return (type);
	};
	send = async () => {
		const { reponses, email } = this.state;
		for(let i = 0; i < reponses.length; i++)
		{
			if(typeof reponses[i] === 'undefined' || reponses[i] === null)
			{
				const scrollItem = document.getElementById(i.toString());
				window.scrollTo(0, scrollItem.offsetTop - 110);
				const alert = document.getElementById("alertBox");
				alert.style.opacity = "1";
				alert.style.display = "block";
				return ;
			}
		}
		var results = this.getMBTIResults();
		const { i, e, n, s, t, f, j, p } = results;
		var type = this.getMBTIFinalType(results);
		try {
			await API.update_mbti(email, reponses, i, e, n, s, t, f, j, p, type);
			//localStorage.setItem("email", data.email);
			window.location = "/resultats";
		} catch (error) {
			console.error(error);
		}
	};
	handleChange = (event) => {
		this.setState(state => {
			const reponses = state.reponses.map((item, j) => {
				if (j === parseInt(event.target.id)) {
					return parseInt(event.target.value);
				} else {
					return item;
				}
			});
			return {
				reponses,
			};
		});
		const index = parseInt(event.target.id) + 1;
		const indexOfLastQuestion = this.state.currentPage * this.state.questionsPerPage;
		if (index < indexOfLastQuestion && index !== questions.length)
		{
			const scrollItem = document.getElementById(index.toString());
			window.scrollTo(0, scrollItem.offsetTop - 110);
		}
	};
	nextPage = () => {
		const {reponses, currentPage, questionsPerPage } = this.state;
		const indexOfLastQuestion = currentPage * questionsPerPage;
		const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
		for(let i = indexOfFirstQuestion; i < indexOfLastQuestion; i++)
		{
			if(typeof reponses[i] === 'undefined' || reponses[i] === null)
			{
				const scrollItem = document.getElementById(i.toString());
				window.scrollTo(0, scrollItem.offsetTop - 110);
				const alert = document.getElementById("alertBox");
				alert.style.opacity = "1";
				alert.style.display = "block";
				return ;
			}
		}
		this.setState({
			currentPage: currentPage + 1
		})
		window.scrollTo(0, 0);
		const alert = document.getElementById("alertBox");
		alert.style.opacity = "0";
		setTimeout(function(){alert.style.display = "block"; }, 600);
	};
	closeAlert = (event) => {
		const button = document.getElementsByClassName(event.target.className);
		button[0].parentElement.style.opacity = "0";
		setTimeout(function(){ button[0].parentElement.style.display = "none"; }, 600);
	}
	render() {
		if (!this.state.email)
			return (<Login onClose={null} show={true} closable={false}></Login>);
		const { currentPage, questionsPerPage } = this.state;
		const indexOfLastQuestion = currentPage * questionsPerPage;
		const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
		const progress_style = { width: (currentPage - 1) / 6 * 100  + "%" };
		return (
			<div className="page_wrapper mbti">
					<div id="alertBox" className="alert">
						<span className="closebtn" onClick={this.closeAlert}>&times;</span> 
						Veuillez répondre à toutes les questions avant de continuer.
					</div>
				<h3 className="partie">- Partie <span className="blue">4</span>/4 -</h3>
				<h1 className="big_title">Test de personnalité - MBTI</h1>
				<div id="mbti_prez">
					Le test suivant représente la majeure partie de ce questionnaire. Il servira à déterminer votre <b>type de personnalité</b> et est basé sur le très célèbre MBTI. Pour chaque question, indiquez si vous êtes d'accord ou non avec l'énoncé présenté. Evitez le plus possible de <b>réponses neutres</b> pour avoir un résultat le plus précis possible.
				</div>
				{ currentPage > 1 &&
					<div id="mbti_progress_bar">
						<span style={progress_style}>{ Math.round((currentPage - 1) / 6 * 100) }%</span>
					</div>
				}
				<div className="mbti_questions_section">
				
					{ questions.map((ques, index) => {
						if (index >= indexOfFirstQuestion && index < indexOfLastQuestion) {
							return (<QuestionMBTI key={ index } 
							label={ ques.label }
							index={ index } 
							onChange={ this.handleChange }
							/>)
						}
						else
							return null;
					})}
				</div>
				{ currentPage === Math.ceil(questions.length / questionsPerPage) &&
					<Button onClick={this.send} block type="submit" className="next_button">
						Envoyer <i className="fas fa-check-circle"></i>
					</Button>
				}
				{ currentPage !== Math.ceil(questions.length / questionsPerPage) &&
					<Button onClick={this.nextPage} block type="submit" className="next_button">
						Continuer <i className="fas fa-chevron-right"></i>
					</Button>
				}
			</div>
		)
	}
}