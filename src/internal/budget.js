// Shared WebGL context accounting (vendored from the three.ws app).
//
// Browsers cap simultaneous WebGL contexts (~16 in Chrome). State lives on
// `window` so every renderer on the page — the host app's own viewers, the
// CDN <agent-3d> element, and this SDK — counts against ONE shared budget and
// no single page can blow past the browser limit. Because the state is a
// window global, a vendored copy here coordinates with the app's copy
// automatically; they are the same counter.

export function reserveWebGLContext() {
	if (typeof window === 'undefined') return;
	const n = Number(window.__agent3dReservedContexts) || 0;
	window.__agent3dReservedContexts = n + 1;
	if (typeof window.__agent3dEnforceBudget === 'function') {
		try {
			window.__agent3dEnforceBudget();
		} catch {
			/* budget enforcement is best-effort */
		}
	}
}

export function releaseWebGLContext() {
	if (typeof window === 'undefined') return;
	const n = Number(window.__agent3dReservedContexts) || 0;
	window.__agent3dReservedContexts = Math.max(0, n - 1);
}
