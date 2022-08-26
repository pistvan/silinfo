import { Typography } from "@mui/material";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import clubRoutes from "../Club/routes";

const index = <Fragment>
	<Typography variant="h6" component="h1">
		Kedves Rendszer Adminsztrátor!
	</Typography>
	<Typography component="div">
		Ön a SILINFO elearning rendszerének adnimisztráció felületét látja.<br/>
		Kérjük, válasszon a bal oldalon látható menüpontok közül.
	</Typography>
</Fragment>

const Dashboard = () => {
	return <BrowserRouter>
		<Layout>
			<Routes>
				<Route path="/" element={index} />
				{clubRoutes}
			</Routes>
		</Layout>
	</BrowserRouter>
}

export default Dashboard;
