import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Prop {
    params: { id: string }
}

export async function PATCH(req: NextRequest, { params }: Prop) {
    const body = await req.json()
    
    if(!body.title || !body.description) return NextResponse.json({ error: "Missing title or description"}, { status: 400 })
    if(body.title.length < 5 || body.description.length < 10) return NextResponse.json({ error: "Title or description is too short"}, { status: 400 })

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!issue) return NextResponse.json({ error: "Issue does not found" }, { status: 404 })

    await prisma.issue.update({
        where: {
            id: parseInt(params.id)
        },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json({ message: "Issue Updated Successfully" }, { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: Prop) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if(!issue) return NextResponse.json({ error: "Issue does not found" }, { status: 404 })

    await prisma.issue.delete({
        where: {
            id: parseInt(params.id)
        }
    })

    return NextResponse.json({}, { status: 200 })
}