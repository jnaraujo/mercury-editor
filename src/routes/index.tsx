import Note from "@/components/note";
import { Button } from "@/components/ui/button";
import { appWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

const MOCK_NOTES = [
  {
    slug: "nota-1",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, iste quibusdam, molestiae cumque eius nobis repellat consequuntur obcaecati mollitia nemo doloribus? Dolorum molestias odio tenetur quisquam voluptatibus atque assumenda? Voluptatibus!",
    tags: ["notas", "travel"],
    createdAt: "01/01/2021",
  },
  {
    slug: "nota-2",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, iste quibusdam, molestiae cumque eius nobis repellat consequuntur obcaecati mollitia nemo doloribus? Dolorum molestias odio tenetur quisquam voluptatibus atque assumenda? Voluptatibus!",
    tags: ["notas", "travel"],
    createdAt: "01/01/2021",
  },
  {
    slug: "nota-3",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, iste quibusdam, molestiae cumque eius nobis repellat consequuntur obcaecati mollitia nemo doloribus? Dolorum molestias odio tenetur quisquam voluptatibus atque assumenda? Voluptatibus!",
    tags: ["notas", "travel"],
    createdAt: "01/01/2021",
  },
];

export default function Home() {
  useEffect(() => {
    appWindow.setTitle(`Mercury`);
  }, []);
  return (
    <main className="container max-w-screen-md py-8">
      <section className="space-y-4">
        <header className="flex justify-between items-center">
          <h1 className="text-zinc-700 text-sm dark:text-zinc-400">
            {">"} Notas recentes
          </h1>

          <Button variant="outline">Criar nota</Button>
        </header>

        <div className="space-y-2">
          {MOCK_NOTES.map((note) => (
            <Note
              key={note.slug}
              title={note.title}
              description={note.description}
              tags={note.tags}
              createdAt={note.createdAt}
              slug={note.slug}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
