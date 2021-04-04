import React from "react";
import { Button, Spinner } from "react-bootstrap";
import "./Dashboard.css";
import API from "../../utils/API";
import {ExportCSV} from "./ExportCSV.js";
import Error401 from "../Errors/Error401";
import Error500 from "../Errors/Error500";
import {PieChart} from "./PieChart.js";

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
  countSexe = () => {
	var women = 0;
	var men = 0;  
	for (var i = 0; i < this.state.users.length; i++)
	{
		if(this.state.users[i].infos_perso.sexe === "Femme")
			women++;
		else if (this.state.users[i].infos_perso.sexe === "Homme")
			men++;
	}
	return ([women, men]);
  };
//   countTypes = () => {
// 	var infp = 0;
// 	var esfp = 0;
// 	var 
// 	for (var i = 0; i < this.state.users.length; i++)
// 	{
// 		if(this.state.users[i].infos_perso.sexe === "Femme")
// 			women++;
// 		else if (this.state.users[i].infos_perso.sexe === "Homme")
// 			men++;
// 	}
// 	return ([women, men]);
//   }


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

	// PIE CHART
	const drawSexe = (ctx) => {
		var lastend = 0;
		var data = this.countSexe();
		var myTotal = 0;
		var myColor = ['#f0ad4e', '#0072d6'];
		
		for(var e = 0; e < data.length; e++)
		{ myTotal += data[e]; }
		var labels = [data[0]/myTotal * 100 + '%', data[1]/myTotal * 100 + '%'];
		var off = 10
		var w = (200 - off) / 2
		var h = (200 - off) / 2
		for (var i = 0; i < data.length; i++) {
			ctx.fillStyle = myColor[i];
			ctx.strokeStyle ='white';
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.moveTo(w,h);
			var len =  (data[i]/myTotal) * 2 * Math.PI
			var r = h - off / 2
			ctx.arc(w , h, r, lastend,lastend + len,false);
			ctx.lineTo(w,h);
			ctx.fill();
			ctx.stroke();
			ctx.fillStyle ='white';
			ctx.font = "20px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			var mid = lastend + len / 2
			ctx.fillText(labels[i],w + Math.cos(mid) * (r/2) , h + Math.sin(mid) * (r/2));
			lastend += Math.PI*2*(data[i]/myTotal);
		}
	  }
    
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
				<div id="stats">
					<div id="nb_reponse"><span>{this.state.users.length}</span> réponses</div>
					<PieChart draw={drawSexe} labels={["Femme", "Homme"]} colors={['#f0ad4e', '#0072d6']}/>
				</div>
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
        <Button className="next_button" onClick={this.disconnect} block type="submit">
          Se déconnecter
        </Button>
      </div>
    );
  }
}