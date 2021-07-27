import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Detail from "./detail";
import List from "./list";

const Main = () => (
	<Router>
		<Switch>
			<Route path="/detail" component={Detail}></Route>
			<Route path="/" component={List}></Route>
		</Switch>
	</Router>
);

ReactDOM.render(<Main />, document.getElementById("root"));
