import {NextResponse} from "next/server";
let used=0; let resetAt:number|null=null; const MAX=1000; const COOLDOWN=10*60*1000;
export async function GET(){if(resetAt&&Date.now()>=resetAt){used=0;resetAt=null}return NextResponse.json({used,max:MAX,resetAt})}
export async function POST(){if(resetAt&&Date.now()>=resetAt){used=0;resetAt=null} if(used>=MAX)return NextResponse.json({used,max:MAX,resetAt},{status:429}); used++; if(used===MAX)resetAt=Date.now()+COOLDOWN; return NextResponse.json({used,max:MAX,resetAt})}