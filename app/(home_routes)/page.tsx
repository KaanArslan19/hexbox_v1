import { ConnectButton } from "@rainbow-me/rainbowkit";

import ProjectList from "../components/project/ProjectList";
import { DUMMY_PROJECTS } from "../utils/dummydata";

export default function Home() {
  return (
    <main className="py-4 space-y-4">
      <ConnectButton />

      <ProjectList listings={DUMMY_PROJECTS} />
    </main>
  );
}
