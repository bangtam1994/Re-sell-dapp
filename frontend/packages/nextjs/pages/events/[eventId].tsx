import { useRouter } from "next/router";

const Event = () => {
  const router = useRouter();
  return <h1>{router.query.eventId}</h1>;
};

export default Event;
