// Private-mode-safe storage + small DOM/env helpers shared across the SDK.
// Every accessor swallows exceptions so a locked-down browser (private mode,
// disabled storage) degrades gracefully instead of throwing.

export function lsGet(key) {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
}
export function lsSet(key, val) {
	try {
		localStorage.setItem(key, val);
	} catch {
		/* private mode / disabled storage — non-fatal */
	}
}
export function ssGet(key) {
	try {
		return sessionStorage.getItem(key);
	} catch {
		return null;
	}
}
export function ssSet(key, val) {
	try {
		sessionStorage.setItem(key, val);
	} catch {
		/* non-fatal */
	}
}
export function ssDel(key) {
	try {
		sessionStorage.removeItem(key);
	} catch {
		/* non-fatal */
	}
}

export function prefersReducedMotion() {
	try {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	} catch {
		return false;
	}
}

export function isCoarsePointer() {
	try {
		return window.matchMedia('(pointer: coarse)').matches;
	} catch {
		return false;
	}
}

export function webglSupported() {
	try {
		const c = document.createElement('canvas');
		return !!(
			window.WebGLRenderingContext &&
			(c.getContext('webgl2') || c.getContext('webgl'))
		);
	} catch {
		return false;
	}
}

export function clamp(v, lo, hi) {
	return Math.max(lo, Math.min(hi, v));
}
