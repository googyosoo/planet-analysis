import { create } from 'zustand';

export interface SimulationState {
    // Time Control
    speed: number;
    isPaused: boolean;
    date: number; // Timestamp for easier calculations

    // Camera & Navigation
    target: string; // 'Sun', 'Earth', etc.
    followTarget: boolean;
    lookAtTarget: boolean; // Just look at it vs follow it

    // Visual Settings
    objectScale: number;
    showOrbits: boolean;
    showLabels: boolean;

    // Visibility Toggles
    visibility: {
        innerPlanets: boolean; // Mercury, Venus, Earth, Mars
        outerPlanets: boolean; // Jupiter, Saturn, Uranus, Neptune
        moons: boolean;
        stars: boolean;
        labels: boolean;
    };

    // Actions
    setSpeed: (speed: number) => void;
    togglePause: () => void;
    setDate: (date: number) => void;
    setTarget: (target: string) => void;
    toggleFollow: () => void;
    setObjectScale: (scale: number) => void;
    toggleOrbitVisibility: () => void;
    toggleLabelVisibility: () => void;
    toggleVisibility: (key: keyof SimulationState['visibility']) => void;
}

export const useStore = create<SimulationState>((set) => ({
    speed: 1, // 1 second = 1 hour (example base)
    isPaused: false,
    date: Date.now(),

    target: 'Sun',
    followTarget: false,
    lookAtTarget: true,

    objectScale: 1,
    showOrbits: true,
    showLabels: true,

    visibility: {
        innerPlanets: true,
        outerPlanets: true,
        moons: true,
        stars: true,
        labels: true,
    },

    setSpeed: (speed) => set({ speed }),
    togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    setDate: (date) => set({ date }),
    setTarget: (target) => set({ target, followTarget: true }), // Auto-follow on selection
    toggleFollow: () => set((state) => ({ followTarget: !state.followTarget })),
    setObjectScale: (objectScale) => set({ objectScale }),
    toggleOrbitVisibility: () => set((state) => ({ showOrbits: !state.showOrbits })),
    toggleLabelVisibility: () => set((state) => ({ showLabels: !state.showLabels })),
    toggleVisibility: (key) => set((state) => ({
        visibility: { ...state.visibility, [key]: !state.visibility[key] }
    })),
}));
