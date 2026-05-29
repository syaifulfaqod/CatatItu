import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const note = await prisma.note.create({
      data: {
        title: `Catatan Kuliah - ${new Date().toLocaleDateString('id-ID')}`,
        transcript: "",
        status: "PROCESSING",
      },
    });

    return NextResponse.json({ success: true, data: note });
  } catch (error: any) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { success: false, error: "Gagal membuat sesi catatan baru" },
      { status: 500 }
    );
  }
}
