
function trait_is_type(trait, type) {
	var letter;
	if (trait === "EXTRAVERTI")
		letter = "e";
	if (trait === "INTROVERTI")
		letter = "i";
	if (trait === "SENSATION")
		letter = "s";
	if (trait === "INTUITION")
		letter = "n";
	if (trait === "PENSEE")
		letter = "t";
	if (trait === "SENTIMENT")
		letter = "f";
	if (trait === "JUGEMENT")
		letter = "j";
	if (trait === "PERCEPTION")
		letter = "p";
	if (type.includes(letter))
		return (true);
	return (false);
}

export const PourcentBar = ({trait_a, trait_b, trait_name_a, trait_name_b, color, type}) => {
	const trait_total = trait_a + trait_b;
	var style_bar = {};
	if (trait_a > trait_b)
		style_bar = { backgroundColor: color, width: Math.ceil(trait_a * 100 / trait_total)  + "%"}
	else if (trait_a < trait_b)
		style_bar = { backgroundColor: color, width: Math.ceil(trait_b * 100 / trait_total)  + "%", left: "100%", transform: "translate(-100%)" }
	else if (trait_is_type(trait_a, type))
		style_bar = { backgroundColor: color, width: Math.ceil(trait_a * 100 / trait_total)  + "%"}
	else
	style_bar = { backgroundColor: color, width: Math.ceil(trait_b * 100 / trait_total)  + "%", left: "100%", transform: "translate(-100%)" }
	var droite_style;
	var gauche_style;
	if (trait_a > trait_b)
	{
		droite_style = {color: color};
		gauche_style = {color: "grey"};
	}
	else if (trait_a < trait_b)
	{
		droite_style = {color: "grey"};
		gauche_style = {color: color};
	}
	else if (trait_is_type(trait_a, type))
	{
		droite_style = {color: color};
		gauche_style = {color: "grey"};
	}
	else
	{
		droite_style = {color: "grey"};
		gauche_style = {color: color};
	}
	if (trait_total > 0)
		return (
			<div className="pourcent_wrapper">

				<div style={droite_style}>
					<span className="big_pourcent">
						{ trait_a > trait_b ? Math.ceil(trait_a * 100 / trait_total) :
						Math.floor(trait_a * 100 / trait_total) }%
					</span> {trait_name_a}
				</div>

				<div className="pourcent_bar">
					<span style={ style_bar }></span>
				</div>

				<div style={gauche_style}>
					<span className="big_pourcent">
						{ trait_a < trait_b ? Math.ceil(trait_b * 100 / trait_total) :
						Math.floor(trait_b * 100 / trait_total) }%
					</span> {trait_name_b}
				</div>

			</div>
		);
	return (<div>Not enough data</div>);
}