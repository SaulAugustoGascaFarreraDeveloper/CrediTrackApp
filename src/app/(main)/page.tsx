import Navbar from "@/components/global/navbar";
import Menu from "@/components/menu";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-start p-6 gap-6">
      {/* <Navbar /> */}
      <h1 className="font-semibold text-blue-600 text-2xl">CREDI TRACK</h1>
      {/* <Menu /> */}
      <p>Aqui se mostrara mas informacion pero nada relevante </p>
    </main>
  );
}
