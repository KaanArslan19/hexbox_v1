import client from "@/app/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        console.log(req.nextUrl.searchParams);
        if (!req.nextUrl.searchParams.has("campaign")) {
            return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 });
        }

        const campaignId = req.nextUrl.searchParams.get("campaign");
        if (!ObjectId.isValid(campaignId as string)) {
            return NextResponse.json({ error: "Campaign ID is invalid" }, { status: 400 });
        }
        const mdbClient = client;
        const db = mdbClient.db("hexbox_main");
        const movies = await db
            .collection("campaigns")
            .find({ _id: new ObjectId(campaignId as string) })
            .toArray();
        return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
