import React from "react";
import { Button } from "react-bootstrap";
import "./Home.css";
import Login from "../Login/Login.js";

export class Home extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			show: false
		};
	};
	showLogin = e => {
		this.setState({
		  show: !this.state.show
		});
	  };
	render() {
		return (
			<div className="page_wrapper">
				<Login onClose={this.showLogin} show={this.state.show} closable></Login>
				<div id="home" className={this.state.show === true ? "hide" : ""}>
					<h1 id="home_title">Etude de psychologie sur l'effet du cadre</h1>
					
					<p id="presentation_text">
					
					Dans le cadre d'un Master en Psychologie Cognitive, j'étudie de quelle manière les individus font des choix dans des situations d'incertitude, et <b>l’influence de la personnalité</b> sur la façon de prendre une décision. 
					<br/><br/>
					Le questionnaire suivant met en jeu un dilemme entre deux décisions, une simple question de préférence pour lequel il n'y a <b>pas de bonne ou de mauvaise réponse</b>. Il suffit de répondre simplement, sans trop réfléchir.
					A la suite de celui-ci, se trouve un <b>questionnaire de personnalité</b>, inspiré d'un test de psychologie reconnu, le MBTI, et qui vous donnera accès à une fiche de personnalité personnalisée.
					<br/><br/>
					Toute personne souhaitant avoir <b>plus d’informations</b> sur les buts de cette recherche, les résultats, ou tout autre question, est invitée à <b>me contacter</b> pour en parler ensemble via mon adresse mail qui sera disponible à la fin du questionnaire.
					<br/><br/>
					Je vous remercie énormément d'avance, et vous souhaite une bonne journée !
					</p>
					<p id="time">Temps de complétion : Environ 10 min</p>
					
					
				</div>
				<div id="button_wrapper" className={this.state.show === true ? "hide" : ""}>
						<Button id="start_button" onClick={() => this.props.history.push('/questions')}>Commencer <i className="fas fa-chevron-right"></i></Button>
						<Button id="login_button" onClick={e => {this.showLogin();}}>Déjà répondu ?</Button>
				</div>
			</div>
		)
	};
}