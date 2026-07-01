import { useUiStore } from './ui-store';

beforeEach(() => {
  useUiStore.setState({ isSidebarOpen: false });
});

describe('useUiStore', () => {
  it('starts with sidebar closed', () => {
    expect(useUiStore.getState().isSidebarOpen).toBe(false);
  });

  it('openSidebar sets isSidebarOpen to true', () => {
    useUiStore.getState().openSidebar();
    expect(useUiStore.getState().isSidebarOpen).toBe(true);
  });

  it('closeSidebar sets isSidebarOpen to false', () => {
    useUiStore.setState({ isSidebarOpen: true });
    useUiStore.getState().closeSidebar();
    expect(useUiStore.getState().isSidebarOpen).toBe(false);
  });

  it('toggleSidebar switches from false to true', () => {
    useUiStore.getState().toggleSidebar();
    expect(useUiStore.getState().isSidebarOpen).toBe(true);
  });

  it('toggleSidebar switches from true to false', () => {
    useUiStore.setState({ isSidebarOpen: true });
    useUiStore.getState().toggleSidebar();
    expect(useUiStore.getState().isSidebarOpen).toBe(false);
  });
});
