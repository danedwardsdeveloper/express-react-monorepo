import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { validateToken } from './services/AuthService';

import MenuBar from './app/components/MenuBar';
import Footer from './app/components/Footer';

export default function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			const isValid = await validateToken();
			setIsAuthenticated(isValid);
		};
		checkAuth();
	}, []);

	return (
		<div>
			<MenuBar isAuthenticated={isAuthenticated} />
			<Outlet />
			<Footer />
		</div>
	);
}
