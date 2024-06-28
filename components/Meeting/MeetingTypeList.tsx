"use client";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "../Loader";
import { useToast } from "../ui/use-toast";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingTypeList = () => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const client = useStreamVideoClient();
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const [meetingState, setMeetingState] = useState<"isInstantMeeting" | "isJoiningMeeting" | "isScheduleMeeting" | undefined>();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = new Date().getTime().toString();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");
      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,

          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Meeting Created :)",
      });
    } catch (error) {
      console.error(error);
      toast({ title: "Failed to create Meeting" });
    }
  };

  if (!client || !user) return <Loader />;

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
