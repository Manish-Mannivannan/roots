import { aboutEvents } from "../data/aboutEvents";
import { orderAboutEvents, getEventMembersIDs } from "../data/aboutEventsUtils";
import { getNodesByIDs } from "../data/dataUtils";
import { FrontendLayout } from "../components/components";
import Image from 'next/image';

const AboutPage = () => {
  const orderedEvents = orderAboutEvents(aboutEvents);
  const eventMemberIDs = getEventMembersIDs(orderedEvents);
  const familyNodes = getNodesByIDs(eventMemberIDs);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-2 gap-2">
      <FrontendLayout>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical pt-10">
          {orderedEvents.map((event, index) => {
            const node = familyNodes[index];
            const isSpouse = node && event.familymemberId.endsWith('S');
            return (
              <li key={index}>
                <div className="timeline-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className={`mb-10 flex max-w-lg gap-8 ${(index + 1) % 2 === 0 ? 'timeline-start md:text-end flex-row-reverse' : 'timeline-end flex-row'}`}>
                  <div>
                    <time className="font-mono italic">{event.date}</time>
                    <div className="text-lg font-black">{event.title}</div>
                    <p>{event.description}</p>
                  </div>

                  {node && (
                    <div className="w-44 h-52 rounded flex flex-col items-center justify-around bg-gradient-to-b from-palette3 via-palette4 to-palette5">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <div className="relative min-w-20 rounded-full">
                          <Image
                            alt="Image"
                            src={"/people/" + (isSpouse ? node.spouseImage : node.image)}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center text-center text-offWhite text-lg h-1/4">
                        <h1 className="text-wrap flex flex-col">
                          {isSpouse ? node.spouse : node.name}
                        </h1>
                      </div>
                    </div>
                  )}
                </div>
                <hr className="bg-offWhite" />
              </li>
            );
          })}
        </ul>
      </FrontendLayout>
    </main>
  );
};

export default AboutPage;
