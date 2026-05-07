import { MOCK_EVENTS } from "@/data/mock-events";
import { MOCK_HUBS } from "@/data/mock-hubs";
import { RaceEvent, Hub } from "@/types";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

export async function fetchContentfulGraphQL(query: string, variables = {}) {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    console.warn("Contentful credentials missing, using mock data fallback.");
    return null;
  }

  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    const { data, errors } = await response.json();

    if (errors) {
      console.error("Contentful GraphQL errors:", errors);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching from Contentful:", error);
    return null;
  }
}

export async function getEvents(): Promise<RaceEvent[]> {
  // In a real app, we'd query Contentful here
  // const data = await fetchContentfulGraphQL(`query { raceEventCollection { items { ... } } }`);
  // return data?.raceEventCollection?.items || MOCK_EVENTS;
  
  return MOCK_EVENTS;
}

export async function getEventBySlug(slug: string): Promise<RaceEvent | undefined> {
  return MOCK_EVENTS.find((e) => e.slug === slug);
}

export async function getHubs(): Promise<Hub[]> {
  return MOCK_HUBS;
}

export async function getHubBySlug(slug: string): Promise<Hub | undefined> {
  return MOCK_HUBS.find((h) => h.slug === slug);
}
