import type { PlopTypes } from '@turbo/gen';

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("init", {
    description: "Generate a new package for the Monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message: 
          "What is the name of the package? (You can skip the `@packages/` prefix)",
      }
    ],
    actions: [
      (answers) => {
        if (
          "name" in answers &&
          typeof answers.name === 'string' &&
          answers.name.startsWith("@packages/")
        ) {
          answers.name = answers.name.replace("@packages/", "");
        }
        return "Package create config sanitized";
      },
      {
        type: "add",
        path: "packages/{{ name }}/package.json",
        templateFile: "templates/packages/package.json.hbs",
      },
      {
        type: 'add',
        path: "packages/{{ name }}/tsconfig.json",
        templateFile: 'templates/packages/tsconfig.json.hbs'
      }
    ],
  });
}