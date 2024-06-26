import React from "react";

const MeetingPage = ({ params }: { params: { id: string } }) => {
  return <div>MeetingPage - # {params.id}</div>;
};

export default MeetingPage;
