import React from "react";
import { Button } from "react-bootstrap";
import API from "../../utils/API";
import "./MBTI.css";
import { QuestionMBTI } from "./QuestionMBTI.js";
import { questions } from "./DataMBTI.js";
import Login from "../Login/Login.js";
import Error401 from "../Errors/Error401";
import Error500 from "../Errors/Error500";

export class MBTI extends React.Component {
	state = {
		email: sessionStorage.getItem("email"),
		reponses: Array.apply(null, Array(questions.length)).map(function () {return 0}),
		currentPage: 1,
		questionsPerPage: 10,
		errorPage: "",
		neutralValid: false
	};
	componentDidMount = () => {
		window.scrollTo(0, 0);
	}
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
		else if (i !== 0 || e !== 0)
			type += "E";
		else
			type += "a";
		if (n > s)
			type += "N";
		else if (n !== 0 || s !== 0)
			type += "S";
		else
			type += "a";
		if (t > f)
			type += "T";
		else if (t !== 0 || f !== 0)
			type += "F";
		else
			type += "a";
		if (j > p)
			type += "J";
		else if (j !== 0 || p !== 0)
			type += "P";
		else
			type += "a";
		return (type);
	};
	send = async (neutralValid) => {
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
		if (type.includes("a") && !neutralValid)
		{
			const alert = document.getElementById("alertNeutre");
			alert.style.opacity = "1";
			alert.style.display = "block";
			console.log("too much neutral");
			return ;
		}
		try {
			await API.update_mbti(email, reponses, i, e, n, s, t, f, j, p, type);
			window.location = "/resultats";
		} catch (error) {
			if (error.response.status === 401)
			{
				this.setState({
					errorPage: "401"
				})
			}
			if (error.response.status === 500)
			{
				this.setState({
					errorPage: "500"
				})
			}
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
	closeAlert = (alertDialog) => {
		const button = document.getElementById(alertDialog);
		button.style.opacity = "0";
		setTimeout(function(){ button.style.display = "none"; }, 600);
	};
	modifyNeutral = () => {
		var i = 0;
		while (this.state.reponses[i] !== 0)
			i++;
		var page;
		if (i === 0)
			page = 1;
		else
			page = Math.ceil(i / this.state.questionsPerPage);
		window.scrollTo(0, 0);
		this.setState({
			currentPage: page,
			neutralValid: false
		});
		this.closeAlert("alertNeutre");
	};
	validateNeutral = () => {
		// this.state.neutralValid = true;
		this.send(true);
	}
	render() {
		if (this.state.errorPage === "401")
			return (<Error401></Error401>)
		if (this.state.errorPage === "500")
			return (<Error500></Error500>)
		if (!this.state.email)
			return (<Login onClose={null} show={true} closable={false}></Login>);
		const { currentPage, questionsPerPage } = this.state;
		const indexOfLastQuestion = currentPage * questionsPerPage;
		const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
		const progress_style = { width: (currentPage - 1) / 6 * 100  + "%" };
		return (
			<div className="page_wrapper mbti">
					<div id="alertNeutre" className="alert">
						<span className="closebtn" onClick={this.closeAlert}>&times;</span> 
						Attention ! Vous avez donné trop de réponses neutres et votre résultat est incertain. Vous pouvez continuer ou bien modifier certaines de vos réponses neutres.
						<div><button onClick={this.validateNeutral}>Je continue</button><button onClick={this.modifyNeutral}><span>Je modifie <i className="fas fa-pen"></i></span></button></div>
					</div>
					<div id="alertBox" className="alert">
						<span className="closebtn" onClick={() => this.closeAlert("alertBox")}>&times;</span> 
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
							value={ this.state.reponses[index] }
							/>)
						}
						else
							return null;
					})}
				</div>
				{ currentPage === Math.ceil(questions.length / questionsPerPage) &&
					<Button onClick={() => this.send(this.state.neutralValid)} block type="submit" className="next_button">
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