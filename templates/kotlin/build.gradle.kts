import org.jetbrains.kotlin.gradle.targets.js.nodejs.NodeJsRootExtension
import org.jetbrains.kotlin.gradle.targets.js.nodejs.NodeJsRootPlugin
import org.jetbrains.kotlin.gradle.targets.js.npm.tasks.KotlinNpmInstallTask
import org.jetbrains.kotlin.gradle.tasks.Kotlin2JsCompile

plugins {
    kotlin("multiplatform") version "1.8.20"
}

group = "<%= bindleId %>"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

kotlin {
    wasm {
        binaries.executable()
        nodejs()
    }
    sourceSets {
        val wasmMain by getting
        val wasmTest by getting {
            dependencies {
                implementation(kotlin("test-wasm"))
            }
        }
    }
}

rootProject.tasks.withType(KotlinNpmInstallTask::class.java) {
    // necessary to ignore non-supported Node modules
    args += "--ignore-engines"
}
rootProject.plugins.withType(NodeJsRootPlugin::class.java) {
    val extension = rootProject.the<NodeJsRootExtension>()
    extension.nodeVersion = "20.0.0-v8-canary2023022187dda913b0"
    extension.nodeDownloadBaseUrl = "https://nodejs.org/download/v8-canary"
}

tasks.withType<org.jetbrains.kotlin.gradle.dsl.KotlinCompile<*>>().configureEach {
    kotlinOptions {
        freeCompilerArgs += "-opt-in=kotlin.wasm.unsafe.UnsafeWasmMemoryApi"
        freeCompilerArgs += "-opt-in=kotlin.ExperimentalUnsignedTypes"
    }
}

tasks.withType<Kotlin2JsCompile>().configureEach {
    kotlinOptions.freeCompilerArgs += listOf(
        "-Xwasm-generate-wat",
    )
}
