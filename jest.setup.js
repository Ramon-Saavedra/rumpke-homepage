require('@testing-library/jest-dom');

class MockIntersectionObserver {
	observe() {}

	unobserve() {}

	disconnect() {}

	takeRecords() {
		return [];
	}
}

global.IntersectionObserver = MockIntersectionObserver;
