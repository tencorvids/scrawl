{
  pkgs ? import <nixpkgs> { },
}:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_22
    pkgs.pnpm_10
    pkgs.emmet-language-server
    pkgs.typescript-language-server
    pkgs.nodePackages_latest.prettier
    pkgs.nodePackages_latest.vscode-langservers-extracted
  ];
}
