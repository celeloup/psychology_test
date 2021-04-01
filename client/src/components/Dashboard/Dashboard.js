import React from "react";
import { Button, Spinner } from "react-bootstrap";
import "./Dashboard.css";
import API from "../../utils/API";
import {ExportCSV} from "./ExportCSV.js";
import Error401 from "../Errors/Error401";
import Error500 from "../Errors/Error500";

//const users = API.getUsers();

export class Dashboard extends React.Component {
  state = {
    data: [],
    users: [],
    isLoading: true,
		errorPage: ""
  }
  componentDidMount() {
      API.get_users().then (response => {
        this.setState({
          data: response,
          users: response.data.data,
          isLoading: false
        });
        // console.log("data retrieved !", this.state.data)
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
  disconnect = () => {
    API.logout();
    window.location = "/";
  };

  render() {
    if (this.state.errorPage === "401")
			return (<Error401></Error401>)
		if (this.state.errorPage === "500")
			return (<Error500></Error500>)
    var users = this.state.users.map(function(user) {
      return (
        <tr key={ user.email }>
          <td>{ user.email }</td>
          <td>{ user.infos_perso && user.infos_perso.sexe }</td>
          {/* <td>{ user.infos_perso && user.infos_perso.age }</td>
          <td>{ user.infos_perso && user.infos_perso.etude }</td>
          <td>{ user.infos_perso && user.infos_perso.pro }</td> */}
          <td>{ user.dilemme }</td>
          <td>{ user.dilemme_reponses && user.dilemme_reponses.programme }</td>
          <td>{ user.mbti && user.mbti.type }</td>
        </tr>
      );
    });
    
    return (
      <div className="page_wrapper dashboard">
        <h1 className="page_title">Dashboard</h1>
          { this.state.isLoading &&
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          }
          { !this.state.isLoading &&
          
            <div className="userList">
              <ExportCSV csvData={this.state.users} fileName="sherlock" />
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Sexe</th>
                    {/* <th>Age</th>
                    <th>Etude</th>
                    <th>Statut</th> */}
                    <th>Dilemme</th>
                    <th>Programme</th>
                    <th>MBTI</th>
                  </tr>
                </thead>

                <tbody>
                  { users }
                </tbody>
              </table>
                
              
            </div>
          }
        <Button onClick={this.disconnect} block type="submit">
          Se déconnecter
        </Button>
      </div>
    );
  }
}