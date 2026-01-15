export default {
    /** Globs to analyze */
    globs: ["src/**/*.ts", "src/**/*.js"],
    /** Globs to exclude */
    exclude: [],
    /** Directory to output CEM to */
    // outdir: "dist",
    /** Run in dev mode, provides extra logging */
    dev: true,
    /** Run in watch mode, runs on file changes */
    watch: false,
    /** Include third party custom elements manifests */
    dependencies: true,
    /** Output CEM path to `package.json`, defaults to true */
    packagejson: false,
    /** Enable special handling for litelement */
    litelement: true,
    /** Enable special handling for catalyst */
    catalyst: false,
    /** Enable special handling for fast */
    fast: false,
    /** Enable special handling for stencil */
    stencil: false,
    /** Provide custom plugins */
    plugins: [],
};
