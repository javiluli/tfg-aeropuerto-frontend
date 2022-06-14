import CustomizedSwitches from '@/components/Switch'
import { Link } from 'react-router-dom'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import { pink } from '@mui/material/colors'
import { useState } from 'react'

function StarIcon(props) {
	return (
		<SvgIcon {...props}>
			{/* <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /> */}
			<StarRoundedIcon />
		</SvgIcon>
	)
}

const Navegation = () => {
	const [open, setOpen] = useState(false)
	const menuItems = [
		{
			link: '/',
			title: 'Inicio',
		},
		{
			link: '/checkin',
			title: 'Check-in',
		},
		{
			link: '/reserva',
			title: 'Reserva',
		},
		// {
		// 	link: '/tarjeta-embarque',
		// 	title: 'Embarque',
		// },
	]

	return (
		<div>
			<div className="relative flex items-start justify-between w-full h-auto px-10 py-3 bg-white md:items-center md:h-20">
				{/* Logotipo con icono */}
				<div className="flex items-center justify-between gap-2 w-fit logotipo h-fit">
					<div className="flex items-center w-auto gap-2 logotipo h-fit">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<p className="text-xl uppercase">Logo</p>
					</div>
				</div>

				<div className="grid items-center gap-5">
					<div className="cursor-pointer justify-self-end md:hidden" type="button" onClick={() => setOpen(!open)}>
						{open ? (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
							</svg>
						)}
					</div>

					{/* Items del menu, enlaces y opciones */}
					<div className={`h-fit gap-4 flex-col md:grid md:grid-flow-col ${open ? 'flex' : 'hidden'}`}>
						<nav className="grid justify-end gap-1 md:grid-flow-col">
							{menuItems.map(({ link, title }) => (
								<Link
									key={link}
									to={link}
									className="px-3 py-2 text-sm font-medium text-right rounded-full text-slate-700 hover:bg-[#faf0ff] transition"
								>
									<Typography variant="body1" component="span">
										{title}
									</Typography>
								</Link>
							))}
							{/* <Link
								key={'valoracion'}
								to={'/valoracion'}
								className="px-2 py-2 text-sm font-medium text-right rounded-full text-slate-700 hover:bg-[#fffff0] transition"
							>
								<StarIcon sx={{ color: '#FAAF00' }} />
							</Link> */}
						</nav>

						<span className="block w-full h-0.5 md:w-0.5 md:h-full bg-[#F2F2F2]"></span>

						<div className="flex items-center justify-end gap-2">
							<CustomizedSwitches />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navegation
