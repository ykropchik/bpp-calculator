import React, { type RefObject } from 'react';
import type { ImageInfo } from '../types';
import styles from './PreviewSection.module.scss';

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
		<div className={styles.previewSection}>
			<div className={styles.previewGrid}>
				<div className={styles.previewPanel}>
					<span className={styles.panelLabel}>Original</span>
					<canvas ref={origCanvasRef} />
				</div>
				<div className={styles.previewPanel}>
					<span className={styles.panelLabel}>Render Size</span>
					<canvas ref={renderCanvasRef} />
				</div>
			</div>

			<div className={styles.controlsPanel}>
				<div className={styles.controlRow}>
					<span className={styles.controlLabel}>Render Size</span>
					<div className={styles.dimInputs}>
						<div className={styles.dimField}>
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
							className={`${styles.lockBtn}${locked ? ` ${styles.locked}` : ''}`}
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
						<div className={styles.dimField}>
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

			<div className={styles.metricsPanel}>
				<div className={styles.metricsGrid}>
					<div className={`${styles.metricCard} ${styles.highlight}`}>
						<div className={styles.metricLabel}>BPP</div>
						<div className={styles.metricVal}>{bpp < 10 ? bpp.toFixed(3) : bpp.toFixed(1)}</div>
						<div className={styles.metricUnit}>bits / pixel</div>
					</div>
					<div className={styles.metricCard}>
						<div className={styles.metricLabel}>Render W×H</div>
						<div className={styles.metricVal}>
							{rw}
							×
							{rh}
						</div>
						<div className={styles.metricUnit}>pixels</div>
					</div>
					<div className={styles.metricCard}>
						<div className={styles.metricLabel}>File Size</div>
						<div className={styles.metricVal}>{fsVal}</div>
						<div className={styles.metricUnit}>{fsUnit}</div>
					</div>
				</div>
			</div>

			<div className={styles.bppVisual}>
				<table className={styles.infoTable}>
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
				<div className={styles.formulaNote}>
					Formula:
					{' '}
					<span className={styles.accent}>
						BPP = (File size in bits) / (Display Width × Display Height)
					</span>
				</div>
			</div>
		</div>
	);
}

export default PreviewSection;
