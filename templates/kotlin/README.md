# <%= moduleName %>

A WASM hello-world with a publish action

You will need: java (e.g. via sdkman) - `curl -s "https://get.sdkman.io" | bash; sdk install java`

To build: `./gradlew :build`

To run: `wasmtime build/js/packages/<%= moduleName %>-wasm/kotlin/<%= moduleName %>-wasm.wasm`
