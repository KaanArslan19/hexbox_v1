import client from "@/app/utils/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/utils/auth"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

    
export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        // const session = await getServerSession(authOptions)

        // if (!session) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const formData = await req.formData()
        if (!formData) {
            return NextResponse.json({ error: "Campaign data is required" }, { status: 400 });
        }

        // Get the logo file from form data
        const logoFile = formData.get('logo') as File;
        if (!logoFile) {
            return NextResponse.json({ error: "Logo is required" }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(logoFile.type)) {
            return NextResponse.json({ 
                error: "Invalid file type. Please upload a valid image (JPEG, PNG, GIF, or WEBP)" 
            }, { status: 400 });
        }

        // Optional: Validate file size (e.g., max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (logoFile.size > maxSize) {
            return NextResponse.json({ 
                error: "File size too large. Maximum size is 5MB" 
            }, { status: 400 });
        }

        // Generate unique ID for the image
        const uniqueId = uuidv4();
        const fileExtension = logoFile.name.split('.').pop();
        const logoFileName = `campaign_logos/${uniqueId}.${fileExtension}`;

        // Upload to S3
        const buffer = Buffer.from(await logoFile.arrayBuffer());
        const uploadParams = {
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: logoFileName,
            Body: buffer,
            ContentType: logoFile.type,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        const campaignEntries = Object.fromEntries(formData.entries())
        let campaign = {
            title: campaignEntries.title,
            description: campaignEntries.description,
            fund_amount: Number(campaignEntries.fund_amount),
            logo: `${uniqueId}.${fileExtension}`,
            timestamp: Date.now(),
            status: true,
        }

        // Provision campaign wallet here (call another API/util)

        // Create campaign in DB
        const mdbClient = client;
        const db = mdbClient.db("hexbox_main");
        const result = await db.collection("campaigns").insertOne(campaign);

        console.log(result)

        return NextResponse.json("created");
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
