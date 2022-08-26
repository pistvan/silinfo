import { Typography } from "@mui/material";
import Layout from "./Layout";

const Dashboard = () => {
	return <Layout>
		<Typography variant="h6" component="h1">
			Kedves Rendszer Adminsztrátor!
		</Typography>
		<Typography component="div">
			Ön a SILINFO elearning rendszerének adnimisztráció felületét látja.<br/>
			Kérjük, válasszon a bal oldalon látható menüpontok közül.
		</Typography>
	</Layout>
}

export default Dashboard;
