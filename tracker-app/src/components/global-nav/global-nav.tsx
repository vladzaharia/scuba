import { useNavigate } from 'react-router-dom'
import './global-nav.css'
import Button from '../button/button'
import { faRightFromBracket, faRightToBracket, faHome, faCog, faSun, faMoon } from '@fortawesome/pro-solid-svg-icons'
import { OpenIDScopeProps, CommonColor } from '../../types'
import { useAuth } from 'react-oidc-context'
import { useContext } from 'react'
import { ThemeContext } from '../../hooks/theme'

export default function GlobalNav() {
	const auth = useAuth()
	const navigate = useNavigate()
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const { theme, setTheme } = useContext(ThemeContext)!

	const isDark = theme === 'dark'

	return (
		<nav className="global-nav">
			<div className={`buttons`}>
				<Button
					className="login"
					color={auth.isAuthenticated ? 'red' : 'green'}
					iconProps={{
						icon: auth.isAuthenticated ? faRightFromBracket : faRightToBracket,
						size: 'lg',
					}}
					onClick={auth.isAuthenticated ? () => void auth.removeUser() : () => void auth.signinRedirect()}
					popoverProps={
						auth.isAuthenticated
							? {
									color: 'green',
									description: (
										<span>
											Signed in as <span className="fw-500">{auth.user?.profile.name}</span>
										</span>
									),
							  }
							: undefined
					}
				/>
				<Button
					className="home"
					color={'blue'}
					iconProps={{
						icon:  faHome,
						size: 'lg',
					}}
					onClick={() => {
						navigate('/')
					}}
				/>
				{(auth.user?.profile.tracker as OpenIDScopeProps)?.admin ? (
					<Button
						className="admin"
						color={'blue'}
						iconProps={{
							icon: faCog,
							size: 'lg',
						}}
						onClick={() => {
							navigate('/admin')
						}}
					/>
				) : undefined}
			</div>

			<div className={`buttons`}>
				<Button
					className="theme"
					color={isDark ? 'orange' : ('purple-dark' as CommonColor)}
					iconProps={{ icon: isDark ? faSun : faMoon, size: 'lg' }}
					onClick={() => setTheme(isDark ? 'light' : 'dark')}
				/>
			</div>
		</nav>
	)
}
