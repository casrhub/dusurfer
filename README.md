# duSurfer

Everyone knows Apple's macOS storage analyzer (and Finder) is trash. Here's why:

* **Vague**: "Documents: 100GB" — okay, but where?

* **No freedom**: macOS is built with the bandaid philosophy. Fine for passengers, but some of us want to actually drive this OS (even if you want to use a UI for this). 

* **Finder is useless**: Want folder sizes? Click each one individually. Why, Apple?

## What dusurfer does

Shows you actual folder sizes in a UI. That's it. No vague categories, no iCloud upselling, no wondering around.

## Built with

- [Tauri](https://tauri.app/) + Rust (backend)
- React + TypeScript (frontend)
- Frustration with Apple (motivation)

## Run locally

```npm install ```

```npm run tauri dev```


### ps.
for the just use ```du -sh ``` crowd:

Yes we can just use the terminal but not everyone wants to or knows how to use it.
This tool is not made for nerds who already know how to analyze their storage usage through the terminal, it is an abstraction layer for people who don't have time to be a nerd
## License

MIT — do whatever you want with it.


