import { Breadcrumbs, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Backend from "./BackendService";
import Filter from "./Filter";
import List from "./List";

const Clubs = () => {
	const [state, setState] = useState({
		items: null,
		loading: false,
	});

	const handleFilter = (query) => {
		setState((state) => ({
			...state,
			items: null,
			loading: true,
		}));

		Backend.getElements(query).then((elements) => {
			setState((state) => ({
				...state,
				items: elements,
				loading: false,
			}));
		}).catch((error) => {
			alert('Hiba történt: ' + error);
		});
	}

	if (state.items === null && !state.loading) {
		handleFilter({});
	}

	return <Fragment>
		<Breadcrumbs>
			<Link to="/">
				Társaságok
			</Link>
			<Link to=".">
				Társaság
			</Link>
		</Breadcrumbs>

		<Typography component="h1" variant="h5">
			Társaság
		</Typography>

		<Filter handler={handleFilter} />

		<List state={state} />
	</Fragment>
}

export default Clubs;