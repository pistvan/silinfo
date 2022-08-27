import { Fragment } from "react";
import { Route } from "react-router-dom";
import Index from "./Index";
import Edit from "./Edit"

const routes = <Fragment>
	<Route path="/clubs" element={<Index />} />
	<Route path="/clubs/edit/:id" element={<Edit />} />
	<Route path="/clubs/create" element={<Edit />} />
</Fragment>

export default routes;
