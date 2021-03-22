import React from "react";
import { Spinner } from "react-bootstrap";
import API from "../../utils/API";
import Login from "../Login/Login.js";

export class Results extends React.Component {
	state = {
		email: sessionStorage.getItem("email"),
		data: [],
		user: null,
		type: null,
		idLoading: true
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
		  console.log(error);
		});
	};
	render() {
		if (!this.state.email)
			return (<Login onClose={null} show={true} closable={false}></Login>);
		const user = this.state.user;
		if (user)
		{
			const mind_total = user.mbti.i + user.mbti.e;
			return(
				<div id="home" className="page_wrapper">
				<h1 className="big_title">Résultats</h1>
				<p>Vous êtes un beau gosse.</p>
					<div>
						<div id="pourcentages_mbti">
							<div className="">
								<div>
									{ user.mbti.i > user.mbti.e ? Math.ceil(user.mbti.i * 100 / mind_total) :
									Math.floor(user.mbti.i * 100 / mind_total) }% INTROVERTI
								</div>
								<div>
									{ user.mbti.i < user.mbti.e ? Math.ceil(user.mbti.e * 100 / mind_total) :
									Math.floor(user.mbti.e * 100 / mind_total) }% EXTRAVERTI
								</div>
							</div>
						</div>
						<p>{ this.state.email } votre type est { this.state.type } </p>
					</div>
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