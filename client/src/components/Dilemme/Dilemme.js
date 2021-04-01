import React from "react";
import { Button, FormGroup, FormLabel, Form } from "react-bootstrap";
import API from "../../utils/API";
import "./Dilemme.css";
import Login from "../Login/Login.js";
import Error401 from "../Errors/Error401";
import Error500 from "../Errors/Error500";

const dilemmes = [
	{
	  nom:'A',
	  temporalite:"une semaine",
	  cadre_a:"200 personnes seront sauvées",
	  cadre_b_1:"600 personnes soient sauvées",
	  cadre_b_2:"personne ne soit sauvé",
	  importance:"forte",
	  cadre:"positif"
	},
	{
	  nom:'B',
	  temporalite:"une semaine",
	  cadre_a:"400 personnes mourront",
	  cadre_b_1:"personne ne meure",
	  cadre_b_2:"600 personnes meurent",
	  importance:"forte",
	  cadre:"negatif"
	},
	{
	  nom:'C',
	  temporalite:"30 ans",
	  cadre_a:"200 personnes seront sauvées",
	  cadre_b_1:"600 personnes soient sauvées",
	  cadre_b_2:"personne ne soit sauvé",
	  importance:"faible",
	  cadre:"positif"
	},
	{
	  nom:'D',
	  temporalite:"30 ans",
	  cadre_a:"400 personnes mourront",
	  cadre_b_1:"personne ne meure",
	  cadre_b_2:"600 personnes meurent",
	  importance:"faible",
	  cadre:"negatif"
	}
  ];

function indexDilemma(dilemma)
{
	if (dilemma === "A")
		return 0;
	else if (dilemma === "B")
		return 1;
	else if (dilemma === "C")
		return 2;
	else if (dilemma === "D")
		return 3;
	else
		return -1;
}

