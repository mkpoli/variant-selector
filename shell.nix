let pkgs = import <nixpkgs> {};

in pkgs.mkShell rec {
  buildInputs = with pkgs; [
    curl
    unzip
    bun
    woff2
  ];
}
