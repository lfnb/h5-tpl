import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Stage from "./stage";

const Main = () => (
	<Router>
		<Switch>
			<Route path="/" component={Stage} />
		</Switch>
	</Router>
);

ReactDOM.render(<Main />, document.getElementById("root"));
