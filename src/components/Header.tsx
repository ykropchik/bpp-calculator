import React from 'react';
import styles from './Header.module.scss';

function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.logoMark}><span>BPP</span></div>
			<div className={styles.headerText}>
				<h1>Bits Per Pixel</h1>
			</div>
			<div className={styles.versionTag}>v1.0.0</div>
		</header>
	);
}

export default Header;
