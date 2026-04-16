import React, { useState } from 'react';

type Props = {
	onFile: (file: File) => void;
};

function UploadZone({ onFile }: Props) {
	const [dragOver, setDragOver] = useState(false);

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setDragOver(false);
		const file = e.dataTransfer.files[0];
		if (file?.type.startsWith('image/')) onFile(file);
	};

	return (
		<div
			className={`upload-zone${dragOver ? ' drag-over' : ''}`}
			onDragOver={(e) => {
				e.preventDefault();
				setDragOver(true);
			}}
			onDragLeave={() => setDragOver(false)}
			onDrop={handleDrop}
		>
			<input
				type="file"
				accept="image/*"
				onChange={(e) => { if (e.target.files?.[0]) onFile(e.target.files[0]); }}
			/>
			<svg className="upload-icon" viewBox="0 0 48 48" fill="none">
				<rect x="4" y="4" width="40" height="40" stroke="#e8ff47" strokeWidth="1.5" strokeDasharray="4 3" />
				<path d="M24 32V16M24 16L17 23M24 16L31 23" stroke="#e8ff47" strokeWidth="1.5" strokeLinecap="square" />
			</svg>
			<span className="upload-label">Upload image</span>
			<span className="upload-sub">PNG · JPG · WEBP · BMP · GIF — drag &amp; drop</span>
		</div>
	);
}

export default UploadZone;
