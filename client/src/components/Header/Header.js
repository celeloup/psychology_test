import "./Header.css";
// import Logo from "./../../img/logo_p8-blanc.png"

export const Header = () => (
	<div id="header">
		<nav role="navigation">
			<div id="menuToggle">
				<input type="checkbox" />
				<span></span>
				<span></span>
				<span></span>
				<ul id="menu">
					<a href="/"><li>Accueil</li></a>
					<a href="/login"><li>Login</li></a>
					<a href="/problem"><li>Problème ?</li></a>
				</ul>
			</div>
			{/* <img id="logo" src={ Logo } alt="Logo Paris 8" ></img> */}
			<a href="/results"><i id="profile_link" className="fas fa-user-circle"></i></a>
		</nav>
	</div>
);

