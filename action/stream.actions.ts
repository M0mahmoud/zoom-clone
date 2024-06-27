"use server";

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const STREAM_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async () => {
  const user = await currentUser();

  if (!user) throw new Error("User is not authenticated");
  if (!API_KEY) throw new Error("Stream API key secret is missing");
  if (!STREAM_SECRET) throw new Error("Stream API secret is missing");

  const streamClient = new StreamClient(API_KEY, STREAM_SECRET, {
    timeout: 6000,
  });

  const exp = Math.floor(Date.now() / 1000) + 3600;
  const issuedAt = Math.floor(Date.now() / 1000) - 60;

  const token = streamClient.createToken(user.id, exp, issuedAt);
  return token;
};
