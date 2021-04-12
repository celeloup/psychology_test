import React from "react";
import { Button, FormGroup, FormControl, Form} from "react-bootstrap";
import API from "../../utils/API";
import "./Annexe.css";
import { DragAndDrop } from "./DragAndDrop/DragAndDrop.js";
import Login from "../Login/Login.js";
import Error401 from "../Errors/Error401";
import Error500 from "../Errors/Error500";

export class Annexe extends React.Component {
	state = {
		email: sessionStorage.getItem("email"),
		connais_dilemme: "",
		preoccupation_epidemie: "",
		frequence_infos: "",
		frequence_science: "",
		exactitude_connaissance: "",
		respect_directives_sanitaires: "",
		raisons_respect: [],
		isLoading: true,
		showOther: false,
		idOther: -1,
		errors: [],
		errorPage: ""
	};
	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value	
		});
		if (event.target.id === "raisons_respect")
		{
			if (this.state.showOther === false && event.target.value=== "Autre")
			{
				this.setState({
					showOther: true,
					raisons_respect: ""
				});
			}
			if (this.state.showOther === true && event.target.nodeName === "SELECT" && event.target.value !== "Autre")
			{
				this.setState({
					showOther: false,
					raisons_respect: event.target.value
				});
			}
		}
	};
	hasError(key) {
		return this.state.errors.indexOf(key) !== -1;
	};
	twoChoiceChange = (event) => {
		if (event.target.value === "yes")
		{
			document.getElementById("oui_input").setAttribute("selected", "true");
			document.getElementById("non_input").setAttribute("selected", "false");
		
		}
		else if (event.target.value === "no")
		{
			document.getElementById("oui_input").setAttribute("selected", "false");
			document.getElementById("non_input").setAttribute("selected", "true");
		}
		this.setState({
			connais_dilemme: event.target.value
		});
	};
	scaleChange = (event) => {
		if (event.target.className.includes("preoccupation"))
		{
			const buttons = document.getElementsByClassName("preoccupation");
			for(var i = 0; i < buttons.length; i++)
			{
				if (buttons[i].value === event.target.value)
					buttons[i].setAttribute("selected", "true");
				else
					buttons[i].setAttribute("selected", "false");
			}
			this.setState({
				preoccupation_epidemie: parseInt(event.target.value)
			})
		}
		else if (event.target.className.includes("exactitude"))
		{
			const buttons = document.getElementsByClassName("exactitude");
			for(i = 0; i < buttons.length; i++)
			{
				if (buttons[i].value === event.target.value)
					buttons[i].setAttribute("selected", "true");
				else
					buttons[i].setAttribute("selected", "false");
			}
			this.setState({
				exactitude_connaissance: parseInt(event.target.value)
			})
		}
		else if (event.target.className.includes("respect"))
		{
			const buttons = document.getElementsByClassName("respect");
			for(i = 0; i < buttons.length; i++)
			{
				if (buttons[i].value === event.target.value)
					buttons[i].setAttribute("selected", "true");
				else
					buttons[i].setAttribute("selected", "false");
			}
			this.setState({
				respect_directives_sanitaires: parseInt(event.target.value)
			})
		}
	}
	handleSubmit = async(event) => {
		event.preventDefault();
		// console.log(this.state);
		var errors = [];
		if (this.state.connais_dilemme === "")
			errors.push("connais_dilemme");
		if (this.state.preoccupation_epidemie === "")
			errors.push("preoccupation");
		if (this.state.frequence_infos === "")
			errors.push("frequence_infos");
		if (this.state.frequence_science === "")
			errors.push("frequence_science");
		if (this.state.exactitude_connaissance === "")
			errors.push("exactitude_connaissance");
		if (this.state.respect_directives_sanitaires === "")
			errors.push("respect");
		if (this.state.raisons_respect.length === 0) 
			errors.push("raisons_respect");
		if (this.state.raisons_respect.includes("Autre (précisez ci-dessous)") || this.state.raisons_respect.includes(""))
			errors.push("empty_other");
		this.setState({
			errors: errors
		});
		if (errors.length > 0) {
			return false;
		} else {
			try {
				const { email, connais_dilemme, preoccupation_epidemie,
					frequence_infos, frequence_science, exactitude_connaissance, respect_directives_sanitaires, raisons_respect } = this.state;
				await API.update_annexe(email, connais_dilemme, preoccupation_epidemie,
				frequence_infos, frequence_science, exactitude_connaissance, respect_directives_sanitaires, raisons_respect);
				window.location = "/mbti";
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

	changeRaisonsRespect = (raisons) => {
		var other;
		var index;
		var other_value = "";
		if (raisons.includes("Autre (précisez ci-dessous)")) {
			console.log(raisons);
			if (this.state.showOther === true)
				other_value = this.state.raisons_respect[this.state.idOther];
			other = true;
			index = raisons.indexOf("Autre (précisez ci-dessous)");
		} else {
			other = false;
			index = raisons.indexOf("Autre (précisez ci-dessous)");
		}
		if (other_value)
			raisons[index] = other_value;
		this.setState({raisons_respect: raisons, showOther: other, idOther: index});
	};

	handleChangeOther = (event) => {
		var list = this.state.raisons_respect;
		list[this.state.idOther] = event.target.value;
		this.setState({raisons_respect: list});
	}

	render () {
		if (this.state.errorPage === "401")
			return (<Error401></Error401>)
		if (this.state.errorPage === "500")
			return (<Error500></Error500>)
		if (!this.state.email)
			return (<Login onClose={null} show={true} closable={false}></Login>);
		// console.log(this.state.raisons_respect);
		return (
			<div className="page_wrapper annexe questionnaire">
				<h3 className="partie">- Partie <span className="blue">3</span>/4 -</h3>
				<h1 className="big_title">Questions annexes</h1>
				<p className="intro">Les questions suivantes servent à donner du <b>contexte</b> à vos réponses. <br/>Elles traitent de <b>votre rapport</b> avec la situation sanitaire actuelle.</p>
				<p className="question"><span>a.</span> Connaissiez-vous déjà le "problème de la maladie asiatique", que nous vous
				avons présenté dans cette expérience ?</p>
				<Form onSubmit={this.handleSubmit}>
				<FormGroup controlId="connais_dilemme" className={
								this.hasError("connais_dilemme")
								  ? "two_choice_input is-invalid"
								  : "two_choice_input"
							  }>
					<Button id="oui_input" type="button" onClick={this.twoChoiceChange} value="yes">
						Oui
					</Button>
					<Button id="non_input" type="button" onClick={this.twoChoiceChange} value="no">
						Non
					</Button>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez choisir une option.
            		</Form.Control.Feedback>
				</FormGroup>

				<p className="question"><span>b.</span> Etes-vous préoccupé par la progression de l'épidémie de Coronavirus ?</p>
				<FormGroup controlId="preoccupation_epidemie" className={
								this.hasError("preoccupation")
								  ? "is-invalid"
								  : ""
							  }>
					<div className="opinion_scale">
						<Button className="preoccupation" value="1" onClick={this.scaleChange}>1</Button>
						<Button className="preoccupation" value="2" onClick={this.scaleChange}>2</Button>
						<Button className="preoccupation" value="3" onClick={this.scaleChange}>3</Button>
						<Button className="preoccupation" value="4" onClick={this.scaleChange}>4</Button>
						<Button className="preoccupation" value="5" onClick={this.scaleChange}>5</Button>
						<Button className="preoccupation" value="6" onClick={this.scaleChange}>6</Button>
						<Button className="preoccupation" value="7" onClick={this.scaleChange}>7</Button>
						<Button className="preoccupation" value="8" onClick={this.scaleChange}>8</Button>
						<Button className="preoccupation" value="9" onClick={this.scaleChange}>9</Button>
						<Button className="preoccupation" value="10" onClick={this.scaleChange}>10</Button>
					</div>
					<div className="scale_labels">
						<p>Pas du tout</p>
						<p>Enormément</p>
					</div>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez selectionner une option.
            		</Form.Control.Feedback>
				</FormGroup>
				<p className="question"><span>c.</span> A quelle fréquence regardez-vous les informations sur le covid ? (journal télé, journal papier,
					presses virtuelles, réseaux sociaux)
				</p>
				<FormGroup controlId="frequence_infos" className={
								this.hasError("frequence_infos")
								  ? "is-invalid"
								  : ""
							  }>
					<FormControl
						onChange={this.handleChange}
						as="select"
						defaultValue={'DEFAULT'}
						className={
							this.state.frequence_infos === ""
							? "empty-select"
							: ""
						}
						>
							<option value="DEFAULT" disabled>Choisir</option>
							<option value="1/mois">Une fois par mois</option>
							<option value="1/semaine">Une fois par semaine</option>
							<option value="1/jour">Une fois par jour</option>
							<option value="plusieurs/jour">Plusieurs fois par jour</option>
					</FormControl>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez choisir une option.
            		</Form.Control.Feedback>
				</FormGroup>
				<p className="question"><span>d.</span> A quelle fréquence regardez-vous des reportages ou des articles scientifiques sur le covid ? 
				</p>
				<FormGroup controlId="frequence_science" className={
								this.hasError("frequence_science")
								  ? "is-invalid"
								  : ""
							  }>
					<FormControl
						onChange={this.handleChange}
						as="select"
						defaultValue={'DEFAULT'}
						className={
							this.state.frequence_science === ""
							? "empty-select"
							: ""
						}
						>
							<option value="DEFAULT" disabled>Choisir</option>
							<option value="1/mois">Une fois par mois</option>
							<option value="1/semaine">Une fois par semaine</option>
							<option value="1/jour">Une fois par jour</option>
							<option value="plusieurs/jour">Plusieurs fois par jour</option>
					</FormControl>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez choisir une option.
            		</Form.Control.Feedback>
				</FormGroup>
				<p className="question"><span>e.</span> Sur une échelle de 1 à 10, à combien estimez-vous vos connaissances exactes/valides ? Quelle est l’exactitude de vos connaissances sur le covid ?
				</p>
				<FormGroup controlId="exactitude_connaissance" className={
								this.hasError("exactitude_connaissance")
								  ? "is-invalid"
								  : ""
							  }>
					<div className="opinion_scale">
						<Button className="exactitude" value="1" onClick={this.scaleChange}>1</Button>
						<Button className="exactitude" value="2" onClick={this.scaleChange}>2</Button>
						<Button className="exactitude" value="3" onClick={this.scaleChange}>3</Button>
						<Button className="exactitude" value="4" onClick={this.scaleChange}>4</Button>
						<Button className="exactitude" value="5" onClick={this.scaleChange}>5</Button>
						<Button className="exactitude" value="6" onClick={this.scaleChange}>6</Button>
						<Button className="exactitude" value="7" onClick={this.scaleChange}>7</Button>
						<Button className="exactitude" value="8" onClick={this.scaleChange}>8</Button>
						<Button className="exactitude" value="9" onClick={this.scaleChange}>9</Button>
						<Button className="exactitude" value="10" onClick={this.scaleChange}>10</Button>
					</div>
					<div className="scale_labels">
						<p>Pas du tout exactes</p>
						<p>Très exactes</p>
					</div>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez choisir une option.
            		</Form.Control.Feedback>
				</FormGroup>
				<p className="question"><span>f.</span> Sur une échelle de 1 à 10, à combien estimez-vous que vous avez respecté les directives de santé dû au covid (masque, distance, confinement, …) ? 
				</p>
				<FormGroup controlId="respect_directives_sanitaires" className={
								this.hasError("respect")
								  ? "is-invalid"
								  : ""
							  }>
					<div className="opinion_scale">
						<Button className="respect" value="1" onClick={this.scaleChange}>1</Button>
						<Button className="respect" value="2" onClick={this.scaleChange}>2</Button>
						<Button className="respect" value="3" onClick={this.scaleChange}>3</Button>
						<Button className="respect" value="4" onClick={this.scaleChange}>4</Button>
						<Button className="respect" value="5" onClick={this.scaleChange}>5</Button>
						<Button className="respect" value="6" onClick={this.scaleChange}>6</Button>
						<Button className="respect" value="7" onClick={this.scaleChange}>7</Button>
						<Button className="respect" value="8" onClick={this.scaleChange}>8</Button>
						<Button className="respect" value="9" onClick={this.scaleChange}>9</Button>
						<Button className="respect" value="10" onClick={this.scaleChange}>10</Button>
					</div>
					<div className="scale_labels">
						<p>Pas du tout</p>
						<p>Enormément</p>
					</div>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez choisir une option.
            		</Form.Control.Feedback>
				</FormGroup>
				<p className="question"><span>g.</span> Pour quelle(s) raison(s) avez-vous respecté ces directives ? <i>(Choisissez une ou plusieurs réponses et classez les selon votre ordre de préférence)</i>
				</p>
				<p id="drag_drop_indication_mobile">[ Pour déplacer un item, saisissez-le en restant appuyé dessus puis relâchez. ]</p>
				<FormGroup controlId="raisons_respect" className={
								this.hasError("raisons_respect")
								  ? "is-invalid"
								  : ""
							  }>
					<div id="drag_drop_wrapper">
						<DragAndDrop onChangeRaison={this.changeRaisonsRespect}></DragAndDrop>
					</div>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez déposer et classer vos réponses dans la partie dédiée.
					</Form.Control.Feedback>
					</FormGroup>
					{this.state.showOther && 
					<FormGroup className={
						this.hasError("empty_other")
						  ? "is-invalid"
						  : ""
					  }><FormControl id="other_input_annexe"
						onChange={this.handleChangeOther}
						placeholder="Précisez votre réponse"
						className={
							this.state.raisons_respect.includes("Autre (précisez ci-dessous)") || this.state.raisons_respect.includes("")
							? "other-input empty-select"
							: "other-input"
						}
					/>
					<Form.Control.Feedback type="invalid" >
						<i className="fas fa-exclamation-circle"></i> Veuillez préciser votre réponse.
					</Form.Control.Feedback></FormGroup >}
				
					<Button block type="submit" className="next_button">
						Continuer <i className="fas fa-chevron-right"></i>
					</Button>
				</Form>
			</div>
		)
	};
}					
