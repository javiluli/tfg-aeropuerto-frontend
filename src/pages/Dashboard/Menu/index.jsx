import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import React from 'react'

const Menu = () => {
	return (
		<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			<nav aria-label="main mailbox folders">
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemIcon>
								<DashboardRoundedIcon />
							</ListItemIcon>
							<ListItemText primary="Dashboard" />
						</ListItemButton>
					</ListItem>
				</List>
			</nav>
		</Box>
	)
}

export default Menu
