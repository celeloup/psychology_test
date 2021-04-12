import { FormGroup, FormCheck } from "react-bootstrap";

export const QuestionMBTI = ({ label, index, onChange, value }) => (
	<FormGroup controlId={index} className="mbti_range" id={index} required>
	  	<span className="mbti_label">{ label }</span>
	  	<div className="red">Pas <br/>d'accord</div>
	  	<div className="mbti_options">
			<FormCheck
				checked={value !== null && value === -2}
				type="radio" 
				name={ index }
				value="-2"
				onChange={ onChange }
				className="big_range red"
			/>
			<FormCheck 
				checked={value !== null && value === -1}
				type="radio"
				name={ index }
				value="-1"
				onChange={ onChange }
				className="middle_range red"
			/>
			<FormCheck
				checked={value !== null && value === 0}
				type="radio"
				name={ index }
				value="0"
				onChange={ onChange }
				className="small_range"
			/>
			<FormCheck
				checked={value !== null && value === 1}
				type="radio" 
				name={ index }
				value="1"
				onChange={ onChange }
				className="middle_range green"
			/>
			<FormCheck
				checked={value !== null && value === 2}
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