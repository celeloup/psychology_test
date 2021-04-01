import React from "react";
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import API from "../../utils/API";
import "./QuestionsPerso.css";
import Login from "../Login/Login.js";
import Error401 from "../Errors/Error401";
import Error500 from "../Errors/Error500";

export class QuestionsPerso extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			email: "",
			sexe: "",
			age: "",
			etude: "",
			pro: "",
			langue: "",
			langue_sec: "",
			errors: [],
			show: false,
			errorPage: ""
		};
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	  };
	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};
	twoChoiceChange = (event) => {
		if (event.target.value === "Femme")
		{
			document.getElementById("femme_input").setAttribute("selected", "true");
			document.getElementById("homme_input").setAttribute("selected", "false");
		
		}
		else if (event.target.value === "Homme")
		{
			document.getElementById("femme_input").setAttribute("selected", "false");
			document.getElementById("homme_input").setAttribute("selected", "true");
		}
		this.setState({
			sexe: event.target.value
		});
	};
	hasError(key) {
		return this.state.errors.indexOf(key) !== -1;
	};
	handleSubmit = async(event) => {
		event.preventDefault();
		var errors = [];

		if (this.state.sexe === "") {
			errors.push("sexe");
		}
		if (this.state.email === "") {
			errors.push("email");
		}
		if (this.state.age === "") {
			errors.push("age");
		}
		if (this.state.etude === "") {
			errors.push("etude");
		}
		if (this.state.pro === "") {
			errors.push("pro");
		}
		if (this.state.langue === "") {
			errors.push("langue");
		}
		if (this.state.langue_sec === "") {
			errors.push("langue_sec");
		}
	
		//email
		const expression = /\S+@\S+/;
		var validEmail = expression.test(String(this.state.email).toLowerCase());
	
		if (!validEmail) {
			errors.push("email");
		}
	
		this.setState({
			errors: errors
		});
	
		if (errors.length > 0) {
			return false;
		} else {
			try {
				const { email, sexe, age, etude, pro, langue, langue_sec } = this.state;
				const { data } = await API.create_new_user(email, sexe, age, etude, pro, langue, langue_sec );
				sessionStorage.setItem("email", data.email);
				sessionStorage.setItem("dilemme", data.dilemme);
				window.location = "/dilemme";
			} catch (error) {
				if (error.response.status === 401)
					this.showLogin();
				if (error.response.status === 500)
				{
					this.setState({
						errorPage: "500"
					})
				}
			}
		}
	};
	showLogin = e => {
		this.setState({
		  show: !this.state.show
		});
	  };
	render() {
		if (this.state.errorPage === "401")
			return (<Error401></Error401>)
		if (this.state.errorPage === "500")
			return (<Error500></Error500>)
		const { email, age, etude, pro, langue, langue_sec } = this.state;
		return (
			<div className="page_wrapper questionnaire">
				<Login onClose={this.showLogin} show={this.state.show} closable>
					<div id="email_alert">
						L'adresse email renseignée est déjà présente dans nos données. Si vous souhaitez repasser le test, choisissez une autre adresse. Si vous souhaitez continuer le test ou voir les résultats, connectez-vous.
					</div>
				</Login>
				<h3 className="partie">- Partie <span className="blue">1</span>/4 -</h3>
				<h1 className="big_title">Informations personnelles</h1>
				<p id="introduction">Pour commencer, nous avons besoin de quelques informations sur vous.<br/> Ces données resteront <b>strictement anonymes</b>. 
				L'adresse email demandée n'apparaîtra pas dans les données finales de l'étude et servira seulement à éviter que quelqu'un remplisse deux fois le formulaire. 
				Cela vous donne également la possibilité de pouvoir <b>vous connecter dès la page d'accueil</b> et pouvoir lire à nouveau dans le futur le résultat de votre test de personnalité présent à la fin du questionnaire.</p>
				<Form onSubmit={this.handleSubmit}>
					<FormGroup controlId="email">
						<FormControl
							placeholder="Email"
							value={email}
							onChange={this.handleChange}
							className={
								this.hasError("email")
								  ? "form-control is-invalid"
								  : "form-control"
							  }
						/>
						<Form.Control.Feedback type="invalid" >
							<i className="fas fa-exclamation-circle"></i> Veuillez renseigner une adresse email valide.
            			</Form.Control.Feedback>
					</FormGroup>
					<FormGroup controlId="sexe" className={
								this.hasError("sexe")
								  ? "two_choice_input is-invalid"
								  : "two_choice_input"
							  }>
						<Button id="femme_input" type="button" onClick={this.twoChoiceChange} value="Femme">
							Femme
						</Button>
						<Button id="homme_input" type="button" onClick={this.twoChoiceChange} value="Homme">
							Homme
						</Button>
						<Form.Control.Feedback type="invalid" >
							<i className="fas fa-exclamation-circle"></i> Veuillez selectionner une option.
            			</Form.Control.Feedback>
					</FormGroup>
					<FormGroup controlId="age">
						<FormControl
							value={age}
							placeholder="Age"
							onChange={this.handleChange}
							className={
								this.hasError("age")
								  ? "form-control is-invalid"
								  : "form-control"
							  }
						/>
						<Form.Control.Feedback type="invalid" >
							<i className="fas fa-exclamation-circle"></i> Veuillez renseigner ce champ.
            			</Form.Control.Feedback>
					</FormGroup>
					<FormGroup controlId="etude">
						<FormControl
							value={etude}
							placeholder="Niveau d'étude"
							onChange={this.handleChange}
							className={
								this.hasError("etude")
								  ? "form-control is-invalid"
								  : "form-control"
							  }
						/>
						<Form.Control.Feedback type="invalid" >
							<i className="fas fa-exclamation-circle"></i> Veuillez renseigner ce champ.
            			</Form.Control.Feedback>
					</FormGroup>
					<FormGroup controlId="pro">
						<FormControl
							value={pro}
							placeholder="Situation professionnelle"
							onChange={this.handleChange}
							className={
								this.hasError("pro")
								  ? "form-control is-invalid"
								  : "form-control"
							  }
						/>
						<Form.Control.Feedback type="invalid" >
							<i className="fas fa-exclamation-circle"></i> Veuillez renseigner ce champ.
            			</Form.Control.Feedback>
					</FormGroup>
					<FormGroup controlId="langue">
						<FormControl
							value={langue}
							placeholder="Langue maternelle"
							onChange={this.handleChange}
							className={
								this.hasError("langue")
								  ? "form-control is-invalid"
								  : "form-control"
							  }
						/>
						<Form.Control.Feedback type="invalid" >
							<i className="fas fa-exclamation-circle"></i> Veuillez renseigner ce champ.
            			</Form.Control.Feedback>
					</FormGroup>
					<FormGroup controlId="langue_sec">
						<FormControl
							value={langue_sec}
							placeholder="Langue(s) secondaire(s)"
							onChange={this.handleChange}
							className={
								this.hasError("langue_sec")
								  ? "form-control is-invalid"
								  : "form-control"
							  }
						/>
						<Form.Control.Feedback type="invalid" >
							<i className="fas fa-exclamation-circle"></i> Veuillez renseigner ce champ.
            			</Form.Control.Feedback>
					</FormGroup>
					<Button block type="submit" className="next_button">
						Continuer <i className="fas fa-chevron-right"></i>
					</Button>
				</Form>
			</div>
		)
	}
}