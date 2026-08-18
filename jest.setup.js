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

class MockResizeObserver {
	observe() {}

	unobserve() {}

	disconnect() {}
}

global.ResizeObserver = MockResizeObserver;

jest.mock("leaflet", () => {
  const actualIcon = class {
    constructor() {
      this.options = {};
    }
  };

  return {
    __esModule: true,
    default: {
      icon: jest.fn(() => new actualIcon()),
      map: jest.fn(() => ({
        setView: jest.fn().mockReturnThis(),
        remove: jest.fn(),
      })),
      tileLayer: jest.fn(() => ({
        on: jest.fn().mockReturnThis(),
        addTo: jest.fn().mockReturnThis(),
      })),
      marker: jest.fn(() => ({
        bindPopup: jest.fn().mockReturnThis(),
        addTo: jest.fn().mockReturnThis(),
        remove: jest.fn(),
      })),
    },
  };
});

jest.mock("leaflet/dist/leaflet.css", () => ({}), { virtual: true });
