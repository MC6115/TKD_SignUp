import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { connectDB } from "@/app/lib/mongodb";
import { Competitor } from '@/types';
import { sortCompetitors } from "@/logic";



export async function GET() {
  const db = await connectDB();
  const competitors = await db.collection("competitors").find().toArray();
  return NextResponse.json(competitors);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const db = await connectDB();
  await db.collection("competitors").insertOne(body);
  const competitors = await db.collection("competitors").find().toArray();
  return NextResponse.json(competitors);