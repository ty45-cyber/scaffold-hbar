import { execSync } from "child_process";
import fs from "fs";

export class TemplateFetcher {
  public cloneRepository(targetPath: string): void {
    const repoUrl = "https://github.com/scaffold-hbar/template.git";
    execSync(`git clone --depth 1 ${repoUrl} "${targetPath}"`, { stdio: "ignore" });
  }

  public cleanGitHistory(targetPath: string): void {
    fs.rmSync(`${targetPath}/.git`, { recursive: true, force: true });
  }
}