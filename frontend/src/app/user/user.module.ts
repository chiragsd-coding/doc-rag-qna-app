{
    "compilerOptions": {
      "target": "es2020",
      "module": "esnext",
      "moduleResolution": "node",
      "lib": ["es2020", "dom"],
      "allowJs": false,
      "checkJs": false,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true,
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "baseUrl": "./src",
      "paths": {
        "@app/*": ["app/*"],
        "@assets/*": ["assets/*"],
        "@environments/*": ["environments/*"],
        "@shared/*": ["app/shared/*"]
      },
      "resolveJsonModule": true,
      "skipDefaultLibCheck": true,
      "isolatedModules": true,
      "noEmit": false
    },
    "angularCompilerOptions": {
      "fullTemplateTypeCheck": true,
      "strictInjectionParameters": true
    },
    "include": [
      "src/**/*.ts"
    ],
    "exclude": [
      "node_modules",
      "dist"
    ]
  }
  