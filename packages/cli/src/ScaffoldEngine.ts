import { ProjectSanitizer } from "./ProjectSanitizer";
import { TemplateFetcher } from "./TemplateFetcher";
import { EnvConfigurator } from "./EnvConfigurator";

export class ScaffoldEngine {
  private sanitizer = new ProjectSanitizer();

  public async run(args: string[]): Promise<void> {
    const rawName = args[0] || "hbar-dapp";
    const projectName = this.sanitizer.sanitizeName(rawName);

    const fetcher = new TemplateFetcher();
    const env = new EnvConfigurator();

    fetcher.cloneRepository(projectName);
    fetcher.cleanGitHistory(projectName);
    
    const key = env.generateRandomPrivateKey();
    env.writeEnvFile(projectName, key);
    
    this.renderSuccessNotice(projectName);
  }

  public renderSuccessNotice(projectName: string): void {
    console.log(`\n Successfully created ${projectName}`);
    console.log(` Run: cd ${projectName} && yarn dev\n`);
  }
}