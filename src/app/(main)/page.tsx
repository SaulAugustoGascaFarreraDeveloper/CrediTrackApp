import Menu from "@/components/menu";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
      <h1 className="font-semibold">CREDI TRACK</h1>
      <Menu />
    </main>
  );
}
