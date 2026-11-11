import { writeFile } from "node:fs/promises";
import { fetchPublicProfile } from "../lib/github.mjs";
const data = await fetchPublicProfile(
  fetch,
  process.env.GITHUB_PUBLIC_DATA_TOKEN || "",
);
await writeFile(
  new URL("../src/data/github.json", import.meta.url),
  JSON.stringify(data, null, 2) + "\n",
);
console.log(
  `Atualizados ${data.repos.length} repositórios públicos próprios; nenhum perfil privado foi consultado.`,
);
