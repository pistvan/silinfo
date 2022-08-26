import { Box, Collapse, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { Fragment, useState } from "react";
import menuGroups from "./menuGroups";
import { Link } from "react-router-dom";

const width = 240;

const MenuGroup = (group, key) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen((state) => !state);
	}

	return <Fragment key={key}>
		<ListItem disablePadding>
			<ListItemButton onClick={handleClick}>
				<ListItemText primary={group.title} />
				{ open ? <ExpandLess /> : <ExpandMore /> }
			</ListItemButton>
		</ListItem>
		<Collapse
			in={open}
		>
			<List component="div">
				{group.items.map((item, index) => 
					<ListItem disablePadding sx={{ pl: 4 }} key={index} component={Link} to={item.url}>
						<ListItemButton>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>)
				}
			</List>
		</Collapse>
	</Fragment>
}

const AppDrawer = (props) => {
	return <Drawer
		sx={{
			width,
			flexShrink: 0,
			[`& .MuiDrawer-paper`]: {
				width,
				boxSizing: 'border-box'
			}
		}}
		anchor="left"
		open={props.open}
		variant="persistent"
	>
		<Toolbar />
		<Box sx={{ overflow: 'auto' }}>
			{menuGroups.map((group, index) => MenuGroup(group, index))}
		</Box>
	</Drawer>
}

const AppDrawerFactory = (initialOpen = true) => {
	const [open, setOpen] = useState(initialOpen);

	return {
		open,
		show: () => setOpen(true),
		hide: () => setOpen(false),
		toggle: () => setOpen((state) => !state),
		Component: AppDrawer({ open }),
	}
}

export { width };

export default AppDrawerFactory;
