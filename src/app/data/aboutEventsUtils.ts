import { AboutEvent } from "../types/interfaces";

/**
 * Function to order AboutEvent objects by date, from oldest to newest
 * @param aboutEvents - Array of AboutEvent objects
 * @returns Array of AboutEvent objects sorted by date
 */
export const orderAboutEvents = (aboutEvents: AboutEvent[]): AboutEvent[] => {
  return aboutEvents.sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateA.getTime() - dateB.getTime();
  });
};

export const getEventMembersIDs = (aboutEvents: AboutEvent[]): string[] => {
  const membersIDs: string[] = [];

  aboutEvents.forEach(member => {
    membersIDs.push(member.familymemberId)
  });

  return membersIDs;
}
