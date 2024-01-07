import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <ul>
        <li>
          <Link to="/editor">Editor</Link>
        </li>
      </ul>
    </main>
  );
}
