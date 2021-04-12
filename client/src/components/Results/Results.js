import React from "react";
import { Spinner } from "react-bootstrap";
import API from "../../utils/API";
import Login from "../Login/Login.js";
import "./Results.css";
import { PourcentBar } from "./Pourcents.js";
import { ENFJ_fiche} from "./FichesPerso/ENFJ";
import { ENFP_fiche} from "./FichesPerso/ENFP";
import { ENTJ_fiche} from "./FichesPerso/ENTJ";
import { ENTP_fiche} from "./FichesPerso/ENTP";
import { ESFJ_fiche} from "./FichesPerso/ESFJ";
import { ESFP_fiche} from "./FichesPerso/ESFP";
import { ESTJ_fiche} from "./FichesPerso/ESTJ";
import { ESTP_fiche} from "./FichesPerso/ESTP";
import { INFJ_fiche} from "./FichesPerso/INFJ";
import { INFP_fiche} from "./FichesPerso/INFP";
import { INTJ_fiche} from "./FichesPerso/INTJ";
import { INTP_fiche} from "./FichesPerso/INTP";
import { ISFJ_fiche} from "./FichesPerso/ISFJ";
import { ISFP_fiche} from "./FichesPerso/ISFP";
import { ISTJ_fiche} from "./FichesPerso/ISTJ";
import { ISTP_fiche} from "./FichesPerso/ISTP";
import { HashLink as Link } from 'react-router-hash-link';
import Error401 from "../Errors/Error401";
import Error500 from "../Errors/Error500";
import DyscoLogo  from "../../img/DysCo.png";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon} from "react-share";

const List = ({ type, liste }) => (
	<div>
		<h3 className="result_subtitle">Les personnalités { type }, comme vous, ont généralement les caractéristiques suivantes :</h3>
		<ul>
			{ liste.map((point, key) => {
			return (<li key={key}>{point}</li>)
		})}
		</ul>
	</div>
);

function getFiche(type) {
	if (type === "ENFJ")
		return (ENFJ_fiche);
	if (type === "ENFP")
		return (ENFP_fiche);
	if (type === "ENTJ")
		return (ENTJ_fiche);
	if (type === "ENTP")
		return (ENTP_fiche);
	if (type === "ESFJ")
		return (ESFJ_fiche);
	if (type === "ESFP")
		return (ESFP_fiche);
	if (type === "ESTJ")
		return (ESTJ_fiche);
	if (type === "ESTP")
		return (ESTP_fiche);
	if (type === "INFJ")
		return (INFJ_fiche);
	if (type === "INFP")
		return (INFP_fiche);
	if (type === "INTJ")
		return (INTJ_fiche);
	if (type === "INTP")
		return (INTP_fiche);
	if (type === "ISFJ")
		return (ISFJ_fiche);
	if (type === "ISFP")
		return (ISFP_fiche);
	if (type === "ISTJ")
		return (ISTJ_fiche);
	if (type === "ISTP")
		return (ISTP_fiche);
	return (null);
}

