/* eslint-disable @typescript-eslint/no-explicit-any */
import EventDetails from "@/components/modules/Events/EventDetails";
import { getCurrentUser } from "@/services/AuthService";
import { getSingleEvent } from "@/services/EventService";
import Link from "next/link";

// type Props = {
//   params: {
//     slug: string;
//   };
// };

export default async function SingleEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getSingleEvent(slug);
  const event = data?.data;
  const organizer = event?.organizer;
  const user = await getCurrentUser();

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Event Not Found
          </h2>
          <p className="mt-2 text-gray-600">
            We could not find the event you are looking for. It may have been
            removed or the URL is incorrect.
          </p>
          <Link
            href="/events"
            className="mt-4 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EventDetails event={event} organizer={organizer} user={user} />
    </div>
  );
}
