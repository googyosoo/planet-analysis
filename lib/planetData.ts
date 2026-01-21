export interface PlanetData {
  name: string;
  radius: number;
  distance: number;
  rotationSpeed: number;
  orbitSpeed: number;
  color: string;
  texture?: string;
  hasRing?: boolean;
}

// Scaled for visualization (not 1:1 real scale)
export const solarSystemData: PlanetData[] = [
  {
    name: "Mercury",
    radius: 0.38,
    distance: 10,
    rotationSpeed: 0.01,
    orbitSpeed: 0.04,
    color: "#A5A5A5",
  },
  {
    name: "Venus",
    radius: 0.95,
    distance: 15,
    rotationSpeed: 0.005,
    orbitSpeed: 0.015,
    color: "#E3BB76",
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    rotationSpeed: 0.02,
    orbitSpeed: 0.01,
    color: "#2233FF",
  },
  {
    name: "Mars",
    radius: 0.53,
    distance: 25,
    rotationSpeed: 0.02,
    orbitSpeed: 0.008,
    color: "#DC4C33",
  },
  {
    name: "Jupiter",
    radius: 5, // Reduced from real scale (11x) for viewability
    distance: 35,
    rotationSpeed: 0.05,
    orbitSpeed: 0.002,
    color: "#D8CA9D",
  },
  {
    name: "Saturn",
    radius: 4,
    distance: 50,
    rotationSpeed: 0.045,
    orbitSpeed: 0.0009,
    color: "#E2BF7D",
    hasRing: true,
  },
  {
    name: "Uranus",
    radius: 2,
    distance: 65,
    rotationSpeed: 0.03,
    orbitSpeed: 0.0004,
    color: "#93B8BE",
    hasRing: true,
  },
  {
    name: "Neptune",
    radius: 2,
    distance: 75,
    rotationSpeed: 0.032,
    orbitSpeed: 0.0001,
    color: "#5B5DDF",
  },
];
