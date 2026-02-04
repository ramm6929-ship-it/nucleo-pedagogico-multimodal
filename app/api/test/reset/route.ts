import { NextResponse } from "next/server";
import { resetAcademicState } from "@/app/lib/memory-store";

export async function POST(request: Request) {
    const { asignatura, nivel } = await request.json();
    resetAcademicState(asignatura, nivel);
    return NextResponse.json({ success: true, message: `Reset state for ${asignatura} ${nivel}` });
}
