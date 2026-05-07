import { MOCK_LEADERBOARD } from "@/data/mock-leaderboard";
import { Driver } from "@/types";

// Simulated GCP Cloud Function for race data
export async function getMockRaceData(eventId: string) {
  return {
    eventId,
    lapTimes: [
      { driver: "Apex Miller", time: "42.5s" },
      { driver: "Slipstream Jones", time: "42.8s" },
      { driver: "Nitro Webb", time: "43.1s" },
    ],
    lastUpdated: new Date().toISOString(),
  };
}

// Simulated Firestore subscription for leaderboard
export function subscribeToLeaderboard(callback: (data: Driver[]) => void) {
  // Return initial data
  callback(MOCK_LEADERBOARD);

  // Simulate real-time updates every 15 seconds
  const interval = setInterval(() => {
    const updated = MOCK_LEADERBOARD.map(driver => ({
      ...driver,
      points: driver.points + Math.floor(Math.random() * 5)
    })).sort((a, b) => b.points - a.points);
    
    callback(updated);
  }, 15000);

  return () => clearInterval(interval);
}

export async function getLeaderboard(): Promise<Driver[]> {
  return MOCK_LEADERBOARD;
}
