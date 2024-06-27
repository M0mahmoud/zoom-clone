"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<"isInstantMeeting" | "isJoiningMeeting" | "isScheduleMeeting" | undefined>();

  const createMeeting = () => {};
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard img="/icons/add-meeting.svg" title="New Meeting" description="Start an instant meeting" handleClick={() => setMeetingState("isInstantMeeting")} />
      <HomeCard img="/icons/join-meeting.svg" title="Join Meeting" description="via invitation link" className="bg-blue-1" handleClick={() => setMeetingState("isJoiningMeeting")} />
      <HomeCard img="/icons/schedule.svg" title="Schedule Meeting" description="Plan your meeting" className="bg-purple-1" handleClick={() => setMeetingState("isScheduleMeeting")} />
      <HomeCard img="/icons/recordings.svg" title="View Recordings" description="Meeting Recordings" className="bg-yellow-1" handleClick={() => router.push("/recordings")} />

      {/* MeetingModal */}
      <MeetingModal isOpen={meetingState === "isInstantMeeting"} onClose={() => setMeetingState(undefined)} title="Create Meeting" handleClick={createMeeting} className="text-center" buttonText="Start Meeting" />
    </section>
  );
};

export default MeetingTypeList;
