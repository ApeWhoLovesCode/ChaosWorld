import ThemeBtn from "@/components/ThemeBtn";
import ScrollLine from "@/components/Title/ScrollLine";
import { projectData } from "@/data/project";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-4">
      <ThemeBtn />
      <div className="h-screen p-4">
        {projectData.map((p) => {
          return (
            <div key={p.id}>
              <ScrollLine>{p.name}</ScrollLine>
              <div className="flex gap-8 mt-4">
                {p.children.map((c) => {
                  return (
                    <a className=" hover:text-blue-400" href={c.path} key={c.id}>
                      <Image className="size-40" src={c.cover} alt={c.name} width={160} height={160} />
                      <div className="text-center mt-2">{c.name}</div>
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
