"use client";

import Loader from "@/components/Loader";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import MeetingRoom from "./MeetingRoom";
import MeetingSetup from "./MeetingSetup";

const MeetingPage = ({ params: { id } }: { params: { id: string } }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { isLoaded, user } = useUser();
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>{!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete} /> : <MeetingRoom />}</StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
