import path from "path";
import fs from "fs";
import { parse } from "csv-parse/sync";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data.csv");

  const fileContent = fs.readFileSync(filePath, "utf8");
// return file data
  const records = parse(fileContent, {
    columns: ["date", "name"],
    delimiter: ";",
    skip_empty_lines: true,
  });

  
  return NextResponse.json(records);
}
