import client from "@/app/utils/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const mdbClient = client;
        const db = mdbClient.db("hexbox_main");
        const movies = await db
            .collection("campaigns")
            .find({})
            //.sort({ metacritic: -1 })
            //.limit(10)
            .toArray();
        return NextResponse.json(movies);
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
