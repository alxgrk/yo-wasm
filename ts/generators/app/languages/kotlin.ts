import { default as chalk } from 'chalk';

import { Errorable } from '../utils/errorable';
import { Language } from './language';

// TODO:
// - Find more good Kotlin VSCode extensions
// - Fix GH Workflow

export const kotlin: Language = {
    instructions(): ReadonlyArray<string> {
        return [
            "You'll need the following to build and run this project locally:",
            `* java (e.g. via sdkman): ${chalk.yellow('curl -s "https://get.sdkman.io" | bash; sdk install java')}`,
            `* wasmtime: ${chalk.yellow('curl https://wasmtime.dev/install.sh -sSf | bash')}`,
            '',
            `Build using VS Code ${chalk.yellow('Build WASM')} task or ${chalk.yellow('./gradlew :build')}.`,
            `Run using VS Code ${chalk.yellow('Debug WASM')} task or ${chalk.yellow('wasmtime build/js/packages/${project-name}/kotlin/${project-name}.wasm')} CLI.`,
        ];
    },

    templateFolder(): string {
        return 'kotlin';
    },

    templateFiles(): string[] {
        return [
            '.gitignore.removeext',
            'build.gradle.kts',
            'gradle.properties',
            'gradlew',
            'gradlew.bat',
            'gradle/wrapper/gradle-wrapper.jar',
            'gradle/wrapper/gradle-wrapper.properties',
            'HIPPOFACTS',
            'LICENSE',
            'README.md',
            'settings.gradle.kts',
            '.vscode/extensions.json',
            '.vscode/launch.json',
            '.vscode/tasks.json',
            'src/wasmMain/kotlin/main.kt',
            'src/wasmMain/kotlin/wasiUtil.kt',
        ];
    },

    async offerToInstallTools(): Promise<string | undefined> {
        return undefined;
    },

    async installTools(_projectDir: string): Promise<Errorable<null>> {
        return { succeeded: true, result: null };
    },

    augment(answers: any): any {
        return answers;
    }
}
