import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import './styles/global.scss';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
		<Analytics />
		<SpeedInsights />
	</StrictMode>,
);
