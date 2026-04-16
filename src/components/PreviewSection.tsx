import React, { type RefObject } from 'react';
import type { ImageInfo } from '../types';

type Props = {
	imageInfo: ImageInfo;
	renderWidth: number;
	renderHeight: number;
	locked: boolean;
	origCanvasRef: RefObject<HTMLCanvasElement>;
	renderCanvasRef: RefObject<HTMLCanvasElement>;
	onWidthChange: (w: number) => void;
	onHeightChange: (h: number) => void;
	onLockToggle: () => void;
};

function formatBytes(bytes: number): [string, string] {
	if (bytes < 1024) return [bytes.toFixed(0), 'B'];
	if (bytes < 1024 * 1024) return [(bytes / 1024).toFixed(1), 'KB'];
	return [(bytes / 1024 / 1024).toFixed(2), 'MB'];
}

function PreviewSection({
	imageInfo,
	renderWidth,
	renderHeight,
	locked,
	origCanvasRef,
	renderCanvasRef,
	onWidthChange,
	onHeightChange,
	onLockToggle,
}: Props) {
	const { img, fileSize, fileName, fileType } = imageInfo;
	const rw = Math.max(1, renderWidth || 1);
	const rh = Math.max(1, renderHeight || 1);
	const totalPx = rw * rh;
	const bpp = (fileSize * 8) / totalPx;
	const pct = ((rw / img.width) * 100).toFixed(0);
	const [fsVal, fsUnit] = formatBytes(fileSize);

	const scalePctColor
		= Number(pct) === 100
			? 'var(--muted)'
			: Number(pct) > 100
				? 'var(--accent2)'
				: 'var(--accent)';

	return (
		<div className="preview-section">
			<div className="preview-grid">
				<div className="preview-panel">
					<span className="panel-label">Original</span>
					<canvas ref={origCanvasRef} />
				</div>
				<div className="preview-panel">
					<span className="panel-label">Render Size</span>
					<canvas ref={renderCanvasRef} />
				</div>
			</div>

			<div className="controls-panel">
				<div className="control-row">
					<span className="control-label">Render Size</span>
					<div className="dim-inputs">
						<div className="dim-field">
							<label>W</label>
							<input
								type="number"
								min={1}
								max={99999}
								value={renderWidth || ''}
								onChange={(e) => onWidthChange(parseInt(e.target.value) || 0)}
							/>
						</div>
						<button
							className={`lock-btn${locked ? ' locked' : ''}`}
							onClick={onLockToggle}
							title="Keep aspect ratio"
						>
							<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
								<rect x="3" y="6" width="8" height="7" stroke="currentColor" strokeWidth="1.3" />
								<path
									d={locked ? 'M4.5 6V4.5a2.5 2.5 0 015 0V6' : 'M4.5 8V6.5a2.5 2.5 0 015 0'}
									stroke="currentColor"
									strokeWidth="1.3"
								/>
							</svg>
						</button>
						<div className="dim-field">
							<label>H</label>
							<input
								type="number"
								min={1}
								max={99999}
								value={renderHeight || ''}
								onChange={(e) => onHeightChange(parseInt(e.target.value) || 0)}
							/>
						</div>
					</div>
					<span style={{ fontSize: '10px', color: scalePctColor, letterSpacing: '1px', minWidth: '40px', textAlign: 'right' }}>
						{pct}
						%
					</span>
				</div>
			</div>

			<div className="metrics-panel">
				<div className="metrics-grid">
					<div className="metric-card highlight">
						<div className="metric-label">BPP</div>
						<div className="metric-val">{bpp < 10 ? bpp.toFixed(3) : bpp.toFixed(1)}</div>
						<div className="metric-unit">bits / pixel</div>
					</div>
					<div className="metric-card">
						<div className="metric-label">Render W×H</div>
						<div className="metric-val">
							{rw}
							×
							{rh}
						</div>
						<div className="metric-unit">pixels</div>
					</div>
					<div className="metric-card">
						<div className="metric-label">File Size</div>
						<div className="metric-val">{fsVal}</div>
						<div className="metric-unit">{fsUnit}</div>
					</div>
				</div>
			</div>

			<div className="bpp-visual">
				<table className="info-table">
					<tbody>
						<tr>
							<td>Original size</td>
							<td>
								{img.width}
								{' '}
								×
								{' '}
								{img.height}
								{' '}
								px
							</td>
						</tr>
						<tr>
							<td>File format</td>
							<td>
								{fileType.replace('image/', '').toUpperCase()}
								{' '}
								—
								{' '}
								{fileName}
							</td>
						</tr>
						<tr>
							<td>Total pixels</td>
							<td>
								{totalPx.toLocaleString()}
								{' '}
								px
							</td>
						</tr>
					</tbody>
				</table>
				<div className="formula-note">
					Formula:
					{' '}
					<span className="accent">
						BPP = (File size in bits) / (Display Width × Display Height)
					</span>
				</div>
			</div>
		</div>
	);
}

export default PreviewSection;
