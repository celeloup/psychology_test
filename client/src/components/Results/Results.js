import React from "react";
import { Spinner } from "react-bootstrap";
import API from "../../utils/API";
import Login from "../Login/Login.js";
import "./Results.css";
import { PourcentBar } from "./Pourcents.js";
import { ISTJ_fiche } from "./FichesPerso/ISTJ.js";
import { HashLink as Link } from 'react-router-hash-link';
import Error401 from "../Errors/Error401";
import Error500 from "../Errors/Error500";

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

export class Results extends React.Component {
	state = {
		email: sessionStorage.getItem("email"),
		data: [],
		user: null,
		type: null,
		fiche: ISTJ_fiche,
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
					<h3 className="partie">Votre type est</h3>
					<h1 className="big_title">{ this.state.fiche[0].content }</h1>
					<p id="fiche_presentation">{ this.state.fiche[1] }</p>
					<div id="pourcentages_mbti">
						<p id="pourcent_intro">La répartition de votre personnalité <Link to="#explications_type"><i className="fas fa-info-circle"></i></Link></p>
						<PourcentBar trait_a={user.mbti.i} trait_b={user.mbti.e} trait_name_a="INTROVERTI" trait_name_b="EXTRAVERTI" color="rgb(0, 114,214, 0.8)"></PourcentBar>
						<PourcentBar trait_a={user.mbti.n} trait_b={user.mbti.s} trait_name_a="SENSATION" trait_name_b="INTUITION" color="#f1bc71"></PourcentBar>
						<PourcentBar trait_a={user.mbti.t} trait_b={user.mbti.f} trait_name_a="PENSEE" trait_name_b="SENTIMENT" color="#57ad8b"></PourcentBar>
						<PourcentBar trait_a={user.mbti.j} trait_b={user.mbti.p} trait_name_a="JUGEMENT" trait_name_b="PERCEPTION" color="#8f749c"></PourcentBar>
					</div>
					{ this.state.fiche.map((elem, index) => {
						if (index > 1 && !elem.type)
							return (<p key={index}>{elem}</p>)
						else if (elem.type === "quote")
							return (<p key={index} className="quote_result">{elem.content}<span className="quote_source">{elem.source}</span></p>)
						else if (elem.type === "subtitle")
							return (<h3 key={index} className="result_subtitle">{elem.content}</h3>)
						else if (elem.type === "list")
							return (<List key={index} liste={elem.content} type={user.mbti.type}></List>)
						return null;
					})}
					{/* <div id="explications_type">
						<p>EXPLICATIONS DES TYPES ICI</p>
					</div> */}
					<h3 className="result_subtitle">Aidez-moi à faire circuler ce questionnaire en le partageant sur les réseaux !</h3>
					{/* <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-size="large" data-text="Aidez une étudiante en master de psycho en répondant à ce questionnaire rapide ! Bonus: Découvrez votre type de personnalité !" data-url="https://paris8dysco.herokuapp.com/" data-lang="fr" data-show-count="false">Tweet</a>
					<div className="fb-share-button" data-href="https://paris8dysco.herokuapp.com/" data-layout="button" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparis8dysco.herokuapp.com%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Partager</a></div>
					<script type="IN/Share" data-url="https://www.linkedin.com"></script> */}
					<div className="sharethis-inline-share-buttons"></div>
					{/* <p>CONTACT</p>
					<p>DECONECTION</p> */}
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