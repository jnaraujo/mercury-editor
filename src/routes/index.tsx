import { FileRoute, Link } from "@tanstack/react-router";

function Home() {
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

export const Route = new FileRoute("/").createRoute({
  component: Home,
});
