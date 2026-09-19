import "./globals.css";
import { ReactNode } from "react";
export const metadata={title:"AstraX",description:"Personal AI workspace"};
export default function Layout({children}:{children:ReactNode}){return <html lang="id"><body>{children}</body></html>}