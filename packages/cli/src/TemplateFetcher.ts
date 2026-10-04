import { execSync } from "child_process";
import fs from "fs";

export class TemplateFetcher {
  public cloneRepository(targetPath: string): void {
    const repoUrl = "https://github.com/ty45-cyber/scaffold-hbar.git";
    console.log(`Cloning scaffold-hbar into ${targetPath}...`);
    execSync(`git clone --depth 1 ${repoUrl} "${targetPath}"`, { stdio: "inherit" });
  }

  public cleanGitHistory(targetPath: string): void {
    fs.rmSync(`${targetPath}/.git`, { recursive: true, force: true });
  }
}