export class Results extends React.Component {
	state = {
		email: sessionStorage.getItem("email"),
		data: [],
		user: null,
		type: null,
		fiche: null,
		idLoading: true,
		errorPage: ""
	};
	componentDidMount() {
		const email = this.state.email;
		if (!email || email.length === 0)
			return ;
		API.login(email).then (response => {
		  this.setState({
			data: response,
			user: response.data.data,
			type: response.data.data.mbti.type,
			fiche: getFiche(response.data.data.mbti.type),
			isLoading: false
		  });
		})
		.catch(error => {
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
		  	console.log(error);
		});
	};
	logout() {
		sessionStorage.clear();
		window.location = "/";
	};
	copyEmail() {
		var copyText = document.getElementById("email_to_copy");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand("copy");

		var tooltip = document.getElementById("copy_tooltip");
		tooltip.innerHTML = "Copié !";
	}
	copyLeave() {
		var tooltip = document.getElementById("copy_tooltip");
		tooltip.innerHTML = "Copier";
	}
	render() {
		if (this.state.errorPage === "401")
			return (<Error401></Error401>)
		if (this.state.errorPage === "500")
			return (<Error500></Error500>)
		if (!this.state.email)
			return (<Login onClose={null} show={true} closable={false}></Login>);
		const user = this.state.user;
		if (user)
		{
			return(
				<div className="page_wrapper results">
					{this.state.fiche !== null &&
					<div>
						<h3 className="partie">Votre type est</h3>
						<h1 className="big_title">{ this.state.fiche[0].content }</h1>
						<p id="fiche_presentation">{ this.state.fiche[1] }</p>
						<div id="pourcentages_mbti">
							<p id="pourcent_intro">La répartition de vos traits de personnalité <Link to="#explications_type"><i className="fas fa-info-circle"></i></Link></p>
							<PourcentBar trait_a={user.mbti.i} trait_b={user.mbti.e} trait_name_a="INTROVERTI" trait_name_b="EXTRAVERTI" color="rgb(0, 114,214, 0.8)" type={user.mbti.type}></PourcentBar>
							<PourcentBar trait_a={user.mbti.n} trait_b={user.mbti.s} trait_name_a="INTUITION" trait_name_b="SENSATION" color="#f1bc71" type={user.mbti.type}></PourcentBar>
							<PourcentBar trait_a={user.mbti.t} trait_b={user.mbti.f} trait_name_a="PENSEE" trait_name_b="SENTIMENT" color="#57ad8b" type={user.mbti.type}></PourcentBar>
							<PourcentBar trait_a={user.mbti.j} trait_b={user.mbti.p} trait_name_a="JUGEMENT" trait_name_b="PERCEPTION" color="#8f749c" type={user.mbti.type}></PourcentBar>
						</div>
						{ this.state.fiche.map((elem, index) => {
							if (index > 1 && !elem.type)
								return (<p key={index}>{elem}</p>)
							else if (elem.type === "quote")
								return (<div key={index} className="quote_result"><p>{elem.content}</p><span className="quote_source">{elem.source}</span></div>)
							else if (elem.type === "subtitle")
								return (<h3 key={index} className="result_subtitle">{elem.content}</h3>)
							else if (elem.type === "list")
								return (<List key={index} liste={elem.content} type={user.mbti.type}></List>)
							return null;
						})}
					</div>}
					{/* TYPE INCORRECT */}
					{this.state.fiche === null &&
					<div id="fiche_bg">
						<h3 className="partie">Votre type est</h3>
						{ this.state.user.infos_perso.sexe === "Femme" && <h1 className="big_title"> Belle gosse </h1>}
						{ this.state.user.infos_perso.sexe === "Homme" && <h1 className="big_title"> Beau gosse </h1>}
						<p id="fiche_presentation">Les beaux gosses sont des gens beaux (duh), compréhensifs et anti-conformistes. On leur donne une consigne et ils n'en font qu'à leur tête ! Mais on les aime quand même parce que ce sont un peu les meilleurs !</p>
						<div id="bg_img">
							<img src="https://media.giphy.com/media/wFOC9RazP97i0/source.gif" alt="toi = best"></img>
							<p id="under_bg_img">"You rock &#60;3"</p>
						</div>
						<p>Malheureusement, les réponses à votre questionnaire n'ont pas permis de déterminer quel était votre type parmi les 16 personnalités décrites dans le test MBTI.</p>
						<p>Est-ce parce que vous êtes totalement unique ? Est-ce parce que vous avez donné trop de réponses neutres au test ? Who knows ? </p>
						<p>Il se peut aussi que ce soit un bug du site/test donc si vous pensez avoir répondu correctement au test, n'hésitez pas à envoyer un mail à l'adresse donnée plus bas sur cette page pour le signaler et nous reviendrons vers vous !</p>
						<p>Vous pouvez également repasser cette partie du questionnaire si vous le souhaitez et espérer un résultat différent !</p>
						<button className="next_button" onClick={() => this.props.history.push('/mbti')}>Repasser le test<i className="fas fa-redo"></i></button>
					</div>}
					<div id="explications_type">
						<h2 className="result_subtitle">A propos du test MBTI</h2>
						<p>Ce test est inspiré du test de personnalité appelé MBTI (Myers Briggs Type Indicator), proposé en 1962 par Isabel Briggs Myers et Katherine Cook Briggs et largement utilisé en psychologie. C’est un outil d’évaluation psychologique qui permet de déterminer quel est le type psychologique d’une personne, parmi 16 types différents.</p>
						<p>Il s’intéresse à quatre axes de votre personnalité, et identifie votre « dominante psychologique », c’est-à-dire votre préférence ; Cela signifie que même si vous obtenez une préférence dans un axe de votre personnalité, vous pouvez tout de même être capable d’utiliser une autre orientation de cet axe. Par exemple, dans l’axe « orientation de votre énergie », même si vous obtenez « extraverti », cela ne signifie pas que vous n’êtes pas capable de porter votre énergie vers votre monde intérieur comme un « introverti », simplement que votre premier instinct est de diriger votre énergie vers le monde extérieur.</p>
						<p>Les axes étudiés par ce test sont :</p>
						<ul>
						<li>La façon d’orienter votre énergie, mais aussi de la recevoir, ce qui retient votre attention. Vous pouvez être « Extraverti E » ou « Introverti I ».</li>
						<li>La manière dont vous percevez les informations, dont vous en prenez conscience et les recueillez. Vous pouvez être « Sensation S » ou « Intuition N ». </li>
						<li>La façon dont vous prenez des décisions et parvenez à des conclusions. Vous pouvez être « Pensée T » ou « Sentiment F ». </li>
						<li>La façon dont vous abordez et gérez le monde extérieur. Vous pouvez être « Jugement J » ou « Perception P ». </li>
						</ul>
						<p>Votre type final, déterminé par vos réponses au questionnaire, est donc représenté par un code à 4 lettres, chacune représentant l’une de vos préférence sur les 4 différents axes. Par exemple, le code ISTJ donne la personnalité «The Duty Fulfiller».</p>
					</div>
					<h3 className="thankyou">Merci beaucoup d'avoir répondu à ce questionnaire !</h3>
					<h4>Partager ce questionnaire sur les réseaux</h4>
					<div id="sharing_buttons">
						<FacebookShareButton url={"https://paris8dysco.herokuapp.com/"}> <FacebookIcon size={35} borderRadius={5}></FacebookIcon> </FacebookShareButton>
						<TwitterShareButton url={"https://paris8dysco.herokuapp.com/"} title={"Aidez une étudiante en master de psycho en répondant à ce questionnaire rapide ! Bonus: Découvrez votre type de personnalité !"}> <TwitterIcon size={35} borderRadius={5}></TwitterIcon> </TwitterShareButton>
						<LinkedinShareButton url={"https://paris8dysco.herokuapp.com/"}> <LinkedinIcon size={35} borderRadius={5}></LinkedinIcon> </LinkedinShareButton>
						<WhatsappShareButton url={"https://paris8dysco.herokuapp.com/"}> <WhatsappIcon size={35} borderRadius={5}></WhatsappIcon> </WhatsappShareButton>
					</div>
					<h4>Pour me contacter</h4>

					<div className="contact_email">
						<input id="email_to_copy" value="estevessarah1998@gmail.com" readOnly></input>
						<div id="copy_button" onClick={this.copyEmail} onMouseLeave={this.copyLeave}><span id="copy_tooltip">Copier</span><i className="fas fa-copy"></i></div>
					</div>

					<h4>DysCo à Paris 8</h4>
					<div className="dysco_div">
						<img src={DyscoLogo} alt="DysCo Logo"></img>
						<p>L’unité DysCo est une unité de recherche en Psychologie Cognitive et en Neuropsychologie. Consultez leur <a href="https://dysco.parisnanterre.fr/" target="_blank" rel="noreferrer">site web ici</a>.</p>
					</div>
					<h4>Pour soumettre un nouveau questionnaire</h4>
					<button className="next_button deconnection" onClick={this.logout}>Se deconnecter<i className="fas fa-sign-out-alt"></i></button>
					<div className="credit">Designed and developed by <a href="https://twitter.com/celia_leloup" target="_blank" rel="noreferrer">Celia Leloup</a></div>
				</div>
			);
		}
		return (
			<div id="home" className="page_wrapper">
				<h1 className="big_title">Résultats</h1>
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
			</div>
		)
	}
}