import { Fragment } from "react";
import { Route } from "react-router-dom";
import Clubs from "./Index";

const routes = <Fragment>
	<Route path="/clubs" element={<Clubs />} />
	<Route path="/clubs/edit/:id" />
	<Route path="/clubs/create" element={<p>Létrehozás</p>} />
</Fragment>

export default routes;
