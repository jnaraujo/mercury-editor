import { FileRoute } from "@tanstack/react-router";

function Home() {
  return (
    <div className="flex flex-col gap-10">
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        repellat ea, quo sequi ad accusantium eveniet. Ab ipsum aut mollitia
        praesentium! Id in quia tempora eos iste reiciendis sed voluptates!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        repellat ea, quo sequi ad accusantium eveniet. Ab ipsum aut mollitia
        praesentium! Id in quia tempora eos iste reiciendis sed voluptates!
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        repellat ea, quo sequi ad accusantium eveniet. Ab ipsum aut mollitia
        praesentium! Id in quia tempora eos iste reiciendis sed voluptates!
      </p>
    </div>
  );
}

export const Route = new FileRoute("/").createRoute({
  component: Home,
});
