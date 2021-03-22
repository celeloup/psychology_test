import React from "react";
import "./DragAndDrop.css";

export class DragAndDrop extends React.Component {
	state = {
		order: ["Delta","Alpha", "Bravo", "Charlie"]
	};

	componentDidMount() {
		this.positionItems();
	};
	
	positionItems = () => {
		var order = this.state.order;
		const elements = document.getElementsByClassName("list-item");
		console.log(elements[0]);
		for (var i = 0; i < elements.length; i++)
		{
			console.log(elements[i].getAttribute("value"));
			elements[i].style.top = (order.indexOf(elements[i].getAttribute("value")) * 100) + "px";
		}
	};
	drag = (event) => {
		event.dataTransfer.setData("text", event.target.id);
		console.log("dragging");
	};

	render() {
		
		return (
			<section className="container">
				<div className="list-item" value="Alpha" draggable="true" onDragStart={this.drag}>
					<div className="item-content">
					<span className="order">1</span> Alpha
					</div>
				</div>
				
				<div className="list-item" value="Bravo"draggable="true" onDragStart={this.drag}>
					<div className="item-content">
					<span className="order">2</span> Bravo
					</div>
				</div>
				
				<div className="list-item" value="Charlie"draggable="true" onDragStart={this.drag}>
					<div className="item-content">
					<span className="order">3</span> Charlie
					</div>
				</div>
				
				<div className="list-item" value="Delta" draggable="true" onDragStart={this.drag}>
					<div className="item-content">
					<span className="order">4</span> Delta
					</div>
				</div>
			</section>
		)
	}
}