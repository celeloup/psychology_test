import React from "react";
import "./Login.css";
import PropTypes from "prop-types";
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import API from "../../utils/API";
import Error500 from "../Errors/Error500";

export default class Login extends React.Component {
	state = {
		email: "",
		errors: [],
		alert: false,
		errorPage: ""
	};
	componentDidMount() {
		window.scrollTo(0, 0);
	};
	onClose = e => {
		e.stopPropagation();
		var scroll = document.getElementsByClassName("page_wrapper")[0].style.top;
		document.getElementsByClassName("page_wrapper")[0].style.position = "inherit";
		document.getElementsByTagName("html")[0].style.scrollBehavior = "initial";
		window.scrollTo(0, -parseInt(scroll));
		document.getElementsByTagName("html")[0].style.scrollBehavior = "smooth";
    	this.props.onClose && this.props.onClose(e);
  	};
	handleChange = (event) => {
		this.setState({
		[event.target.id]: event.target.value
		});
	};
	hasError(key) {
		return this.state.errors.indexOf(key) !== -1;
	};
	handleSubmit = async(event) => {
		event.preventDefault();
		var errors = [];
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
				const { data } = await API.login(this.state.email);
				sessionStorage.setItem("email", data.data.email);
				sessionStorage.setItem("dilemme", data.data.dilemme);
				if (!data.data.infos_perso)
					window.location = "/questions";
				else if (!data.data.dilemme_reponses)
					window.location = "/dilemme";
				else if (!data.data.annexes)
					window.location = "/annexe";
				else if (!data.data.mbti.type)
					window.location = "/mbti";
				else
					window.location = "/resultats";
				// console.log(data.data);
			} catch (error) {
				if (error.response.status === 401)
				{
					this.setState({
						alert: true
					});
				}
				if (error.response.status === 500)
				{
					this.setState({
						errorPage: "500"
					})
				}
			}
		}
	};
  	render() {
		if (this.state.errorPage === "500")
			return (<Error500></Error500>)
		const { email } = this.state;
		if (!this.props.show) {
			return null;
		}
		if (window.innerWidth < 560)
		{
			var scroll = window.scrollY;
			document.getElementsByClassName("page_wrapper")[0].style.position = "fixed";
			document.getElementsByClassName("page_wrapper")[0].style.top = -scroll + "px";
		}
		return (
			<div id="login_wrapper">
				<div id="login">
					{ this.props.closable && <span className="closebtn" onClick={this.onClose}>&times;</span> }
					<h2 className="login_title">Se connecter</h2>
					<div className="content">
						{ this.props.children }
						<div id="login_prez">Vous avez <b>déjà répondu</b> et souhaitez retrouver le résultat de votre test de personnalité ?<br/>Vous avez commencé à répondre mais n'avez <b>pas fini</b> ?<br/>Connectez-vous ci-dessous pour accéder <b>aux résultats</b> où à vos <b>questions incomplètes</b>.</div>
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
								<i className="fas fa-exclamation-circle"></i> Email invalide.
							</Form.Control.Feedback>
							{this.state.alert && 
							<div id="user_not_exist">
								Cette adresse mail ne correspond à aucune entrée. <a href="/questions">Commencer le questionnaire</a> ?
							</div> }
							</FormGroup>
							<Button className="next_button" block type="submit">
							Connexion
							</Button>
						</Form>
						{ this.props.closable && <Button id="back_button" onClick={this.onClose}>Retour</Button>}
						{ !this.props.closable && <Button id="back_button" onClick={() => window.location = "/questions"}>Retour au début</Button>}
					</div>
				</div>
			</div>
		);
	}
}
Login.propTypes = {
  show: PropTypes.bool.isRequired,
  closable: PropTypes.bool.isRequired
};
