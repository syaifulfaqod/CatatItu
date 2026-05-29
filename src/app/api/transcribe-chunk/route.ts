import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const noteId = formData.get("noteId") as string;

    if (!file || !noteId) {
      return NextResponse.json(
        { success: false, error: "Missing file or noteId" },
        { status: 400 }
      );
    }

    // Call OpenAI Whisper API
    // We can pass the File object directly in Node/Next.js environment
    // Next.js App Router exposes native File API
    const response = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      language: "id", // Assuming Indonesian lectures
    });

    const transcriptText = response.text;

    // Append to existing transcript in Prisma
    const currentNote = await prisma.note.findUnique({
      where: { id: noteId },
      select: { transcript: true },
    });

    if (!currentNote) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }

    const newTranscript = currentNote.transcript 
      ? `${currentNote.transcript} ${transcriptText}` 
      : transcriptText;

    const updatedNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        transcript: newTranscript,
        status: "TRANSCRIBING",
      },
    });

    return NextResponse.json({ 
      success: true, 
      data: {
        text: transcriptText,
        noteId: updatedNote.id
      } 
    });
  } catch (error: any) {
    console.error("Error transcribing chunk:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to transcribe audio chunk" },
      { status: 500 }
    );
  }
}
