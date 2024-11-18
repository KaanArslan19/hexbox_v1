import client from "@/app/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { validateTurnstileToken } from "next-turnstile";
import { v4 } from "uuid";


export const POST = async (req: NextRequest, res: NextResponse) => {
  try {

    const formData = await req.formData();
    if (!formData) {
      return NextResponse.json(
        { error: "Waitlist data is required" },
        { status: 400 }
      );
    }

    console.log("turnstile secret key: ", process.env.TURNSTILE_SECRET_KEY);

    const campaignEntries = Object.fromEntries(formData.entries());

    const token = campaignEntries["cf-turnstile-response"];
    if (!token) {
      return NextResponse.json({ error: "Turnstile token is required" }, { status: 400 });
    }
    const turnstileResult = await validateTurnstileToken({
        token: token as string,
        secretKey: process.env.TURNSTILE_SECRET_KEY as string,
        idempotencyKey: v4(),
        sandbox: process.env.NODE_ENV === "development",
    });
    if (!turnstileResult.success) {
      return NextResponse.json({ error: "Turnstile check failed" }, { status: 400 });
    }

    let campaign = {
      name: campaignEntries.name,
      surname: campaignEntries.surname,
      mail: campaignEntries.mail,
      description: campaignEntries.description,
      location: campaignEntries.location,
      discord: campaignEntries.discord,
      telegram: campaignEntries.telegram,
      linkedIn: campaignEntries.linkedIn,
      website: campaignEntries.website,
      timestamp: Date.now(),
      predictedFundAmount: Number(campaignEntries.predictedFundAmount),
      solanaWalletAddress: campaignEntries.solanaWalletAddress,
    };

    // Create campaign in DB
    const mdbClient = client;
    const db = mdbClient.db("hexbox_main");
    const result = await db.collection("waitlist").insertOne(campaign);

    console.log(result);

    return NextResponse.json("created");
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
