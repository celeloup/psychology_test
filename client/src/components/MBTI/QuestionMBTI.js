import { FormGroup, FormCheck } from "react-bootstrap";

export const QuestionMBTI = ({ label, index, onChange}) => (
	<FormGroup controlId={index} className="mbti_range" id={index} required>
	  	<span className="mbti_label">{ label }</span>
	  	<div className="red">Pas <br/>d'accord</div>
	  	<div className="mbti_options">
			<FormCheck
				type="radio" 
				name={ index }
				value="-2"
				onChange={ onChange }
				className="big_range red"
			/>
			<FormCheck 
				type="radio"
				name={ index }
				value="-1"
				onChange={ onChange }
				className="middle_range red"
			/>
			<FormCheck 
				type="radio"
				name={ index }
				value="0"
				onChange={ onChange }
				className="small_range"
			/>
			<FormCheck
				type="radio" 
				name={ index }
				value="1"
				onChange={ onChange }
				className="middle_range green"
			/>
			<FormCheck 
				type="radio"
				name={ index }
				value="2"
				onChange={ onChange }
				className="big_range green"
			/>
		</div>
		<div className="green">D'accord</div>
	</FormGroup>
  );