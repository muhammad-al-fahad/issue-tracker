import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()
    
    if(!body.title || !body.description) return NextResponse.json({ error: "Missing title or description"}, { status: 400 })
    if(body.title.length < 5 || body.description.length < 10) return NextResponse.json({ error: "Title or description is too short"}, { status: 400 })

    const issue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json({ issue }, { status: 201 })
}