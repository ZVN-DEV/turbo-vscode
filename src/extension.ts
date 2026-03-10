import * as path from "path";
import * as os from "os";
import {
  workspace,
  ExtensionContext,
  window,
} from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  Executable,
} from "vscode-languageclient/node";

let client: LanguageClient | undefined;

export function activate(context: ExtensionContext) {
  // Look for the turbo-lsp binary in common locations
  const serverPath = findServerBinary();
  if (!serverPath) {
    // No LSP binary found — extension still works for syntax highlighting
    console.log("turbo-lsp binary not found, running in syntax-only mode");
    return;
  }

  const run: Executable = {
    command: serverPath,
  };

  const serverOptions: ServerOptions = {
    run,
    debug: run,
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "turbo" }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher("**/*.tb"),
    },
  };

  client = new LanguageClient(
    "turbo-lsp",
    "Turbo Language Server",
    serverOptions,
    clientOptions,
  );

  client.start();
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

function findServerBinary(): string | undefined {
  // Check user setting first
  const config = workspace.getConfiguration("turbo");
  const configPath = config.get<string>("lspPath");
  if (configPath) {
    return configPath;
  }

  // Check common locations
  const candidates = [
    // Cargo debug build (development)
    path.join(os.homedir(), "Desktop", "Coding", "ZVN", "new-language", "turbo", "target", "debug", "turbo-lsp"),
    // Cargo release build
    path.join(os.homedir(), "Desktop", "Coding", "ZVN", "new-language", "turbo", "target", "release", "turbo-lsp"),
    // System PATH
    "turbo-lsp",
  ];

  const fs = require("fs");
  for (const candidate of candidates) {
    if (candidate === "turbo-lsp") {
      // Will be found via PATH
      return candidate;
    }
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return undefined;
}
