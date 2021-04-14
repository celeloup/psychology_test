import React from "react";
import { Button, FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";

export class Admin extends React.Component {
	state = {
		user: "",
		password: ""
	};
	send = (event) => {
		event.preventDefault();
		const { user, password } = this.state;
		if (!user || user.length === 0)
			return;
		if (!password || password.length === 0)
			return;
		if (user === process.env.REACT_APP_ADMIN_USERNAME && password === process.env.REACT_APP_ADMIN_PASSWORD)
		{
			sessionStorage.setItem("token", "admin_token");
			window.location = "/dashboard";
		}
	};
	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};
	render() {
		const {user, password } = this.state;
		return (
			<div className="Login" style={{textAlign:"center", padding: 20}}>
				<h1 style={{marginBottom:20}}>Admin</h1>
				<Form onSubmit={this.send}>
					<FormGroup controlId="user" style={{textAlign:"left"}}>
						<FormLabel >Username</FormLabel>
						<FormControl
							type="user"
							value={user}
							onChange={this.handleChange}
						/>
					</FormGroup>
					<FormGroup controlId="password" style={{textAlign:"left"}}>
						<FormLabel>Mot de passe</FormLabel>
						<FormControl
							value={password}
							onChange={this.handleChange}
							type="password"
						/>
					</FormGroup>
					<Button className="next_button" block type="submit" style={{marginTop:20}}>
						Connexion
					</Button>
				</Form>
				
			</div>
		)
	}
}