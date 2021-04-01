
export const PourcentBar = ({trait_a, trait_b, trait_name_a, trait_name_b, color}) => {
	const trait_total = trait_a + trait_b;
	var style_bar = {};
	if (trait_a > trait_b)
		style_bar = { backgroundColor: color, width: Math.ceil(trait_a * 100 / trait_total)  + "%"}
	else
		style_bar = { backgroundColor: color, width: Math.ceil(trait_b * 100 / trait_total)  + "%", left: "100%", transform: "translate(-100%)" }
	if (trait_total > 0)
		return (
			<div className="pourcent_wrapper">

				<div style={trait_a > trait_b ? {color: color} : {color: "grey"}}>
					<span className="big_pourcent">
						{ trait_a > trait_b ? Math.ceil(trait_a * 100 / trait_total) :
						Math.floor(trait_a * 100 / trait_total) }%
					</span> {trait_name_a}
				</div>

				<div className="pourcent_bar">
					<span style={ style_bar }></span>
				</div>

				<div style={trait_a <= trait_b ? {color: color} : {color: "grey"}}>
					<span className="big_pourcent">
						{ trait_a < trait_b ? Math.ceil(trait_b * 100 / trait_total) :
						Math.floor(trait_b * 100 / trait_total) }%
					</span> {trait_name_b}
				</div>

			</div>
		);
	return (<div>Not enough data</div>);
}