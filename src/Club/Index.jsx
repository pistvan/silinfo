import { Breadcrumbs, Typography } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backend from "./BackendService";
import Filter from "./Filter";
import List from "./List";

const paginateValues = [2, 5]

const Clubs = () => {
	const [state, setState] = useState({
		items: null,
		paginate: {
			size: paginateValues[0],
			page: 0,
		},
		loading: true,
	});

	const handleFilter = (query) => {
		setState((state) => ({
			...state,
			filter: query,
			// keep page size, but go to page #1
			paginate: {
				...state.paginate,
				page: 1,
			},
			loading: true,
		}));

		Backend.getElements(query, ({ ...state.paginate, page: 1 })).then((response) => {
			setState((state) => ({
				...state,
				items: response.items,
				total: response.total,
				loading: false,
			}));
		}).catch((error) => {
			alert('Hiba történt: ' + error);
		});
	}

	const handlePaginate = (paginate) => {
		setState((state) => ({
			...state,
			paginate,
			loading: true,
		}));

		Backend.getElements(state.filter, paginate).then((response) => {
			setState((state) => ({
				...state,
				items: response.items,
				total: response.total,
				loading: false,
			}));
		}).catch((error) => {
			alert('Hiba történt: ' + error);
		});
	}

	useEffect(() => {
		if (state.items === null) {
			handleFilter({});
		}
	}, []);

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

		<List {...state} paginateValues={paginateValues} handlePaginate={handlePaginate} />
	</Fragment>
}

export default Clubs;