# Variant Selector Dictionary

## Developing

1. Install [Nix](https://nixos.org/download)
2. Run the following command to install the project dependencies:
```bash
nix-shell
bun install
bun run dev --open
```

### Compile Fonts

```bash
bun run fonts:download
bun run fonts:compile
```
