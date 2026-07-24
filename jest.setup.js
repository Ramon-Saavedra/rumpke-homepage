require('@testing-library/jest-dom');

// jsdom doesn't implement matchMedia; ThemeSwitch (and other theme-aware
// components) call it on mount.
if (!window.matchMedia) {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: (query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener() {},
			removeListener() {},
			addEventListener() {},
			removeEventListener() {},
			dispatchEvent() {
				return false;
			},
		}),
	});
}

class MockIntersectionObserver {
	observe() {}

	unobserve() {}

	disconnect() {}

	takeRecords() {
		return [];
	}
}

global.IntersectionObserver = MockIntersectionObserver;
