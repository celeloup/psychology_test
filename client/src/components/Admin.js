import React from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
//import API from "../utils/API";


export class Admin extends React.Component {
	state = {
		user: "",
		password: ""
	};
	send = () => {
		const { user, password } = this.state;
		if (!user || user.length === 0)
			return;
		if (!password || password.length === 0)
			return;
		if (user === "admin" && password === "sherlocked")
		{
			localStorage.setItem("token", "admin_token");
			window.location = "/dashboard";
		}
		else
		{
			console.log("wrong !");
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
			<div className="Login">
				<h1>Admin Login</h1>
				<FormGroup controlId="user">
					<FormLabel>user</FormLabel>
					<FormControl
						autoFocus
						type="user"
						value={user}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<FormGroup controlId="password">
          			<FormLabel>Password</FormLabel>
          			<FormControl
            			value={password}
            			onChange={this.handleChange}
            			type="password"
          			/>
        		</FormGroup>
				<Button onClick={this.send} block type="submit">
        			Connexion
        		</Button>
			</div>
		)
	}
}