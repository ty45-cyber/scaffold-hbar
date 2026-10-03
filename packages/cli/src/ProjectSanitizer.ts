import path from "path";

export class ProjectSanitizer {
  public sanitizeName(input: string): string {
    return input.toLowerCase().replace(/[^a-z0-9-_]/g, "-").replace(/-+/g, "-");
  }

  public validatePath(targetDir: string): boolean {
    const resolvedPath = path.resolve(targetDir);
    return resolvedPath.startsWith(process.cwd());
  }
}