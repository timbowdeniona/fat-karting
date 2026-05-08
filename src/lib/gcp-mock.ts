import { MOCK_LEADERBOARD } from "@/data/mock-leaderboard";
import { Driver } from "@/types";

// Simulated GCP Cloud Function for race data
export async function getMockRaceData(eventId: string) {
  return {
    eventId,
    lapTimes: [
      { driver: "Apex Miller", time: "42.5s" },
      { driver: "Slipstream Jones", time: "42.8s" },
      { driver: "Electro Webb", time: "43.1s" },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

// Simulated Firestore subscription for leaderboard
export function subscribeToLeaderboard(callback: (data: Driver[]) => void, region?: string) {
  const filterByRegion = (data: Driver[]) => {
    return region && region !== "Global" ? data.filter(d => d.region === region) : data;
  };

  // Return initial data
  callback(filterByRegion(MOCK_LEADERBOARD));

  // Simulate real-time updates every 15 seconds
  const interval = setInterval(() => {
    let updated = MOCK_LEADERBOARD.map(driver => ({
      ...driver,
      points: driver.points + Math.floor(Math.random() * 5)
    })).sort((a, b) => b.points - a.points);
    
    // Re-assign ranks based on filtered list
    updated = filterByRegion(updated).map((driver, index) => ({
      ...driver,
      rank: index + 1
    }));
    
    callback(updated);
  }, 15000);

  return () => clearInterval(interval);
}

export async function getLeaderboard(): Promise<Driver[]> {
  return MOCK_LEADERBOARD;
}
