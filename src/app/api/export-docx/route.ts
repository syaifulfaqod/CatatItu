import { NextResponse } from "next/server";
import HTMLtoDOCX from "html-to-docx";

export async function POST(request: Request) {
  try {
    const { html, title } = await request.json();

    if (!html) {
      return NextResponse.json(
        { success: false, error: "Missing HTML content" },
        { status: 400 }
      );
    }

    const docxBuffer = await HTMLtoDOCX(html, null, {
      table: { row: { cantSplit: true } },
      footer: true,
      pageNumber: true,
    });

    const safeTitle = title ? title.replace(/[^a-zA-Z0-9]/g, '_') : 'Catatan_Kuliah';

    return new NextResponse(docxBuffer, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename=${safeTitle}.docx`,
      },
    });
  } catch (error: any) {
    console.error("Error generating DOCX:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate DOCX" },
      { status: 500 }
    );
  }
}