export class Dilemme extends React.Component {
	state = {
		email: sessionStorage.getItem("email"),
		dilemme: indexDilemma(sessionStorage.getItem("dilemme")),
		emotion_prog_a: "",
		emotion_prog_b: "",
		programme: "",
		isLoading: true,
		errors:[],
		errorPage: ""
	};
	// componentDidMount() {
	// 	API.get_users().then (response => {
	// 	  this.setState({
	// 		data: response,
	// 		users: response.data.data,
	// 		isLoading: false
	// 	  });
	// 	  console.log("data retrieved !", this.state.data)
	// 	})
	// 	.catch(error => {
	// 	  console.log(error);
	// 	});
	// };
	send = async () => {
		console.log("yo");
		const { email, programme, emotion_prog_a, emotion_prog_b } = this.state;
		if (!programme || programme.length === 0) {
			console.log("invalid form");
			return;
		}
		try {
			await API.update_dilemme(email, emotion_prog_a, emotion_prog_b, programme);
			//localStorage.setItem("email", data.email);
			window.location = "/annexe";
		} catch (error) {
			console.error(error);
		}
	};
	twoChoiceChange = (event) => {
		if (event.target.value === "A")
		{
			document.getElementById("prog_a_input").setAttribute("selected", "true");
			document.getElementById("prog_b_input").setAttribute("selected", "false");
		
		}
		else if (event.target.value === "B")
		{
			document.getElementById("prog_a_input").setAttribute("selected", "false");
			document.getElementById("prog_b_input").setAttribute("selected", "true");
		}
		this.setState({
			programme: event.target.value
		});
	};
	scaleChange = (event) => {
		if (event.target.id.startsWith("opinion_b"))
		{
				if (event.target.value === "-2")
			{
				document.getElementById("opinion_b_minus_2").setAttribute("selected", "true");
				document.getElementById("opinion_b_minus_1").setAttribute("selected", "false");
				document.getElementById("opinion_b_0").setAttribute("selected", "false");
				document.getElementById("opinion_b_plus_1").setAttribute("selected", "false");
				document.getElementById("opinion_b_plus_2").setAttribute("selected", "false");
			}
			else if (event.target.value === "-1")
			{
				document.getElementById("opinion_b_minus_2").setAttribute("selected", "false");
				document.getElementById("opinion_b_minus_1").setAttribute("selected", "true");
				document.getElementById("opinion_b_0").setAttribute("selected", "false");
				document.getElementById("opinion_b_plus_1").setAttribute("selected", "false");
				document.getElementById("opinion_b_plus_2").setAttribute("selected", "false");
			}
			else if (event.target.value === "0")
			{
				document.getElementById("opinion_b_minus_2").setAttribute("selected", "false");
				document.getElementById("opinion_b_minus_1").setAttribute("selected", "false");
				document.getElementById("opinion_b_0").setAttribute("selected", "true");
				document.getElementById("opinion_b_plus_1").setAttribute("selected", "false");
				document.getElementById("opinion_b_plus_2").setAttribute("selected", "false");
			}
			else if (event.target.value === "1")
			{
				document.getElementById("opinion_b_minus_2").setAttribute("selected", "false");
				document.getElementById("opinion_b_minus_1").setAttribute("selected", "false");
				document.getElementById("opinion_b_0").setAttribute("selected", "false");
				document.getElementById("opinion_b_plus_1").setAttribute("selected", "true");
				document.getElementById("opinion_b_plus_2").setAttribute("selected", "false");
			}
			else if (event.target.value === "2")
			{
				document.getElementById("opinion_b_minus_2").setAttribute("selected", "false");
				document.getElementById("opinion_b_minus_1").setAttribute("selected", "false");
				document.getElementById("opinion_b_0").setAttribute("selected", "false");
				document.getElementById("opinion_b_plus_1").setAttribute("selected", "false");
				document.getElementById("opinion_b_plus_2").setAttribute("selected", "true");
			}
			this.setState({
				emotion_prog_b: parseInt(event.target.value)
			});
		}
		else if (event.target.id.startsWith("opinion_a"))
		{
			if (event.target.value === "-2")
			{
				document.getElementById("opinion_a_minus_2").setAttribute("selected", "true");
				document.getElementById("opinion_a_minus_1").setAttribute("selected", "false");
				document.getElementById("opinion_a_0").setAttribute("selected", "false");
				document.getElementById("opinion_a_plus_1").setAttribute("selected", "false");
				document.getElementById("opinion_a_plus_2").setAttribute("selected", "false");
			}
			else if (event.target.value === "-1")
			{
				document.getElementById("opinion_a_minus_2").setAttribute("selected", "false");
				document.getElementById("opinion_a_minus_1").setAttribute("selected", "true");
				document.getElementById("opinion_a_0").setAttribute("selected", "false");
				document.getElementById("opinion_a_plus_1").setAttribute("selected", "false");
				document.getElementById("opinion_a_plus_2").setAttribute("selected", "false");
			}
			else if (event.target.value === "0")
			{
				document.getElementById("opinion_a_minus_2").setAttribute("selected", "false");
				document.getElementById("opinion_a_minus_1").setAttribute("selected", "false");
				document.getElementById("opinion_a_0").setAttribute("selected", "true");
				document.getElementById("opinion_a_plus_1").setAttribute("selected", "false");
				document.getElementById("opinion_a_plus_2").setAttribute("selected", "false");
			}
			else if (event.target.value === "1")
			{
				document.getElementById("opinion_a_minus_2").setAttribute("selected", "false");
				document.getElementById("opinion_a_minus_1").setAttribute("selected", "false");
				document.getElementById("opinion_a_0").setAttribute("selected", "false");
				document.getElementById("opinion_a_plus_1").setAttribute("selected", "true");
				document.getElementById("opinion_a_plus_2").setAttribute("selected", "false");
			}
			else if (event.target.value === "2")
			{
				document.getElementById("opinion_a_minus_2").setAttribute("selected", "false");
				document.getElementById("opinion_a_minus_1").setAttribute("selected", "false");
				document.getElementById("opinion_a_0").setAttribute("selected", "false");
				document.getElementById("opinion_a_plus_1").setAttribute("selected", "false");
				document.getElementById("opinion_a_plus_2").setAttribute("selected", "true");
			}
			this.setState({
				emotion_prog_a: parseInt(event.target.value)
			});
		}
	};
	hasError(key) {
		return this.state.errors.indexOf(key) !== -1;
	};
	handleSubmit = async(event) => {
		event.preventDefault();
		// console.log(this.state);
		var errors = [];
		if (this.state.emotion_prog_a === "")
			errors.push("emotion_prog_a");
		if (this.state.emotion_prog_b === "")
			errors.push("emotion_prog_b");
		if (this.state.programme === "")
			errors.push("programme");
		this.setState({
			errors: errors
		});
		if (errors.length > 0) {
			return false;
		} else {
			try {
				const { email, emotion_prog_a, emotion_prog_b, programme } = this.state;
				await API.update_dilemme(email, emotion_prog_a, emotion_prog_b, programme);
				//localStorage.setItem("email", data.email);
				window.location = "/annexe";
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
		}
	};
	render() {
		if (this.state.errorPage === "401")
			return (<Error401></Error401>)
		if (this.state.errorPage === "500")
			return (<Error500></Error500>)
		const { dilemme } = this.state;
		if (!this.state.email)
			return (<Login onClose={null} show={true} closable={false}></Login>);
		return (
			<div className="page_wrapper dilemme questionnaire">
				<h3 className="partie">- Partie <span className="blue">2</span>/4 -</h3>
				<h1 className="big_title">Dilemme</h1>
				<p className="intro">Pour rappel, le problème suivant n'a pas de bonne ou de mauvaise réponse. <br/>Répondez simplement sans trop refléchir.</p>
				<p>
					Imaginez que la France se prépare à la propagation d'une maladie asiatique
					inhabituelle. La maladie va frapper dans <b>environ {dilemmes[dilemme].temporalite}</b> et il est attendu
					qu'elle tue <b>environ 600 personnes</b>.
				</p>
				<p>
					Deux programmes alternatifs de lutte contre la maladie ont été proposés.
					Supposez que les estimations scientifiques les plus précises des conséquences
					de chaque programme sont les suivantes :
				</p>
				<p className="proposal">
					Si le programme A est adopté, {dilemmes[dilemme].cadre_a}.
				</p>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup controlId="emotion_prog_a" className={
								this.hasError("programme")
								  ? "is-invalid"
								  : ""
							  }>
					<FormLabel>Indiquez comment vous vous sentez à propos de cette option :</FormLabel>
					<div className="opinion_scale">
						<Button id="opinion_a_minus_2" value="-2" onClick={this.scaleChange}><i className="far fa-tired"></i></Button>
						<Button id="opinion_a_minus_1" value="-1" onClick={this.scaleChange}><i className="far fa-frown"></i></Button>
						<Button id="opinion_a_0" value="0" onClick={this.scaleChange}><i className="far fa-meh"></i></Button>
						<Button id="opinion_a_plus_1" value="1" onClick={this.scaleChange}><i className="far fa-smile"></i></Button>
						<Button id="opinion_a_plus_2" value="2" onClick={this.scaleChange}><i className="far fa-laugh"></i></Button>
					</div>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez choisir une option.
            		</Form.Control.Feedback>
				</FormGroup>
				<p className="proposal">
					Si le programme B est adopté, il y a 1 chance sur 3 que {dilemmes[dilemme].cadre_b_1} et 2 chances sur 3 que {dilemmes[dilemme].cadre_b_2}.
				</p>
				<FormGroup controlId="emotion_prog_b" className={
								this.hasError("programme")
								  ? "is-invalid"
								  : ""
							  }>
					<FormLabel>Indiquez comment vous vous sentez à propos de cette option :</FormLabel>
					<div className="opinion_scale">
						<Button id="opinion_b_minus_2" value="-2" onClick={this.scaleChange}><i className="far fa-tired"></i></Button>
						<Button id="opinion_b_minus_1" value="-1" onClick={this.scaleChange}><i className="far fa-frown"></i></Button>
						<Button id="opinion_b_0" value="0" onClick={this.scaleChange}><i className="far fa-meh"></i></Button>
						<Button id="opinion_b_plus_1" value="1" onClick={this.scaleChange}><i className="far fa-smile"></i></Button>
						<Button id="opinion_b_plus_2" value="2" onClick={this.scaleChange}><i className="far fa-laugh"></i></Button>
					</div>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez choisir une option.
            		</Form.Control.Feedback>
				</FormGroup>
				<p className="proposal">
					Maintenant, nous souhaiterions savoir lequel des 2 programmes vous choisiriez.
				</p>
					<div className={
								this.hasError("programme")
								  ? "two_choice_input programme is-invalid"
								  : "two_choice_input programme"
							  }>
						{/* <FormLabel>Je choisi le programme :</FormLabel> */}
						<Button id="prog_a_input" type="button" onClick={this.twoChoiceChange} value="A">
							A
						</Button>
						<Button id="prog_b_input" type="button" onClick={this.twoChoiceChange} value="B">
							B
						</Button>
						<Form.Control.Feedback type="invalid" >
							<i className="fas fa-exclamation-circle"></i> Veuillez choisir un programme.
            			</Form.Control.Feedback>
					</div>

					<Button block type="submit" className="next_button">
						Continuer <i className="fas fa-chevron-right"></i>
					</Button>
				</Form>
				
			</div>
		)
	}
}