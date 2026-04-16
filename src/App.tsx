import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ImageInfo } from './types';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import PreviewSection from './components/PreviewSection';

function App() {
	const [imageInfo, setImageInfo] = useState<ImageInfo | null>(null);
	const [renderWidth, setRenderWidth] = useState(0);
	const [renderHeight, setRenderHeight] = useState(0);
	const [locked, setLocked] = useState(true);
	const origCanvasRef = useRef<HTMLCanvasElement>(null);
	const renderCanvasRef = useRef<HTMLCanvasElement>(null);

	const aspectRatio = imageInfo ? imageInfo.img.width / imageInfo.img.height : 1;

	const handleFile = useCallback((file: File) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				setImageInfo({ img, fileSize: file.size, fileName: file.name, fileType: file.type });
				setRenderWidth(img.width);
				setRenderHeight(img.height);
			};
			img.src = e.target!.result as string;
		};
		reader.readAsDataURL(file);
	}, []);

	useEffect(() => {
		if (!imageInfo) return;
		const canvas = origCanvasRef.current;
		if (!canvas) return;
		canvas.width = imageInfo.img.width;
		canvas.height = imageInfo.img.height;
		canvas.getContext('2d')?.drawImage(imageInfo.img, 0, 0);
	}, [imageInfo]);

	useEffect(() => {
		if (!imageInfo) return;
		const canvas = renderCanvasRef.current;
		if (!canvas) return;
		const rw = Math.max(1, renderWidth || 1);
		const rh = Math.max(1, renderHeight || 1);
		canvas.width = rw;
		canvas.height = rh;
		canvas.getContext('2d')?.drawImage(imageInfo.img, 0, 0, rw, rh);
	}, [imageInfo, renderWidth, renderHeight]);

	const handleWidthChange = (w: number) => {
		setRenderWidth(w);
		if (locked && w > 0 && imageInfo) {
			setRenderHeight(Math.max(1, Math.round(w / aspectRatio)));
		}
	};

	const handleHeightChange = (h: number) => {
		setRenderHeight(h);
		if (locked && h > 0 && imageInfo) {
			setRenderWidth(Math.max(1, Math.round(h * aspectRatio)));
		}
	};

	return (
		<div className="wrapper">
			<Header />
			<UploadZone onFile={handleFile} />
			{imageInfo && (
				<PreviewSection
					imageInfo={imageInfo}
					renderWidth={renderWidth}
					renderHeight={renderHeight}
					locked={locked}
					origCanvasRef={origCanvasRef}
					renderCanvasRef={renderCanvasRef}
					onWidthChange={handleWidthChange}
					onHeightChange={handleHeightChange}
					onLockToggle={() => setLocked((v) => !v)}
				/>
			)}
		</div>
	);
}

export default App;
