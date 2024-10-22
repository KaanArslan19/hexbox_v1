import { authOptions } from "@/app/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {

    const session = await getServerSession(authOptions);

    return NextResponse.json({ message: 'If you see this, you are authenticated!', session: session }, { status: 200 });
}