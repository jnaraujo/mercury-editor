import Note from "@/components/note";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container max-w-screen-md py-8">
      <ul>
        <li>
          <Link to="/editor">Editor</Link>
        </li>
      </ul>

      <section>
        <h1>Suas notas:</h1>

        <div className="space-y-2">
          <Note
            title="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, iste quibusdam, molestiae cumque eius nobis repellat consequuntur obcaecati mollitia nemo doloribus? Dolorum molestias odio tenetur quisquam voluptatibus atque assumenda? Voluptatibus!"
            tags={["notas", "travel"]}
            createdAt="01/01/2021"
          />

          <Note
            title="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, iste quibusdam, molestiae cumque eius nobis repellat consequuntur obcaecati mollitia nemo doloribus? Dolorum molestias odio tenetur quisquam voluptatibus atque assumenda? Voluptatibus!"
            tags={["notas", "travel"]}
            createdAt="01/01/2021"
          />

          <Note
            title="Lorem ipsum dolor, sit amet consectetur adipisicing elit."
            description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, iste quibusdam, molestiae cumque eius nobis repellat consequuntur obcaecati mollitia nemo doloribus? Dolorum molestias odio tenetur quisquam voluptatibus atque assumenda? Voluptatibus!"
            tags={["notas", "travel"]}
            createdAt="01/01/2021"
          />
        </div>
      </section>
    </main>
  );
}
