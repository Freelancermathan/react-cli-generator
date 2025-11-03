#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';

program
  .command('g <type> <name>')
  .description('Generate React component, page, or hook')
  .option('-t, --ts', 'Generate TypeScript (.ts or .tsx) files')
  .action((type, name, options) => {
    const isTs = options.ts || false;
    const basePath = path.join(process.cwd(), 'src');
    const folderMap = { c: 'components', p: 'pages', h: 'hooks' };
    const targetFolder = folderMap[type];

    if (!targetFolder) {
      console.log(chalk.red('❌ Invalid type! Use: c (component), p (page), or h (hook)'));
      process.exit(1);
    }

    const dir = path.join(basePath, targetFolder, name);
    if (fs.existsSync(dir)) {
      console.log(chalk.red(`❌ ${type === 'h' ? 'Hook' : 'File'} ${name} already exists!`));
      process.exit(1);
    }

    fs.mkdirSync(dir, { recursive: true });

    // File extensions
    const jsxExt = isTs ? 'tsx' : 'jsx';
    const jsExt = isTs ? 'ts' : 'js';

    // ✅ Component or Page
    if (type === 'c' || type === 'p') {
      const code = isTs
        ? `import React from 'react';
import './${name}.css';

interface ${name}Props {
  title?: string;
}

const ${name}: React.FC<${name}Props> = ({ title = '${name}' }) => {
  return (
    <div className="${name}">
      <h2>{title}</h2>
    </div>
  );
};

export default ${name};
`
        : `
import './${name}.css';

export default function ${name}() {
  return (
    <div className="${name}">
      <h2>${name}</h2>
    </div>
  );
}
`;

      fs.writeFileSync(`${dir}/${name}.${jsxExt}`, code);
      fs.writeFileSync(`${dir}/${name}.css`, `.${name} { padding: 10px; }`);
      console.log(
        chalk.green(`✅ ${type === 'p' ? 'Page' : 'Component'} ${name} created successfully (${isTs ? 'TSX' : 'JSX'})!`)
      );
    }

    // ✅ Hook
    if (type === 'h') {
      const hookName = name.startsWith('use') ? name : `use${name[0].toUpperCase() + name.slice(1)}`;
      const hookCode = isTs
        ? `import { useState, useEffect } from 'react';

const ${hookName} = <T,>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    console.log('${hookName} initialized');
  }, []);

  return [value, setValue] as const;
};

export default ${hookName};
`
        : `import { useState, useEffect } from 'react';

const ${hookName} = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    console.log('${hookName} initialized');
  }, []);

  return [value, setValue];
};

export default ${hookName};
`;

      fs.writeFileSync(`${dir}/${hookName}.${jsExt}`, hookCode);
      console.log(chalk.green(`✅ Hook ${hookName} created successfully (${isTs ? 'TS' : 'JS'})!`));
    }
  });

program.parse(process.argv);
